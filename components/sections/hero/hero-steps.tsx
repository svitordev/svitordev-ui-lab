// components/sections/hero/hero-steps.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type HeroStep = {
  title: string;
  description: string;
};

export type HeroStepsAction = {
  label: string;
  href: string;
  variant?: "default" | "outline";
};

export type HeroStepsProps = {
  title: string;
  description?: string;
  steps: HeroStep[];
  action?: HeroStepsAction;
  supportingText?: string;
};

// Convenção 001: interno (começa com "/" mas não "//") → next/link; protocolo/externo → <a>.
function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function HeroSteps({
  title,
  description,
  steps,
  action,
  supportingText,
}: HeroStepsProps) {
  return (
    <section className="w-full bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
          {/* Coluna texto */}
          <div className="space-y-6">
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h1>

            {description ? (
              <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
                {description}
              </p>
            ) : null}

            {action ? (
              <Button variant={action.variant ?? "default"} size="lg" asChild>
                {isInternalHref(action.href) ? (
                  <Link href={action.href}>{action.label}</Link>
                ) : (
                  <a href={action.href}>{action.label}</a>
                )}
              </Button>
            ) : null}
          </div>

          {/* Coluna steps */}
          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-xl border bg-background/80 p-4 shadow-sm"
              >
                <h2 className="text-sm font-semibold">{step.title}</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
            {supportingText ? (
              <p className="text-[11px] text-muted-foreground">{supportingText}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
