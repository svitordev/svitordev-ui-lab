# CURRENT-STATE — Svitordev UI Lab

Snapshot curto do estado atual do repositório. Não copiar toda a documentação.

## Estado atual

Repositório base (GitHub Template) em fase de **fundação documental**.

- **Fase atual:** FASE 2 — Documentação.
- **Próximo passo:** FASE 3 — Fundação visual/theming (após aprovação).

## Stack confirmada

- Next.js 16.0.3 (App Router)
- React 19.2.0 / React DOM 19.2.0
- TypeScript 5 (strict)
- Tailwind CSS 4 (config inline em `app/globals.css`, sem `tailwind.config.ts`)
- shadcn/ui (style new-york)
- `tw-animate-css` 1.4.0
- lucide-react
- class-variance-authority, clsx, tailwind-merge
- ESLint 9 (flat config)

## Estrutura oficial (DEC-002)

```
app/
components/      (ui/, site/, sections/)
lib/
public/
```

`src/` **não** será introduzido. Novas categorias (`layouts/`, `patterns/`, `compositions/`) só serão criadas quando houver necessidade real.

## Inventário atual de componentes

- **4** UI components (`components/ui/`)
- **6** site components (`components/site/` — headers + footers)
- **21** section components (`components/sections/` — 7 grupos × 3)
- **2** wrappers/shells (`library-shell.tsx` + `app/library/layout.tsx`)
- **Total: 33** componentes reutilizáveis relevantes

## `/library` (DEC-001)

Showcase oficial. Estrutura `app/library/[categoria]/page.tsx` renderiza cada variação em caixa com borda e rótulo. Será evoluído futuramente (índice, filtros, preview de código).

## Problema conhecido

`app/(site)/blog/[slug]/page.tsx` está **vazio** no baseline, o que **quebra o `next build`**.

- **Não** corrigir nesta fase.
- Será tratado posteriormente via: `quality-review` → finding → `plan` → `safe-implementation`.

## Decisões registradas

Ver `memory-bank/DECISIONS.md` (DEC-001 a DEC-010).
