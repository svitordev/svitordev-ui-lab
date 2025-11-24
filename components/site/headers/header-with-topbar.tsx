// components/site/headers/header-with-topbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Phone, Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/#services", label: "Serviços" },
  { href: "/#about", label: "Sobre" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contato" },
];

export function HeaderWithTopbar() {
  const pathname = usePathname();

  return (
    <header className="bg-background">
      {/* Topbar */}
      <div className="border-b bg-muted/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 text-[11px] text-muted-foreground">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Phone className="h-3 w-3" />
              (00) 00000-0000
            </span>
            <span className="inline-flex items-center gap-1">
              <Mail className="h-3 w-3" />
              contato@suaempresa.com
            </span>
          </div>
          <span className="hidden md:inline">
            Atendimento em horário comercial ou conforme a política da empresa.
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Marca */}
          <Link href="/" className="text-sm font-semibold tracking-tight">
            <span className="font-bold">Sua</span>
            <span className="text-muted-foreground">Empresa</span>
          </Link>

          {/* Navegação */}
          <nav className="hidden items-center gap-3 text-xs font-medium text-muted-foreground md:flex">
            {navLinks.map((item) => {
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
        </div>
      </div>
    </header>
  );
}
