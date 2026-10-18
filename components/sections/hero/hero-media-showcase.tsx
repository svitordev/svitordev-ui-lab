// components/sections/hero/hero-media-showcase.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type HeroAction = {
  label: string;
  href: string;
  variant?: "default" | "outline";
};

export type HeroMediaShowcaseProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: HeroAction[];
  mediaCaption?: string;
};

export function HeroMediaShowcase({
  eyebrow,
  title,
  description,
  actions,
  mediaCaption,
}: HeroMediaShowcaseProps) {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        {/* conteúdo editorial centralizado */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {eyebrow}
            </p>
          )}

          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>

          {description && (
            <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              {description}
            </p>
          )}

          {actions && actions.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {actions.map((action) => {
                const isInternal =
                  action.href.startsWith("/") && !action.href.startsWith("//");

                return (
                  <Button
                    key={`${action.href}-${action.label}`}
                    variant={action.variant ?? "default"}
                    asChild
                  >
                    {isInternal ? (
                      <Link href={action.href}>{action.label}</Link>
                    ) : (
                      <a href={action.href}>{action.label}</a>
                    )}
                  </Button>
                );
              })}
            </div>
          )}
        </div>

        {/* media frame dominante */}
        <figure className="mt-12 md:mt-16">
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            {/* barra da janela */}
            <div className="flex items-center gap-1.5 border-b bg-muted/40 px-4 py-3">
              <span className="size-2.5 rounded-full bg-muted-foreground/30" />
              <span className="size-2.5 rounded-full bg-muted-foreground/30" />
              <span className="size-2.5 rounded-full bg-muted-foreground/30" />
              <span className="ml-3 hidden h-2.5 w-48 rounded-full bg-muted-foreground/15 sm:block" />
            </div>

            {/* painel abstrato */}
            <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,150px)_minmax(0,1fr)] sm:p-6">
              {/* sidebar */}
              <div className="hidden flex-col gap-3 sm:flex">
                <div className="h-3 w-3/4 rounded-full bg-muted-foreground/25" />
                <div className="h-2.5 w-full rounded-full bg-muted-foreground/15" />
                <div className="h-2.5 w-5/6 rounded-full bg-muted-foreground/15" />
                <div className="h-2.5 w-2/3 rounded-full bg-muted-foreground/15" />
                <div className="mt-3 h-3 w-3/4 rounded-full bg-muted-foreground/25" />
                <div className="h-2.5 w-full rounded-full bg-muted-foreground/15" />
                <div className="h-2.5 w-4/5 rounded-full bg-muted-foreground/15" />
              </div>

              {/* conteúdo principal do painel */}
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border bg-muted/30 p-3">
                    <div className="h-2 w-1/2 rounded-full bg-muted-foreground/25" />
                    <div className="mt-2 h-4 w-3/4 rounded-md bg-muted-foreground/15" />
                  </div>
                  <div className="rounded-xl border bg-muted/30 p-3">
                    <div className="h-2 w-3/5 rounded-full bg-muted-foreground/25" />
                    <div className="mt-2 h-4 w-2/3 rounded-md bg-muted-foreground/15" />
                  </div>
                  <div className="rounded-xl border bg-muted/30 p-3">
                    <div className="h-2 w-2/5 rounded-full bg-muted-foreground/25" />
                    <div className="mt-2 h-4 w-4/5 rounded-md bg-muted-foreground/15" />
                  </div>
                </div>

                <div className="flex h-32 items-end gap-2 rounded-xl border bg-muted/20 p-3 sm:h-44">
                  <div className="h-1/4 flex-1 rounded-t-md bg-muted-foreground/20" />
                  <div className="h-2/5 flex-1 rounded-t-md bg-muted-foreground/20" />
                  <div className="h-3/5 flex-1 rounded-t-md bg-muted-foreground/25" />
                  <div className="h-1/3 flex-1 rounded-t-md bg-muted-foreground/20" />
                  <div className="h-3/4 flex-1 rounded-t-md bg-muted-foreground/25" />
                  <div className="h-1/2 flex-1 rounded-t-md bg-muted-foreground/20" />
                  <div className="h-4/5 flex-1 rounded-t-md bg-primary/60" />
                </div>

                <div className="space-y-2.5 rounded-xl border bg-muted/10 p-3 sm:p-4">
                  <div className="h-2.5 w-11/12 rounded-full bg-muted-foreground/15" />
                  <div className="h-2.5 w-9/12 rounded-full bg-muted-foreground/15" />
                  <div className="h-2.5 w-10/12 rounded-full bg-muted-foreground/15" />
                  <div className="h-2.5 w-7/12 rounded-full bg-muted-foreground/15" />
                </div>
              </div>
            </div>
          </div>

          {mediaCaption && (
            <figcaption className="mt-3 text-center text-xs text-muted-foreground">
              {mediaCaption}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}
