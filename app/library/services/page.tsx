// app/library/services/page.tsx
import type { Metadata } from "next";
import { Globe2, LayoutDashboard, Workflow } from "lucide-react";
import {
  ServicesGridSimple,
  type ServicesGridSimpleProps,
} from "@/components/sections/services/services-grid-simple";
import {
  ServicesWithIcons,
  type ServicesWithIconsProps,
} from "@/components/sections/services/services-with-icons";
import { ServicesSplitWithHighlight } from "@/components/sections/services/services-split-with-highlight";

export const metadata: Metadata = {
  title: "Library · Services",
  description:
    "Seções de serviços — grid, cards com ícones e destaque com lista.",
};

// Página heterogênea (contratos diferentes) — preview ReactNode preserva a
// tipagem real de cada contrato no local do JSX (padrão da página de hero).
type ServicesItem = {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
};

// Dados do consumer — copy original preservada (Evolução 036).
const servicesGridSimpleDemo: ServicesGridSimpleProps = {
  title: "Como sua empresa ajuda os clientes",
  description:
    "Uma visão geral dos principais serviços, deixando claro o que o cliente pode esperar ao escolher o seu atendimento.",
  services: [
    {
      title: "Serviços principais",
      description:
        "Destaque os serviços que são o centro do seu trabalho, explicando de forma simples o que cada um resolve.",
    },
    {
      title: "Atendimento personalizado",
      description:
        "Mostre como o atendimento é adaptado à realidade de cada cliente, reforçando proximidade, confiança e clareza.",
    },
    {
      title: "Suporte e acompanhamento",
      description:
        "Explique como funciona o acompanhamento após a contratação: canais de contato, horários e tipo de suporte oferecido.",
    },
  ],
};

const servicesWithIconsDemo: ServicesWithIconsProps = {
  title: "Serviços que geram resultado para o seu negócio",
  description:
    "O foco é facilitar a rotina, dar mais segurança nas decisões e melhorar a experiência de quem é atendido pela sua empresa.",
  services: [
    {
      title: "Atendimento especializado",
      description:
        "Serviços pensados para as necessidades reais dos clientes, com foco em orientação clara e soluções práticas.",
      icon: Globe2,
    },
    {
      title: "Gestão e organização",
      description:
        "Apoio na organização de rotinas, prazos, documentos e informações, trazendo mais controle para o dia a dia.",
      icon: LayoutDashboard,
    },
    {
      title: "Otimização de processos",
      description:
        "Análise e melhoria de processos internos, reduzindo retrabalho e tornando o atendimento mais ágil e eficiente.",
      icon: Workflow,
    },
  ],
};

const services: ServicesItem[] = [
  {
    id: "services-grid-simple",
    name: "Grid simples",
    description: "Grade de serviços em cards iguais.",
    preview: <ServicesGridSimple {...servicesGridSimpleDemo} />,
  },
  {
    id: "services-with-icons",
    name: "Cards com ícones",
    description: "Cards de serviço com ícone de destaque.",
    preview: <ServicesWithIcons {...servicesWithIconsDemo} />,
  },
  {
    id: "services-split-with-highlight",
    name: "Serviço principal + lista",
    description: "Um serviço em destaque com os demais listados ao lado.",
    preview: <ServicesSplitWithHighlight />,
  },
];

export default function ServicesLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Services / Serviços
          </h1>
          <p className="text-sm text-muted-foreground">
            Seções de serviços para landings e sites institucionais. Os textos
            são de exemplo — troque pelos dados do seu projeto.
          </p>
        </header>

        <section className="space-y-4">
          {services.map(({ id, name, description, preview }) => (
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
