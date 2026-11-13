import { ACHIEVEMENTS, checkNewAchievements } from "../engine/achievements";
import { parseAwsCommand } from "../engine/cliParser";
import { LEVELS, WORLDS } from "../engine/levels";
import { doneCount, isUnlocked, starString, totalStars } from "../engine/progress";
import { getNextRank, getRank } from "../engine/ranks";
import type { GameState, Level } from "../engine/types";
import { createConfetti } from "./confetti";

export interface AppOptions {
  initial: GameState;
  onSave: (state: GameState) => void;
  onHall: () => void;
}

function must<T extends HTMLElement>(selector: string): T {
  const el = document.querySelector(selector);
  if (!(el instanceof HTMLElement)) throw new Error(`Elemento no encontrado: ${selector}`);
  return el as T;
}

export function startApp({ initial, onSave, onHall }: AppOptions): void {
  let state = initial;
  let currentIdx = Math.min(Math.max(0, state.current || 0), LEVELS.length - 1);
  if (!isUnlocked(state, currentIdx)) currentIdx = 0;

  // Header elements
  const rankNameEl = must<HTMLElement>("#rankName");
  const xpTxtEl = must<HTMLElement>("#xpTxt");
  const xpBarEl = must<HTMLElement>("#xpBar");
  const coinsEl = must<HTMLElement>("#coins");
  const starsEl = must<HTMLElement>("#stars");
  const achCountEl = must<HTMLElement>("#achCount");
  const hallBtn = must<HTMLButtonElement>("#hallBtn");
  const resetBtn = must<HTMLButtonElement>("#resetBtn");
  const mapBtn = must<HTMLButtonElement>("#mapBtn");
  const mapAside = must<HTMLElement>("#map");

  // Lesson elements
  const lvlCertEl = must<HTMLElement>("#lvlCert");
  const lvlWorldEl = must<HTMLElement>("#lvlWorld");
  const lvlNumEl = must<HTMLElement>("#lvlNum");
  const lvlTitleEl = must<HTMLElement>("#lvlTitle");
  const lvlStoryEl = must<HTMLElement>("#lvlStory");
  const lvlExplainEl = must<HTMLElement>("#lvlExplain");
  const lvlExamTipEl = must<HTMLElement>("#lvlExamTip");
  const lvlExampleEl = must<HTMLElement>("#lvlExample");
  const lvlMissionEl = must<HTMLElement>("#lvlMission");
  const lvlRewardsEl = must<HTMLElement>("#lvlRewards");
  const hintBoxEl = must<HTMLElement>("#hintBox");

  // Editor / Terminal elements
  const codeInput = must<HTMLTextAreaElement>("#code");
  const runBtn = must<HTMLButtonElement>("#runBtn");
  const checkBtn = must<HTMLButtonElement>("#checkBtn");
  const hintBtn = must<HTMLButtonElement>("#hintBtn");
  const resetCodeBtn = must<HTMLButtonElement>("#resetCodeBtn");
  const nextBtn = must<HTMLButtonElement>("#nextBtn");
  const resultBox = must<HTMLElement>("#result");
  const consoleBox = must<HTMLElement>("#console");

  // Overlays
  const winOverlay = must<HTMLElement>("#winOverlay");
  const winModal = must<HTMLElement>("#winModal");
  const confettiCanvas = must<HTMLCanvasElement>("#confetti");
  const achOverlay = must<HTMLElement>("#achOverlay");
  const achSummary = must<HTMLElement>("#achSummary");
  const achGrid = must<HTMLElement>("#achGrid");
  const closeAchBtn = must<HTMLButtonElement>("#closeAch");
  const achBtn = must<HTMLElement>("#achBtn");
  const toasts = must<HTMLElement>("#toasts");

  const confetti = createConfetti(confettiCanvas);

  function toast(msg: string, icon = "✨"): void {
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
    toasts.appendChild(el);
    setTimeout(() => {
      el.classList.add("out");
      setTimeout(() => el.remove(), 400);
    }, 3200);
  }

  function updateHeader(): void {
    const rank = getRank(state.xp);
    const nextRank = getNextRank(state.xp);
    rankNameEl.textContent = `${rank.badge} ${rank.name}`;
    coinsEl.textContent = String(state.coins);
    starsEl.textContent = String(totalStars(state));
    achCountEl.textContent = `${state.ach?.length || 0}/${ACHIEVEMENTS.length}`;

    if (nextRank) {
      const currentLevelMin = rank.minXp;
      const pct = Math.min(100, Math.max(0, Math.floor(((state.xp - currentLevelMin) / (nextRank.minXp - currentLevelMin)) * 100)));
      xpTxtEl.textContent = `${state.xp} / ${nextRank.minXp} XP`;
      xpBarEl.style.width = `${pct}%`;
    } else {
      xpTxtEl.textContent = `${state.xp} XP (Máx)`;
      xpBarEl.style.width = "100%";
    }
  }

  function renderMap(): void {
    mapAside.innerHTML = WORLDS.map((world) => {
      const worldLevels = LEVELS.filter((lvl) => lvl.worldId === world.id);
      const levelHtml = worldLevels
        .map((lvl) => {
          const idx = lvl.number - 1;
          const unlocked = isUnlocked(state, idx);
          const done = Boolean(state.levels[String(idx)]);
          const starsCount = state.levels[String(idx)]?.stars || 0;
          const active = idx === currentIdx;

          const classes = ["node"];
          if (active) classes.push("active");
          if (done) classes.push("done");
          if (!unlocked) classes.push("locked");

          return `
            <button class="${classes.join(" ")}" data-idx="${idx}" ${unlocked ? "" : "disabled"} type="button">
              <span class="num">${done ? "✓" : lvl.number}</span>
              <div class="t">
                <div>${lvl.title}</div>
                <div class="st">${done ? starString(starsCount) : `<small style="color:var(--muted)">${lvl.service}</small>`}</div>
              </div>
            </button>
          `;
        })
        .join("");

      return `
        <div class="world">
          <h3><span>${world.icon} ${world.name}</span></h3>
          ${levelHtml}
        </div>
      `;
    }).join("");

    mapAside.querySelectorAll("[data-idx]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-idx"));
        if (!isNaN(idx) && isUnlocked(state, idx)) {
          loadLevel(idx);
          mapAside.classList.remove("open");
          mapBtn.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  function loadLevel(idx: number): void {
    currentIdx = idx;
    state.current = idx;
    onSave(state);

    const level = LEVELS[idx];
    const world = WORLDS.find((w) => w.id === level.worldId);

    lvlCertEl.textContent = level.certification;
    lvlWorldEl.textContent = world?.name ?? "Dominio";
    lvlNumEl.textContent = `Nivel ${level.number} de ${LEVELS.length}`;
    lvlTitleEl.textContent = level.title;
    lvlStoryEl.textContent = level.story;
    lvlExplainEl.textContent = level.explanation;
    lvlExamTipEl.innerHTML = `<b>💡 Tip de Examen CLF-C02:</b> ${level.examTip}`;
    lvlExampleEl.textContent = level.example;
    lvlMissionEl.innerHTML = `<b>Misión:</b> ${level.mission}`;
    lvlRewardsEl.innerHTML = `<span>+${level.rewards.xp} XP</span> <span>+${level.rewards.coins} Créditos</span>`;

    hintBoxEl.style.display = "none";
    hintBoxEl.textContent = `💡 ${level.hint}`;

    const savedCmd = state.commands?.[String(idx)];
    codeInput.value = savedCmd || level.starterCommand;

    resultBox.style.display = "none";
    resultBox.className = "result";
    nextBtn.style.display = "none";
    consoleBox.innerHTML = `<span class="muted">Escribe tu comando AWS CLI arriba y pulsa "▶ Ejecutar" o "✔ Comprobar misión"...</span>`;

    updateHeader();
    renderMap();
  }

  function printConsole(text: string, isError = false): void {
    consoleBox.innerHTML = "";
    const pre = document.createElement("pre");
    pre.style.margin = "0";
    pre.style.whiteSpace = "pre-wrap";
    pre.style.color = isError ? "var(--bad)" : "var(--txt)";
    pre.textContent = text;
    consoleBox.appendChild(pre);
  }

  function handleRun(): void {
    const cmd = codeInput.value.trim();
    if (!cmd) {
      printConsole("Error: Introduce un comando de AWS CLI.", true);
      return;
    }

    const level = LEVELS[currentIdx];
    const parsed = parseAwsCommand(cmd);

    // Save user's current draft
    state.commands = state.commands || {};
    state.commands[String(currentIdx)] = cmd;
    onSave(state);

    if (parsed.program !== "aws") {
      printConsole(`bash: ${parsed.program || cmd}: orden no encontrada. Los comandos deben comenzar por 'aws'.`, true);
      return;
    }

    const res = level.validate(cmd);
    if (res.simulatedOutput) {
      printConsole(`$ ${cmd}\n\n${res.simulatedOutput}`);
    } else if (res.error) {
      printConsole(`$ ${cmd}\n\nAn error occurred (${res.error}): ${res.message}`, true);
    } else {
      printConsole(`$ ${cmd}\n\n[Comando ejecutado con código 0]`);
    }
  }

  function handleCheck(): void {
    const cmd = codeInput.value.trim();
    const level = LEVELS[currentIdx];
    const res = level.validate(cmd);

    state.commands = state.commands || {};
    state.commands[String(currentIdx)] = cmd;

    if (res.ok) {
      const alreadyDone = Boolean(state.levels[String(currentIdx)]);
      const starsEarned = res.stars;

      state.levels[String(currentIdx)] = {
        stars: starsEarned,
        noHint: hintBoxEl.style.display === "none",
        firstTry: !alreadyDone,
      };

      if (!alreadyDone) {
        state.xp += level.rewards.xp;
        state.coins += level.rewards.coins;
        state.streak = (state.streak || 0) + 1;
        if (state.streak > (state.bestStreak || 0)) {
          state.bestStreak = state.streak;
        }
      }

      // Check achievements
      const newlyEarned = checkNewAchievements(state);
      for (const ach of newlyEarned) {
        state.ach = state.ach || [];
        state.ach.push(ach.id);
        toast(`¡Logro desbloqueado: ${ach.title}!`, ach.icon);
      }

      onSave(state);
      updateHeader();
      renderMap();

      resultBox.style.display = "block";
      resultBox.className = "result ok";
      resultBox.innerHTML = `<b>✔ ¡Excelente trabajo!</b> <div>${res.message}</div>`;

      if (res.simulatedOutput) {
        printConsole(`$ ${cmd}\n\n${res.simulatedOutput}`);
      }

      if (currentIdx < LEVELS.length - 1) {
        nextBtn.style.display = "inline-flex";
      }

      showVictoryModal(level, starsEarned, !alreadyDone);
    } else {
      resultBox.style.display = "block";
      resultBox.className = "result bad";
      resultBox.innerHTML = `<b>✖ Revisa tu comando:</b> <div>${res.message}</div>`;
      printConsole(`Error de validación:\n${res.message}`, true);
    }
  }

  function showVictoryModal(level: Level, stars: number, isFirstTime: boolean): void {
    winModal.innerHTML = `
      <h2>¡Misión Cumplida!</h2>
      <div class="reasons">${level.title} completado con éxito.</div>
      <div class="big-stars">${starString(stars).split("").map((s) => `<span class="s ${s === "☆" ? "off" : ""}">${s}</span>`).join("")}</div>
      <div class="gain">
        <div>+${isFirstTime ? level.rewards.xp : 0} XP</div>
        <div>+${isFirstTime ? level.rewards.coins : 0} Créditos</div>
        <div>${doneCount(state)} / ${LEVELS.length} Niveles</div>
      </div>
      <div class="row">
        ${
          currentIdx < LEVELS.length - 1
            ? `<button class="b b-next" id="winNextBtn">Siguiente Nivel ➜</button>`
            : `<button class="b b-check" id="winNextBtn">¡Has completado AWS Cloud Practitioner! 🏆</button>`
        }
        <button class="ghost" id="winCloseBtn">Quedarme aquí</button>
      </div>
    `;

    winOverlay.classList.add("show");
    confetti.burst(60);

    const winNextBtn = winModal.querySelector("#winNextBtn");
    const winCloseBtn = winModal.querySelector("#winCloseBtn");

    if (winNextBtn) {
      winNextBtn.addEventListener("click", () => {
        winOverlay.classList.remove("show");
        if (currentIdx < LEVELS.length - 1) {
          loadLevel(currentIdx + 1);
        }
      });
    }

    if (winCloseBtn) {
      winCloseBtn.addEventListener("click", () => {
        winOverlay.classList.remove("show");
      });
    }
  }

  function showAchievementsModal(): void {
    const unlockedSet = new Set(state.ach || []);
    achSummary.textContent = `Has desbloqueado ${unlockedSet.size} de ${ACHIEVEMENTS.length} logros en AWS Quest.`;
    achGrid.innerHTML = ACHIEVEMENTS.map((ach) => {
      const unlocked = unlockedSet.has(ach.id);
      return `
        <div class="ach ${unlocked ? "" : "lock"}">
          <div class="i">${ach.icon}</div>
          <b>${ach.title}</b>
          <small>${ach.description}</small>
        </div>
      `;
    }).join("");
    achOverlay.classList.add("show");
  }

  // Event handlers
  runBtn.onclick = handleRun;
  checkBtn.onclick = handleCheck;

  hintBtn.onclick = () => {
    hintBoxEl.style.display = hintBoxEl.style.display === "block" ? "none" : "block";
  };

  resetCodeBtn.onclick = () => {
    const level = LEVELS[currentIdx];
    codeInput.value = level.starterCommand;
    state.commands = state.commands || {};
    state.commands[String(currentIdx)] = level.starterCommand;
    onSave(state);
  };

  nextBtn.onclick = () => {
    if (currentIdx < LEVELS.length - 1) {
      loadLevel(currentIdx + 1);
    }
  };

  hallBtn.onclick = onHall;

  resetBtn.onclick = () => {
    if (confirm("¿Estás seguro de que quieres reiniciar todo tu progreso en AWS Quest?")) {
      state.xp = 0;
      state.coins = 0;
      state.levels = {};
      state.ach = [];
      state.current = 0;
      state.streak = 0;
      state.bestStreak = 0;
      state.commands = {};
      onSave(state);
      loadLevel(0);
      toast("Progreso reiniciado correctamente.");
    }
  };

  achBtn.onclick = showAchievementsModal;
  closeAchBtn.onclick = () => achOverlay.classList.remove("show");

  mapBtn.onclick = () => {
    const isOpen = mapAside.classList.toggle("open");
    mapBtn.setAttribute("aria-expanded", String(isOpen));
  };

  // Keyboard shortcuts
  codeInput.onkeydown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (e.shiftKey) {
        handleCheck();
      } else {
        handleRun();
      }
    }
  };

  // Enable run and check buttons
  runBtn.disabled = false;
  checkBtn.disabled = false;

  // Initialize
  loadLevel(currentIdx);
}
