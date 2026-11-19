// components/site/headers/header-centered.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type HeaderNavItem = { href: string; label: string };

type HeaderCenteredProps = {
  brand: { prefix: string; suffix: string };
  navItems: HeaderNavItem[];
};

export function HeaderCentered({ brand, navItems }: HeaderCenteredProps) {
  const pathname = usePathname();

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-3">
        {/* Logo / Marca */}
        <Link href="/" className="text-sm font-semibold tracking-tight">
          <span className="font-bold">{brand.prefix}</span>{" "}
          <span className="text-muted-foreground">{brand.suffix}</span>
        </Link>

        {/* Navegação centralizada */}
        <nav
          aria-label="Navegação principal"
          className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-muted-foreground"
        >
          {navItems.map((item) => {
            // ignora o hash na verificação de rota ativa
            const baseHref = item.href.split("#")[0] || "/";
            const isActive =
              baseHref === "/"
                ? pathname === "/"
                : pathname === baseHref;

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
      </div>
    </header>
  );
}
