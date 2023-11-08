/// <reference path="../pb_data/types.d.ts" />

// TODO: PUT, DELETE, HEADER for / and /:path

routerAdd(
  "GET",
  "/",
  (c) => {
    const res = $http.send({
      url: "http://localhost:4321",
      method: "GET",
      body: "",
      timeout: 120,
    });

    //   console.log(res.headers); // the response headers (eg. res.headers['X-Custom'][0])
    //   console.log(res.cookies); // the response cookies (eg. res.cookies.sessionId.value)
    //   console.log(res.statusCode); // the response HTTP status code
    //   console.log(res.raw); // the response body as plain text
    //   console.log(res.json); // the response body as parsed json array or map

    // TODO: Error handling

    for (const [key, value] of Object.entries(res.headers)) {
      c.response().header().set(key, value);
    }

    for (const [key, value] of Object.entries(res.cookies)) {
      c.response().cookies().set(key, value);
    }

    const contentType = res.headers["Content-Type"];
    if (contentType === "application/json") {
      return c.json(200, res.json);
    } else if (contentType === "text/html") {
      return c.html(200, res.raw);
    } else {
      return c.string(200, res.raw);
    }
  },
  $apis.activityLogger($app)
);

routerAdd(
  "GET",
  "/:path",
  (c) => {
    const res = $http.send({
      url: `http://localhost:4321/${c.pathParam("path")}`,
      method: "GET",
      body: "",
      timeout: 120,
    });

    for (const [key, value] of Object.entries(res.headers)) {
      c.response().header().set(key, value);
    }

    for (const [key, value] of Object.entries(res.cookies)) {
      c.response().cookies().set(key, value);
    }

    const contentType = res.headers["Content-Type"];
    if (contentType === "application/json") {
      return c.json(200, res.json);
    } else if (contentType === "text/html") {
      return c.html(200, res.raw);
    } else {
      return c.string(200, res.raw);
    }
  },
  $apis.activityLogger($app)
);
