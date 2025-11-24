// components/sections/contact/contact-details.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const contactInfo = [
  {
    Icon: Phone,
    label: "WhatsApp",
    value: "(00) 00000-0000",
    hint: "Atualize com o número oficial de atendimento da empresa.",
  },
  {
    Icon: Mail,
    label: "E-mail",
    value: "contato@suaempresa.com",
    hint: "Endereço de e-mail usado para receber mensagens do site.",
  },
  {
    Icon: MapPin,
    label: "Localização",
    value: "Cidade / Estado",
    hint: "Informe a cidade de atuação ou o endereço do escritório, se fizer sentido.",
  },
];

export function ContactDetails() {
  return (
    <section id="contact" className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start">
          {/* Informações de contato */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Canais de contato
            </h2>
            <p className="text-sm text-muted-foreground">
              O cliente pode enviar uma mensagem pelo formulário ou utilizar diretamente os canais abaixo.
            </p>

            <div className="space-y-3 text-sm text-muted-foreground">
              {contactInfo.map(({ Icon, label, value, hint }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 rounded-2xl border bg-muted/30 p-3"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-background">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                      {label}
                    </p>
                    <p className="text-sm">{value}</p>
                    <p className="text-[11px] text-muted-foreground">{hint}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulário resumido */}
          <form className="space-y-4 rounded-2xl border bg-muted/20 p-4 text-sm shadow-sm">
            <div className="space-y-1">
              <label className="text-xs font-medium">Nome</label>
              <Input placeholder="Seu nome" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium">Mensagem</label>
              <Textarea
                rows={4}
                placeholder="Conte em poucas linhas como podemos ajudar."
              />
            </div>
            <Button type="submit" size="sm">
              Enviar mensagem
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
