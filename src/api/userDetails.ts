import type { IncomingMessage, ServerResponse } from "node:http";

let callCount = 0;

const mulberry32 = (seed: number) => {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const ROLES = ["admin", "editor", "viewer", "moderator", "analyst"] as const;

const generateDetails = () => {
  const rand = mulberry32(99);
  const baseDate = new Date("2022-01-01T00:00:00Z").getTime();
  const rangeMs = 2 * 365 * 24 * 60 * 60 * 1000;

  return Array.from({ length: 2000 }, (_, i) => ({
    userId: `user-${String(i + 1).padStart(4, "0")}`,
    role: ROLES[Math.floor(rand() * ROLES.length)],
    createdAt: new Date(baseDate + Math.floor(rand() * rangeMs)).toISOString(),
  }));
};

const DETAILS = generateDetails();

export const handleUserDetails = async (_req: IncomingMessage, res: ServerResponse) => {
  callCount++;

  if (callCount % 5 === 0) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Internal Server Error", message: "Simulated server failure" }));
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ details: DETAILS }));
};
