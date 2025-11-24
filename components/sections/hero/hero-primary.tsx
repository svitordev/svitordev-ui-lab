// components/sections/hero/hero-primary.tsx
import { Button } from "@/components/ui/button";

export function HeroPrimary() {
  return (
    <section className="w-full border-b bg-linear-to-b from-background to-muted/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-16 md:flex-row md:py-24">
        {/* Coluna texto */}
        <div className="flex-1 space-y-6">
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Site institucional · Empresas e profissionais
          </span>

          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Apresente sua empresa com clareza, profissionalismo e confiança.
          </h1>

          <p className="max-w-xl text-balance text-sm text-muted-foreground sm:text-base">
            Uma página inicial pensada para explicar quem você é, em que atua e como pode
            ajudar seus clientes, com destaque para seus principais serviços e formas de contato.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg">
              Ver serviços
            </Button>
            <Button size="lg" variant="outline">
              Falar com a equipe
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Esse modelo funciona bem para escritórios, clínicas, consultorias e outros negócios
            que prestam serviços e querem uma presença online clara e organizada.
          </p>
        </div>

        {/* Coluna visual */}
        <div className="flex-1">
          <div className="relative mx-auto w-full max-w-md rounded-2xl border bg-background p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Página inicial</span>
              <span>Visualização</span>
            </div>

            {/* “print” da hero genérica */}
            <div className="h-40 rounded-xl border bg-muted" />

            <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] text-muted-foreground">
              <div className="h-10 rounded-md border bg-background" />
              <div className="h-10 rounded-md border bg-background" />
              <div className="h-10 rounded-md border bg-background" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
