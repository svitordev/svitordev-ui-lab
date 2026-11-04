// components/sections/faq/faq-accordion.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqAccordionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: FaqItem[];
};

// Server Component — dados serializáveis; o estado do accordion vive no primitive
// Client (Accordion 017). O heading das perguntas vem do Header interno do Radix —
// a section não adiciona heading manual dentro do Trigger.
export function FaqAccordion({
  eyebrow,
  title,
  description,
  items,
}: FaqAccordionProps) {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="mb-8 space-y-2 text-center">
          {eyebrow ? (
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h2>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>

        <Accordion type="single" collapsible>
          {items.map((item, index) => (
            <AccordionItem key={`item-${index + 1}`} value={`item-${index + 1}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
