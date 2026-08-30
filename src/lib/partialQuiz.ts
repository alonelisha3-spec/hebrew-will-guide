import { describeAnswers, type Question } from "./questions";
import { getSessionId } from "./tracking";
import { getUtmData } from "./utm";

const PARTIAL_ENDPOINT = "/api/quiz-partial";

/**
 * sessionStorage key holding the session id we have already posted a partial for.
 * Deliberately not module state: the module is re-evaluated on every page load,
 * and a refresh mid-quiz would otherwise let the same session post a second row.
 * sessionStorage shares its lifetime with the session id itself (see getSessionId),
 * so the marker and the id it guards expire together.
 */
const SENT_SESSION_KEY = "partial_quiz_sent_session";

function hasSentForSession(sessionId: string): boolean {
  try {
    return sessionStorage.getItem(SENT_SESSION_KEY) === sessionId;
  } catch {
    return false; // storage blocked (private mode) — better a duplicate than a silent loss
  }
}

function markSentForSession(sessionId: string): void {
  try {
    sessionStorage.setItem(SENT_SESSION_KEY, sessionId);
  } catch {
    // best effort — never throw during unload
  }
}

/** Set once the quiz is completed — a finished quiz is a lead, not an abandonment */
let quizCompleted = false;

export function markQuizCompleted(): void {
  quizCompleted = true;
}

/**
 * Called when the visitor returns to the landing page to start over. The sent
 * marker is intentionally NOT cleared: one browser session is one abandonment
 * row, even if the visitor restarts the quiz in the same tab.
 */
export function resetPartialQuizState(): void {
  quizCompleted = false;
}

interface PartialArgs {
  track: "noWill" | "existingWill";
  questionList: Question[];
  answers: Record<string, string>;
  stepIndex: number;
  totalSteps: number;
}

/**
 * Fire a partial-answer snapshot when the visitor leaves mid-quiz.
 *
 * Uses sendBeacon: a normal fetch is killed when the document unloads, and
 * beforeunload does not fire reliably on mobile Safari, so the caller hooks
 * visibilitychange/pagehide instead. sendBeacon cannot set custom headers,
 * which is fine here — the endpoint is same-origin and applies the intake
 * secret server-side.
 */
export function sendPartialQuiz({ track, questionList, answers, stepIndex, totalSteps }: PartialArgs): void {
  if (quizCompleted) return;

  const answered = describeAnswers(questionList, answers);
  const answeredCount = Object.keys(answered).length;
  if (answeredCount === 0) return;

  // Which question was actually on screen when they left. A step number alone is
  // meaningless here: the two tracks differ and conditional questions make the
  // active list vary between 13 and 36 steps, so "step 6" is a different question
  // for every visitor. Derived from the same filter Questionnaire renders from,
  // so the id can never drift from the stepIndex sent alongside it.
  const activeQuestions = questionList.filter((q) => !q.condition || q.condition(answers));
  const currentQuestion = activeQuestions[stepIndex];

  // One abandonment, one row. Both visibilitychange and pagehide fire on a real
  // leave, and a visitor who hides the tab, comes back and leaves again would
  // post again — each landing as a separate partial row. Marked before the send,
  // not after, because sendBeacon is fire-and-forget and a second event can be
  // dispatched in the same task.
  const sessionId = getSessionId();
  if (hasSentForSession(sessionId)) return;
  markSentForSession(sessionId);

  const payload = {
    sessionId,
    track,
    stepIndex,
    stepNumber: stepIndex + 1,
    totalSteps,
    questionId: currentQuestion?.id ?? null,
    answeredCount,
    answers,
    answersDetailed: answered,
    attribution: getUtmData(),
    abandonedAt: new Date().toISOString(),
  };

  try {
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    if (navigator.sendBeacon?.(PARTIAL_ENDPOINT, blob)) return;
  } catch {
    // fall through to fetch
  }

  // Fallback for browsers without sendBeacon
  try {
    void fetch(PARTIAL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // best effort — never block or throw during unload
  }
}
