// app/(site)/layout.tsx
import type { ReactNode } from "react";
import { HeaderCentered } from "@/components/site/headers/header-centered";
import { FooterCta } from "@/components/site/footers/footer-cta";

const headerData = {
  brand: { prefix: "Sua", suffix: "Empresa" },
  navItems: [
    { href: "/", label: "Início" },
    { href: "/#services", label: "Serviços" },
    { href: "/#about", label: "Sobre" },
    { href: "/blog", label: "Blog" },
    { href: "/#contact", label: "Contato" },
  ],
};

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderCentered brand={headerData.brand} navItems={headerData.navItems} />
      <main className="flex-1">{children}</main>
      <FooterCta />
    </div>
  );
}
