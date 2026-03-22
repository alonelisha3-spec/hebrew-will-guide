import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LandingPage } from "@/components/LandingPage";
import { Questionnaire } from "@/components/Questionnaire";
import { PreviewPage } from "@/components/PreviewPage";
import { LeadCapture } from "@/components/LeadCapture";
import { ResultPage } from "@/components/ResultPage";
import { noWillQuestions, existingWillQuestions } from "@/lib/questions";
import {
  generateWillPreview,
  generateFullWillDraft,
  generateExistingWillReview,
} from "@/lib/willDraftEngine";
import { toast } from "sonner";

type AppStep = "landing" | "questionnaire" | "preview" | "lead" | "results";
type Track = "noWill" | "existingWill";

export default function Index() {
  const [step, setStep] = useState<AppStep>("landing");
  const [track, setTrack] = useState<Track>("noWill");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [intent, setIntent] = useState<"full" | "email" | "callback">("full");
  const [leadInfo, setLeadInfo] = useState({ name: "", phone: "", email: "" });

  // Preview data
  const [previewType, setPreviewType] = useState("");
  const [previewPoints, setPreviewPoints] = useState<string[]>([]);

  // Result data
  const [draftData, setDraftData] = useState<{ willType: string; fullDraft: string } | null>(null);
  const [reviewData, setReviewData] = useState<{
    willType: string;
    riskLevel: string;
    issues: string[];
    headline: string;
  } | null>(null);

  function startTrack(t: Track) {
    setTrack(t);
    setStep("questionnaire");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleQuestionnaireComplete(ans: Record<string, string>) {
    setAnswers(ans);

    if (track === "noWill") {
      const preview = generateWillPreview(ans);
      setPreviewType(preview.willType);
      setPreviewPoints(preview.keyPoints);
    } else {
      const review = generateExistingWillReview(ans);
      setPreviewType(review.willType);
      setPreviewPoints(review.issues.slice(0, 3));
    }

    setStep("preview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePreviewAction(action: "full" | "email" | "callback") {
    setIntent(action);
    setStep("lead");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleLeadSubmit(info: { name: string; phone: string; email?: string }) {
    setLeadInfo({ name: info.name, phone: info.phone, email: info.email || "" });

    if (track === "noWill") {
      const draft = generateFullWillDraft(answers);
      setDraftData({ willType: draft.willType, fullDraft: draft.fullDraft });
    } else {
      const review = generateExistingWillReview(answers);
      setReviewData(review);
    }

    setStep("results");
    toast.success("הפרטים נקלטו בהצלחה");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const showHeaderFooter = step === "landing" || step === "results";

  return (
    <>
      {showHeaderFooter && <Header />}

      {step === "landing" && (
        <LandingPage
          onNoWill={() => startTrack("noWill")}
          onExistingWill={() => startTrack("existingWill")}
        />
      )}

      {step === "questionnaire" && (
        <Questionnaire
          questions={track === "noWill" ? noWillQuestions : existingWillQuestions}
          onComplete={handleQuestionnaireComplete}
        />
      )}

      {step === "preview" && (
        <PreviewPage
          willType={previewType}
          keyPoints={previewPoints}
          onShowFull={() => handlePreviewAction("full")}
          onSendEmail={() => handlePreviewAction("email")}
          onCallback={() => handlePreviewAction("callback")}
        />
      )}

      {step === "lead" && (
        <LeadCapture
          answers={answers}
          intent={intent}
          willDraftData={track === "noWill" ? { willType: previewType, fullDraft: generateFullWillDraft(answers).fullDraft } : undefined}
          onSubmit={handleLeadSubmit}
        />
      )}

      {step === "results" && track === "noWill" && draftData && (
        <ResultPage
          mode="draft"
          willType={draftData.willType}
          fullDraft={draftData.fullDraft}
          leadName={leadInfo.name}
          leadPhone={leadInfo.phone}
          leadEmail={leadInfo.email}
        />
      )}

      {step === "results" && track === "existingWill" && reviewData && (
        <ResultPage
          mode="review"
          willType={reviewData.willType}
          reviewHeadline={reviewData.headline}
          reviewIssues={reviewData.issues}
          reviewRiskLevel={reviewData.riskLevel}
          leadName={leadInfo.name}
          leadPhone={leadInfo.phone}
          leadEmail={leadInfo.email}
        />
      )}

      {showHeaderFooter && <Footer />}
    </>
  );
}
