import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "מה ההבדל בין צוואה רגילה לצוואה הדדית?",
    a: "צוואה רגילה היא הוראת דין אישית של אדם אחד. צוואה הדדית נערכת לרוב בין בני זוג ומבוססת על הסתמכות משותפת — כל צד מסתמך על הוראות הצד השני, ולכן חלות עליה מגבלות שינוי וביטול מיוחדות בחוק.",
  },
  {
    q: "האם הבדיקה מחליפה ייעוץ משפטי?",
    a: "לא. הבדיקה מספקת אינדיקציה ראשונית בלבד ונועדה לסייע בהבנה האם קיימות סוגיות שמחייבות בחינה מקצועית. היא אינה מהווה חוות דעת משפטית ואינה יוצרת יחסי עורך דין–לקוח.",
  },
  {
    q: "למי מתאימה הבדיקה?",
    a: "לכל מי שמחזיק בנכסים, בעל משפחה או ילדים, או מעוניין להבטיח שאופן חלוקת עיזבונו ישקף את רצונו. הבדיקה מתאימה גם למי שיש לו צוואה קיימת ומעוניין לוודא שהיא עדכנית.",
  },
  {
    q: "האם ניתן לעדכן צוואה קיימת?",
    a: "בהחלט. במקרים רבים מומלץ לעדכן צוואה כאשר חל שינוי מהותי — נישואין, גירושין, לידת ילדים, רכישת נכסים או שינוי ביחסים המשפחתיים. צוואה שלא נבדקה שנים עלולה שלא לשקף את המציאות.",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 md:py-20 bg-secondary/50">
      <div className="container max-w-2xl px-4 md:px-6">
        <div className="gold-line mx-auto mb-6" />
        <h2 className="text-xl md:text-2xl font-bold text-center mb-10 text-foreground">
          שאלות נפוצות
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card rounded-lg border border-border px-5 shadow-sm"
            >
              <AccordionTrigger className="text-right font-medium text-sm md:text-base py-4 hover:no-underline hover:text-primary transition-colors text-foreground">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 leading-relaxed text-sm">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
