import { useState } from "react";
import { CheckCircle2, AlertTriangle, ArrowLeft, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

interface Props {
  onStartFull: () => void;
}

const questions = [
  {
    id: "hasWill",
    text: "יש לכם צוואה כיום?",
    options: ["אין לי צוואה", "יש לי צוואה"],
  },
  {
    id: "hasChildren",
    text: "יש לכם ילדים?",
    options: ["כן", "לא"],
  },
  {
    id: "hasProperty",
    text: "יש לכם דירה או נכס על שמכם?",
    options: ["כן", "לא"],
  },
];

type Result = {
  level: "high" | "medium" | "low";
  title: string;
  description: string;
  items: string[];
};

function calculateResult(answers: Record<string, string>): Result {
  const noWill = answers.hasWill === "אין לי צוואה";
  const hasKids = answers.hasChildren === "כן";
  const hasProperty = answers.hasProperty === "כן";

  const items: string[] = [];
  let score = 0;

  if (noWill) {
    score += 40;
    items.push("אין צוואה — ללא צוואה, הירושה תחולק לפי חוק הירושה ולא לפי רצונכם");
  }
  if (hasKids) {
    score += 20;
    items.push("יש ילדים — חשוב להגדיר מי יטפל בהם ואיך יחולק הרכוש");
  }
  if (hasProperty) {
    score += 20;
    items.push("יש נכס — ללא צוואה, נכס עלול להיתקע בהליכי ירושה ממושכים");
  }

  if (noWill && (hasKids || hasProperty)) {
    items.push("מומלץ מאוד להסדיר צוואה בהקדם");
  }

  if (score >= 50) {
    return {
      level: "high",
      title: "רמת הדחיפות גבוהה",
      description: "לפי התשובות שלכם, יש כמה נושאים שחשוב להסדיר. כדאי לא לדחות.",
      items,
    };
  } else if (score >= 30) {
    return {
      level: "medium",
      title: "כדאי לבדוק",
      description: "נמצאו נקודות שכדאי לבחון. שווה להקדיש כמה דקות לבדיקה מלאה.",
      items,
    };
  } else {
    return {
      level: "low",
      title: "המצב נראה סביר",
      description: "לא זוהו בעיות דחופות, אבל תמיד כדאי לבדוק לעומק.",
      items,
    };
  }
}

export function QuickAssessment({ onStartFull }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const whatsappUrl = `https://wa.me/972549260698?text=${encodeURIComponent("שלום, עשיתי בדיקה מהירה באתר ואשמח לשמוע פרטים נוספים.")}`;

  function handleAnswer(answer: string) {
    const q = questions[currentQ];
    const newAnswers = { ...answers, [q.id]: answer };
    setAnswers(newAnswers);

    trackEvent("quick_assessment_answer", {
      stepIndex: currentQ,
      questionId: q.id,
      metadata: { answer },
    });

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const res = calculateResult(newAnswers);
      setResult(res);
      trackEvent("quick_assessment_complete", {
        metadata: { level: res.level },
      });
    }
  }

  async function handleQuickLead(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const { saveLead } = await import("@/lib/store");
    await saveLead(
      {
        fullName: name.trim(),
        phone: phone.trim(),
        answers: { ...answers, source: "quick_assessment" },
        timestamp: new Date().toISOString(),
      },
      {
        willType: "בדיקה מהירה",
        riskLevel: result?.level || "",
        headline: result?.title || "",
        riskItems: result?.items || [],
      }
    );

    trackEvent("quick_lead_submitted", {
      metadata: { level: result?.level || "", source: "quick_assessment" },
    });

    setSubmitted(true);
  }

  // Question view
  if (!result) {
    const q = questions[currentQ];
    return (
      <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 md:p-8 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-primary font-medium tracking-wide">בדיקה מהירה</p>
          <p className="text-xs text-accent-foreground/50">
            {currentQ + 1} / {questions.length}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/10 rounded-full mb-6">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>

        <p className="text-lg md:text-xl font-semibold text-white text-center mb-6">
          {q.text}
        </p>

        <div className="flex flex-col gap-3">
          {q.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="w-full rounded-lg border border-white/15 bg-white/[0.05] px-5 py-4 text-base text-white font-medium hover:bg-primary/20 hover:border-primary/40 transition-all duration-200 active:scale-[0.98]"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Submitted confirmation
  if (submitted) {
    return (
      <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 md:p-8 max-w-lg mx-auto text-center">
        <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">קיבלתי את הפרטים!</h3>
        <p className="text-accent-foreground/70 mb-6">אחזור אליכם בהקדם לגבי המצב שעלה בבדיקה.</p>
        <button
          onClick={onStartFull}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          בינתיים, רוצים לעשות בדיקה מלאה?
        </button>
      </div>
    );
  }

  // Result view
  const levelColors = {
    high: "border-red-400/50 bg-red-500/10",
    medium: "border-yellow-400/50 bg-yellow-500/10",
    low: "border-green-400/50 bg-green-500/10",
  };

  const levelIcons = {
    high: <AlertTriangle className="w-8 h-8 text-red-400" />,
    medium: <AlertTriangle className="w-8 h-8 text-yellow-400" />,
    low: <CheckCircle2 className="w-8 h-8 text-green-400" />,
  };

  return (
    <div className={`border rounded-2xl p-6 md:p-8 max-w-lg mx-auto ${levelColors[result.level]}`}>
      <div className="text-center mb-5">
        {levelIcons[result.level]}
        <h3 className="text-xl font-bold text-white mt-3">{result.title}</h3>
        <p className="text-accent-foreground/70 mt-2 text-sm">{result.description}</p>
      </div>

      <ul className="space-y-2 mb-6">
        {result.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-accent-foreground/80">
            <span className="text-primary mt-0.5">•</span>
            {item}
          </li>
        ))}
      </ul>

      {!showForm ? (
        <div className="space-y-3">
          <button
            onClick={() => setShowForm(true)}
            className="w-full rounded-lg bg-primary px-5 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:brightness-110 active:scale-[0.97]"
          >
            רוצה שיחזרו אליי בנושא
          </button>
          <button
            onClick={onStartFull}
            className="w-full rounded-lg border border-white/15 bg-white/[0.05] px-5 py-3 text-sm text-white font-medium hover:bg-white/10 transition-all"
          >
            לבדיקה מלאה + טיוטת צוואה
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-lg border border-[#25D366]/30 bg-[#25D366]/10 px-5 py-3 text-sm text-[#25D366] font-medium hover:bg-[#25D366]/20 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            שליחת הודעה בוואטסאפ
          </a>
        </div>
      ) : (
        <form onSubmit={handleQuickLead} className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="שם מלא"
            required
            className="w-full rounded-lg border border-white/15 bg-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-primary/30"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="טלפון"
            required
            dir="ltr"
            className="w-full rounded-lg border border-white/15 bg-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-5 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:brightness-110 active:scale-[0.97]"
          >
            שלחו לי — אחזור אליכם
          </button>
          <p className="text-[10px] text-accent-foreground/40 text-center">
            הפרטים ישמשו ליצירת קשר בלבד. <span className="underline cursor-pointer" onClick={onStartFull}>לבדיקה מלאה</span>
          </p>
        </form>
      )}
    </div>
  );
}
