// app/(site)/layout.tsx
import type { ReactNode } from "react";
import { FooterColumns } from "@/components/site/footers/footer-columns";
import { HeaderCentered } from "@/components/site/headers/header-centered";
import { FooterCta } from "@/components/site/footers/footer-cta";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderCentered />
      <main className="flex-1">{children}</main>
      <FooterCta />
    </div>
  );
}
