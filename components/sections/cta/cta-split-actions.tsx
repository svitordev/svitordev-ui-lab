// components/sections/cta/cta-split-actions.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type CtaAction = {
  label: string;
  href: string;
  variant?: "default" | "outline";
};

export type CtaSplitActionsProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  supportingText?: string;
  actions: CtaAction[];
};

export function CtaSplitActions({
  eyebrow,
  title,
  description,
  supportingText,
  actions,
}: CtaSplitActionsProps) {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          {/* coluna editorial */}
          <div className="space-y-3">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
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

          {/* painel de conversão */}
          <div className="space-y-4 rounded-2xl border bg-muted/30 p-6 shadow-sm">
            {supportingText && (
              <p className="text-sm text-muted-foreground">{supportingText}</p>
            )}
            <div className="flex flex-wrap gap-3">
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
          </div>
        </div>
      </div>
    </section>
  );
}
