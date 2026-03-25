import { Shield, FileText } from "lucide-react";
import { FAQSection } from "./FAQSection";

interface Props {
  onNoWill: () => void;
  onExistingWill: () => void;
}

export function LandingPage({ onNoWill, onExistingWill }: Props) {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="py-20 md:py-32 bg-accent text-accent-foreground relative overflow-hidden">
        <div className="container max-w-3xl text-center px-4 md:px-6 relative z-10">
          <p className="text-xs tracking-[0.25em] text-primary uppercase mb-4">
            משרד עורכי דין אלון אלישע
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white" style={{ lineHeight: 1.3 }}>
            אין לכם צוואה?
            <br />
            בדקו עכשיו מה צריך להסדיר
          </h1>
          <p className="mt-6 text-base md:text-lg text-accent-foreground/80 leading-relaxed max-w-xl mx-auto">
            ענו על מספר שאלות וקבלו טיוטת צוואה ראשונית,
            כולל זיהוי חוסרים ונקודות שחשוב להסדיר מראש.
          </p>

          <div className="mt-8 text-sm text-accent-foreground/70 space-y-2">
            <p>✔ טיוטת צוואה ראשונית תוך 2 דקות</p>
            <p>✔ זיהוי סיכונים ומחלוקות אפשריות</p>
            <p>✔ אפשרות לבקש חזרה אישית</p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onNoWill}
              className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-base font-semibold text-primary-foreground shadow-lg hover:brightness-110 w-full sm:w-auto"
            >
              <FileText className="w-4 h-4 ml-2" />
              אני רוצה להכין צוואה
            </button>
            <button
              onClick={onExistingWill}
              className="inline-flex items-center justify-center rounded-md bg-white/10 border border-white/20 px-10 py-4 text-base font-semibold text-accent-foreground hover:bg-white/20 w-full sm:w-auto"
            >
              <Shield className="w-4 h-4 ml-2" />
              אני רוצה לבדוק צוואה קיימת
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* CTA תחתון */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container max-w-2xl text-center px-4 md:px-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            צוואה לא מסודרת עלולה לגרום למחלוקות מיותרות
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed text-sm md:text-base">
            התחילו עכשיו, בדקו את המצב שלכם וקבלו כיוון ראשוני —
            ובהמשך תוכלו לבחור אם תרצו שאחזור אליכם לבדיקה אישית.
          </p>
          <button
            onClick={onNoWill}
            className="mt-8 inline-flex items-center justify-center rounded-md bg-accent px-10 py-4 text-base font-semibold text-accent-foreground shadow-lg hover:brightness-110"
          >
            התחילו עכשיו
          </button>
        </div>
      </section>
    </div>
  );
}
