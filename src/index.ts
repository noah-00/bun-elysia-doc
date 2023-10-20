import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/post/:id", ({ params }) => `Post ID: ${params.id}`)
  .post("/post", ({ body, set }) => {
    set.status = 201;
    return body;
  })
  .get("/track/*", () => {
    return "Hello Track";
  })
  .get("/tracks", () => {
    return new Response(
      JSON.stringify({
        tracks: ["track1", "track2"],
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  })
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
