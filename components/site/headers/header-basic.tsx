// components/site/headers/header-basic.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/site/headers/mobile-nav";
import { cn } from "@/lib/utils";

type HeaderNavItem = { href: string; label: string };

type HeaderAction = { label: string; href: string };

type HeaderBasicProps = {
  brand: { prefix: string; suffix: string };
  navItems: HeaderNavItem[];
  action: HeaderAction;
};

export function HeaderBasic({ brand, navItems, action }: HeaderBasicProps) {
  const pathname = usePathname();

  return (
    <header className="border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo / Marca */}
        <Link href="/" className="text-sm font-semibold tracking-tight">
          <span className="font-bold">{brand.prefix}</span>
          <span className="text-muted-foreground">{brand.suffix}</span>
        </Link>

        {/* Navegação */}
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-4 text-xs font-medium text-muted-foreground md:flex"
        >
          {navItems.map((item) => {
            const baseHref = item.href.split("#")[0] || "/";
            const isActive = baseHref === "/" ? pathname === "/" : pathname === baseHref;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1 hover:bg-muted hover:text-foreground",
                  isActive && "bg-muted text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA + Menu mobile */}
        <div className="flex items-center gap-2">
          <Button size="sm" asChild>
            <Link href={action.href}>{action.label}</Link>
          </Button>
          <MobileNav links={navItems} />
        </div>
      </div>
    </header>
  );
}
