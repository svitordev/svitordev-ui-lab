# T2 — Implementação Gallery + gates (Goal 034)

Arquivo criado: `components/sections/gallery/gallery-tabs.tsx` (único arquivo de produção desta task — sem demo ainda, conforme plano).

## Conformidade com a API aprovada na T1

- Exatamente 1 section nova, sem variantes extras; tipos exportados `GalleryItem`/`GallerySet`/`GalleryTabsProps` idênticos ao contrato T1; conteúdo 100% via props (consumer dono de heading, supporting text, sets/items, labels — nenhum demo content em defaults internos).
- Consome o primitive `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent` da 029 sem recriar tab logic; uncontrolled (`defaultValue={sets[0]?.id}`) — estado é do Radix, nenhum estado manual no Builder.
- **Server Component** (sem `"use client"` próprio — boundary mínimo apenas no primitive, como a página `/library/tabs` já faz).
- Header da section no padrão FeatureComparison (eyebrow p + h2 + description p); cards `article` + `h3`; placeholder de mídia decorativo `aria-hidden` (moldura HTML/Tailwind, sem `<img>`); grid responsivo 1→2→3 colunas.
- Somente tokens existentes (`bg-background`, `bg-muted/40`, `text-muted-foreground`, `border`), sem cores novas, sem motion, sem dependências novas, sem links.

## Diff real (arquivo novo — conteúdo integral)

```diff
--- /dev/null
+++ b/components/sections/gallery/gallery-tabs.tsx
@@ -0,0 +1,88 @@
+// components/sections/gallery/gallery-tabs.tsx
+// Evolucao 034 — Gallery via Tabs (primitive da 029). Server Component: o
+// client boundary minimo fica apenas no primitive Tabs (Radix), como a pagina
+// /library/tabs ja faz. Estado das tabs e do Radix (uncontrolled) — nenhum
+// estado manual no Builder. Midia: placeholder estrutural HTML/Tailwind
+// (padrao do projeto — nenhuma imagem real, nenhum asset externo).
+import {
+  Tabs,
+  TabsContent,
+  TabsList,
+  TabsTrigger,
+} from "@/components/ui/tabs";
+
+export type GalleryItem = {
+  id: string;
+  title: string;
+  description?: string;
+};
+
+export type GallerySet = {
+  id: string;
+  label: string;
+  items: GalleryItem[];
+};
+
+export type GalleryTabsProps = {
+  eyebrow?: string;
+  title: string;
+  description?: string;
+  sets: GallerySet[];
+};
+
+export function GalleryTabs({
+  eyebrow,
+  title,
+  description,
+  sets,
+}: GalleryTabsProps) {
+  return (
+    <section className="w-full bg-background">
+      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
+        {eyebrow || title || description ? (
+          <div className="mb-8 space-y-2 text-center">
+            {eyebrow ? (
+              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
+                {eyebrow}
+              </p>
+            ) : null}
+            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
+              {title}
+            </h2>
+            {description ? (
+              <p className="text-sm text-muted-foreground">{description}</p>
+            ) : null}
+          </div>
+        ) : null}
+
+        <Tabs defaultValue={sets[0]?.id} className="w-full">
+          <TabsList className="mx-auto">
+            {sets.map((set) => (
+              <TabsTrigger key={set.id} value={set.id}>
+                {set.label}
+              </TabsTrigger>
+            ))}
+          </TabsList>
+
+          {sets.map((set) => (
+            <TabsContent key={set.id} value={set.id} className="mt-6">
+              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
+                {set.items.map((item) => (
+                  <article key={item.id} className="space-y-2">
+                    {/* Placeholder estrutural de midia — decorativo (padrao do
+                        projeto: moldura HTML/Tailwind, sem <img>). */}
+                    <div
+                      aria-hidden="true"
+                      className="aspect-video rounded-xl border bg-muted/40"
+                    />
+                    <h3 className="text-sm font-semibold">{item.title}</h3>
+                    {item.description ? (
+                      <p className="text-sm text-muted-foreground">
+                        {item.description}
+                      </p>
+                    ) : null}
+                  </article>
+                ))}
+              </div>
+            </TabsContent>
+          ))}
+        </Tabs>
+      </div>
+    </section>
+  );
+}
```

## Resultados dos gates (executados de fato, com exit codes)

- `npm run lint` → **exit 0**, 0 erros / 0 warnings.
- `npm run build` → **exit 0**, `Compiled successfully in 2.2s`, TypeScript ok, 23/23 páginas (sem rota nova ainda — demo é T3).
- `git diff --check` → **exit 0**.
