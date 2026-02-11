import { Elysia, t } from "elysia";

const room = new Elysia({ prefix: "/rooms" }).post("/create", () => {
  console.log("Create a new room!");  
})

const app = new Elysia({ prefix: "/api" }).use(room);

export const GET = app.fetch;
export const POST = app.fetch;

