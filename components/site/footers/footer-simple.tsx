// components/site/footers/footer-simple.tsx
export function FooterSimple() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-[11px] text-muted-foreground md:flex-row">
        <p>© {year} Sua Empresa. Todos os direitos reservados.</p>
        <p>Este site pode ser adaptado para diferentes áreas de atuação.</p>
      </div>
    </footer>
  );
}
