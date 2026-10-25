// app/library/testimonials/page.tsx
import { TestimonialsGrid } from "@/components/sections/testimonials/testimonials-grid";
import { TestimonialsHighlight } from "@/components/sections/testimonials/testimonials-highlight";
import { TestimonialsColumns } from "@/components/sections/testimonials/testimonials-columns";
import {
  TestimonialsRatingCards,
  type ReviewItem,
} from "@/components/sections/testimonials/testimonials-rating-cards";

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

export default function TestimonialsSectionsPage() {
  return (
    <div className="space-y-10 pb-12">
      <section>
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 01 · Grid simples
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <TestimonialsGrid />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 02 · Destaque + lista
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <TestimonialsHighlight />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 03 · Duas colunas
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <TestimonialsColumns />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 04 · Review cards com rating
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <TestimonialsRatingCards
              eyebrow="Avaliações"
              title="O que os clientes dizem, em estrelas."
              description="Cards data-driven com rating, citação e autor. O primeiro avatar usa uma imagem inline; os demais mostram o fallback — um por src quebrado e outro sem src."
              items={ratingCardItems}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
