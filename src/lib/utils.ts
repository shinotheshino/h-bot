import { AssertionError } from "assert";
import discord from "discord.js";

export async function fetchUser<T>(
  client: discord.Client,
  userID: string | null,
  def: T,
  options: { allowBots: boolean } = { allowBots: false },
): Promise<discord.User | T> {
  if (!userID) return def;
  try {
    const res = await client.users.fetch(userID);
    return !options.allowBots && res.bot ? def : res;
  } catch {
    return def;
  }
}

export function weightedAverage<T extends string>(options: Record<T, number>): keyof typeof options {
  const entries = Object.entries<number>(options);
  let n = 0;
  for (const [, weight] of entries) {
    n += weight;
  }
  const x = Math.random() * n;
  let r = 0;
  for (const [option, weight] of entries) {
    if (r <= x && x < r + weight) return option as T;
    r += weight;
  }
  throw new TypeError("Reached end of weightedAverage");
}

export function assert<T>(expression: T): asserts expression {
  if (!expression) throw new AssertionError({ message: `assertion failed: ${expression}` });
}
