import { Shield, Clock, Phone } from "lucide-react";
import { FAQSection } from "./FAQSection";

interface Props {
  onStart: () => void;
}

export function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container max-w-3xl text-center">
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight tracking-tight animate-slide-up"
            style={{ animationDelay: "0ms" }}
          >
            בדיקת צוואה חכמה
          </h1>
          <p
            className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "80ms", animationFillMode: "backwards" }}
          >
            בדקו תוך 2 דקות האם יש לכם צוואה מתאימה, מה חסר בה, והאם נדרש
            טיפול משפטי
          </p>
          <p
            className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto animate-slide-up"
            style={{ animationDelay: "140ms", animationFillMode: "backwards" }}
          >
            הבדיקה נועדה לסייע בזיהוי ראשוני של סיכונים ונושאים שחייבים להסדיר
            בצוואה. היא אינה מחליפה ייעוץ משפטי.
          </p>
          <button
            onClick={onStart}
            className="mt-10 inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all duration-200 hover:shadow-xl hover:shadow-primary/15 active:scale-[0.97] animate-slide-up"
            style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
          >
            התחל בדיקה
          </button>

          {/* Trust bullets */}
          <div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in"
            style={{ animationDelay: "350ms", animationFillMode: "backwards" }}
          >
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              בדיקה קצרה ודיסקרטית
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              מותאמת לצוואה רגילה או הדדית
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent" />
              אפשרות לחזרה טלפונית מעורך דין
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            אל תחכו לרגע שבו כבר מאוחר להסדיר
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            בדיקה קצרה אחת יכולה לעזור להבין האם יש צורך בצוואה חדשה, צוואה
            הדדית או עדכון משפטי.
          </p>
          <button
            onClick={onStart}
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all duration-200 hover:shadow-xl hover:shadow-primary/15 active:scale-[0.97]"
          >
            התחל בדיקה עכשיו
          </button>
        </div>
      </section>

      {/* Footer disclaimer */}
      <footer className="border-t py-8">
        <div className="container">
          <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
            המידע במערכת זו הוא כללי וראשוני בלבד, אינו מהווה ייעוץ משפטי, אינו
            מחליף פגישה עם עורך דין, ואינו יוצר צוואה תקפה לפי חוק.
          </p>
        </div>
      </footer>
    </div>
  );
}
