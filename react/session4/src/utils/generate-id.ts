// src/utils/generate-id.ts

export function generateInternId(
  now: () => number = Date.now,
  random: () => number = Math.random,
): string {
  return `intern-${now()}-${random()}`;
}
