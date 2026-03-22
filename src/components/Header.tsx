import { Phone } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between py-3 px-4 md:px-6">
        <div className="flex flex-col items-start">
          <span className="text-lg md:text-xl font-bold tracking-wide text-foreground">
            אלון אלישע
          </span>
          <span className="text-[11px] md:text-xs tracking-[0.2em] text-primary font-light">
            משרד עורכי דין
          </span>
        </div>
        <a
          href="tel:054-9260698"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          dir="ltr"
        >
          <Phone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">054-9260698</span>
        </a>
      </div>
    </header>
  );
}
