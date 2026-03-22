import { Shield, Clock, Phone } from "lucide-react";
import { FAQSection } from "./FAQSection";

interface Props {
  onStart: () => void;
}

export function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-32 relative">
        <div className="container max-w-3xl text-center px-4 md:px-6">
          {/* Gold line */}
          <div
            className="gold-line mx-auto mb-8 animate-fade-in"
            style={{ animationDelay: "0ms" }}
          />
          <p
            className="text-xs tracking-[0.25em] text-primary uppercase mb-4 animate-slide-up"
            style={{ animationDelay: "60ms", animationFillMode: "backwards" }}
          >
            משרד עורכי דין אלון אלישע
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold leading-tight animate-slide-up"
            style={{ animationDelay: "120ms", animationFillMode: "backwards", lineHeight: 1.3 }}
          >
            בדיקת צוואה חכמה
          </h1>
          <p
            className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto animate-slide-up"
            style={{ animationDelay: "180ms", animationFillMode: "backwards" }}
          >
            בירור ממוקד תוך שתי דקות — האם הצוואה שלכם מתאימה למצב המשפחתי
            והנכסי הנוכחי, מה עשוי לחסר בה, והאם נדרשת בחינה משפטית מקצועית.
          </p>
          <p
            className="mt-3 text-sm text-muted-foreground/70 max-w-md mx-auto animate-slide-up"
            style={{ animationDelay: "220ms", animationFillMode: "backwards" }}
          >
            הבדיקה מסייעת בזיהוי ראשוני של סיכונים ונושאים הדורשים הסדרה — היא
            אינה מהווה תחליף לייעוץ משפטי.
          </p>
          <button
            onClick={onStart}
            className="mt-10 inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all duration-200 hover:shadow-xl hover:shadow-primary/25 hover:brightness-110 active:scale-[0.97] animate-slide-up"
            style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
          >
            התחילו בדיקה
          </button>

          {/* Trust bullets */}
          <div
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 text-sm text-muted-foreground animate-fade-in"
            style={{ animationDelay: "450ms", animationFillMode: "backwards" }}
          >
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary/70" />
              בדיקה קצרה וחסויה
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary/70" />
              מותאמת לצוואה רגילה והדדית
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary/70" />
              אפשרות לשיחת ייעוץ ראשונית
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl text-center px-4 md:px-6">
          <div className="gold-line mx-auto mb-8" />
          <h2 className="text-xl md:text-2xl font-bold">
            אל תדחו את מה שצריך להסדיר היום
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed text-sm md:text-base">
            בדיקה ממוקדת אחת עשויה לחשוף את הפער בין מה שאתם מניחים לבין מה
            שקבוע בפועל — בצוואה, בירושה או בהיעדר הסדרה כלשהי.
          </p>
          <button
            onClick={onStart}
            className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all duration-200 hover:shadow-xl hover:shadow-primary/25 hover:brightness-110 active:scale-[0.97]"
          >
            התחילו בדיקה
          </button>
        </div>
      </section>
    </div>
  );
}
