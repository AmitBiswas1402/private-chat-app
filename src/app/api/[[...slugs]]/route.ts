import { redis } from "@/lib/redis";
import { Elysia, t } from "elysia";
import { nanoid } from "nanoid";
import { authMiddleware } from "./auth";
import z from "zod";
import { realtime } from "@/lib/reatime";

const ROOM_TTL_SECS = 60 * 10; // 10 minutes

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
  roomId: string;
}

const room = new Elysia({ prefix: "/rooms" }).post("/create", async() => {
  const roomId = nanoid();

  await redis.hset(`meta:${roomId}`, { 
    connected: [],
    createdAt: Date.now() 
  });

  await redis.expire(`meta:${roomId}`, ROOM_TTL_SECS);

  return { roomId };
});

const messages = new Elysia({
  prefix: "/messages"
}).use(authMiddleware).post("/", async ({ body, auth }) => {
  const { sender, text } = body;
  const { roomId } = auth;

  const roomExists = await redis.exists(`meta:${roomId}`);

  if (!roomExists) {
    return new Response("Room does not exist", { status: 404 });
  }

  const message: Message = {
    id: nanoid(),
    sender,
    text,
    timestamp: Date.now(),
    roomId,
  };

  await redis.rpush(`messages: ${roomId}`, {
    ...message,
    token: auth.token
  });

  await realtime.channel(roomId).emit("chat.message", message);

  const remianing = await redis.ttl(`meta:${roomId}`);

  await redis.expire(`messages: ${roomId}`, remianing);
  await redis.expire(`history: ${roomId}`, remianing);
  await redis.expire(roomId, remianing);
}, {
  query: z.object({ roomId: z.string() }),
  body: z.object({
    sender: z.string().max(100),
    text: z.string().max(1000)
  })
});

export const app = new Elysia({ prefix: "/api" })
  .use(room)
  .use(messages);

export const GET = app.fetch;
export const POST = app.fetch;

