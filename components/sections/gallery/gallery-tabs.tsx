// components/sections/gallery/gallery-tabs.tsx
// Evolução 034 — Gallery via Tabs (primitive da 029). Server Component: o
// client boundary mínimo fica apenas no primitive Tabs (Radix), como a página
// /library/tabs já faz. Estado das tabs é do Radix (uncontrolled) — nenhum
// estado manual no Builder. Mídia: placeholder estrutural HTML/Tailwind
// (padrão do projeto — nenhuma imagem real, nenhum asset externo).
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export type GalleryItem = {
  id: string;
  title: string;
  description?: string;
};

export type GallerySet = {
  id: string;
  label: string;
  items: GalleryItem[];
};

export type GalleryTabsProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  sets: GallerySet[];
};

export function GalleryTabs({
  eyebrow,
  title,
  description,
  sets,
}: GalleryTabsProps) {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {eyebrow || title || description ? (
          <div className="mb-8 space-y-2 text-center">
            {eyebrow ? (
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              {title}
            </h2>
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
        ) : null}

        <Tabs defaultValue={sets[0]?.id} className="w-full">
          <TabsList className="mx-auto">
            {sets.map((set) => (
              <TabsTrigger key={set.id} value={set.id}>
                {set.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {sets.map((set) => (
            <TabsContent key={set.id} value={set.id} className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {set.items.map((item) => (
                  <article key={item.id} className="space-y-2">
                    {/* Placeholder estrutural de mídia — decorativo (padrão do
                        projeto: moldura HTML/Tailwind, sem <img>). */}
                    <div
                      aria-hidden="true"
                      className="aspect-video rounded-xl border bg-muted/40"
                    />
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    {item.description ? (
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
