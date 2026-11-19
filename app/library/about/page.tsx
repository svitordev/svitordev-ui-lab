// app/library/about/page.tsx
import type { Metadata } from "next";
import { AboutSimple } from "@/components/sections/about/about-simple";
import { AboutSplit } from "@/components/sections/about/about-split";
import {
  AboutTimeline,
  type AboutTimelineProps,
} from "@/components/sections/about/about-timeline";

export const metadata: Metadata = {
  title: "Library · About",
  description: "Seções sobre a empresa — simples, em duas colunas e timeline.",
};

// Página heterogênea (só o timeline recebe props) — preview ReactNode preserva a
// tipagem real do contrato no local do JSX (padrão das páginas heterogêneas).
type AboutItem = {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
};

// Dados do consumer — copy original preservada (Evolução 037).
const aboutTimelineDemo: AboutTimelineProps = {
  title: "Um pouco da nossa trajetória",
  description:
    "Uma história construída ao lado de clientes que confiam no nosso trabalho e crescem junto conosco.",
  items: [
    {
      title: "Início das atividades",
      description:
        "Primeiros atendimentos, entendendo na prática as principais necessidades dos clientes e da área de atuação.",
    },
    {
      title: "Crescimento e consolidação",
      description:
        "Ampliação da carteira de clientes, organização dos processos internos e aprofundamento em serviços especializados.",
    },
    {
      title: "Atuação atual",
      description:
        "Atendimento focado em oferecer soluções personalizadas, com acompanhamento próximo e foco em resultados concretos para cada cliente.",
    },
  ],
  supportingText:
    "Você pode adaptar os textos dessa linha do tempo para escritórios, clínicas, consultorias e outros tipos de empresas, mantendo a mesma estrutura visual.",
};

const abouts: AboutItem[] = [
  {
    id: "about-simple",
    name: "About simples",
    description: "Bloco direto sobre a empresa, sem distrações.",
    preview: <AboutSimple />,
  },
  {
    id: "about-split",
    name: "About em duas colunas",
    description: "Texto e destaque lado a lado em telas grandes.",
    preview: <AboutSplit />,
  },
  {
    id: "about-timeline",
    name: "Timeline / trajetória",
    description: "Linha do tempo da empresa em etapas.",
    preview: <AboutTimeline {...aboutTimelineDemo} />,
  },
];

export default function AboutLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            About / Sobre
          </h1>
          <p className="text-sm text-muted-foreground">
            Seções sobre a empresa para páginas institucionais. Os textos são de
            exemplo — troque pelos dados do seu projeto.
          </p>
        </header>

        <section className="space-y-4">
          {abouts.map(({ id, name, description, preview }) => (
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
                {preview}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
