// app/library/testimonials/page.tsx
import type { Metadata } from "next";
import { TestimonialsGrid } from "@/components/sections/testimonials/testimonials-grid";
import { TestimonialsHighlight } from "@/components/sections/testimonials/testimonials-highlight";
import { TestimonialsColumns } from "@/components/sections/testimonials/testimonials-columns";
import {
  TestimonialsRatingCards,
  type ReviewItem,
} from "@/components/sections/testimonials/testimonials-rating-cards";

export const metadata: Metadata = {
  title: "Library · Testimonials",
  description:
    "Prova social — grid, destaque, colunas e review cards com rating.",
};

// Página heterogênea (rating cards tem contrato próprio) — preview ReactNode
// preserva a tipagem real no local do JSX.
type TestimonialsItem = {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
};

const NEUTRAL_AVATAR_DATA_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23a78bfa'/%3E%3Ccircle cx='20' cy='16' r='7' fill='%23ede9fe'/%3E%3Ccircle cx='20' cy='34' r='12' fill='%23ede9fe'/%3E%3C/svg%3E";

const ratingCardItems: ReviewItem[] = [
  {
    quote: "\u201cResumo direto: organizou a rotina e melhorou o atendimento.\u201d",
    author: "Ana Souza",
    role: "Consultora",
    rating: 5,
    avatar: {
      src: NEUTRAL_AVATAR_DATA_URL,
      alt: "",
      fallback: "AS",
    },
  },
  {
    quote: "\u201cA implantação foi tranquila, o time acompanhou cada etapa com clareza, e o resultado apareceu já nas primeiras semanas de uso no dia a dia da equipe.\u201d",
    author: "Ricardo Almeida Albuquerque",
    role: "Diretor de Operações",
    rating: 4,
    avatar: {
      src: "/__avatar-009-missing__.svg",
      fallback: "RA",
    },
  },
  {
    quote: "\u201cSuporte atencioso do começo ao fim do projeto.\u201d",
    author: "Beatriz Lima",
    rating: 5,
    avatar: {
      fallback: "BL",
    },
  },
];

const testimonials: TestimonialsItem[] = [
  {
    id: "testimonials-grid",
    name: "Grid simples",
    description: "Depoimentos em grade uniforme.",
    preview: <TestimonialsGrid />,
  },
  {
    id: "testimonials-highlight",
    name: "Destaque + lista",
    description: "Um depoimento em destaque seguido dos demais.",
    preview: <TestimonialsHighlight />,
  },
  {
    id: "testimonials-columns",
    name: "Duas colunas",
    description: "Depoimentos distribuídos em duas colunas.",
    preview: <TestimonialsColumns />,
  },
  {
    id: "testimonials-rating-cards",
    name: "Review cards com rating",
    description:
      "Cards data-driven com rating, citação e autor. O primeiro avatar usa uma imagem inline; os demais mostram o fallback — um por src quebrado e outro sem src.",
    preview: (
      <TestimonialsRatingCards
        eyebrow="Avaliações"
        title="O que os clientes dizem, em estrelas."
        description="Cards data-driven com rating, citação e autor. O primeiro avatar usa uma imagem inline; os demais mostram o fallback — um por src quebrado e outro sem src."
        items={ratingCardItems}
      />
    ),
  },
];

export default function TestimonialsLibraryPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Testimonials / Depoimentos
          </h1>
          <p className="text-sm text-muted-foreground">
            Prova social em citações, destaques e review cards. Os depoimentos
            são de exemplo — troque pelos dados do seu projeto.
          </p>
        </header>

        <section className="space-y-4">
          {testimonials.map(({ id, name, description, preview }) => (
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
