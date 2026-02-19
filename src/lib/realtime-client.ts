"use client";

import { createRealtime } from "@upstash/realtime/client";
import { RealtimeEvents } from "./reatime";

export const { useRealtime } = createRealtime<RealtimeEvents>();
