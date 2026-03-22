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
  "נמוכה": { color: "text-risk-low", bg: "bg-risk-low/10", icon: CheckCircle },
  "בינונית": { color: "text-risk-medium", bg: "bg-risk-medium/10", icon: Info },
  "גבוהה": { color: "text-risk-high", bg: "bg-risk-high/10", icon: AlertTriangle },
  "גבוהה מאוד": { color: "text-risk-critical", bg: "bg-risk-critical/10", icon: XCircle },
};

export function ResultPage({ result, leadEmail, leadName, leadPhone }: Props) {
  const config = riskConfig[result.riskLevel];
  const RiskIcon = config.icon;

  // Contact callback form state
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [cbName, setCbName] = useState(leadName || "");
  const [cbPhone, setCbPhone] = useState(leadPhone || "");
  const [cbSubmitted, setCbSubmitted] = useState(false);

  // Email results state
  const [emailInput, setEmailInput] = useState(leadEmail || "");
  const [emailSent, setEmailSent] = useState(false);

  function handleCallbackSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cbName.trim() || !cbPhone.trim()) {
      toast.error("יש למלא שם וטלפון");
      return;
    }
    // Save as a new callback request
    saveLead({
      fullName: cbName.trim(),
      phone: cbPhone.trim(),
      answers: {},
      timestamp: new Date().toISOString(),
    });
    setCbSubmitted(true);
    toast.success("הפרטים נקלטו! ניצור קשר בהקדם.");
  }

  function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!emailInput.trim()) {
      toast.error("יש להזין כתובת אימייל");
      return;
    }
    // Build email body with results summary
    const subject = encodeURIComponent(`תוצאות בדיקת צוואה חכמה - ${result.willType}`);
    const body = encodeURIComponent(
      `שלום,\n\nלהלן תוצאות הבדיקה:\n\nסוג: ${result.willType}\nרמת סיכון: ${result.riskLevel}\n\n${result.headline}\n\n${result.explanation || ""}\n\nנושאים מרכזיים:\n${result.riskItems.map(item => `• ${item}`).join("\n")}\n\nהמשמעות המעשית:\nצוואה שאינה מותאמת למצב המשפחתי, לנכסים ולסיכונים הקיימים עלולה ליצור מחלוקות, לעכב את מימוש העיזבון, או להביא לתוצאה שאינה תואמת את רצון המצווה.\n\n---\nהמידע במערכת זו הוא כללי וראשוני בלבד, אינו מהווה ייעוץ משפטי.`
    );
    window.open(`mailto:${emailInput}?subject=${subject}&body=${body}`, "_blank");
    setEmailSent(true);
    toast.success("נפתח חלון שליחת אימייל");
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-2xl space-y-8">
        {/* Main result card */}
        <div className="bg-card rounded-xl border shadow-lg p-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2.5 rounded-lg ${config.bg}`}>
              <RiskIcon className={`w-6 h-6 ${config.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">סוג הבדיקה</p>
              <p className="font-semibold">{result.willType}</p>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-4" style={{ lineHeight: 1.4 }}>
            {result.headline}
          </h1>

          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${config.bg} ${config.color}`}>
            רמת סיכון: {result.riskLevel}
          </div>

          {result.explanation && (
            <p className="mt-6 text-muted-foreground leading-relaxed">
              {result.explanation}
            </p>
          )}
        </div>

        {/* Risk items */}
        {result.riskItems.length > 0 && (
          <div
            className="bg-card rounded-xl border shadow-sm p-8 animate-slide-up"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <h2 className="text-lg font-bold mb-5">
              הנושאים המרכזיים שעלו בבדיקה
            </h2>
            <ul className="space-y-3">
              {result.riskItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed animate-slide-right"
                  style={{
                    animationDelay: `${200 + i * 60}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  <span className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${config.color.replace("text-", "bg-")}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Practical meaning */}
        <div
          className="bg-card rounded-xl border shadow-sm p-8 animate-slide-up"
          style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
        >
          <h2 className="text-lg font-bold mb-3">המשמעות המעשית</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            צוואה שאינה מותאמת למצב המשפחתי, לנכסים ולסיכונים הקיימים עלולה ליצור
            מחלוקות, לעכב את מימוש העיזבון, או להביא לתוצאה שאינה תואמת את רצון
            המצווה.
          </p>
        </div>

        {/* Send results by email */}
        <div
          className="bg-card rounded-xl border shadow-sm p-8 animate-slide-up"
          style={{ animationDelay: "250ms", animationFillMode: "backwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-bold">שליחת התוצאות לאימייל</h2>
          </div>
          {emailSent ? (
            <p className="text-sm text-muted-foreground">
              ✓ חלון שליחת האימייל נפתח. ניתן לשלוח את התוצאות לכתובת שהוזנה.
            </p>
          ) : (
            <form onSubmit={handleSendEmail} className="flex gap-3">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="הזינו כתובת אימייל"
                dir="ltr"
                className="flex-1 rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                maxLength={255}
              />
              <button
                type="submit"
                className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all duration-200 hover:shadow-md active:scale-[0.97] shrink-0"
              >
                שלח
              </button>
            </form>
          )}
        </div>

        {/* CTA - Contact callback */}
        <div
          className="bg-secondary/60 rounded-xl border p-8 text-center animate-slide-up"
          style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
        >
          <h2 className="text-xl font-bold mb-3">
            מעוניינים בבדיקה משפטית מסודרת?
          </h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            ניתן להשאיר פרטים ולקבל חזרה טלפונית לצורך בדיקה והתאמה של צוואה
            רגילה או הדדית.
          </p>

          {cbSubmitted ? (
            <div className="flex items-center justify-center gap-2 text-risk-low font-medium">
              <CheckCircle className="w-5 h-5" />
              <span>הפרטים נקלטו בהצלחה! ניצור קשר בהקדם.</span>
            </div>
          ) : !showCallbackForm ? (
            <button
              onClick={() => setShowCallbackForm(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all duration-200 hover:shadow-xl hover:shadow-primary/15 active:scale-[0.97]"
            >
              <Phone className="w-5 h-5" />
              אני רוצה שיחזרו אליי
            </button>
          ) : (
            <form onSubmit={handleCallbackSubmit} className="max-w-sm mx-auto space-y-4 text-right">
              <div>
                <label className="block text-sm font-medium mb-1.5">שם מלא</label>
                <input
                  type="text"
                  value={cbName}
                  onChange={(e) => setCbName(e.target.value)}
                  className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                  placeholder="הזינו שם מלא"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">טלפון</label>
                <input
                  type="tel"
                  value={cbPhone}
                  onChange={(e) => setCbPhone(e.target.value)}
                  className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                  placeholder="050-1234567"
                  dir="ltr"
                  maxLength={15}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all duration-200 hover:shadow-xl hover:shadow-primary/15 active:scale-[0.97]"
              >
                שלח פרטים
              </button>
            </form>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center max-w-xl mx-auto leading-relaxed pb-8">
          המידע במערכת זו הוא כללי וראשוני בלבד, אינו מהווה ייעוץ משפטי, אינו
          מחליף פגישה עם עורך דין, ואינו יוצר צוואה תקפה לפי חוק.
        </p>
      </div>
    </div>
  );
}
