// components/site/headers/header-with-topbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/site/headers/mobile-nav";
import { Phone, Mail } from "lucide-react";

type HeaderNavItem = { href: string; label: string };

type HeaderWithTopbarProps = {
  brand: { prefix: string; suffix: string };
  navItems: HeaderNavItem[];
  topbar: { phone: string; email: string; note?: string };
};

export function HeaderWithTopbar({ brand, navItems, topbar }: HeaderWithTopbarProps) {
  const pathname = usePathname();

  return (
    <header className="bg-background">
      {/* Topbar */}
      <div className="border-b bg-muted/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 text-[11px] text-muted-foreground">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {topbar.phone}
            </span>
            <span className="inline-flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {topbar.email}
            </span>
          </div>
          {topbar.note ? (
            <span className="hidden md:inline">{topbar.note}</span>
          ) : null}
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Marca */}
          <Link href="/" className="text-sm font-semibold tracking-tight">
            <span className="font-bold">{brand.prefix}</span>
            <span className="text-muted-foreground">{brand.suffix}</span>
          </Link>

          {/* Navegação */}
          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-3 text-xs font-medium text-muted-foreground md:flex"
          >
            {navItems.map((item) => {
              const baseHref = item.href.split("#")[0] || "/";
              const isActive =
                baseHref === "/" ? pathname === "/" : pathname === baseHref;

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

          {/* Menu mobile */}
          <MobileNav links={navItems} />
        </div>
      </div>
    </header>
  );
}
