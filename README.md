# Video Chat with WebRTC and PocketBase

Build a 1-to-1 video chat feature with WebRTC, PocketBase, and JavaScript. 

Based on the [Fireship example](https://github.com/fireship-io/webrtc-firebase-demo) of Firebase + WebRTC.

Learn more about WebRTC [here](https://youtu.be/WmR9IMUD_CY).

## Getting Started

Create a new [PocketBase](https://pocketbase.io) server (locally or remotely) and create a `.env` file at the top of the project with two keys:

```
VITE_POCKETBASE_USERNAME=
VITE_POCKETBASE_PASSWORD=
```

Add the username and password for the admin client (in a real app you will want to authenticate the user instead).

## Pocketbase Setup

Create 4 collections `calls`, `ice_servers`, `offer_candidates` and `answer_candidates`.

### ice_servers

Create 1 columns named `url` of type text and add two records for the following urls:

```
stun:stun1.l.google.com:19302
stun:stun2.l.google.com:19302
```

Add the following API rule to all the actions:

```
@request.auth.id != ''
```

### calls

Create 2 columns `offer` and `answer` of type JSON and both can be empty.

Add the following API rule to all the actions:

```
@request.auth.id != ''
```

Set the API access to public view and list for everyone.

### offer_candidates

Create a `data` column of type JSON.

Create a `call_id` column of type relation pointing to the `calls` collection and set the trigger to cascade delete.

Add the following API rule to all the actions:

```
@request.auth.id != ''
```


### answer_candidates

Create a `data` column of type JSON.

Create a `call_id` column of type relation pointing to the `calls` collection and set the trigger to cascade delete.

Add the following API rule to all the actions:

```
@request.auth.id != ''
```


## Usage

```
git clone <this-repo>
npm install
npm run dev
```
