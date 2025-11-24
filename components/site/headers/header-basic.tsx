// components/site/headers/header-basic.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/#services", label: "Serviços" },
  { href: "/#about", label: "Sobre" },
  { href: "/#contact", label: "Contato" },
];

export function HeaderBasic() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo / Marca */}
        <Link href="/" className="text-sm font-semibold tracking-tight">
          <span className="font-bold">Sua</span>
          <span className="text-muted-foreground">Empresa</span>
        </Link>

        {/* Navegação */}
        <nav className="hidden items-center gap-4 text-xs font-medium text-muted-foreground md:flex">
          {navLinks.map((item) => {
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

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Button size="sm">
            Entrar em contato
          </Button>
        </div>
      </div>
    </header>
  );
}
