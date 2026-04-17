import { Link } from "react-router-dom";
import { footerLegalText } from "@/lib/legalTexts";

export function Footer() {
  return (
    <footer className="border-t border-border bg-accent text-accent-foreground py-10">
      <div className="container px-4 md:px-6 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-right">
            <p className="font-bold text-accent-foreground">אלון אלישע | משרד עורכי דין</p>
            <p className="text-xs text-accent-foreground/60 mt-1">
              צוואות וירושות · ייפוי כוח מתמשך · חוזים ומכרזים
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-accent-foreground/70" dir="ltr">
            <a href="tel:054-9260698" className="hover:text-primary transition-colors">054-9260698</a>
            <a href="mailto:alonelisha3@gmail.com" className="hover:text-primary transition-colors">alonelisha3@gmail.com</a>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-accent-foreground/60">
          <Link to="/terms" className="hover:text-primary transition-colors">תנאי שימוש</Link>
          <span>·</span>
          <Link to="/privacy" className="hover:text-primary transition-colors">מדיניות פרטיות</Link>
        </div>

        {/* Testimonials */}
        <div className="border-t border-accent-foreground/10 pt-6">
          <h3 className="text-center text-sm font-bold text-accent-foreground/60 mb-4">מה אומרים לקוחות המשרד</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto mb-6">
            {[
              { name: 'אוריאן ישראל', text: 'אלון ליווה אותי בצורה מקצועית ואישית. הרגשתי שיש מישהו שבאמת דואג לאינטרסים שלי, גם בלי להיפגש פיזית. הכל היה ברור, שקוף ומדויק.' },
              { name: 'אביב קריקון', text: 'הגעתי עם חשש מתהליך דיגיטלי, אבל אלון הפתיע אותי. זמין, מקצועי, ועם תשומת לב לכל פרט. קיבלתי שירות ברמה שלא חוויתי גם במשרדים גדולים.' },
              { name: 'אלה בן דוד', text: 'עורך דין שמדבר בגובה העיניים ולא מסבך. הכל נעשה בצורה נוחה ומהירה, עם ליווי אישי לאורך כל הדרך. ממליצה בחום.' },
            ].map(t => (
              <div key={t.name} className="rounded-lg p-4 bg-accent-foreground/5 border border-accent-foreground/10 text-right">
                <p className="text-xs text-accent-foreground/70 leading-relaxed mb-2">"{t.text}"</p>
                <p className="text-xs font-bold text-primary">— {t.name}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 text-[11px] text-accent-foreground/40 mb-4">
            <span>⚖️ חבר לשכת עורכי הדין בישראל</span>
            <span>📍 מוהליבר 11, הרצליה</span>
          </div>
        </div>

        <div className="border-t border-accent-foreground/10 pt-6">
          <p className="text-[11px] text-accent-foreground/50 text-center max-w-2xl mx-auto leading-relaxed">
            {footerLegalText}
          </p>
        </div>
      </div>
    </footer>
  );
}
