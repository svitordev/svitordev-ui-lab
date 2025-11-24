// components/sections/sections-shell.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sectionLinks = [
  { href: "/library/headers", label: "Headers" },
  { href: "/library/hero", label: "Heros" },
  { href: "/library/services", label: "Services" },
  { href: "/library/about", label: "Abouts" },
  { href: "/library/testimonials", label: "Testimonials" },
  { href: "/library/pricing", label: "Pricings" },
  { href: "/library/contact", label: "Contacts" },
  { href: "/library/cta", label: "CTAs" },
  { href: "/library/footers", label: "Footers" },
];

export function SectionsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background">
      {/* topo da área de sections */}
      <div className="border-b bg-background/80">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Library de sections</h1>
              <p className="text-xs text-muted-foreground">
                Escolha o tipo de seção que você quer visualizar e reaproveitar nos projetos.
              </p>
            </div>

            {/* sub-menu interno */}
            <nav className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
              {sectionLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full border px-3 py-1 hover:bg-muted hover:text-foreground",
                    pathname === item.href && "bg-muted text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* conteúdo da section selecionada */}
      <div className="space-y-10 pb-12">{children}</div>
    </main>
  );
}
