// components/sections/hero/hero-center-cta.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type HeroCenterAction = {
  label: string;
  href: string;
  variant?: "default" | "outline";
};

export type HeroCenterCtaProps = {
  title: string;
  description?: string;
  supportingText?: string;
  actions?: HeroCenterAction[];
};

export function HeroCenterCta({
  title,
  description,
  supportingText,
  actions,
}: HeroCenterCtaProps) {
  return (
    <section className="w-full border-b bg-background">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-16 text-center md:py-20">
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>

        {description ? (
          <p className="text-balance text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}

        {actions && actions.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {actions.map((action) => {
              const isInternal =
                action.href.startsWith("/") && !action.href.startsWith("//");

              return (
                <Button
                  key={`${action.href}-${action.label}`}
                  variant={action.variant ?? "default"}
                  size="lg"
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
        ) : null}

        {supportingText ? (
          <p className="text-xs text-muted-foreground">{supportingText}</p>
        ) : null}
      </div>
    </section>
  );
}
