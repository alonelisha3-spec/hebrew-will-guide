import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { Questionnaire } from "@/components/Questionnaire";
import { LeadCapture } from "@/components/LeadCapture";
import { ResultPage } from "@/components/ResultPage";
import { calculateResults, type ResultData } from "@/lib/resultsEngine";
import { toast } from "sonner";

type AppStep = "landing" | "questionnaire" | "lead" | "results";

export default function Index() {
  const [step, setStep] = useState<AppStep>("landing");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ResultData | null>(null);
  const [leadInfo, setLeadInfo] = useState<{ name: string; phone: string; email?: string }>({
    name: "",
    phone: "",
  });

  function handleQuestionnaireComplete(ans: Record<string, string>) {
    setAnswers(ans);
    setStep("lead");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleLeadSubmit(info: { name: string; phone: string; email?: string }) {
    setLeadInfo(info);
    const res = calculateResults(answers);
    setResult(res);
    setStep("results");
    toast.success("הפרטים נקלטו בהצלחה. ניתן לעיין בתוצאה כעת.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (step === "questionnaire") {
    return <Questionnaire onComplete={handleQuestionnaireComplete} />;
  }

  if (step === "lead") {
    return <LeadCapture answers={answers} onSubmit={handleLeadSubmit} />;
  }

  if (step === "results" && result) {
    return (
      <ResultPage
        result={result}
        leadEmail={leadInfo.email}
        leadName={leadInfo.name}
        leadPhone={leadInfo.phone}
      />
    );
  }

  return (
    <LandingPage
      onStart={() => {
        setStep("questionnaire");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    />
  );
}
