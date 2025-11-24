// app/sections/services/page.tsx
import { ServicesGridSimple } from "@/components/sections/services/services-grid-simple";
import { ServicesWithIcons } from "@/components/sections/services/services-with-icons";
import { ServicesSplitWithHighlight } from "@/components/sections/services/services-split-with-highlight";

export default function ServicesSectionsPage() {
  return (
    <div className="space-y-10 pb-12">
      <section>
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 01 · Grid simples
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <ServicesGridSimple />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 02 · Cards com ícones
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <ServicesWithIcons />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 03 · Serviço principal + lista
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <ServicesSplitWithHighlight />
          </div>
        </div>
      </section>
    </div>
  );
}
