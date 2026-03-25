import { footerLegalText } from "@/lib/constants";

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
        <div className="border-t border-accent-foreground/10 pt-6">
          <p className="text-[11px] text-accent-foreground/50 text-center max-w-2xl mx-auto leading-relaxed">
            {footerLegalText}
          </p>
        </div>
      </div>
    </footer>
  );
}
