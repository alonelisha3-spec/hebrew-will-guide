import { useState } from "react";
import { questions } from "@/lib/questions";
import { ArrowRight } from "lucide-react";

interface Props {
  onComplete: (answers: Record<string, string>) => void;
}

export function Questionnaire({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = questions[step];
  const totalSteps = questions.length;
  const progress = ((step + 1) / totalSteps) * 100;
  const currentAnswer = answers[question.id];

  function selectOption(option: string) {
    const updated = { ...answers, [question.id]: option };
    setAnswers(updated);

    setTimeout(() => {
      if (step < totalSteps - 1) {
        setStep(step + 1);
      } else {
        onComplete(updated);
      }
    }, 300);
  }

  function goBack() {
    if (step > 0) setStep(step - 1);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border/50 z-10">
        <div className="container py-4 px-4 md:px-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>שאלה {step + 1} מתוך {totalSteps}</span>
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
        <div className="w-full max-w-xl" key={step}>
          <h2
            className="text-xl md:text-2xl font-bold text-center mb-10 animate-slide-up"
            style={{ lineHeight: 1.5 }}
          >
            {question.text}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={option}
                onClick={() => selectOption(option)}
                className={`w-full text-right rounded-lg border px-5 py-4 text-sm md:text-base font-medium transition-all duration-200 active:scale-[0.98] animate-slide-up ${
                  currentAnswer === option
                    ? "border-primary bg-primary/10 shadow-sm text-foreground"
                    : "border-border/60 bg-card hover:border-primary/40 hover:bg-card/80"
                }`}
                style={{
                  animationDelay: `${80 + i * 60}ms`,
                  animationFillMode: "backwards",
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-border/50 bg-background">
        <div className="container py-4 px-4 md:px-6 flex justify-between items-center">
          <button
            onClick={goBack}
            disabled={step === 0}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה
          </button>
          <span className="text-xs text-muted-foreground/60">
            בחרו תשובה כדי להמשיך
          </span>
        </div>
      </div>
    </div>
  );
}
