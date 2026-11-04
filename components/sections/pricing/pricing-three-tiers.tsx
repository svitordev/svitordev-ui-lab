// components/sections/pricing/pricing-three-tiers.tsx
"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export type PricingInterval = "monthly" | "yearly";

export type PricingAction = {
  label: string;
  href: string;
  variant?: "default" | "outline";
};

export type PricingPlan = {
  name: string;
  description?: string;
  prices: Record<PricingInterval, string>;
  features: string[];
  action: PricingAction;
  featured?: boolean;
};

export type PricingThreeTiersProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  billingLabel: string;
  monthlyLabel: string;
  yearlyLabel: string;
  plans: PricingPlan[];
};

// Convenção 001: interno (começa com "/" mas não "//") → next/link; protocolo/externo → <a>.
function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function PricingThreeTiers({
  eyebrow,
  title,
  description,
  billingLabel,
  monthlyLabel,
  yearlyLabel,
  plans,
}: PricingThreeTiersProps) {
  const [interval, setInterval] = React.useState<PricingInterval>("monthly");

  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
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

        {/* Toggle de período: grupo acessível de botões pressionáveis — sem tablist
            (não há tabpanels) e sem switch (opções mutuamente exclusivas nomeadas). */}
        <div
          role="group"
          aria-label={billingLabel}
          className="mb-8 flex justify-center gap-2"
        >
          <Button
            type="button"
            size="sm"
            variant={interval === "monthly" ? "default" : "outline"}
            aria-pressed={interval === "monthly"}
            onClick={() => setInterval("monthly")}
          >
            {monthlyLabel}
          </Button>
          <Button
            type="button"
            size="sm"
            variant={interval === "yearly" ? "default" : "outline"}
            aria-pressed={interval === "yearly"}
            onClick={() => setInterval("yearly")}
          >
            {yearlyLabel}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex h-full flex-col rounded-2xl border bg-muted/20 p-4 text-sm shadow-sm ${
                plan.featured ? "border-foreground" : ""
              }`}
            >
              <div className="mb-3 space-y-1">
                <h3 className="text-base font-semibold">{plan.name}</h3>
                <p className="text-lg font-bold">{plan.prices[interval]}</p>
                {plan.description ? (
                  <p className="text-xs text-muted-foreground">{plan.description}</p>
                ) : null}
              </div>

              <ul className="mb-4 flex-1 space-y-1.5 text-xs text-muted-foreground">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button size="sm" variant={plan.action.variant ?? "default"} asChild>
                {isInternalHref(plan.action.href) ? (
                  <Link href={plan.action.href}>{plan.action.label}</Link>
                ) : (
                  <a href={plan.action.href}>{plan.action.label}</a>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
