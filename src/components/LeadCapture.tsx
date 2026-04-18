import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  answers: Record<string, string>;
  intent: "full" | "email" | "callback";
  willDraftData?: { willType: string; fullDraft: string };
  onSubmit: (info: { name: string; phone: string; email?: string }) => void | Promise<void>;
}

export function LeadCapture({ answers, intent, willDraftData, onSubmit }: Props) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consentMain, setConsentMain] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) errs.fullName = "יש למלא שם מלא";

    if (!phone.trim()) {
      errs.phone = "יש למלא טלפון";
    } else if (!/^0\d{8,9}$/.test(phone.replace(/[-\s]/g, ""))) {
      errs.phone = "מספר טלפון לא תקין";
    }

    if (intent === "email" && !email.trim()) {
      errs.email = "יש למלא כתובת דוא״ל";
    }

    if (!consentMain) {
      errs.consentMain = "יש לאשר כדי להמשיך";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  const questionLabels: Record<string, string> = {
    fullName: "שם מלא",
    familyStructure: "מצב משפחתי",
    spouseName: "שם בן/בת הזוג",
    inheritanceModel: "מודל הורשה",
    customDistribution: "חלוקה מותאמת",
    hasChildren: "יש ילדים",
    hasMoreThanOneChild: "יותר מילד אחד",
    hasMinorChildren: "ילדים קטינים",
    childrenNames: "שמות הילדים",
    hasRealEstate: "נכסי מקרקעין",
    significantAssets: "נכסים משמעותיים",
    unequalDistribution: "חלוקה שווה",
    familyConflict: "סיכון למחלוקת",
    digitalAssets: "נכסים דיגיטליים",
    wantExecutor: "מנהל עיזבון",
    spouseProtection: "הגנה על בן/בת זוג",
    specialCircumstances: "נסיבות מיוחדות",
    guardianName: "אפוטרופוס",
    existingWillType: "סוג צוואה קיימת",
    familyChanged: "שינוי מצב משפחתי",
    newAssets: "נכסים חדשים",
    maritalStatus: "מצב אישי",
  };

  function buildSummary() {
    return (
      Object.entries(answers)
        .filter(([, value]) => value && String(value).trim() !== "")
        .map(([key, value]) => `${questionLabels[key] || key}: ${value}`)
        .join("\n") || "לא נרשמו תשובות"
    );
  }

  async function sendLeadToEmail(): Promise<boolean> {
    const intentLabel = intent === "full" ? "צפייה בנוסח מלא" : intent === "email" ? "שליחה למייל" : "בקשת חזרה";
    const timestamp = new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" });

    // Original FormData format — this is what worked and delivered Hebrew emails correctly
    const payload = new FormData();
    payload.append("_subject", `🔔 ליד חדש — צוואות | ${fullName.trim()} | ${willDraftData?.willType || "לא ידוע"}`);
    payload.append("1. שם מלא", fullName.trim());
    payload.append("2. טלפון", phone.trim());
    payload.append("3. אימייל", email.trim() || "לא נמסר");
    payload.append("4. סוג פנייה", intentLabel);
    payload.append("5. סוג צוואה", willDraftData?.willType || "לא ידוע");
    payload.append("6. תאריך ושעה", timestamp);
    payload.append("7. אישור שיווק", consentMarketing ? "כן" : "לא");
    payload.append("8. פירוט תשובות", buildSummary());
    if (willDraftData?.fullDraft) {
      payload.append("9. טיוטת צוואה", willDraftData.fullDraft);
    }

    let formspreeOk = false;
    try {
      const res = await fetch("https://formspree.io/f/mgopabze", {
        method: "POST",
        body: payload,
        headers: { "Accept": "application/json" },
      });
      formspreeOk = res.ok;
    } catch {
      // continue
    }

    // Backup: ntfy.sh for dashboard
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim() || "לא נמסר",
          intentType: intentLabel,
          willType: willDraftData?.willType || "לא ידוע",
          timestamp,
          answersSummary: buildSummary(),
        }),
      });
    } catch {
      // best effort
    }

    return formspreeOk;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const leadInfo = {
      name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
    };

    try {
      const emailSent = await sendLeadToEmail();
      if (!emailSent) {
        console.warn("Formspree failed, continuing to Supabase backup");
      }
    } catch (error) {
      console.error("Formspree send failed:", error);
    }

    try {
      await onSubmit(leadInfo);
    } catch (error) {
      console.error("onSubmit (Supabase) failed:", error);
    } finally {
      setSubmitting(false);
    }
  }

  const title =
    intent === "full"
      ? "כדי לצפות בנוסח הצוואה המלא"
      : intent === "email"
      ? "כדי לשלוח אליך את נוסח הצוואה"
      : "כדי לקבל התייחסות אישית";

  const subtitle =
    intent === "full"
      ? "השאירו פרטים קצרים כדי לצפות בנוסח הצוואה המלא"
      : intent === "email"
      ? "השאירו פרטים קצרים כדי לקבל את נוסח הצוואה בדוא״ל"
      : "השאירו פרטים ואחזור אליכם לגבי הצוואה והנושאים שעלו";

  const buttonLabel =
    intent === "full"
      ? "הצג את נוסח הצוואה המלא"
      : intent === "email"
      ? "שלח לי את נוסח הצוואה"
      : "אני רוצה שיחזרו אליי";

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-background">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl border border-border shadow-md p-6 md:p-8 animate-slide-up">
          <div className="gold-line mx-auto mb-6" />

          <h2 className="text-xl md:text-2xl font-bold text-center mb-2 text-foreground">
            {title}
          </h2>

          <p className="text-sm text-muted-foreground text-center mb-4 leading-relaxed">
            {subtitle}
          </p>

          <p className="text-xs text-muted-foreground/70 text-center mb-8 leading-relaxed">
            בשלב זה אין חובה להשלים תעודת זהות, כתובת או שמות מלאים של בני
            משפחה כדי לצפות בנוסח הראשוני או לבקש התייחסות.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">
                שם מלא <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="שם פרטי ומשפחה"
                maxLength={100}
              />
              {errors.fullName && (
                <p className="text-destructive text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">
                טלפון <span className="text-destructive">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="050-0000000"
                dir="ltr"
                maxLength={15}
              />
              {errors.phone && (
                <p className="text-destructive text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">
                דוא״ל{" "}
                {intent === "email" ? (
                  <span className="text-destructive">*</span>
                ) : (
                  <span className="text-xs text-muted-foreground">(רשות)</span>
                )}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="email@example.com"
                dir="ltr"
                maxLength={255}
              />
              {errors.email && (
                <p className="text-destructive text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentMain}
                  onChange={(e) => setConsentMain(e.target.checked)}
                  className="mt-1 rounded border-border accent-primary"
                />
                <span className="text-xs leading-relaxed text-muted-foreground">
                  אני מאשר/ת כי ידוע לי שהמערכת מפיקה נוסח צוואה כללי בלבד, שאינו מהווה ייעוץ משפטי או צוואה תקפה, וכי נדרש ליווי משפטי והתאמה אישית לפני שימוש או חתימה. השימוש במערכת אינו יוצר יחסי עורך דין–לקוח. כל הסתמכות על התוצאה נעשית באחריות המשתמש בלבד. אני מאשר/ת כי הפרטים שנמסרו על ידי עשויים להישמר ולהיעשות בהם שימוש לצורך יצירת קשר, שיפור השירות ושירותים משפטיים עתידיים. אני מסכים/ה ל<Link to="/terms" target="_blank" className="text-primary hover:underline">תנאי השימוש</Link> ול<Link to="/privacy" target="_blank" className="text-primary hover:underline">מדיניות הפרטיות</Link>. עצם השימוש במערכת ואישור תנאים אלה מהווים הסכמה מלאה ומפורשת לכל האמור. <span className="text-destructive">*</span>
                </span>
              </label>
              {errors.consentMain && (
                <p className="text-destructive text-xs mr-7">{errors.consentMain}</p>
              )}

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentMarketing}
                  onChange={(e) => setConsentMarketing(e.target.checked)}
                  className="mt-1 rounded border-border accent-primary"
                />
                <span className="text-xs leading-relaxed text-muted-foreground">
                  אני מסכים/ה לקבל בעתיד עדכונים, תוכן מקצועי והצעות שירות מהמשרד. (רשות)
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:shadow-xl hover:brightness-110 active:scale-[0.97] disabled:opacity-60"
            >
              {submitting ? "שולח..." : buttonLabel}
            </button>
          </form>

          <div className="mt-6 space-y-2">
            <p className="text-[10px] text-muted-foreground/50 text-center leading-relaxed">
              לאחר השליחה, הפרטים יישלחו למשרד לצורך יצירת קשר והמשך טיפול.
            </p>
            <p className="text-[10px] text-muted-foreground/50 text-center leading-relaxed">
              אם בחרת בשליחה בדוא״ל, ודא שהכתובת שהוזנה נכונה. ניתן לבקש עיון,
              תיקון או מחיקה של מידע בהתאם לדין.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
