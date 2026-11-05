// components/sections/features/sticky-column-split.tsx

export type StickyColumnItem = {
  title: string;
  description: string;
};

export type StickyColumnSplitProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: StickyColumnItem[];
};

export function StickyColumnSplit({
  eyebrow,
  title,
  description,
  items,
}: StickyColumnSplitProps) {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2">
          {/* coluna editorial — sticky só em lg; self-start evita o stretch do grid */}
          <div className="space-y-3 md:self-start lg:sticky lg:top-8">
            {eyebrow && (
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {eyebrow}
              </p>
            )}
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>

          {/* coluna de conteúdo — a lista longa que continua rolando */}
          <div className="divide-y divide-border">
            {items.map((item) => (
              <article key={item.title} className="space-y-1 pt-6 first:pt-0">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
