// components/sections/hero/hero-primary.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type HeroPrimaryAction = {
  label: string;
  href: string;
  variant?: "default" | "outline";
};

export type HeroPrimaryProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  supportingText?: string;
  actions: HeroPrimaryAction[];
  mediaTitle?: string;
  mediaBadge?: string;
};

// Convenção 001: interno (começa com "/" mas não "//") → next/link; protocolo/externo → <a>.
function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function HeroPrimary({
  eyebrow,
  title,
  description,
  supportingText,
  actions,
  mediaTitle,
  mediaBadge,
}: HeroPrimaryProps) {
  return (
    <section className="w-full border-b bg-linear-to-b from-background to-muted/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-16 md:flex-row md:py-24">
        {/* Coluna texto */}
        <div className="flex-1 space-y-6">
          {eyebrow ? (
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {eyebrow}
            </span>
          ) : null}

          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>

          {description ? (
            <p className="max-w-xl text-balance text-sm text-muted-foreground sm:text-base">
              {description}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            {actions.map((action) => (
              <Button
                key={`${action.href}-${action.label}`}
                variant={action.variant ?? "default"}
                size="lg"
                asChild
              >
                {isInternalHref(action.href) ? (
                  <Link href={action.href}>{action.label}</Link>
                ) : (
                  <a href={action.href}>{action.label}</a>
                )}
              </Button>
            ))}
          </div>

          {supportingText ? (
            <p className="text-xs text-muted-foreground">{supportingText}</p>
          ) : null}
        </div>

        {/* Coluna visual */}
        <div className="flex-1">
          <div className="relative mx-auto w-full max-w-md rounded-2xl border bg-background p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>{mediaTitle}</span>
              <span>{mediaBadge}</span>
            </div>

            {/* “print” da hero genérica */}
            <div className="h-40 rounded-xl border bg-muted" />

            <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] text-muted-foreground">
              <div className="h-10 rounded-md border bg-background" />
              <div className="h-10 rounded-md border bg-background" />
              <div className="h-10 rounded-md border bg-background" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
