// app/library/hero/page.tsx
import type { Metadata } from "next";
import {
  HeroPrimary,
  type HeroPrimaryProps,
} from "@/components/sections/hero/hero-primary";
import {
  HeroCenterCta,
  type HeroCenterCtaProps,
} from "@/components/sections/hero/hero-center-cta";
import { HeroSteps } from "@/components/sections/hero/hero-steps";
import {
  HeroMediaShowcase,
  type HeroMediaShowcaseProps,
} from "@/components/sections/hero/hero-media-showcase";

export const metadata: Metadata = {
  title: "Library · Hero",
  description:
    "Modelos de hero para landings — split, centralizada com CTA, etapas e showcase vertical.",
};

// Página heterogênea (contratos diferentes) — preview ReactNode preserva a
// tipagem real de cada contrato no local do JSX, sem tipo genérico inseguro.
type HeroItem = {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
};

const heroPrimaryDemo: HeroPrimaryProps = {
  eyebrow: "Site institucional · Empresas e profissionais",
  title: "Apresente sua empresa com clareza, profissionalismo e confiança.",
  description:
    "Uma página inicial pensada para explicar quem você é, em que atua e como pode ajudar seus clientes, com destaque para seus principais serviços e formas de contato.",
  supportingText:
    "Esse modelo funciona bem para escritórios, clínicas, consultorias e outros negócios que prestam serviços e querem uma presença online clara e organizada.",
  actions: [
    { label: "Ver serviços", href: "/#services", variant: "default" },
    { label: "Falar com a equipe", href: "/#contact", variant: "outline" },
  ],
  mediaTitle: "Página inicial",
  mediaBadge: "Visualização",
};

const heroCenterCtaDemo: HeroCenterCtaProps = {
  title: "Apresentamos sua empresa de forma clara, profissional e confiável.",
  description:
    "Sites institucionais pensados para explicar o que você faz, para quem faz e como o cliente pode entrar em contato de forma simples e direta.",
  supportingText:
    "Ideal para escritórios, clínicas, consultorias, profissionais liberais e empresas de serviços em geral.",
  actions: [
    {
      label: "Falar com a equipe",
      href: "mailto:contato@suaempresa.com",
      variant: "default",
    },
    {
      label: "Ver conteúdos",
      href: "/blog",
      variant: "outline",
    },
  ],
};

const heroMediaShowcaseDemo: HeroMediaShowcaseProps = {
  eyebrow: "Produto",
  title: "Veja seu negócio funcionando em um painel claro e objetivo.",
  description:
    "Modelo para produtos digitais, SaaS e portfólios: a mensagem principal vem no topo e o produto em destaque logo abaixo.",
  actions: [
    {
      label: "Começar agora",
      href: "mailto:contato@suaempresa.com",
      variant: "default",
    },
    {
      label: "Ver exemplos no blog",
      href: "/blog",
      variant: "outline",
    },
  ],
  mediaCaption: "Painel ilustrativo montado com HTML e Tailwind — sem imagem.",
};

const heros: HeroItem[] = [
  {
    id: "hero-primary",
    name: "Split layout (texto + preview)",
    description:
      "Mensagem à esquerda e preview à direita — a hero principal para a maioria das landings.",
    preview: <HeroPrimary {...heroPrimaryDemo} />,
  },
  {
    id: "hero-center-cta",
    name: "Centralizada com CTA",
    description:
      "Conteúdo centralizado com até dois CTAs — título, textos e ações vêm por dados.",
    preview: <HeroCenterCta {...heroCenterCtaDemo} />,
  },
  {
    id: "hero-steps",
    name: "Hero com etapas do processo",
    description:
      "Mostra o caminho até a contratação em etapas antes da chamada para ação.",
    preview: <HeroSteps />,
  },
  {
    id: "hero-media-showcase",
    name: "Showcase vertical com media frame",
    description:
      "Editorial no topo e media frame dominante abaixo — para produtos digitais e portfólios.",
    preview: <HeroMediaShowcase {...heroMediaShowcaseDemo} />,
  },
];

export default function HeroLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Hero / Destaques
          </h1>
          <p className="text-sm text-muted-foreground">
            Modelos de hero para suas landings. Importe o componente direto na
            página do cliente ou copie a estrutura e adapte.
          </p>
        </header>

        <section className="space-y-4">
          {heros.map(({ id, name, description, preview }) => (
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
