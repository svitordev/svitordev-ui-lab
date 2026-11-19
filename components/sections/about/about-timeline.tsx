// components/sections/about/about-timeline.tsx
// Evolução 037 — contrato data-driven local (QLT-005 incremental). O consumer é
// dono dos dados; o componente mantém apenas a estrutura (lista, cards, marcadores
// numerados por passo) com tokens existentes. Sem datas/períodos — o marcador é o
// número do passo (índice), não um campo de dados.

export type AboutTimelineItem = {
  title: string;
  description: string;
};

export type AboutTimelineProps = {
  title: string;
  description?: string;
  items: AboutTimelineItem[];
  supportingText?: string;
};

export function AboutTimeline({
  title,
  description,
  items,
  supportingText,
}: AboutTimelineProps) {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-6 space-y-2 text-center md:text-left">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            {title}
          </h2>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="flex gap-3 rounded-2xl border bg-muted/20 p-4 text-sm shadow-sm"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-background">
                {index + 1}
              </div>
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {supportingText ? (
          <p className="mt-4 text-[11px] text-muted-foreground">{supportingText}</p>
        ) : null}
      </div>
    </section>
  );
}
