// components/sections/contact/contact-simple.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSimple() {
  return (
    <section id="contact" className="w-full bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="mb-6 space-y-2 text-center">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Fale com nossa equipe
          </h2>
          <p className="text-sm text-muted-foreground">
            Preencha os dados abaixo com suas informações e sua dúvida ou necessidade.
            Entraremos em contato o mais breve possível.
          </p>
        </div>

        <form className="space-y-4 rounded-2xl border bg-muted/30 p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1 text-sm">
              <label className="text-xs font-medium">Nome</label>
              <Input placeholder="Seu nome completo" />
            </div>
            <div className="space-y-1 text-sm">
              <label className="text-xs font-medium">E-mail</label>
              <Input type="email" placeholder="seuemail@exemplo.com" />
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <label className="text-xs font-medium">Assunto</label>
            <Input placeholder="Ex.: atendimento, orçamento, dúvida, outro..." />
          </div>

          <div className="space-y-1 text-sm">
            <label className="text-xs font-medium">Mensagem</label>
            <Textarea
              rows={4}
              placeholder="Conte brevemente sobre a sua necessidade ou o serviço que você procura."
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="sm">
              Enviar mensagem
            </Button>
          </div>

          <p className="text-[11px] text-muted-foreground">
            Este formulário pode ser integrado com e-mail, ferramentas de atendimento ou CRM,
            de acordo com a necessidade da empresa.
          </p>
        </form>
      </div>
    </section>
  );
}
