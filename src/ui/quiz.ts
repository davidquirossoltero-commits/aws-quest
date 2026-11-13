import { checkNewAchievements } from "../engine/achievements";
import { CLF_QUIZ_QUESTIONS, type QuizQuestion } from "../engine/quizData";
import type { GameState } from "../engine/types";
import { createConfetti } from "./confetti";

export interface QuizController {
  open: () => void;
  close: () => void;
}

export function initQuiz(
  state: GameState,
  onSave: (state: GameState) => void,
  onUpdateHeader: () => void,
  toast: (msg: string, icon?: string) => void
): QuizController {
  const overlay = document.querySelector("#quizOverlay") as HTMLElement;
  const closeBtn = document.querySelector("#closeQuizBtn") as HTMLButtonElement;
  const questionNumberEl = document.querySelector("#quizNum") as HTMLElement;
  const domainBadgeEl = document.querySelector("#quizDomain") as HTMLElement;
  const questionTextEl = document.querySelector("#quizQuestionText") as HTMLElement;
  const optionsContainerEl = document.querySelector("#quizOptions") as HTMLElement;
  const submitBtn = document.querySelector("#quizSubmitBtn") as HTMLButtonElement;
  const nextBtn = document.querySelector("#quizNextBtn") as HTMLButtonElement;
  const rationaleBox = document.querySelector("#quizRationale") as HTMLElement;
  const progressBar = document.querySelector("#quizProgressBar") as HTMLElement;
  const scoreBadge = document.querySelector("#quizScoreBadge") as HTMLElement;
  const resultsView = document.querySelector("#quizResultsView") as HTMLElement;
  const questionView = document.querySelector("#quizQuestionView") as HTMLElement;
  const restartBtn = document.querySelector("#quizRestartBtn") as HTMLButtonElement;
  const backToMissionsBtn = document.querySelector("#quizBackBtn") as HTMLButtonElement;
  const confettiCanvas = document.querySelector("#quizConfetti") as HTMLCanvasElement;

  const confetti = createConfetti(confettiCanvas);

  let currentIdx = 0;
  let selectedOption: number | null = null;
  let answered = false;

  // Initialize quiz state if not present
  state.quiz = state.quiz || { score: 0, passed: false, answers: {} };

  function renderQuestion(): void {
    const q: QuizQuestion = CLF_QUIZ_QUESTIONS[currentIdx];
    questionView.hidden = false;
    resultsView.hidden = true;
    rationaleBox.hidden = true;
    submitBtn.hidden = false;
    submitBtn.disabled = true;
    nextBtn.hidden = true;
    selectedOption = null;
    answered = false;

    questionNumberEl.textContent = `Pregunta ${currentIdx + 1} de ${CLF_QUIZ_QUESTIONS.length}`;
    domainBadgeEl.textContent = q.domainName;
    questionTextEl.textContent = q.question;

    const progressPct = Math.round(((currentIdx) / CLF_QUIZ_QUESTIONS.length) * 100);
    progressBar.style.width = `${progressPct}%`;
    scoreBadge.textContent = `${calculateCurrentScore()} pts`;

    // Check if previously answered
    const prevAnswer = state.quiz?.answers[q.id];

    optionsContainerEl.innerHTML = q.options
      .map((opt, idx) => {
        const letters = ["A", "B", "C", "D"];
        return `
          <button class="quiz-option" data-idx="${idx}" type="button">
            <span class="quiz-letter">${letters[idx]}</span>
            <span class="quiz-text">${opt}</span>
          </button>
        `;
      })
      .join("");

    const buttons = optionsContainerEl.querySelectorAll<HTMLButtonElement>(".quiz-option");

    buttons.forEach((btn) => {
      btn.onclick = () => {
        if (answered) return;
        buttons.forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedOption = Number(btn.getAttribute("data-idx"));
        submitBtn.disabled = false;
      };
    });

    if (prevAnswer !== undefined) {
      // Auto-display past answer
      selectedOption = prevAnswer.selected;
      const chosenBtn = buttons[selectedOption];
      if (chosenBtn) chosenBtn.classList.add("selected");
      evaluateAnswer(false);
    }
  }

  function evaluateAnswer(isLiveAction = true): void {
    if (selectedOption === null) return;
    answered = true;
    const q: QuizQuestion = CLF_QUIZ_QUESTIONS[currentIdx];
    const isCorrect = selectedOption === q.correctIndex;
    const buttons = optionsContainerEl.querySelectorAll<HTMLButtonElement>(".quiz-option");

    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctIndex) {
        btn.classList.add("correct");
      } else if (idx === selectedOption && !isCorrect) {
        btn.classList.add("incorrect");
      }
    });

    // Save answer
    state.quiz = state.quiz || { score: 0, passed: false, answers: {} };
    const firstTimeAnswered = state.quiz.answers[q.id] === undefined;
    state.quiz.answers[q.id] = { selected: selectedOption, correct: isCorrect };

    if (isLiveAction && firstTimeAnswered && isCorrect) {
      state.xp += 15;
      state.coins += 5;
      toast("+15 XP por respuesta correcta en el test", "🎓");
    }

    // Show rationale
    rationaleBox.hidden = false;
    rationaleBox.className = `quiz-rationale ${isCorrect ? "ok" : "bad"}`;
    rationaleBox.innerHTML = `
      <div class="rationale-header">
        <b>${isCorrect ? "✔ ¡Respuesta Correcta!" : "✖ Respuesta Incorrecta"}</b>
      </div>
      <div class="rationale-body">${q.explanation}</div>
      <div class="rationale-tip"><b>💡 Tip de Examen CLF-C02:</b> ${q.examTip}</div>
    `;

    submitBtn.hidden = true;
    nextBtn.hidden = false;

    if (currentIdx === CLF_QUIZ_QUESTIONS.length - 1) {
      nextBtn.textContent = "Ver Resultados Finales 📊";
    } else {
      nextBtn.textContent = "Siguiente Pregunta ➜";
    }

    const newScore = calculateCurrentScore();
    state.quiz.score = newScore;
    if (newScore >= 700) {
      state.quiz.passed = true;
    }

    // Check achievements
    const newlyEarned = checkNewAchievements(state);
    for (const ach of newlyEarned) {
      state.ach = state.ach || [];
      state.ach.push(ach.id);
      toast(`¡Logro desbloqueado: ${ach.title}!`, ach.icon);
    }

    onSave(state);
    onUpdateHeader();
  }

  function calculateCurrentScore(): number {
    const answers = state.quiz?.answers || {};
    const totalQuestions = CLF_QUIZ_QUESTIONS.length;
    let correctCount = 0;
    for (const q of CLF_QUIZ_QUESTIONS) {
      if (answers[q.id]?.correct) {
        correctCount++;
      }
    }
    // Official AWS scaled score: 100 to 1000 points
    return Math.round((correctCount / totalQuestions) * 900 + 100);
  }

  function showFinalResults(): void {
    questionView.hidden = true;
    resultsView.hidden = false;
    progressBar.style.width = "100%";

    const answers = state.quiz?.answers || {};
    let correctTotal = 0;

    // Breakdown by domain
    const domainStats: Record<number, { name: string; total: number; correct: number }> = {
      1: { name: "Dominio 1: Conceptos Cloud (24%)", total: 0, correct: 0 },
      2: { name: "Dominio 2: Seguridad & IAM (30%)", total: 0, correct: 0 },
      3: { name: "Dominio 3: Tecnología & Servicios (34%)", total: 0, correct: 0 },
      4: { name: "Dominio 4: Costes & Gobernanza (12%)", total: 0, correct: 0 },
    };

    for (const q of CLF_QUIZ_QUESTIONS) {
      const d = domainStats[q.domainId];
      if (d) {
        d.total++;
        if (answers[q.id]?.correct) {
          d.correct++;
          correctTotal++;
        }
      }
    }

    const score = calculateCurrentScore();
    const passed = score >= 700; // 700/1000 is official passing score
    state.quiz = state.quiz || { score: 0, passed: false, answers: {} };
    state.quiz.score = score;
    state.quiz.passed = passed;

    if (passed) {
      confetti.burst(80);
    }

    resultsView.innerHTML = `
      <div class="results-card">
        <div class="results-badge ${passed ? "pass" : "fail"}">
          ${passed ? "🏆 APTO / CERTIFICADO APROBADO" : "⚠️ NO APTO (REQUERIDO: 700+)"}
        </div>
        <h2>${score} / 1000 Puntos</h2>
        <p class="reasons">Has acertado <b>${correctTotal}</b> de <b>${CLF_QUIZ_QUESTIONS.length}</b> preguntas del examen oficial CLF-C02.</p>
        
        <div class="domain-breakdown">
          <h3>Rendimiento por Dominio Oficial de AWS</h3>
          ${Object.values(domainStats)
            .map((ds) => {
              const pct = Math.round((ds.correct / ds.total) * 100);
              return `
                <div class="domain-row">
                  <div class="d-info"><span>${ds.name}</span><b>${ds.correct}/${ds.total} (${pct}%)</b></div>
                  <div class="d-bar"><div style="width:${pct}%;background:${pct >= 70 ? "var(--ok)" : "var(--bad)"}"></div></div>
                </div>
              `;
            })
            .join("")}
        </div>

        <div class="modal-buttons" style="margin-top:24px;display:flex;gap:12px;justify-content:center;">
          <button class="b b-check" id="resRestartBtn" type="button">🔄 Repetir Simulador</button>
          <button class="b b-run" id="resCloseBtn" type="button">Volver a las Misiones</button>
        </div>
      </div>
    `;

    const resRestartBtn = resultsView.querySelector("#resRestartBtn") as HTMLButtonElement;
    const resCloseBtn = resultsView.querySelector("#resCloseBtn") as HTMLButtonElement;

    if (resRestartBtn) {
      resRestartBtn.onclick = () => {
        if (confirm("¿Deseas reiniciar tus respuestas del test para practicar desde el principio?")) {
          state.quiz = { score: 0, passed: false, answers: {} };
          onSave(state);
          currentIdx = 0;
          renderQuestion();
        }
      };
    }

    if (resCloseBtn) {
      resCloseBtn.onclick = () => {
        overlay.classList.remove("show");
      };
    }
  }

  submitBtn.onclick = () => evaluateAnswer(true);

  nextBtn.onclick = () => {
    if (currentIdx < CLF_QUIZ_QUESTIONS.length - 1) {
      currentIdx++;
      renderQuestion();
    } else {
      showFinalResults();
    }
  };

  restartBtn.onclick = () => {
    if (confirm("¿Quieres reiniciar el cuestionario de examen?")) {
      state.quiz = { score: 0, passed: false, answers: {} };
      onSave(state);
      currentIdx = 0;
      renderQuestion();
    }
  };

  backToMissionsBtn.onclick = () => {
    overlay.classList.remove("show");
  };

  closeBtn.onclick = () => {
    overlay.classList.remove("show");
  };

  return {
    open: () => {
      overlay.classList.add("show");
      currentIdx = 0;
      renderQuestion();
    },
    close: () => {
      overlay.classList.remove("show");
    },
  };
}
