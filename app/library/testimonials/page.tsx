// app/library/testimonials/page.tsx
import { TestimonialsGrid } from "@/components/sections/testimonials/testimonials-grid";
import { TestimonialsHighlight } from "@/components/sections/testimonials/testimonials-highlight";
import { TestimonialsColumns } from "@/components/sections/testimonials/testimonials-columns";

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
    </div>
  );
}
