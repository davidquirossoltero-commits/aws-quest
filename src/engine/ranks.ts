import type { RankInfo } from "./types";

export const RANKS: RankInfo[] = [
  { name: "Iniciación Cloud", minXp: 0, badge: "🌱" },
  { name: "AWS Cloud Practitioner", minXp: 100, badge: "☁️" },
  { name: "Solutions Architect Associate", minXp: 350, badge: "🏛️" },
  { name: "SysOps Administrator Associate", minXp: 650, badge: "⚙️" },
  { name: "Developer Associate", minXp: 1000, badge: "💻" },
  { name: "Solutions Architect Professional", minXp: 1500, badge: "👑" },
];

export function getRank(xp: number): RankInfo {
  let current = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.minXp) {
      current = r;
    } else {
      break;
    }
  }
  return current;
}

export function getNextRank(xp: number): RankInfo | null {
  for (const r of RANKS) {
    if (r.minXp > xp) return r;
  }
  return null;
}
