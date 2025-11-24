// app/library/contact/page.tsx
import { ContactSimple } from "@/components/sections/contact/contact-simple";
import { ContactSplit } from "@/components/sections/contact/contact-split";
import { ContactDetails } from "@/components/sections/contact/contact-details";

export default function ContactSectionsPage() {
  return (
    <div className="space-y-10 pb-12">
      <section>
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 01 · Formulário centralizado
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <ContactSimple />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 02 · Texto + formulário em card
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <ContactSplit />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variação 03 · Contatos + formulário resumido
          </p>
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <ContactDetails />
          </div>
        </div>
      </section>
    </div>
  );
}
