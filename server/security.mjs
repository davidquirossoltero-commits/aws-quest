import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

export const RANKS = [
  { xp: 0, name: "Iniciación Cloud", icon: "🌱" },
  { xp: 100, name: "AWS Cloud Practitioner", icon: "☁️" },
  { xp: 350, name: "Solutions Architect Associate", icon: "🏛️" },
  { xp: 650, name: "SysOps Administrator Associate", icon: "⚙️" },
  { xp: 1000, name: "Developer Associate", icon: "💻" },
  { xp: 1500, name: "Solutions Architect Professional", icon: "👑" },
];

const ACCOUNTS = [
  { username: "Wesked", name: "Wesked", env: "QUEST_PASSWORD_WESKED" },
  { username: "Flisin", name: "Flisin", env: "QUEST_PASSWORD_FLISIN" },
  { username: "Aidi", name: "Aidi", env: "QUEST_PASSWORD_AIDI" },
  { username: "Einar", name: "Einar", env: "QUEST_PASSWORD_EINAR" },
];

export function rankInfo(xp) {
  let current = RANKS[0];
  let next = null;
  for (let i = 0; i < RANKS.length; i++) {
    if (xp >= RANKS[i].xp) {
      current = RANKS[i];
      next = RANKS[i + 1] ?? null;
    }
  }
  const prevXp = current.xp;
  const nextXp = next ? next.xp : current.xp + 500;
  const progress = next ? Math.min(100, Math.floor(((xp - prevXp) / (nextXp - prevXp)) * 100)) : 100;
  return {
    ...current,
    nextName: next ? next.name : null,
    nextXp: next ? next.xp : null,
    pct: progress,
    label: next ? `${xp} / ${nextXp} XP` : `${xp} XP (Máx)`,
  };
}

export async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = await scryptAsync(password, salt, 32);
  return `scrypt$${salt}$${hash.toString("hex")}`;
}

export async function verifyPassword(password, stored) {
  const [algo, salt, hex] = String(stored ?? "").split("$");
  if (algo !== "scrypt" || !salt || !hex || password.length === 0 || password.length > 200) return false;
  const hash = await scryptAsync(password, salt, 32);
  const expected = Buffer.from(hex, "hex");
  if (hash.length !== expected.length) return false;
  return timingSafeEqual(hash, expected);
}

export async function loadAccounts(env = process.env) {
  const accounts = [];
  for (const account of ACCOUNTS) {
    const password = env[account.env] ?? "";
    if (password.length < 8 || password.length > 200) {
      throw new Error(`Falta ${account.env}: pon una contraseña de al menos 8 caracteres.`);
    }
    if (password.startsWith("cambia-esta")) {
      throw new Error(`${account.env} sigue siendo la contraseña de ejemplo. Cámbiala antes de publicar.`);
    }
    accounts.push({
      username: account.username,
      name: account.name,
      passwordHash: await hashPassword(password),
    });
  }
  return accounts;
}

export function createLimiter({ max = 5, windowMs = 15 * 60 * 1000 } = {}) {
  const book = new Map();
  return {
    locked(ip, now) {
      const row = book.get(ip);
      return Boolean(row && now < row.resetAt && row.fails >= max);
    },
    fail(ip, now) {
      const row = book.get(ip);
      if (!row || now >= row.resetAt) {
        book.set(ip, { fails: 1, resetAt: now + windowMs });
        return false;
      }
      row.fails += 1;
      return row.fails >= max;
    },
    reset(ip) {
      book.delete(ip);
    },
  };
}

function whole(value, max) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) return 0;
  return Math.min(max, Math.floor(number));
}

export function sanitizeState(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const levels = {};
  const rawLevels = input.levels && typeof input.levels === "object" ? input.levels : {};
  for (const [key, value] of Object.entries(rawLevels).slice(0, 50)) {
    if (!/^\d+$/.test(key) || !value || typeof value !== "object") continue;
    levels[key] = {
      stars: whole(value.stars, 3),
      noHint: Boolean(value.noHint),
      firstTry: Boolean(value.firstTry),
    };
  }
  const commands = {};
  const rawCommands = input.commands && typeof input.commands === "object" ? input.commands : {};
  for (const [key, value] of Object.entries(rawCommands).slice(0, 50)) {
    if (!/^\d+$/.test(key) || typeof value !== "string") continue;
    commands[key] = value.slice(0, 10_000);
  }
  const ach = Array.isArray(input.ach)
    ? input.ach.filter((id) => typeof id === "string" && /^[a-z0-9_-]{1,30}$/.test(id)).slice(0, 30)
    : [];
  const rawQuiz = input.quiz && typeof input.quiz === "object" ? input.quiz : {};
  const quiz = {
    score: whole(rawQuiz.score, 1000),
    passed: Boolean(rawQuiz.passed),
    answers: rawQuiz.answers && typeof rawQuiz.answers === "object" ? rawQuiz.answers : {},
  };
  return {
    xp: whole(input.xp, 1_000_000),
    coins: whole(input.coins, 1_000_000),
    levels,
    ach,
    current: whole(input.current, 50),
    streak: whole(input.streak, 1000),
    bestStreak: whole(input.bestStreak, 1000),
    commands,
    quiz,
  };
}

export function emptyState() {
  return sanitizeState({});
}

export function publicRow(account, state) {
  const levels = state?.levels && typeof state.levels === "object" ? state.levels : {};
  const stars = Object.values(levels).reduce((sum, level) => sum + (Number(level?.stars) || 0), 0);
  const xp = Number(state?.xp) || 0;
  const info = rankInfo(xp);
  return {
    username: account.username,
    name: account.name,
    xp,
    stars,
    levels: Object.keys(levels).length,
    rank: info.name,
    icon: info.icon,
  };
}

export function rankRows(accounts, states) {
  return accounts
    .map((account) => publicRow(account, states.get(account.username)))
    .sort((a, b) => b.xp - a.xp || b.stars - a.stars || a.name.localeCompare(b.name, "es"));
}
