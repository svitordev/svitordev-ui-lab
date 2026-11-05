// components/sections/cta/sticky-cta-bar.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type StickyCtaAction = {
  label: string;
  href: string;
  variant?: "default" | "outline";
};

export type StickyCtaBarProps = {
  title: string;
  description?: string;
  actions: StickyCtaAction[];
};

export function StickyCtaBar({ title, description, actions }: StickyCtaBarProps) {
  return (
    <aside className="sticky bottom-0 border-t bg-background px-4 py-3 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* copy */}
        <div className="space-y-1">
          <p className="text-sm font-semibold">{title}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>

        {/* actions */}
        {actions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {actions.map((action) => {
              const isInternal =
                action.href.startsWith("/") && !action.href.startsWith("//");

              return (
                <Button
                  key={`${action.href}-${action.label}`}
                  variant={action.variant ?? "default"}
                  size="sm"
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
    </aside>
  );
}
