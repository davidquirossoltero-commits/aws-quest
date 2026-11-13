import type { Achievement, GameState } from "./types";

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-iam",
    title: "Identidad Asegurada",
    icon: "🛡️",
    description: "Verifica tu cuenta y configura identidades de IAM.",
    check: (state: GameState) => Boolean(state.levels["0"] || state.levels["1"]),
  },
  {
    id: "ach-s3",
    title: "Guardián de S3",
    icon: "🪣",
    description: "Aplica el bloqueo total de acceso público en un bucket S3.",
    check: (state: GameState) => Boolean(state.levels["5"]),
  },
  {
    id: "ach-lambda",
    title: "Poder Serverless",
    icon: "⚡",
    description: "Despliega una función AWS Lambda sin gestionar servidores.",
    check: (state: GameState) => Boolean(state.levels["9"]),
  },
  {
    id: "ach-vpc",
    title: "Arquitecto de Red",
    icon: "🌐",
    description: "Provisiona una red virtual aislada en Amazon VPC.",
    check: (state: GameState) => Boolean(state.levels["10"]),
  },
  {
    id: "ach-sysops",
    title: "SysOps Certificado",
    icon: "🚀",
    description: "Supera al menos la mitad de los niveles (6 o más).",
    check: (state: GameState) => Object.keys(state.levels).length >= 6,
  },
  {
    id: "ach-architect",
    title: "Master Cloud Architect",
    icon: "👑",
    description: "Supera con éxito los 12 niveles de AWS Quest.",
    check: (state: GameState) => Object.keys(state.levels).length >= 12,
  },
  {
    id: "ach-perfect",
    title: "Perfeccionista Cloud",
    icon: "🌟",
    description: "Consigue 3 estrellas en al menos 5 niveles.",
    check: (state: GameState) => {
      const threeStarCount = Object.values(state.levels).filter((p) => p.stars >= 3).length;
      return threeStarCount >= 5;
    },
  },
  {
    id: "ach-coins",
    title: "Inversor Cloud",
    icon: "🪙",
    description: "Acumula 150 créditos en tu cuenta cloud.",
    check: (state: GameState) => state.coins >= 150,
  },
];

export function checkNewAchievements(state: GameState): Achievement[] {
  const newOnes: Achievement[] = [];
  const currentSet = new Set(state.ach ?? []);
  for (const ach of ACHIEVEMENTS) {
    if (!currentSet.has(ach.id) && ach.check(state)) {
      newOnes.push(ach);
    }
  }
  return newOnes;
}
