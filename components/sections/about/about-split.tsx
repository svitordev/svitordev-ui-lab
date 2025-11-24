// components/sections/about/about-split.tsx
const qualities = [
  "Linguagem clara, sem termos técnicos desnecessários.",
  "Atendimento próximo, com foco em entender a realidade de cada cliente.",
  "Transparência em prazos, escopo e investimentos.",
];

export function AboutSplit() {
  return (
    <section className="w-full bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          {/* Coluna sobre */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Uma equipe focada em resolver necessidades reais dos clientes
            </h2>
            <p className="text-sm text-muted-foreground">
              Antes de falar em soluções, buscamos entender o que está dificultando o dia a dia:
              retrabalho, informações dispersas, falhas de comunicação ou processos manuais demais.
            </p>
            <p className="text-sm text-muted-foreground">
              A partir desse diagnóstico, são definidos caminhos simples e sustentáveis, alinhados
              com a forma como o seu negócio funciona e com o resultado que você espera atingir.
            </p>
          </div>

          {/* Coluna "como é trabalhar conosco" */}
          <div className="space-y-3 rounded-2xl border bg-background p-4 text-sm shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Como é trabalhar conosco
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {qualities.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="pt-2 text-[11px] text-muted-foreground">
              Esse bloco pode ser usado para apresentar a forma de atuação de escritórios,
              clínicas, consultorias e empresas de serviços em geral.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
