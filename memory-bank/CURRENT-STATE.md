# CURRENT-STATE — Svitordev UI Lab

Snapshot curto do estado atual do repositório. Não copiar toda a documentação.

## Estado atual

Repositório base (GitHub Template) em fase de **fundação documental**.

- **Fase atual:** FASE 2 — Documentação.
- **Preparação técnica pré-rotina:** concluída.
- **Roadmap:** macro aprovado e versionado em `docs/ROADMAP-1000-EVOLUTIONS.md`.
- **Lote ativo:** 001–025.
- **Evolução 001:** ✅ IMPLEMENTADA / VERIFIED (CTA Split Actions data-driven + contrato exemplar de props).
- **Evolução 002:** ✅ IMPLEMENTADA / VERIFIED (Logos / social proof strip — wordmark tipográfico, sem imagem/links/motion).
- **Evolução 003:** ✅ IMPLEMENTADA / VERIFIED (Hero Media Showcase — composição vertical/showcase, media frame HTML/Tailwind dominante, sem imagem/motion).
- **Próxima execução:** Evolução 004 (Badge).

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
- **24** section components (`components/sections/` — 7 grupos × 3 + `cta-split-actions` + `logos-strip` + `hero-media-showcase`)
- **2** wrappers/shells (`library-shell.tsx` + `app/library/layout.tsx`)
- **Total: 36** componentes reutilizáveis relevantes

## `/library` (DEC-001)

Showcase oficial. Estrutura `app/library/[categoria]/page.tsx` renderiza cada variação em caixa com borda e rótulo. Será evoluído futuramente (índice, filtros, preview de código).

## Estado de qualidade (atualizado após Playwright mínimo — 2026-10-14)

Production build **verde** (PASS). Lint atual: **0 errors / 0 warnings**. Rota `/blog/[slug]` funcional.

- **Playwright mínimo:** ✅ **VERIFIED** — `@playwright/test` 1.64.1, **Chromium** somente; projects desktop **1280×720** e mobile **375×667**; **8 smoke tests / 16 execuções**; **duas execuções consecutivas verdes** (sem retries). Execução da DEC-006.
- **QLT-001:** ✅ VERIFIED. **QLT-012:** ✅ VERIFIED.
- **`/library`:** READY.
- **Design System:** READY.
- **Total de findings:** 13 (QLT-001 e QLT-012 VERIFIED; os demais permanecem pendentes).
- **Fonte compartilhada de posts:** `lib/blog.ts` (usada pela listagem e pela rota dinâmica).

### Próxima fase

Roadmap macro versionado em `docs/ROADMAP-1000-EVOLUTIONS.md` (lote ativo 001–025). Evoluções 001, 002 e 003 VERIFIED. Próxima execução: Evolução 004 (Badge).

### Problemas resolvidos

- **QLT-001** (P0): Rota dinâmica `/blog/[slug]` implementada e verificada
  - Fonte compartilhada em `lib/blog.ts`
  - Listagem consome fonte compartilhada
  - Rota dinâmica consome mesma fonte
  - `notFound()` para slugs inexistentes
  - href público corrigido para `/blog/${slug}`
  - Lint PASS, build PASS, runtime 200/404 verificados

- **QLT-012** (P3): Imports não usados removidos (verificado)
  - `FooterColumns` removido de `app/(site)/layout.tsx`
  - `AboutTimeline`, `CtaBanner`, `HeroCenterCta`, `ServicesSplitWithHighlight` removidos de `app/(site)/page.tsx`
  - JSX preservado; lint 0/0; build PASS

### Problemas conhecidos

- **QLT-013** (P2): Datas date-only podem exibir o dia anterior por conversão de timezone
  - Evidência: `2025-11-01` renderizou como `31/10/2025` durante teste runtime
  - Causa: `new Date(post.date).toLocaleDateString("pt-BR")` interpreta date-only como UTC
  - Solução: Formatar datas sem conversão indesejada de timezone
  - **Não corrigido** — registrado para tratamento futuro

## Decisões registradas

Ver `memory-bank/DECISIONS.md` (DEC-001 a DEC-010).
