// components/sections/services/services-grid-simple.tsx
const services = [
  {
    title: "Serviços principais",
    desc: "Destaque os serviços que são o centro do seu trabalho, explicando de forma simples o que cada um resolve.",
  },
  {
    title: "Atendimento personalizado",
    desc: "Mostre como o atendimento é adaptado à realidade de cada cliente, reforçando proximidade, confiança e clareza.",
  },
  {
    title: "Suporte e acompanhamento",
    desc: "Explique como funciona o acompanhamento após a contratação: canais de contato, horários e tipo de suporte oferecido.",
  },
];

export function ServicesGridSimple() {
  return (
    <section className="w-full bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 space-y-2 text-center">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Como sua empresa ajuda os clientes
          </h2>
          <p className="text-sm text-muted-foreground">
            Uma visão geral dos principais serviços, deixando claro o que o cliente pode
            esperar ao escolher o seu atendimento.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border bg-background p-4 text-left text-sm shadow-sm"
            >
              <h3 className="mb-2 text-base font-semibold">{service.title}</h3>
              <p className="text-xs text-muted-foreground">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
