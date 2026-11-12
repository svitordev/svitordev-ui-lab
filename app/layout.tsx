// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ConsentPreferencesBanner } from "@/components/site/consent/consent-preferences";

// Evolução 023 — nome oficial do projeto (README/AGENTS) + title template:
// páginas declaram apenas o título próprio e o sufixo é aplicado pelo template.
// metadataBase/canonical/OG/Twitter permanecem adiados — sem origem pública oficial.
export const metadata: Metadata = {
  title: {
    default: "Svitordev UI Lab",
    template: "%s | Svitordev UI Lab",
  },
  description:
    "Template base de landing e blog em Next.js, Tailwind e shadcn/ui.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        {/* Evolução 035 — banner de preferências (client leaf; layout permanece Server). */}
        <ConsentPreferencesBanner />
      </body>
    </html>
  );
}
