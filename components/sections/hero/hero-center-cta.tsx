// components/sections/hero/hero-center-cta.tsx
import { Button } from "@/components/ui/button";

export function HeroCenterCta() {
  return (
    <section className="w-full border-b bg-background">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-16 text-center md:py-20">
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Apresentamos sua empresa de forma clara, profissional e confiável.
        </h1>

        <p className="text-balance text-sm text-muted-foreground sm:text-base">
          Sites institucionais pensados para explicar o que você faz, para quem faz e como
          o cliente pode entrar em contato de forma simples e direta.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg">Falar com a equipe</Button>
          <Button size="lg" variant="outline">
             Ver áreas de atuação
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Ideal para escritórios, clínicas, consultorias, profissionais liberais e empresas
          de serviços em geral.
        </p>
      </div>
    </section>
  );
}
