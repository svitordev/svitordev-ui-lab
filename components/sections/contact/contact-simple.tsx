"use client";

// components/sections/contact/contact-simple.tsx
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ContactSimple() {
  const [demoVisible, setDemoVisible] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDemoVisible(true);
  }

  return (
    <section id="contact" className="w-full bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="mb-6 space-y-2 text-center">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Fale com nossa equipe
          </h2>
          <p className="text-sm text-muted-foreground">
            Preencha os dados abaixo com suas informações e sua dúvida ou necessidade.
            Entraremos em contato o mais breve possível.
          </p>
        </div>

        <form
          className="space-y-4 rounded-2xl border bg-muted/30 p-4 shadow-sm"
          onSubmit={handleSubmit}
          onChange={() => setDemoVisible(false)}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1 text-sm">
              <label htmlFor="contact-simple-name" className="text-xs font-medium">Nome</label>
              <Input id="contact-simple-name" placeholder="Seu nome completo" />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="contact-simple-email" className="text-xs font-medium">E-mail</label>
              <Input id="contact-simple-email" type="email" placeholder="seuemail@exemplo.com" />
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="contact-simple-subject" className="text-xs font-medium">Assunto</label>
            <Input id="contact-simple-subject" placeholder="Ex.: atendimento, orçamento, dúvida, outro..." />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="contact-simple-message" className="text-xs font-medium">Mensagem</label>
            <Textarea
              id="contact-simple-message"
              rows={4}
              placeholder="Conte brevemente sobre a sua necessidade ou o serviço que você procura."
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="sm">
              Enviar mensagem
            </Button>
          </div>

          {demoVisible ? (
            <Alert role="status" aria-live="polite">
              <AlertTitle>Demonstração concluída</AlertTitle>
              <AlertDescription>
                Este formulário funciona apenas como demonstração. Nenhum dado foi enviado.
              </AlertDescription>
            </Alert>
          ) : null}

          <p className="text-[11px] text-muted-foreground">
            Este formulário pode ser integrado com e-mail, ferramentas de atendimento ou CRM,
            de acordo com a necessidade da empresa.
          </p>
        </form>
      </div>
    </section>
  );
}
