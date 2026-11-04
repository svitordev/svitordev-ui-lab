// app/library/contact/page.tsx
import type { Metadata } from "next";
import { ContactSimple } from "@/components/sections/contact/contact-simple";
import { ContactSplit } from "@/components/sections/contact/contact-split";
import { ContactDetails } from "@/components/sections/contact/contact-details";

export const metadata: Metadata = {
  title: "Library · Contact",
  description: "Formulários de contato e canais diretos.",
};

type ContactItem = {
  id: string;
  name: string;
  description: string;
  Component: React.ComponentType;
};

const contacts: ContactItem[] = [
  {
    id: "contact-simple",
    name: "Formulário centralizado",
    description: "Formulário direto ao centro, sem distrações.",
    Component: ContactSimple,
  },
  {
    id: "contact-split",
    name: "Texto + formulário em card",
    description: "Mensagem de apoio em uma coluna e formulário na outra.",
    Component: ContactSplit,
  },
  {
    id: "contact-details",
    name: "Contatos + formulário resumido",
    description: "Canais diretos ao lado de um formulário curto.",
    Component: ContactDetails,
  },
];

export default function ContactLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Contact / Contato
          </h1>
          <p className="text-sm text-muted-foreground">
            Formulários e canais de contato. Os textos são de exemplo — troque
            pelos dados do seu projeto.
          </p>
        </header>

        <section className="space-y-4">
          {contacts.map(({ id, name, description, Component }) => (
            <div
              key={id}
              className="space-y-3 rounded-2xl border bg-muted/20 p-4 text-sm shadow-sm"
            >
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-base font-semibold">{name}</h2>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Componente: <code className="font-mono text-[10px]">{id}</code>
                </p>
              </div>

              {/* Preview */}
              <div className="overflow-hidden rounded-xl border bg-background">
                <Component />
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
