// components/sections/about/about-timeline.tsx
const timeline = [
  {
    title: "Início das atividades",
    desc: "Primeiros atendimentos, entendendo na prática as principais necessidades dos clientes e da área de atuação.",
  },
  {
    title: "Crescimento e consolidação",
    desc: "Ampliação da carteira de clientes, organização dos processos internos e aprofundamento em serviços especializados.",
  },
  {
    title: "Atuação atual",
    desc: "Atendimento focado em oferecer soluções personalizadas, com acompanhamento próximo e foco em resultados concretos para cada cliente.",
  },
];

export function AboutTimeline() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-6 space-y-2 text-center md:text-left">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Um pouco da nossa trajetória
          </h2>
          <p className="text-sm text-muted-foreground">
            Uma história construída ao lado de clientes que confiam no nosso trabalho e crescem junto conosco.
          </p>
        </div>

        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div
              key={item.title}
              className="flex gap-3 rounded-2xl border bg-muted/20 p-4 text-sm shadow-sm"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-background">
                {index + 1}
              </div>
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-muted-foreground">
          Você pode adaptar os textos dessa linha do tempo para escritórios, clínicas, consultorias
          e outros tipos de empresas, mantendo a mesma estrutura visual.
        </p>
      </div>
    </section>
  );
}
