import type { GameState } from "./types";

const STORAGE_KEY = "aws_quest_progress";
let activeUser = "";

export function setActiveUser(username: string): void {
  activeUser = username;
}

function storageKey(): string {
  return activeUser ? `${STORAGE_KEY}.${activeUser}` : STORAGE_KEY;
}

export function freshState(): GameState {
  return {
    xp: 0,
    coins: 0,
    levels: {},
    ach: [],
    current: 0,
    streak: 0,
    bestStreak: 0,
    commands: {},
  };
}

export function deserialize(raw: string | null): GameState {
  try {
    const parsed = JSON.parse(raw ?? "null") || {};
    return Object.assign(freshState(), parsed);
  } catch {
    return freshState();
  }
}

export function loadState(): GameState {
  if (typeof localStorage === "undefined") return freshState();
  try {
    return deserialize(localStorage.getItem(storageKey()));
  } catch {
    return freshState();
  }
}

export function saveState(state: GameState): void {
  try {
    localStorage.setItem(storageKey(), JSON.stringify(state));
  } catch {
    // Ignore in private browsing
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(storageKey());
  } catch {
    // Ignore
  }
}

export function doneCount(state: GameState): number {
  return Object.keys(state.levels || {}).length;
}

export function totalStars(state: GameState): number {
  return Object.values(state.levels || {}).reduce((sum, level) => sum + (level?.stars || 0), 0);
}

export function isUnlocked(state: GameState, index: number): boolean {
  return index === 0 || Boolean(state.levels[String(index - 1)]) || Boolean(state.levels[String(index)]);
}

export function starString(n: number): string {
  return "★".repeat(Math.max(0, Math.min(3, n))) + "☆".repeat(Math.max(0, 3 - Math.min(3, n)));
}
