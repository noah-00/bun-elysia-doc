import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello Elysiaaa")
  .get("/post/:id", ({ params }) => `Post ID: ${params.id}`)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
