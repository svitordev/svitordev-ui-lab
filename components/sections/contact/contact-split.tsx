"use client";

// components/sections/contact/contact-split.tsx
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ContactSplit() {
  const [demoVisible, setDemoVisible] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDemoVisible(true);
  }

  return (
    <section id="contact" className="w-full bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
          {/* Coluna texto */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Conte um pouco sobre o que você precisa
            </h2>
            <p className="text-sm text-muted-foreground">
              Não precisa ser nada formal. Em poucas linhas, você pode explicar como funciona
              o seu dia a dia e em que ponto gostaria de contar com a ajuda da nossa equipe.
            </p>
            <p className="text-sm text-muted-foreground">
              Com essas informações iniciais já conseguimos entender melhor o seu cenário e
              indicar o tipo de atendimento ou serviço mais adequado para o seu caso.
            </p>
            <p className="text-xs text-muted-foreground">
              Este texto pode ser adaptado para diferentes áreas: advocacia, contabilidade,
              saúde, consultoria, entre outras.
            </p>
          </div>

          {/* Coluna formulário */}
          <form
            className="space-y-4 rounded-2xl border bg-background p-4 text-sm shadow-sm"
            onSubmit={handleSubmit}
            onChange={() => setDemoVisible(false)}
          >
            <div className="space-y-1">
              <label htmlFor="contact-split-name" className="text-xs font-medium">Nome</label>
              <Input id="contact-split-name" placeholder="Seu nome" />
            </div>

            <div className="space-y-1">
              <label htmlFor="contact-split-contact" className="text-xs font-medium">E-mail ou WhatsApp</label>
              <Input id="contact-split-contact" placeholder="Seu contato principal" />
            </div>

            <div className="space-y-1">
              <label htmlFor="contact-split-subject" className="text-xs font-medium">Assunto</label>
              <Input id="contact-split-subject" placeholder="Ex.: atendimento, orçamento, dúvida, outro..." />
            </div>

            <div className="space-y-1">
              <label htmlFor="contact-split-message" className="text-xs font-medium">Mensagem</label>
              <Textarea
                id="contact-split-message"
                rows={3}
                placeholder="Explique brevemente a situação ou o serviço que você procura."
              />
            </div>

            <Button type="submit" size="sm" className="w-full md:w-auto">
              Enviar
            </Button>

            {demoVisible ? (
              <Alert role="status" aria-live="polite">
                <AlertTitle>Demonstração concluída</AlertTitle>
                <AlertDescription>
                  Este formulário funciona apenas como demonstração. Nenhum dado foi enviado.
                </AlertDescription>
              </Alert>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
