import type { RankInfo } from "./types";

export const RANKS: RankInfo[] = [
  { name: "Novato en la Nube", minXp: 0, badge: "🌱" },
  { name: "Practicante Cloud", minXp: 100, badge: "☁️" },
  { name: "Administrador SysOps", minXp: 300, badge: "⚙️" },
  { name: "Desarrollador Serverless", minXp: 600, badge: "⚡" },
  { name: "Arquitecto de Soluciones", minXp: 1000, badge: "🏛️" },
  { name: "Maestro Cloud DevOps", minXp: 1500, badge: "👑" },
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
