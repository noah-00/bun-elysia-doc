import { Elysia } from "elysia";

// Define plugin
export const plugin = new Elysia()
  .state("plugin-version", "2.0.0")
  .get("/plugin", () => "Hello Plugin")
  .get("/greet", () => "Hell");
