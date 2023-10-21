import { Elysia, t } from "elysia";
import { plugin } from "./plugin";
import { signupDTO } from "./model";

const PORT = 3000;

const app = new Elysia()
  .use(plugin)
  .state("version", "1.0.0")
  .state("userInfo", {
    id: 1,
    name: "Elysia",
    email: "test@gmail.com",
  })
  .decorate("getDate", () => new Date())
  .get("/", () => "Hello Elysia")
  .get("/post/:id", ({ params }) => `Post ID: ${params.id}`)
  .post("/post", ({ body, set }) => {
    set.status = 201;
    return body;
  })
  .get("/track/*", () => {
    return "Hello Track";
  })
  .get("/tracks", ({ store, getDate }) => {
    console.log(store.userInfo);
    console.log(store.version);
    console.log(getDate());
    console.log(store["plugin-version"]);
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
  });

app.group("/user", (app) =>
  app
    .get("/", () => "Hello User")
    .get("/info", ({ store }) => store.userInfo)
    .post("/", ({ body, set }) => {
      set.status = 201;
      return body;
    })
    // signup with validation
    .post("/signup", ({ body }) => body, {
      body: signupDTO,
      response: signupDTO,
    })
);

app.listen(PORT);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
