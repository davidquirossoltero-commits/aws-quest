import { createServer } from "node:http";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createLimiter, emptyState, loadAccounts, rankRows, sanitizeState, verifyPassword } from "./security.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DAY = 24 * 60 * 60 * 1000;
const SESSION_MS = 7 * DAY;

function loadEnvFile() {
  const file = path.join(root, ".env");
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

function clientIp(req) {
  if (process.env.QUEST_TRUST_PROXY === "1") {
    const forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string" && forwarded.length > 0) return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress ?? "unknown";
}

function readCookie(req, name) {
  const raw = req.headers.cookie ?? "";
  for (const part of raw.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return "";
}

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return false;
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  if (!host) return false;
  try {
    return new URL(origin).host === String(host);
  } catch {
    return false;
  }
}

function readBody(req, limit = 64_000) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(Object.assign(new Error("too big"), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      const text = Buffer.concat(chunks).toString("utf8");
      if (!text) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(text));
      } catch {
        reject(Object.assign(new Error("json"), { status: 400 }));
      }
    });
    req.on("error", reject);
  });
}

function contentType(file) {
  const ext = path.extname(file);
  const types = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".woff2": "font/woff2",
  };
  return types[ext] ?? "application/octet-stream";
}

function securityHeaders() {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Content-Security-Policy": [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  };
}

export async function createGameServer(env = process.env) {
  loadEnvFile();
  const accounts = await loadAccounts(env);
  const dummyHash = accounts[0].passwordHash;
  const byName = new Map(accounts.map((account) => [account.username.toLowerCase(), account]));
  const sessions = new Map();
  const limiter = createLimiter();
  const dataDir = path.resolve(root, env.QUEST_DATA || "data/saves");
  mkdirSync(dataDir, { recursive: true });
  const staticRoot = path.resolve(root, "dist");

  function savePath(username) {
    return path.join(dataDir, `${username}.json`);
  }

  function readSave(username) {
    const file = savePath(username);
    if (!existsSync(file)) return emptyState();
    try {
      return sanitizeState(JSON.parse(readFileSync(file, "utf8"))) ?? emptyState();
    } catch {
      return emptyState();
    }
  }

  function writeSave(username, state) {
    const file = savePath(username);
    const temp = `${file}.${process.pid}.tmp`;
    writeFileSync(temp, JSON.stringify(state));
    renameSync(temp, file);
  }

  function fromPortal(req) {
    const header = req.headers["x-quest-user"];
    if (typeof header !== "string" || !header.trim()) return null;
    const secret = env.QUEST_PROXY_SECRET ?? "";
    if (secret) {
      const got = req.headers["x-quest-secret"];
      const left = Buffer.from(typeof got === "string" ? got : "");
      const right = Buffer.from(secret);
      if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
    } else {
      const ip = req.socket.remoteAddress ?? "";
      const local = ip === "127.0.0.1" || ip === "::1" || ip === "::ffff:127.0.0.1";
      if (!local) return null;
    }
    return byName.get(header.trim().toLowerCase()) ?? null;
  }

  function sessionUser(req) {
    const portal = fromPortal(req);
    if (portal) return portal;
    const token = readCookie(req, "quest_session");
    if (!token) return null;
    const session = sessions.get(token);
    if (!session || session.expires < Date.now()) {
      sessions.delete(token);
      return null;
    }
    return byName.get(session.username.toLowerCase()) ?? null;
  }

  function cookie(token, secure) {
    const parts = [
      `quest_session=${encodeURIComponent(token)}`,
      "HttpOnly",
      "SameSite=Lax",
      "Path=/",
      `Max-Age=${Math.floor(SESSION_MS / 1000)}`,
    ];
    if (secure) parts.push("Secure");
    return parts.join("; ");
  }

  function clearCookie(secure) {
    return `quest_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure ? "; Secure" : ""}`;
  }

  function send(res, status, body, extraHeaders = {}) {
    const payload = Buffer.from(JSON.stringify(body));
    res.writeHead(status, {
      ...securityHeaders(),
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": payload.length,
      "Cache-Control": "no-store",
      ...extraHeaders,
    });
    res.end(payload);
  }

  function serveFile(res, filePath) {
    try {
      const stat = statSync(filePath);
      if (!stat.isFile()) {
        res.writeHead(404, securityHeaders());
        res.end("Not Found");
        return;
      }
      res.writeHead(200, {
        ...securityHeaders(),
        "Content-Type": contentType(filePath),
        "Content-Length": stat.size,
        "Cache-Control": filePath.includes("assets") ? "public, max-age=31536000, immutable" : "no-cache",
      });
      res.end(readFileSync(filePath));
    } catch {
      res.writeHead(404, securityHeaders());
      res.end("Not Found");
    }
  }

  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? "/", "http://localhost");
      const secure = env.QUEST_SECURE === "1" || req.headers["x-forwarded-proto"] === "https";

      if (url.pathname === "/api/health") {
        return send(res, 200, { ok: true, name: "aws-quest" });
      }

      if (url.pathname === "/api/logout" && (req.method === "POST" || req.method === "GET")) {
        sessions.delete(readCookie(req, "quest_session"));
        if (req.method === "GET") {
          res.writeHead(302, { ...securityHeaders(), "Set-Cookie": clearCookie(secure), Location: "/" });
          res.end();
          return;
        }
        return send(res, 200, { ok: true }, { "Set-Cookie": clearCookie(secure) });
      }

      if (url.pathname === "/api/login" && req.method === "POST") {
        if (!sameOrigin(req)) return send(res, 403, { error: "Origen no permitido" });
        const ip = clientIp(req);
        if (limiter.locked(ip, Date.now())) {
          return send(res, 429, { error: "Demasiados intentos. Espera unos minutos." });
        }
        const body = await readBody(req);
        const username = String(body.username ?? "").trim().toLowerCase();
        const password = String(body.password ?? "");
        const account = byName.get(username);
        const ok = await verifyPassword(password, account ? account.passwordHash : dummyHash);
        if (!account || !ok) {
          limiter.fail(ip, Date.now());
          return send(res, 401, { error: "Usuario o contraseña incorrectos." });
        }
        limiter.reset(ip);
        const token = randomBytes(32).toString("hex");
        sessions.set(token, { username: account.username, expires: Date.now() + SESSION_MS });
        return send(
          res,
          200,
          { me: account.username, name: account.name },
          { "Set-Cookie": cookie(token, secure) }
        );
      }

      const user = sessionUser(req);

      if (url.pathname === "/api/me" && req.method === "GET") {
        if (!user) return send(res, 401, { error: "No autenticado" });
        return send(res, 200, { me: user.username, name: user.name });
      }

      if (url.pathname === "/api/ranking" && req.method === "GET") {
        if (!user) return send(res, 401, { error: "No autenticado" });
        const states = new Map();
        for (const account of accounts) {
          states.set(account.username, readSave(account.username));
        }
        return send(res, 200, { me: user.username, rows: rankRows(accounts, states) });
      }

      if (url.pathname === "/api/progress" && req.method === "GET") {
        if (!user) return send(res, 401, { error: "No autenticado" });
        return send(res, 200, { state: readSave(user.username) });
      }

      if (url.pathname === "/api/progress" && req.method === "PUT") {
        if (!user) return send(res, 401, { error: "No autenticado" });
        if (!fromPortal(req) && !sameOrigin(req)) return send(res, 403, { error: "Origen no permitido" });
        const body = await readBody(req, 128_000);
        const clean = sanitizeState(body.state);
        if (!clean) return send(res, 400, { error: "Estado no válido" });
        writeSave(user.username, clean);
        return send(res, 200, { ok: true });
      }

      // Static files
      let reqPath = decodeURIComponent(url.pathname);
      if (reqPath.startsWith("/aws-quest")) {
        reqPath = reqPath.slice("/aws-quest".length);
      }
      if (reqPath === "" || reqPath === "/") {
        reqPath = "/index.html";
      }

      const filePath = path.normalize(path.join(staticRoot, reqPath));
      if (!filePath.startsWith(staticRoot)) {
        res.writeHead(403, securityHeaders());
        res.end("Forbidden");
        return;
      }

      if (existsSync(filePath) && statSync(filePath).isFile()) {
        serveFile(res, filePath);
      } else {
        serveFile(res, path.join(staticRoot, "index.html"));
      }
    } catch (err) {
      console.error(err);
      res.writeHead(500, securityHeaders());
      res.end("Error interno");
    }
  });

  const port = Number(env.PORT || 8092);
  const host = env.HOST || "0.0.0.0";
  server.listen(port, host, () => {
    console.log(`AWS Quest escuchando en http://${host}:${port}`);
  });

  return server;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createGameServer().catch((err) => {
    console.error("Fallo al arrancar AWS Quest:", err);
    process.exit(1);
  });
}
