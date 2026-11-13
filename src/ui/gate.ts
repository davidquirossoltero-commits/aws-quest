import { setActiveUser } from "../engine/progress";
import type { GameState } from "../engine/types";
import { startApp } from "./app";

interface RankRow {
  username: string;
  name: string;
  xp: number;
  stars: number;
  levels: number;
  rank: string;
  icon?: string;
}

interface SessionUser {
  username: string;
  name: string;
}

function apiUrl(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

async function api(path: string, options: RequestInit = {}): Promise<{ ok: boolean; status: number; data: Record<string, unknown> }> {
  const response = await fetch(apiUrl(path), {
    credentials: "same-origin",
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers ?? {}) },
  });
  const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  return { ok: response.ok, status: response.status, data };
}

function must<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector(selector);
  if (!(element instanceof HTMLElement)) throw new Error(`Falta el elemento: ${selector}`);
  return element as T;
}

export function startGate(): void {
  const gate = must<HTMLElement>("#gate");
  const game = must<HTMLElement>("#game");
  const loginPanel = must<HTMLElement>("#loginPanel");
  const lobby = must<HTMLElement>("#lobby");
  const loginForm = must<HTMLFormElement>("#loginForm");
  const loginUser = must<HTMLInputElement>("#loginUser");
  const loginPass = must<HTMLInputElement>("#loginPass");
  const loginError = must<HTMLElement>("#loginError");
  const ranking = must<HTMLElement>("#ranking");
  const lobbyHello = must<HTMLElement>("#lobbyHello");
  const logoutBtn = must<HTMLButtonElement>("#logoutBtn");

  let me: SessionUser | null = null;
  let started = false;
  let latest: GameState | null = null;
  let timer = 0;

  function showError(message: string): void {
    loginError.hidden = false;
    loginError.textContent = message;
  }

  async function push(state: GameState): Promise<void> {
    const result = await api("/api/progress", { method: "PUT", body: JSON.stringify({ state }) });
    if (result.status === 401) showLogin();
  }

  function queueSave(state: GameState): void {
    latest = state;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (latest) void push(latest);
    }, 300);
  }

  async function flush(): Promise<void> {
    window.clearTimeout(timer);
    if (latest) await push(latest);
  }

  function showLogin(): void {
    if (import.meta.env.BASE_URL !== "/") {
      const next = `${window.location.pathname}${window.location.search}`;
      window.location.assign(`/?next=${encodeURIComponent(next)}`);
      return;
    }
    me = null;
    gate.hidden = false;
    game.hidden = true;
    loginPanel.hidden = false;
    lobby.hidden = true;
  }

  async function showLobby(): Promise<void> {
    await flush();
    const result = await api("/api/ranking");
    if (!result.ok) {
      showLogin();
      return;
    }
    me = { username: String(result.data.me), name: "" };
    const rows = (result.data.rows as RankRow[]) ?? [];
    const mine = rows.find((row) => row.username === me?.username);
    if (mine) me.name = mine.name;
    gate.hidden = false;
    game.hidden = true;
    loginPanel.hidden = true;
    lobby.hidden = false;
    lobbyHello.textContent = mine ? `¡Hola, ${mine.name}! Este es el ranking de AWS Quest en el servidor.` : "";
    ranking.innerHTML = rows
      .map((row, index) => {
        const own = row.username === me?.username;
        const icon = row.icon || "☁️";
        return `<article class="rank-row">
          <span class="pos">${index + 1}</span>
          <div class="who">
            <b>${row.name}</b>
            <small>${icon} ${row.rank} · ${row.levels} niveles superados · ${row.stars} estrellas</small>
          </div>
          <span class="xp">${row.xp} XP</span>
          <button class="b b-check" type="button" data-play="${row.username}" ${own ? "" : "disabled"} title="${
            own ? "Entrar en tu partida de AWS Quest" : "Solo puede jugar quien haya iniciado sesión con esta cuenta"
          }">${own ? "Jugar" : "Su partida"}</button>
        </article>`;
      })
      .join("");

    ranking.querySelectorAll("[data-play]").forEach((button) => {
      if (!(button instanceof HTMLButtonElement) || button.disabled) return;
      button.onclick = () => {
        void enterGame();
      };
    });
  }

  async function enterGame(): Promise<void> {
    if (!me) return;
    const result = await api("/api/progress");
    if (!result.ok) {
      showLogin();
      return;
    }
    setActiveUser(me.username);
    gate.hidden = true;
    game.hidden = false;
    if (!started) {
      started = true;
      startApp({
        initial: result.data.state as GameState,
        onSave: queueSave,
        onHall: () => void showLobby(),
      });
    }
  }

  loginForm.onsubmit = (event) => {
    event.preventDefault();
    loginError.hidden = true;
    void (async () => {
      const result = await api("/api/login", {
        method: "POST",
        body: JSON.stringify({ username: loginUser.value, password: loginPass.value }),
      });
      if (!result.ok) {
        showError(String(result.data.error ?? "No se ha podido entrar."));
        return;
      }
      loginPass.value = "";
      await showLobby();
    })();
  };

  logoutBtn.onclick = () => {
    void (async () => {
      await flush();
      if (import.meta.env.BASE_URL !== "/") {
        window.location.assign("/api/logout");
        return;
      }
      await api("/api/logout", { method: "POST", body: "{}" });
      showLogin();
    })();
  };

  const portalLink = document.querySelector("#portalLink");
  if (portalLink instanceof HTMLElement && import.meta.env.BASE_URL !== "/") portalLink.hidden = false;
  const lobbyPortalLink = document.querySelector("#lobbyPortalLink");
  if (lobbyPortalLink instanceof HTMLElement && import.meta.env.BASE_URL !== "/") lobbyPortalLink.hidden = false;

  void (async () => {
    const result = await api("/api/me");
    if (result.ok) await showLobby();
    else showLogin();
  })();
}
