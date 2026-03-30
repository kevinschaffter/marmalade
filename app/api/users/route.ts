import { NextResponse } from "next/server";

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIRST_NAMES = [
  "Alice", "Bob", "Carol", "David", "Eva", "Frank", "Grace", "Henry",
  "Iris", "Jack", "Karen", "Leo", "Mia", "Nate", "Olivia", "Paul",
  "Quinn", "Rachel", "Sam", "Tina", "Uma", "Victor", "Wendy", "Xander",
  "Yara", "Zoe", "Aaron", "Bella", "Chris", "Diana",
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
  "Davis", "Martinez", "Wilson", "Anderson", "Taylor", "Thomas", "Hernandez",
  "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez", "Lee", "Harris",
  "Clark", "Lewis", "Robinson", "Walker", "Hall", "Young", "Allen", "King",
];

function generateUsers() {
  const rand = mulberry32(42);
  return Array.from({ length: 1000 }, (_, i) => ({
    id: `user-${String(i + 1).padStart(4, "0")}`,
    name: `${FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)]}`,
  }));
}

// Stable across requests in the same server process
const USERS = generateUsers();

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return NextResponse.json({ users: USERS });
}
