import "./style.css";

import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

const calls = pb.collection("calls");
const offerCandidates = pb.collection("offer_candidates");
const answerCandidates = pb.collection("answer_candidates");

const webcamButton = document.getElementById("webcamButton");
const webcamVideo = document.getElementById("webcamVideo");
const callButton = document.getElementById("callButton");
const callInput = document.getElementById("callInput");
const answerButton = document.getElementById("answerButton");
const remoteVideo = document.getElementById("remoteVideo");
const hangupButton = document.getElementById("hangupButton");

await pb.admins.authWithPassword(
  import.meta.env.VITE_POCKETBASE_ADMIN_USERNAME,
  import.meta.env.VITE_POCKETBASE_ADMIN_PASSWORD
);
const iceServers = await pb.collection("ice_servers").getFullList();

const servers = {
  iceServers: [{ urls: iceServers.map((e) => e.url) }],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;

webcamButton.onclick = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  remoteStream = new MediaStream();

  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  pc.ontrack = (event) => {
    const stream = event.streams[0];
    stream.getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  webcamVideo.srcObject = localStream;
  remoteVideo.srcObject = remoteStream;

  callButton.disabled = false;
  answerButton.disabled = false;
  webcamButton.disabled = true;
};

callButton.onclick = async () => {
  const call = await calls.create({});
  const callId = call.id;

  callInput.value = callId;

  pc.onicecandidate = (event) => {
    event.candidate &&
      offerCandidates.create({
        call_id: callId,
        data: event.candidate.toJSON(),
      });
  };

  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

  await calls.update(callId, { offer });

  calls.subscribe(callId, (e) => {
    const data = e.record;
    if (!pc.currentRemoteDescription && data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });

  answerCandidates.subscribe("*", (e) => {
    if (e.action === "create") {
      if (e.record?.call_id === callId) {
        const data = e.record.data;
        const candidate = new RTCIceCandidate(data);
        pc.addIceCandidate(candidate);
      }
    }
  });

  hangupButton.disabled = false;
};

answerButton.onclick = async () => {
  const callId = callInput.value;
  const call = await calls.getOne(callId);

  pc.onicecandidate = (event) => {
    event.candidate &&
      answerCandidates.create({
        call_id: call.id,
        data: event.candidate.toJSON(),
      });
  };

  const offerDescription = call.offer;
  const remoteDescription = new RTCSessionDescription(offerDescription);
  await pc.setRemoteDescription(remoteDescription);

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
  };

  await calls.update(call.id, { answer });

  offerCandidates.subscribe("*", async (e) => {
    if (e.record?.call_id === call.id) {
      if (e.action === "create") {
        const data = e.record.data;
        const candidate = new RTCIceCandidate(data);
        await pc.addIceCandidate(candidate);
      } else if (e.action === "delete") {
        await offerCandidates.unsubscribe();
        window.location.reload();
      }
    }
  });
};

hangupButton.onclick = async () => {
  const callId = callInput.value;
  pc.close();
  await calls.unsubscribe(callId);
  await calls.delete(callId);
  await answerCandidates.unsubscribe();
  window.location.reload();
};
