import { useState } from "react";
import { ResultData } from "@/lib/resultsEngine";
import { AlertTriangle, CheckCircle, Info, XCircle, Mail, Phone } from "lucide-react";
import { saveLead } from "@/lib/store";
import { toast } from "sonner";

interface Props {
  result: ResultData;
  leadEmail?: string;
  leadName?: string;
  leadPhone?: string;
}

const riskConfig = {
  "נמוכה": { color: "text-risk-low", bg: "bg-risk-low/15", icon: CheckCircle },
  "בינונית": { color: "text-risk-medium", bg: "bg-risk-medium/15", icon: Info },
  "גבוהה": { color: "text-risk-high", bg: "bg-risk-high/15", icon: AlertTriangle },
  "גבוהה מאוד": { color: "text-risk-critical", bg: "bg-risk-critical/15", icon: XCircle },
};

export function ResultPage({ result, leadEmail, leadName, leadPhone }: Props) {
  const config = riskConfig[result.riskLevel];
  const RiskIcon = config.icon;

  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [cbName, setCbName] = useState(leadName || "");
  const [cbPhone, setCbPhone] = useState(leadPhone || "");
  const [cbSubmitted, setCbSubmitted] = useState(false);

  const [emailInput, setEmailInput] = useState(leadEmail || "");
  const [emailSent, setEmailSent] = useState(false);

  function handleCallbackSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cbName.trim() || !cbPhone.trim()) {
      toast.error("נא למלא שם מלא וטלפון");
      return;
    }
    saveLead({
      fullName: cbName.trim(),
      phone: cbPhone.trim(),
      answers: {},
      timestamp: new Date().toISOString(),
    });
    setCbSubmitted(true);
    toast.success("הפרטים התקבלו — ניצור קשר בהקדם.");
  }

  function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!emailInput.trim()) {
      toast.error("נא להזין כתובת דוא״ל");
      return;
    }
    const subject = encodeURIComponent(`סיכום בדיקת צוואה | משרד עו"ד אלון אלישע`);
    const body = encodeURIComponent(
      `שלום,\n\nלהלן סיכום הבדיקה שבוצעה באתר משרד עו"ד אלון אלישע:\n\nסוג הבדיקה: ${result.willType}\nרמת סיכון: ${result.riskLevel}\n\n${result.headline}\n\n${result.explanation || ""}\n\nנושאים מרכזיים שעלו:\n${result.riskItems.map(item => `• ${item}`).join("\n")}\n\nהמשמעות המעשית:\nצוואה שאינה מותאמת למצב המשפחתי, לנכסים ולסיכונים הקיימים — עלולה ליצור מחלוקות בין יורשים, לעכב את חלוקת העיזבון או להביא לתוצאה שאינה תואמת את רצון המצווה.\n\nלתיאום פגישת ייעוץ: 054-9260698\n\n---\nמידע זה הינו כללי בלבד ואינו מהווה ייעוץ משפטי.\nמשרד עו"ד אלון אלישע | elisha-law.com`
    );
    window.open(`mailto:${emailInput}?subject=${subject}&body=${body}`, "_blank");
    setEmailSent(true);
    toast.success("נפתח חלון שליחת דוא״ל");
  }

  return (
    <div className="min-h-screen py-10 md:py-14">
      <div className="container max-w-2xl space-y-6 md:space-y-8 px-4 md:px-6">
        {/* Main result */}
        <div className="bg-card rounded-xl border border-border/50 shadow-lg p-6 md:p-8 animate-slide-up">
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-2.5 rounded-lg ${config.bg} shrink-0`}>
              <RiskIcon className={`w-6 h-6 ${config.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">סוג הבדיקה</p>
              <p className="font-semibold">{result.willType}</p>
            </div>
          </div>

          <h1 className="text-xl md:text-2xl font-bold leading-relaxed mb-4" style={{ lineHeight: 1.5 }}>
            {result.headline}
          </h1>

          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${config.bg} ${config.color}`}>
            רמת סיכון: {result.riskLevel}
          </div>

          {result.explanation && (
            <p className="mt-6 text-muted-foreground leading-relaxed text-sm">
              {result.explanation}
            </p>
          )}
        </div>

        {/* Risk items */}
        {result.riskItems.length > 0 && (
          <div
            className="bg-card rounded-xl border border-border/50 shadow-sm p-6 md:p-8 animate-slide-up"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <h2 className="text-base md:text-lg font-bold mb-5">
              הנושאים העיקריים שזוהו בבדיקה
            </h2>
            <ul className="space-y-3">
              {result.riskItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground animate-slide-right"
                  style={{
                    animationDelay: `${200 + i * 60}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Practical meaning */}
        <div
          className="bg-card rounded-xl border border-border/50 shadow-sm p-6 md:p-8 animate-slide-up"
          style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
        >
          <h2 className="text-base md:text-lg font-bold mb-3">המשמעות המעשית</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            צוואה שאינה מותאמת למצב המשפחתי, לנכסים ולסיכונים הקיימים — עלולה
            ליצור מחלוקות בין יורשים, לעכב את חלוקת העיזבון או להביא לתוצאה שאינה
            תואמת את רצון המצווה. בחינה מקצועית יכולה לזהות פערים אלה ולהתאים את
            ההסדר לנסיבות בפועל.
          </p>
        </div>

        {/* Email results */}
        <div
          className="bg-card rounded-xl border border-border/50 shadow-sm p-6 md:p-8 animate-slide-up"
          style={{ animationDelay: "250ms", animationFillMode: "backwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-4.5 h-4.5 text-primary" />
            <h2 className="text-base font-bold">שליחת הסיכום לדוא״ל</h2>
          </div>
          {emailSent ? (
            <p className="text-sm text-muted-foreground">
              ✓ חלון שליחת הדוא״ל נפתח בהצלחה.
            </p>
          ) : (
            <form onSubmit={handleSendEmail} className="flex gap-3">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="כתובת דוא״ל"
                dir="ltr"
                className="flex-1 rounded-lg border border-border/60 bg-secondary/30 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/40"
                maxLength={255}
              />
              <button
                type="submit"
                className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 active:scale-[0.97] shrink-0"
              >
                שליחה
              </button>
            </form>
          )}
        </div>

        {/* CTA callback */}
        <div
          className="bg-secondary/40 rounded-xl border border-primary/20 p-6 md:p-8 text-center animate-slide-up"
          style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
        >
          <div className="gold-line mx-auto mb-5" />
          <h2 className="text-lg md:text-xl font-bold mb-3">
            מעוניינים בבחינה משפטית מקצועית?
          </h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-md mx-auto">
            השאירו פרטים ונחזור אליכם לשיחת ייעוץ ראשונית — ללא התחייבות — לבחינת
            התאמת הצוואה למצבכם.
          </p>

          {cbSubmitted ? (
            <div className="flex items-center justify-center gap-2 text-risk-low font-medium">
              <CheckCircle className="w-5 h-5" />
              <span>הפרטים התקבלו. ניצור קשר בהקדם.</span>
            </div>
          ) : !showCallbackForm ? (
            <button
              onClick={() => setShowCallbackForm(true)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all duration-200 hover:shadow-xl hover:brightness-110 active:scale-[0.97]"
            >
              <Phone className="w-4.5 h-4.5" />
              בקשת שיחה מהמשרד
            </button>
          ) : (
            <form onSubmit={handleCallbackSubmit} className="max-w-sm mx-auto space-y-4 text-right">
              <div>
                <label className="block text-sm font-medium mb-1.5">שם מלא</label>
                <input
                  type="text"
                  value={cbName}
                  onChange={(e) => setCbName(e.target.value)}
                  className="w-full rounded-lg border border-border/60 bg-secondary/30 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/40"
                  placeholder="שם פרטי ומשפחה"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">טלפון</label>
                <input
                  type="tel"
                  value={cbPhone}
                  onChange={(e) => setCbPhone(e.target.value)}
                  className="w-full rounded-lg border border-border/60 bg-secondary/30 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/40"
                  placeholder="050-0000000"
                  dir="ltr"
                  maxLength={15}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
              >
                שליחת פרטים
              </button>
            </form>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-muted-foreground/60 text-center max-w-xl mx-auto leading-relaxed pb-6">
          המידע המוצג הינו כללי וראשוני בלבד. אין בו משום ייעוץ משפטי, אין הוא
          מהווה תחליף לפגישה עם עורך דין, ואין בו כדי ליצור יחסי עורך דין–לקוח
          או צוואה תקפה על פי דין.
        </p>
      </div>
    </div>
  );
}
