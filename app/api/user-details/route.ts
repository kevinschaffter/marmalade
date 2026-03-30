import { NextResponse } from "next/server";

// Module-level counter — increments on every request.
// Every 5th call (5, 10, 15...) returns a 500 error.
let callCount = 0;

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ROLES = ["admin", "editor", "viewer", "moderator", "analyst"] as const;

function generateDetails() {
  const rand = mulberry32(99);
  const baseDate = new Date("2022-01-01T00:00:00Z").getTime();
  const rangeMs = 2 * 365 * 24 * 60 * 60 * 1000;

  return Array.from({ length: 2000 }, (_, i) => ({
    userId: `user-${String(i + 1).padStart(4, "0")}`,
    role: ROLES[Math.floor(rand() * ROLES.length)],
    createdAt: new Date(baseDate + Math.floor(rand() * rangeMs)).toISOString(),
  }));
}

// Stable across requests in the same server process
const DETAILS = generateDetails();

export async function GET() {
  callCount++;

  if (callCount % 5 === 0) {
    return NextResponse.json(
      { error: "Internal Server Error", message: "Simulated server failure" },
      { status: 500 }
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));
  return NextResponse.json({ details: DETAILS });
}
