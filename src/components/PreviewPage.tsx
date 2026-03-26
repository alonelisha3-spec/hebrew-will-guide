import { FileText, Mail, Phone as PhoneIcon } from "lucide-react";

interface Props {
  willType: string;
  keyPoints: string[];
  onShowFull: () => void;
  onSendEmail: () => void;
  onCallback: () => void;
}

export function PreviewPage({ willType, keyPoints, onShowFull, onSendEmail, onCallback }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-background">
      <div className="w-full max-w-lg space-y-6 animate-slide-up">
        <div className="bg-card rounded-xl border border-border shadow-md p-6 md:p-8">
          <div className="gold-line mx-auto mb-6" />
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2 text-foreground">
            נמצאה התאמה ראשונית לצוואה שלך
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            על סמך התשובות שמסרת, המערכת זיהתה את המבנה המתאים לצוואה שלך ואת הנושאים שחשוב להסדיר.
          </p>

          <div className="bg-secondary/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-1">סוג צוואה מתאים:</p>
            <p className="font-bold text-foreground text-lg">{willType}</p>
          </div>

          <h3 className="text-sm font-bold text-foreground mb-3">נקודות מרכזיות:</h3>
          <ul className="space-y-2 mb-6">
            {keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-primary" />
                {point}
              </li>
            ))}
          </ul>

          <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-center">
            <p className="text-sm font-semibold text-foreground mb-1">לצפייה בנוסח הצוואה המלא</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              השאירו פרטים קצרים, והמערכת תציג לכם את נוסח הצוואה המלא או תשלח אותו לדוא״ל.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onShowFull}
            className="w-full rounded-lg bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:brightness-110 active:scale-[0.97] flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            הצג את נוסח הצוואה שלי
          </button>
          <button
            onClick={onSendEmail}
            className="w-full rounded-lg bg-card border border-border px-6 py-4 text-base font-semibold text-foreground shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.97] flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            שלח לי את נוסח הצוואה למייל
          </button>
          <button
            onClick={onCallback}
            className="w-full rounded-lg bg-accent px-6 py-4 text-base font-semibold text-accent-foreground transition-all duration-200 hover:brightness-110 active:scale-[0.97] flex items-center justify-center gap-2"
          >
            <PhoneIcon className="w-4 h-4" />
            אני רוצה התייחסות אישית
          </button>
        </div>
      </div>
    </div>
  );
}
