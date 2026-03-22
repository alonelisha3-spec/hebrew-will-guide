import { Shield, FileText, Phone } from "lucide-react";
import { FAQSection } from "./FAQSection";

interface Props {
  onNoWill: () => void;
  onExistingWill: () => void;
}

export function LandingPage({ onNoWill, onExistingWill }: Props) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-32 bg-accent text-accent-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c9a96e\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="container max-w-3xl text-center px-4 md:px-6 relative z-10">
          <div className="gold-line mx-auto mb-8 animate-fade-in" />
          <p
            className="text-xs tracking-[0.25em] text-primary uppercase mb-4 animate-slide-up"
            style={{ animationDelay: "60ms", animationFillMode: "backwards" }}
          >
            משרד עורכי דין אלון אלישע
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold leading-tight text-white animate-slide-up"
            style={{ animationDelay: "120ms", animationFillMode: "backwards", lineHeight: 1.3 }}
          >
            הכנת טיוטת צוואה ראשונית
          </h1>
          <p
            className="mt-6 text-base md:text-lg text-accent-foreground/70 leading-relaxed max-w-xl mx-auto animate-slide-up"
            style={{ animationDelay: "180ms", animationFillMode: "backwards" }}
          >
            ענו על מספר שאלות וקבלו טיוטת צוואה ראשונית בהתאם למצבכם — 
            או בדקו צוואה קיימת ובחנו אם נדרש עדכון.
          </p>
          <p
            className="mt-3 text-sm text-accent-foreground/50 max-w-md mx-auto animate-slide-up"
            style={{ animationDelay: "220ms", animationFillMode: "backwards" }}
          >
            הטיוטה נועדה לסייע בהבנה ראשונית בלבד — היא אינה מהווה צוואה תקפה
            ואינה מחליפה ייעוץ משפטי.
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
          >
            <button
              onClick={onNoWill}
              className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-black/20 transition-all duration-200 hover:shadow-xl hover:brightness-110 active:scale-[0.97] w-full sm:w-auto"
            >
              <FileText className="w-4 h-4 ml-2" />
              אין לי צוואה
            </button>
            <button
              onClick={onExistingWill}
              className="inline-flex items-center justify-center rounded-md bg-white/10 border border-white/20 px-10 py-4 text-base font-semibold text-accent-foreground transition-all duration-200 hover:bg-white/20 active:scale-[0.97] w-full sm:w-auto"
            >
              <Shield className="w-4 h-4 ml-2" />
              יש לי צוואה ואני רוצה בדיקה
            </button>
          </div>

          {/* Trust bullets */}
          <div
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 text-sm text-accent-foreground/60 animate-fade-in"
            style={{ animationDelay: "450ms", animationFillMode: "backwards" }}
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary/80" />
              טיוטת צוואה מותאמת אישית
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary/80" />
              מבוסס על דיני ירושה ישראליים
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary/80" />
              אפשרות לשיחת ייעוץ ראשונית
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container max-w-2xl text-center px-4 md:px-6">
          <div className="gold-line mx-auto mb-8" />
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            אל תדחו את מה שצריך להסדיר היום
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed text-sm md:text-base">
            צוואה מסודרת מגנה על המשפחה ומבטיחה שרצונכם יישמר. התחילו עכשיו
            וקבלו טיוטה ראשונית תוך דקות ספורות.
          </p>
          <button
            onClick={onNoWill}
            className="mt-8 inline-flex items-center justify-center rounded-md bg-accent px-10 py-4 text-base font-semibold text-accent-foreground shadow-lg transition-all duration-200 hover:shadow-xl hover:brightness-110 active:scale-[0.97]"
          >
            התחילו עכשיו
          </button>
        </div>
      </section>
    </div>
  );
}
