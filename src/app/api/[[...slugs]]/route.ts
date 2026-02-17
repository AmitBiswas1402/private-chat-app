import { redis } from "@/lib/redis";
import { Elysia, t } from "elysia";
import { nanoid } from "nanoid";
import { authMiddleware } from "./auth";

const ROOM_TTL_SECS = 60 * 10; // 10 minutes

const room = new Elysia({ prefix: "/rooms" }).post("/create", async() => {
  const roomId = nanoid();

  await redis.hset(`meta:${roomId}`, { 
    connected: [],
    createdAt: Date.now() 
  });

  await redis.expire(`meta:${roomId}`, ROOM_TTL_SECS);

  return { roomId };
})

const messages = new Elysia({
  prefix: "/messages"
}).use(authMiddleware).post("/", ({ body, auth }) => {
  const { sender, text } = body
})

export const app = new Elysia({ prefix: "/api" }).use(room);

export const GET = app.fetch;
export const POST = app.fetch;

