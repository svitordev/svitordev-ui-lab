// app/sections/about/page.tsx
import { AboutSimple } from "@/components/sections/about/about-simple";
import { AboutSplit } from "@/components/sections/about/about-split";
import { AboutTimeline } from "@/components/sections/about/about-timeline";

export default function AboutSectionsPage() {
  return (
    <div className="space-y-10 pb-12">
      <section>
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 01 · About simples
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <AboutSimple />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 02 · About em duas colunas
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <AboutSplit />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 03 · Timeline / trajetória
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <AboutTimeline />
          </div>
        </div>
      </section>
    </div>
  );
}
