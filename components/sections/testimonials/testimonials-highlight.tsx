// components/sections/testimonials/testimonials-highlight.tsx
const highlight = {
  text: "O trabalho realizado ajudou a organizar o fluxo interno da empresa e trouxe mais clareza para a equipe.",
  name: "Cliente Destaque",
  role: "Diretora",
};

const others = [
  "Comunicação clara durante todas as etapas.",
  "Orientações e materiais para a equipe conseguir utilizar sozinha o que foi implantado.",
  "Facilidade para solicitar ajustes e evoluções quando necessário.",
];

export function TestimonialsHighlight() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
          {/* Destaque grande */}
          <figure className="rounded-2xl border bg-muted/30 p-4 text-sm shadow-sm md:p-6">
            <p className="text-sm text-muted-foreground">“{highlight.text}”</p>
            <figcaption className="mt-3 text-xs">
              <span className="font-semibold">{highlight.name}</span>
              <span className="text-muted-foreground"> · {highlight.role}</span>
            </figcaption>
          </figure>

          {/* Lista de pontos curtos */}
          <div className="space-y-3 rounded-2xl border bg-background p-4 text-sm shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              O que mais aparece nos feedbacks
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {others.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
