// components/sections/services/services-split-with-highlight.tsx
const mainService = {
  title: "Serviço principal para o seu dia a dia",
  desc: "Quando as soluções improvisadas já não dão conta da rotina, é hora de contar com um serviço estruturado, pensado para o jeito que o seu negócio funciona.",
};

const secondaryPoints = [
  "Mapeamento da situação atual e das principais necessidades.",
  "Organização de etapas, responsáveis e prazos de cada demanda.",
  "Definição clara do que será entregue e de como será o acompanhamento.",
  "Possibilidade de ajustes conforme o negócio evolui ou as prioridades mudam.",
];

export function ServicesSplitWithHighlight() {
  return (
    <section className="w-full bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
          {/* Destaque principal */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              {mainService.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mainService.desc}
            </p>

            <div className="rounded-2xl border bg-background p-4 text-xs text-muted-foreground shadow-sm">
              <p className="mb-1 font-semibold text-foreground">
                Exemplo de uso:
              </p>
              <p>
                Um escritório que antes organizava prazos, retornos e atendimentos apenas por
                mensagens e anotações pode estruturar tudo em um fluxo claro, com etapas,
                responsáveis e formas de acompanhamento definidas para cada cliente.
              </p>
            </div>
          </div>

          {/* Lista de benefícios */}
          <div className="space-y-3 rounded-2xl border bg-background p-4 text-sm shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              O que esse tipo de serviço pode incluir
            </p>

            <ul className="space-y-2 text-xs text-muted-foreground">
              {secondaryPoints.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <p className="pt-2 text-[11px] text-muted-foreground">
              Este bloco pode ser adaptado para consultorias, escritórios, clínicas, estúdios
              e outros negócios que prestam serviços personalizados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
