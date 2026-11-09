// app/library/alerts/page.tsx
// Evolução 027 — primitive Alert (feedback estático via tokens/CVA). Server
// Component; o primitive não impõe live region — role/aria-live pertencem ao
// consumer (028 decidirá a semântica de anúncio no form). Demo sem interação.
import type { Metadata } from "next";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata: Metadata = {
  title: "Library · Alerts",
  description:
    "Alertas de feedback para formulários e ações da interface, com variantes baseadas nos tokens existentes.",
};

type AlertEntry = {
  id: string;
  name: string;
  description: string;
  variant: "default" | "destructive";
  title: string;
  text: string;
};

const alerts: AlertEntry[] = [
  {
    id: "alert",
    name: "Alerta informativo",
    description:
      "Feedback neutro para confirmações e avisos sem urgência. O texto carrega o significado, sem depender apenas de cor.",
    variant: "default",
    title: "Prazo de resposta",
    text: "As mensagens são respondidas em até 1 dia útil, por ordem de chegada.",
  },
  {
    id: "alert",
    name: "Alerta de erro",
    description:
      "Variante destrutiva para feedback de falha. A mensagem explica o problema e a ação corretiva.",
    variant: "destructive",
    title: "Falha no envio",
    text: "Verifique os campos destacados e tente novamente.",
  },
];

export default function AlertsLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Alerts / Feedback
          </h1>
          <p className="text-sm text-muted-foreground">
            Alertas de feedback para formulários e ações da interface. O
            primitive é estático e não impõe live region — a semântica de
            anúncio é decisão de quem consome.
          </p>
        </header>

        <section className="space-y-4">
          {alerts.map(({ id, name, description, variant, title, text }) => (
            <div
              key={name}
              className="space-y-3 rounded-2xl border bg-muted/20 p-4 text-sm shadow-sm"
            >
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-base font-semibold">{name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {description}
                  </p>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Componente: <code className="font-mono text-[10px]">{id}</code>
                </p>
              </div>

              {/* Preview */}
              <div className="overflow-hidden rounded-xl border bg-background">
                <Alert variant={variant}>
                  <AlertTitle>{title}</AlertTitle>
                  <AlertDescription>{text}</AlertDescription>
                </Alert>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
