// components/sections/about/about-simple.tsx
export function AboutSimple() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Sobre a empresa
          </h2>
          <p className="text-sm text-muted-foreground">
            Apresente, de forma simples, a história do escritório, clínica ou empresa: como
            começou, em que atua e qual o diferencial no atendimento aos clientes.
          </p>
          <p className="text-sm text-muted-foreground">
            Este espaço é ideal para reforçar valores como ética, transparência, proximidade e
            compromisso com resultados, de acordo com a área de atuação.
          </p>
          <p className="text-sm text-muted-foreground">
            Use também para destacar certificações, tempo de mercado, formações e experiências
            relevantes da equipe.
          </p>
        </div>
      </div>
    </section>
  );
}
