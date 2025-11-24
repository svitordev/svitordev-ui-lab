// components/sections/testimonials/testimonials-columns.tsx
const testimonialsColumns = [
  {
    text: "O atendimento foi muito cuidadoso e o resultado final ficou totalmente alinhado com o que precisávamos.",
    name: "Cliente D",
    role: "Empresária",
  },
  {
    text: "A organização do processo e a clareza na comunicação fizeram toda a diferença para o nosso time.",
    name: "Cliente E",
    role: "Coordenador",
  },
  {
    text: "A possibilidade de ajustar e evoluir o trabalho ao longo do tempo foi um ponto essencial para nós.",
    name: "Cliente F",
    role: "Sócio",
  },
];

export function TestimonialsColumns() {
  return (
    <section className="w-full bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-6 space-y-2 text-center md:text-left">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            O que alguns clientes comentam
          </h2>
          <p className="text-sm text-muted-foreground">
            Depoimentos de quem já contou com o nosso trabalho e acompanhou os resultados no dia a dia.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {testimonialsColumns.map((item) => (
            <figure
              key={item.name}
              className="rounded-2xl border bg-background p-4 text-sm shadow-sm"
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
