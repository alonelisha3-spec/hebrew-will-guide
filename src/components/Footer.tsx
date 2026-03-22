export function Footer() {
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="container px-4 md:px-6 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-right">
            <p className="font-bold text-foreground">אלון אלישע | משרד עורכי דין</p>
            <p className="text-xs text-muted-foreground mt-1">
              צוואות וירושות · ייפוי כוח מתמשך · חוזים ומכרזים
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground" dir="ltr">
            <a href="tel:054-9260698" className="hover:text-primary transition-colors">054-9260698</a>
            <a href="mailto:alonelisha3@gmail.com" className="hover:text-primary transition-colors">alonelisha3@gmail.com</a>
          </div>
        </div>
        <div className="border-t border-border/30 pt-6">
          <p className="text-[11px] text-muted-foreground/70 text-center max-w-2xl mx-auto leading-relaxed">
            המידע המוצג באתר זה הינו כללי וראשוני בלבד. אין בו משום ייעוץ משפטי, אין הוא מהווה
            תחליף לפגישת ייעוץ אישית עם עורך דין, ואין בו כדי ליצור יחסי עורך דין–לקוח או צוואה
            תקפה על פי דין.
          </p>
        </div>
      </div>
    </footer>
  );
}
