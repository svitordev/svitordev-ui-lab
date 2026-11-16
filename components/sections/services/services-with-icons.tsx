// components/sections/services/services-with-icons.tsx
// Evolução 036 — contrato data-driven local (QLT-005 incremental). O consumer é
// dono dos dados; o componente mantém apenas a estrutura (grid, cards, moldura do
// ícone) com tokens existentes. Icon = componente (lucide-react é dependência real).

export type ServiceWithIcon = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type ServicesWithIconsProps = {
  title: string;
  description?: string;
  services: ServiceWithIcon[];
};

export function ServicesWithIcons({
  title,
  description,
  services,
}: ServicesWithIconsProps) {
  return (
    <section className="w-full bg-background">
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
          {services.map(({ title: itemTitle, description: itemDescription, icon: Icon }) => (
            <div
              key={itemTitle}
              className="flex h-full flex-col gap-3 rounded-2xl border bg-muted/20 p-4 text-left text-sm shadow-sm"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>

              <h3 className="text-base font-semibold">{itemTitle}</h3>
              <p className="text-xs text-muted-foreground">{itemDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
