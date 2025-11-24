// components/sections/testimonials/testimonials-grid.tsx
const testimonials = [
  {
    name: "Cliente A",
    role: "Empreendedor",
    text: "O trabalho trouxe muito mais organização e deixou a forma de apresentar o negócio bem mais profissional.",
  },
  {
    name: "Cliente B",
    role: "Gestora",
    text: "A equipe ganhou clareza nos processos e reduziu bastante o tempo gasto com retrabalho e ajustes manuais.",
  },
  {
    name: "Cliente C",
    role: "Consultor",
    text: "O suporte e o acompanhamento contínuo fizeram diferença para colocar em prática o que a gente precisava.",
  },
];

export function TestimonialsGrid() {
  return (
    <section className="w-full bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 space-y-2 text-center">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            O que alguns clientes comentam
          </h2>
          <p className="text-sm text-muted-foreground">
            Depoimentos de quem já contou com o nosso trabalho e percebeu melhorias no dia a dia.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col justify-between rounded-2xl border bg-background p-4 text-sm shadow-sm"
            >
              <p className="text-xs text-muted-foreground">“{item.text}”</p>
              <figcaption className="mt-3 text-xs">
                <span className="font-semibold">{item.name}</span>
                <span className="text-muted-foreground"> · {item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
