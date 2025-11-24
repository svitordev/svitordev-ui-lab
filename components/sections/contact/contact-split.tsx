// components/sections/contact/contact-split.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSplit() {
  return (
    <section id="contact" className="w-full bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
          {/* Coluna texto */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Conte um pouco sobre o que você precisa
            </h2>
            <p className="text-sm text-muted-foreground">
              Não precisa ser nada formal. Em poucas linhas, você pode explicar como funciona
              o seu dia a dia e em que ponto gostaria de contar com a ajuda da nossa equipe.
            </p>
            <p className="text-sm text-muted-foreground">
              Com essas informações iniciais já conseguimos entender melhor o seu cenário e
              indicar o tipo de atendimento ou serviço mais adequado para o seu caso.
            </p>
            <p className="text-xs text-muted-foreground">
              Este texto pode ser adaptado para diferentes áreas: advocacia, contabilidade,
              saúde, consultoria, entre outras.
            </p>
          </div>

          {/* Coluna formulário */}
          <form className="space-y-4 rounded-2xl border bg-background p-4 text-sm shadow-sm">
            <div className="space-y-1">
              <label className="text-xs font-medium">Nome</label>
              <Input placeholder="Seu nome" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium">E-mail ou WhatsApp</label>
              <Input placeholder="Seu contato principal" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium">Assunto</label>
              <Input placeholder="Ex.: atendimento, orçamento, dúvida, outro..." />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium">Mensagem</label>
              <Textarea
                rows={3}
                placeholder="Explique brevemente a situação ou o serviço que você procura."
              />
            </div>

            <Button type="submit" size="sm" className="w-full md:w-auto">
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
