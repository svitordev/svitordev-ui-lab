// app/library/faq/page.tsx
import type { Metadata } from "next";
import {
  FaqAccordion,
  type FaqAccordionProps,
} from "@/components/sections/faq/faq-accordion";

export const metadata: Metadata = {
  title: "Library · FAQ",
  description:
    "Perguntas frequentes em accordion acessível — uma resposta por vez, operável por teclado.",
};

type FaqEntry = {
  id: string;
  name: string;
  description: string;
  props: FaqAccordionProps;
};

// Demo data-driven — conteúdo genérico do Lab; os dados vivem na página (consumer).
const faqs: FaqEntry[] = [
  {
    id: "faq-accordion",
    name: "FAQ accordion",
    description:
      "Perguntas e respostas em accordion acessível — uma aberta por vez, com colapso do item aberto. Os dados vêm de fora.",
    props: {
      eyebrow: "Dúvidas frequentes",
      title: "Perguntas frequentes",
      description:
        "O que você precisa saber antes de montar uma página com as peças do laboratório.",
      items: [
        {
          question: "Posso reutilizar estes componentes em outros projetos?",
          answer:
            "Sim. Cada seção é independente e recebe o conteúdo por dados — troque os textos pelos dados do seu projeto.",
        },
        {
          question: "Os componentes funcionam bem em dispositivos móveis?",
          answer:
            "Sim. As seções são pensadas para mobile primeiro e validadas em telas pequenas e grandes.",
        },
        {
          question: "Posso personalizar cores, fontes e conteúdo?",
          answer:
            "Sim. A identidade visual é definida por design tokens — trocar as variáveis do tema atualiza todos os componentes.",
        },
        {
          question: "Os componentes são acessíveis por teclado?",
          answer:
            "Sim. Os controles interativos usam elementos nativos com foco visível e semântica ARIA quando necessária.",
        },
        {
          question: "Preciso instalar dependências adicionais?",
          answer:
            "Apenas as dependências do projeto. Cada primitivo documenta o que utiliza — nada é instalado sem necessidade.",
        },
        {
          question: "Como integro estas seções no meu projeto Next.js?",
          answer:
            "Copie os componentes para o projeto, ajuste os tokens no CSS global e monte a página na ordem desejada.",
        },
      ],
    },
  },
];

export default function FaqLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            FAQ / Perguntas frequentes
          </h1>
          <p className="text-sm text-muted-foreground">
            Perguntas e respostas em accordion acessível. Os dados são de
            exemplo — troque pelos dados do seu projeto.
          </p>
        </header>

        <section className="space-y-4">
          {faqs.map(({ id, name, description, props }) => (
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
                <FaqAccordion {...props} />
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
