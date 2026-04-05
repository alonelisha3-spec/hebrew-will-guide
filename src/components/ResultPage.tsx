import { useEffect } from "react";
import { AlertTriangle, FileText, Users, Shield } from "lucide-react";
import { legalWarningText as legalWarning } from "@/lib/legalTexts";
import { trackEvent } from "@/lib/tracking";
import type { WillGap } from "@/lib/willGapsEngine";

interface Props {
  mode: "draft" | "review";
  willType: string;
  fullDraft?: string;
  reviewHeadline?: string;
  reviewIssues?: string[];
  reviewRiskLevel?: string;
  gaps?: WillGap[];
  leadName: string;
  leadPhone: string;
  leadEmail?: string;
}

const ALWAYS_SHOW_GAPS = [
  {
    icon: Users,
    text: "חסר מנגנון ליורשים חלופיים — מה קורה אם אחד היורשים לא יוכל לרשת?",
  },
  {
    icon: FileText,
    text: "ניסוח משפטי בסיסי שעלול להוביל לפרשנויות שונות בבית המשפט",
  },
  {
    icon: Shield,
    text: "אין מנגנון למניעת סכסוכים בין יורשים או להגנה על בן/בת הזוג",
  },
];

export function ResultPage({
  mode,
  willType,
  fullDraft,
  reviewHeadline,
  reviewIssues,
  reviewRiskLevel,
  gaps,
  leadName,
  leadPhone,
  leadEmail,
}: Props) {
  const extraGaps = gaps?.filter((g) => g.severity === "high").slice(0, 1) || [];
  const displayGapCount = ALWAYS_SHOW_GAPS.length + extraGaps.length;

  useEffect(() => {
    trackEvent("results_viewed", { metadata: { mode, willType } });
  }, []);

  function handleDownloadTxt() {
    if (!fullDraft) return;
    const blob = new Blob(["\uFEFF" + fullDraft], { type: "text/plain;charset=utf-8" });
    const fileName = `טיוטת_צוואה_${leadName.replace(/\s/g, "_")}.txt`;
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    // 1) Try Web Share API with file (best on mobile)
    if (isMobile && navigator.share) {
      const file = new File([blob], fileName, { type: "text/plain;charset=utf-8" });
      const canShare = navigator.canShare?.({ files: [file] });
      if (canShare) {
        navigator.share({ files: [file], title: fileName }).catch(() => {
          openBlobInNewTab(blob);
        });
        return;
      }
    }

    // 2) On desktop or non-share mobile: try <a download>
    if (!isMobile) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      return;
    }

    // 3) Mobile fallback: open in new tab so user can long-press to save
    openBlobInNewTab(blob);
  }

  function openBlobInNewTab(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const w = window.open(url, "_blank");
    if (!w) {
      // popup blocked — navigate current window
      window.location.href = url;
    }
  }




  return (
    <div className="min-h-screen py-6 md:py-14 bg-background">
      <div className="container max-w-2xl space-y-5 md:space-y-8 px-3 md:px-6">

        {/* ── Hero Section ── */}
        <div className="bg-card rounded-2xl border border-border shadow-md p-5 md:p-10 animate-slide-up text-center">
          <div className="gold-line mx-auto mb-4 md:mb-6" />
          <h1 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-foreground leading-snug md:leading-relaxed">
            הצוואה שלך טובה — אך המערכת זיהתה מספר חוסרים מהותיים
          </h1>
          <p className="text-xs md:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
            הטיוטה שבנית נותנת בסיס, אך כרגע אינה מלאה ואינה מגנה עליך באופן מלא
          </p>
        </div>

        {/* ── Download Section — FIRST on mobile for prominence ── */}
        {fullDraft && (
          <div
            className="bg-card rounded-2xl border-2 border-primary/30 shadow-md p-5 md:p-8 animate-slide-up text-center"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <div className="gold-line mx-auto mb-4 md:mb-5" />
            <h2 className="text-base md:text-xl font-bold mb-1.5 md:mb-2 text-foreground">
              📄 הטיוטה שלך מוכנה!
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 leading-relaxed max-w-md mx-auto">
              לחצ/י כדי להוריד או לשתף את הטיוטה
            </p>
            <button
              onClick={handleDownloadTxt}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-8 py-4 text-base md:text-sm font-bold text-primary-foreground shadow-lg hover:brightness-110 transition-all active:scale-[0.97]"
            >
              <FileText className="w-5 h-5 md:w-4 md:h-4" />
              הורד / שתף את הטיוטה
            </button>
          </div>
        )}

        {/* ── Gaps Section ── */}
        <div
          className="bg-card rounded-2xl border border-border shadow-sm p-4 md:p-8 animate-slide-up"
          style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
        >
          <div className="flex items-center gap-2 mb-4 md:mb-5">
            <AlertTriangle className="w-5 h-5 text-[hsl(var(--risk-high))]" />
            <h2 className="text-sm md:text-lg font-bold text-foreground">
              המערכת זיהתה {displayGapCount} חוסרים מהותיים:
            </h2>
          </div>
          <div className="space-y-3 md:space-y-4">
            {ALWAYS_SHOW_GAPS.map((gap, i) => {
              const Icon = gap.icon;
              return (
                <div key={i} className="flex items-start gap-2.5 md:gap-3 rounded-lg border border-[hsl(var(--risk-high)/0.2)] bg-[hsl(var(--risk-high)/0.04)] p-3 md:p-4">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 mt-0.5 shrink-0 text-[hsl(var(--risk-high))]" />
                  <p className="text-xs md:text-sm leading-relaxed text-foreground">{gap.text}</p>
                </div>
              );
            })}
            {extraGaps.map((gap, i) => (
              <div key={`extra-${i}`} className="flex items-start gap-2.5 md:gap-3 rounded-lg border border-[hsl(var(--risk-high)/0.2)] bg-[hsl(var(--risk-high)/0.04)] p-3 md:p-4">
                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 mt-0.5 shrink-0 text-[hsl(var(--risk-high))]" />
                <p className="text-xs md:text-sm leading-relaxed text-foreground">{gap.title}: {gap.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <p className="text-[10px] md:text-[11px] text-muted-foreground/60 text-center max-w-xl mx-auto leading-relaxed pb-4 md:pb-6">
          {legalWarning}
        </p>
      </div>
    </div>
  );
}
