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

## Estado de qualidade (atualizado após QLT-001)

Production build **verde**. QLT-001 **VERIFIED**. Rota `/blog/[slug]` funcional.

- **Total de findings:** 13 (QLT-001 VERIFIED; os demais permanecem pendentes).
- **Fonte compartilhada de posts:** `lib/blog.ts` (usada pela listagem e pela rota dinâmica).

### Problemas resolvidos

- **QLT-001** (P0): Rota dinâmica `/blog/[slug]` implementada e verificada
  - Fonte compartilhada em `lib/blog.ts`
  - Listagem consome fonte compartilhada
  - Rota dinâmica consome mesma fonte
  - `notFound()` para slugs inexistentes
  - href público corrigido para `/blog/${slug}`
  - Lint PASS, build PASS, runtime 200/404 verificados

### Problemas conhecidos

- **QLT-013** (P2): Datas date-only podem exibir o dia anterior por conversão de timezone
  - Evidência: `2025-11-01` renderizou como `31/10/2025` durante teste runtime
  - Causa: `new Date(post.date).toLocaleDateString("pt-BR")` interpreta date-only como UTC
  - Solução: Formatar datas sem conversão indesejada de timezone
  - **Não corrigido** — registrado para tratamento futuro

## Decisões registradas

Ver `memory-bank/DECISIONS.md` (DEC-001 a DEC-010).
