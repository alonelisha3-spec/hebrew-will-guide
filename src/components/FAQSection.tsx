import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "מה ההבדל בין צוואה רגילה לצוואה הדדית?",
    a: "צוואה רגילה היא צוואה של אדם אחד. צוואה הדדית נערכת בדרך כלל בין בני זוג וכוללת הסתמכות הדדית.",
  },
  {
    q: "האם הבדיקה מחליפה ייעוץ משפטי?",
    a: "לא. הבדיקה היא ראשונית בלבד.",
  },
  {
    q: "למי מתאימה הבדיקה?",
    a: "לכל מי שיש לו רכוש, משפחה, ילדים, או רצון להסדיר את אופן חלוקת העיזבון.",
  },
  {
    q: "האם אפשר לעדכן צוואה קיימת?",
    a: "כן, ובמקרים רבים אף רצוי לעדכן צוואה כאשר המצב המשפחתי או הנכסי משתנה.",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 bg-secondary/40">
      <div className="container max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-8">שאלות נפוצות</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card rounded-lg border px-5 shadow-sm"
            >
              <AccordionTrigger className="text-right font-medium text-base py-4 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
