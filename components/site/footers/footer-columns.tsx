// components/site/footers/footer-columns.tsx
import Link from "next/link";

export function FooterColumns() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 text-sm text-muted-foreground md:grid-cols-[2fr_1fr_1fr]">
          {/* Sobre */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">
              Sobre
            </h3>
            <p className="mt-2 text-xs leading-relaxed">
              Use este espaço para uma breve descrição da empresa: área de atuação,
              principais serviços, valores e diferenciais no atendimento aos clientes.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">
              Navegação
            </h3>
            <ul className="mt-2 space-y-1 text-xs">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-foreground">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-foreground">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">
              Contato
            </h3>
            <ul className="mt-2 space-y-1 text-xs">
              <li>WhatsApp: (00) 00000-0000</li>
              <li>E-mail: contato@suaempresa.com</li>
              <li>Cidade: Cidade / Estado</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 text-[11px] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {year} Sua Empresa. Todos os direitos reservados.</p>
          <p>
            Este site pode ser adaptado para diferentes áreas: escritórios, clínicas,
            consultorias e outros negócios de serviços.
          </p>
        </div>
      </div>
    </footer>
  );
}
