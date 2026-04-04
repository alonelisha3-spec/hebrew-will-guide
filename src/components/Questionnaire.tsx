import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import type { Question } from "@/lib/questions";

interface Props {
  questions: Question[];
  onComplete: (answers: Record<string, string>) => void;
}

export function Questionnaire({ questions: questionList, onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeQuestions = questionList.filter(
    (q) => !q.condition || q.condition(answers)
  );

  const question = activeQuestions[currentIndex];
  const totalSteps = activeQuestions.length;
  const progress = totalSteps > 0 ? ((currentIndex + 1) / totalSteps) * 100 : 0;

  useEffect(() => {
    if (currentIndex >= activeQuestions.length && activeQuestions.length > 0) {
      setCurrentIndex(activeQuestions.length - 1);
    }
  }, [activeQuestions.length, currentIndex]);

  if (!question) return null;

  const currentAnswer = answers[question.id] || "";

  function selectOption(option: string) {
    setAnswers({ ...answers, [question.id]: option });
  }

  function handleTextSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentAnswer.trim() && !question.optional) return;
    advance(answers);
  }

  function advance(currentAnswers: Record<string, string>) {
    const nextActive = questionList.filter(
      (q) => !q.condition || q.condition(currentAnswers)
    );
    const nextIdx = currentIndex + 1;
    if (nextIdx < nextActive.length) {
      setCurrentIndex(nextIdx);
    } else {
      onComplete(currentAnswers);
    }
  }

  function goBack() {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }

  function goNext() {
    if (!currentAnswer.trim() && !question.optional) return;
    advance(answers);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Progress */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border z-10">
        <div className="container py-4 px-4 md:px-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>שלב {currentIndex + 1} מתוך {totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-xl" key={question.id}>
          <p className="text-xs text-muted-foreground text-center mb-4 animate-slide-up">
            ענה/י בפשטות — אין צורך בידע משפטי
          </p>

          <h2
            className="text-xl md:text-2xl font-bold text-center mb-3 text-foreground animate-slide-up"
            style={{ lineHeight: 1.5 }}
          >
            {question.text}
          </h2>

          {question.explanation && (
            <p className="text-sm text-muted-foreground text-center mb-10 animate-slide-up" style={{ animationDelay: "40ms", animationFillMode: "backwards" }}>
              {question.explanation}
            </p>
          )}
          {!question.explanation && <div className="mb-10" />}

          {question.type === "select" && question.options ? (
            <div className="space-y-3">
              {question.options.map((option, i) => (
                <button
                  key={option}
                  onClick={() => selectOption(option)}
                  className={`w-full text-right rounded-lg border px-5 py-4 text-sm md:text-base font-medium transition-all duration-200 active:scale-[0.98] animate-slide-up ${
                    currentAnswer === option
                      ? "border-primary bg-primary/10 shadow-sm text-foreground"
                      : "border-border bg-card hover:border-primary/40 hover:shadow-sm text-foreground"
                  }`}
                  style={{
                    animationDelay: `${80 + i * 60}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  {option}
                </button>
              ))}

              <button
                onClick={goNext}
                disabled={!currentAnswer.trim()}
                className="w-full rounded-lg bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:brightness-110 active:scale-[0.97] disabled:opacity-40 mt-4"
              >
                המשך
              </button>
            </div>
          ) : (
            <form onSubmit={handleTextSubmit} className="space-y-4 animate-slide-up" style={{ animationDelay: "80ms", animationFillMode: "backwards" }}>
              <input
                type="text"
                value={currentAnswer}
                onChange={(e) =>
                  setAnswers({ ...answers, [question.id]: e.target.value })
                }
                placeholder={question.placeholder || ""}
                className="w-full rounded-lg border border-border bg-card px-5 py-4 text-sm md:text-base text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/50"
                autoFocus
                maxLength={300}
              />
              <button
                type="submit"
                disabled={!currentAnswer.trim()}
                className="w-full rounded-lg bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:brightness-110 active:scale-[0.97] disabled:opacity-40"
              >
                המשך
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-border bg-white">
        <div className="container py-4 px-4 md:px-6 flex justify-between items-center">
          <button
            onClick={goBack}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה
          </button>
          <span className="text-xs text-muted-foreground/60 max-w-sm text-center leading-relaxed">
            התהליך לוקח פחות מ-2 דקות
          </span>
        </div>
      </div>
    </div>
  );
}
