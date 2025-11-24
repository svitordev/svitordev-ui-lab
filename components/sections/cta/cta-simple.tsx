// components/sections/cta/cta-simple.tsx
import { Button } from "@/components/ui/button";

export function CtaSimple() {
  return (
    <section className="w-full border-t bg-muted/40">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-12 text-center md:py-16">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
          Quer entender como podemos ajudar o seu negócio?
        </h2>
        <p className="text-sm text-muted-foreground">
          Envie uma mensagem com um resumo da sua necessidade. Vamos avaliar o cenário e
          indicar o melhor caminho de forma clara e objetiva.
        </p>
        <Button size="lg">Entrar em contato</Button>
        <p className="text-[11px] text-muted-foreground">
          Pode ser para tirar dúvidas, pedir um orçamento ou agendar uma conversa inicial.
        </p>
      </div>
    </section>
  );
}
