// components/sections/services/services-grid-simple.tsx
// Evolução 036 — contrato data-driven local (QLT-005 incremental). O consumer é
// dono dos dados; o componente mantém apenas a estrutura (grid, cards) com tokens
// existentes. Sem ícones — nada de icon API; sem CTA — nada de actions.

export type ServiceGridItem = {
  title: string;
  description: string;
};

export type ServicesGridSimpleProps = {
  title: string;
  description?: string;
  services: ServiceGridItem[];
};

export function ServicesGridSimple({
  title,
  description,
  services,
}: ServicesGridSimpleProps) {
  return (
    <section className="w-full bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 space-y-2 text-center">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            {title}
          </h2>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border bg-background p-4 text-left text-sm shadow-sm"
            >
              <h3 className="mb-2 text-base font-semibold">{service.title}</h3>
              <p className="text-xs text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
