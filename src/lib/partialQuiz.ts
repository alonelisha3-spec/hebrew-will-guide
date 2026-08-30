import { describeAnswers, type Question } from "./questions";
import { getSessionId } from "./tracking";
import { getUtmData } from "./utm";

const PARTIAL_ENDPOINT = "/api/quiz-partial";

/** Fingerprint of the last payload sent, so tab-switching doesn't re-post the same state */
let lastSentFingerprint = "";
/** Set once the quiz is completed — a finished quiz is a lead, not an abandonment */
let quizCompleted = false;

export function markQuizCompleted(): void {
  quizCompleted = true;
}

export function resetPartialQuizState(): void {
  lastSentFingerprint = "";
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

  // Only re-send when the visitor has actually told us something new
  const fingerprint = `${track}:${answeredCount}:${stepIndex}`;
  if (fingerprint === lastSentFingerprint) return;
  lastSentFingerprint = fingerprint;

  const payload = {
    sessionId: getSessionId(),
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
