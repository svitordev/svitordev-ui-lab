// components/sections/stats/stats-grid.tsx
import { Badge } from "@/components/ui/badge";

export type StatItem = {
  value: string;
  label: string;
  description?: string;
};

export type StatsGridProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: StatItem[];
};

export function StatsGrid({
  eyebrow,
  title,
  description,
  items,
}: StatsGridProps) {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {(eyebrow || title || description) && (
          <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center">
            {eyebrow && (
              <div className="flex justify-center">
                <Badge variant="secondary">{eyebrow}</Badge>
              </div>
            )}
            {title && (
              <h2 className="text-balance text-xl font-semibold tracking-tight md:text-2xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        <ul role="list" className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((item) => (
            <li
              key={`${item.value}-${item.label}`}
              className="space-y-1 text-center"
            >
              <p className="text-balance text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
                {item.value}
              </p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              {item.description && (
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
