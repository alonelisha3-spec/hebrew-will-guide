const testimonials = [
  { name: 'אוריאן ישראל', text: 'אלון ליווה אותי בצורה מקצועית ואישית. הרגשתי שיש מישהו שבאמת דואג לאינטרסים שלי, גם בלי להיפגש פיזית. הכל היה ברור, שקוף ומדויק.' },
  { name: 'אביב קריקון', text: 'הגעתי עם חשש מתהליך דיגיטלי, אבל אלון הפתיע אותי. זמין, מקצועי, ועם תשומת לב לכל פרט. קיבלתי שירות ברמה שלא חוויתי גם במשרדים גדולים.' },
  { name: 'אלה בן דוד', text: 'עורך דין שמדבר בגובה העיניים ולא מסבך. הכל נעשה בצורה נוחה ומהירה, עם ליווי אישי לאורך כל הדרך. ממליצה בחום.' },
];

export function Testimonials() {
  return (
    <section className="bg-[#f9f7f3] py-10 md:py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-center text-base md:text-lg font-bold text-[#0d1b2e] mb-2">מה אומרים לקוחות המשרד</h3>
        <p className="text-center text-xs md:text-sm text-[#0d1b2e]/50 mb-6 md:mb-8">לקוחות שליווינו משתפים על החוויה</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map(t => (
            <div key={t.name} className="bg-white rounded-xl p-5 md:p-6 border border-[#e8e0d0] shadow-sm text-right flex flex-col">
              <p className="text-sm md:text-[13px] text-[#444] leading-relaxed mb-4 flex-1">"{t.text}"</p>
              <p className="text-sm font-bold text-[#c9a84c]">— {t.name}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-6 md:mt-8 text-xs text-[#0d1b2e]/40">
          <span>⚖️ חבר לשכת עורכי הדין בישראל</span>
          <span>📍 מוהליבר 11, הרצליה</span>
        </div>
      </div>
    </section>
  );
}
