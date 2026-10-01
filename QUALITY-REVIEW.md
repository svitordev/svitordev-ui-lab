# Svitordev UI Lab — Quality Review

> FASE 1 — Baseline / revisão estática consolidada.
> NENHUMA correção executada nesta revisão. Este arquivo é a única saída permitida.

## Baseline

- **Data:** 2026-10-01
- **Branch:** `main`
- **Commit:** `0813a1c docs: establish Svitordev UI Lab project foundation`
- **Working tree:** limpo (antes e depois dos testes)
- **Stack:** Next.js 16.0.3 (App Router / Turbopack) + React 19.2.0 + TypeScript 5 (strict) + Tailwind CSS 4 (config inline em `app/globals.css`, sem `tailwind.config.ts`) + shadcn/ui (style new-york) + `tw-animate-css` 1.4.0 + lucide-react + class-variance-authority / clsx / tailwind-merge + ESLint 9 (flat config)
- **Lint:** ✅ **PASS** — `npm run lint` → **0 errors / 5 warnings** (ver abaixo)
- **Build (production):** ❌ **FAIL** — `npm run build` falhou no TypeScript (`blog/[slug]/page.tsx` não é módulo)
- **TypeScript via production build:** ❌ **FAIL** por QLT-001
- **Typecheck (LSP):** sem erros adicionais detectados fora do build
- **Playwright:** NOT_CONFIGURED
- **Visual regression:** NOT_CONFIGURED
- **Gates:** lint e build são **independentes**. O lint valida código/estática e está verde mesmo com o build falhando. A validação visual automatizada ainda não existe (Playwright não configurado).
- **Método:** revisão estática integral (documentação + código) + baseline real executado no workspace

### Resultado do lint

```
starter-landing-blog-next@0.1.0 lint  eslint

app/(site)/layout.tsx
  3:10  warning  'FooterColumns' is defined but never used  @typescript-eslint/no-unused-vars

app/(site)/page.tsx
   3:10  warning  'AboutTimeline' is defined but never used               @typescript-eslint/no-unused-vars
   5:10  warning  'CtaBanner' is defined but never used                   @typescript-eslint/no-unused-vars
   7:10  warning  'HeroCenterCta' is defined but never used               @typescript-eslint/no-unused-vars
  10:10  warning  'ServicesSplitWithHighlight' is defined but never used  @typescript-eslint/no-unused-vars

5 problems (0 errors, 5 warnings)
```

> Nota: o aviso `[baseline-browser-mapping] ... over two months old` é de manutenção de dependência de dev (lint), fora do escopo desta revisão. Não atualizado.

### Resultado do build

```
▲ Next.js 16.0.3 (Turbopack)
Creating an optimized production build ...
✓ Compiled successfully in 10.2s
Running TypeScript  .Failed to compile.

.next/dev/types/validator.ts:42:39
Type error: File 'D:/projetos/svitordev-ui-lab/app/(site)/blog/[slug]/page.tsx' is not a module.

Next.js build worker exited with code: 1 and signal: null

Command exited with code 1
```

---

## Findings

### QLT-001 — `app/(site)/blog/[slug]/page.tsx` vazio quebra o `next build`

**Status:** [!] ISSUE_CONFIRMED
**Prioridade:** P0
**Categoria:** Build / Rota quebrada

**Evidência:** Arquivo existe mas não é um módulo válido (leitura direta): não possui `default` export. `npm run build` falha no TypeScript com `File '.../blog/[slug]/page.tsx' is not a module`. A rota `app/(site)/blog/[slug]/page.tsx` corresponde publicamente a `/blog/[slug]` (o `(site)` é Route Group e não pertence ao pathname público). A listagem `app/(site)/blog/page.tsx` linka cada card para `href={`/(site)/blog/${post.slug}`}` (comprovado no código), mas a URL pública canônica da rota é `/blog/${post.slug}`.

**Arquivo(s):** `app/(site)/blog/[slug]/page.tsx`

**Comportamento atual:** Rota dinâmica sem implementação válida (arquivo não é módulo); `next build` falha; a rota ainda não possui um `default` export funcional.

**Nota de consistência de href (não validada runtime):** a listagem usa `href={`/(site)/blog/${post.slug}`}`, incluindo o segmento do Route Group `(site)`, enquanto a URL pública canônica da rota é `/blog/${post.slug}`. Recomenda-se padronizar o href para a URL pública. O comportamento runtime desse href específico (se será automaticamente normalizado e funcionará) **NÃO foi validado nesta revisão** — não há evidência suficiente para afirmar que é removido automaticamente ou que a navegação funciona. Esta observação integra QLT-001 e não altera o total de findings.

**Impacto:** Bloqueante — quebra o build (baseline fundamental) e quebra a navegação do blog.

**Correção mínima sugerida:** Preencher a rota com template de post (dados estáticos reaproveitando o array de `blog/page.tsx`) OU remover/redirectar os links da listagem. Fluxo: `quality-review → plan → safe-implementation`.

**Testes necessários:** `npm run build` verde; render de `/blog/post-exemplo`; verificação de que a listagem aponta para rota funcional.

**Dependências:** Relacionado a QLT-002 (metadata/SEO do blog).

---

### QLT-002 — Sem metadata de página em home e listagem de blog (SEO básico)

**Status:** [!] ISSUE_CONFIRMED
**Prioridade:** P2
**Categoria:** SEO / Next.js

**Evidência:** `app/(site)/page.tsx` e `app/(site)/blog/page.tsx` não declaram `metadata`/`generateMetadata`; apenas a metadata global da raiz (`title`+`description`). Do `/library`, apenas `headers`/`footers` têm `metadata`; as 7 restantes não.

**Arquivo(s):** `app/(site)/page.tsx`, `app/(site)/blog/page.tsx`, `app/library/{hero,about,services,testimonials,pricing,contact,cta}/page.tsx`

**Comportamento atual:** Título/descrição herdados da raiz em todas as rotas; sem OG/Twitter/canonical por página.

**Impacto:** Qualidade/SEO — título duplicado entre páginas, sem rich results. Baixo impacto no build.

**Correção mínima sugerida:** Adicionar `metadata` por página em home e blog; padronizar as 7 páginas do library com `metadata` (reaproveitar padrão de `headers`/`footers`).

**Testes necessários:** Verificar `<title>`/`<meta description>`/OG renderizados por rota.

**Dependências:** Complementa QLT-001.

---

### QLT-003 — CTAs e links hash sem destino (dead CTAs / dead anchors)

**Status:** [!] ISSUE_CONFIRMED
**Prioridade:** P2
**Categoria:** Componentes / UX

**Evidência:** ~15 botões `<Button>` sem `href`/`onClick` espalhados por 11 arquivos: `header-basic`, `footer-cta`, `hero-center-cta`, `hero-primary`, `hero-steps`, `pricing-highlight`, `pricing-simple-cards`, `pricing-three-tiers`, `cta-banner`, `cta-simple`, `cta-split`. Links hash `/#services` e `/#about` no `header-centered` não têm elemento com `id` correspondente (só `#contact` existe).

**Arquivo(s):** `components/site/headers/header-basic.tsx`, `components/site/footers/footer-cta.tsx`, `components/sections/hero/{hero-center-cta,hero-primary,hero-steps}.tsx`, `components/sections/pricing/{pricing-highlight,pricing-simple-cards,pricing-three-tiers}.tsx`, `components/sections/cta/{cta-banner,cta-simple,cta-split}.tsx`, `components/site/headers/header-centered.tsx`

**Comportamento actual:** Botões de CTA não levam a lugar nenhum; navegação interna quebra em 2 anchors.

**Impacto:** UX — o template parece funcional, mas CTAs mortos reduzem a confiança do consumidor.

**Correção mínima sugerida:** Padronizar destino dos CTAs (ex.: `/#contact` ou `mailto:` do placeholder) OU documentar explicitamente "configure o destino". Decidir: destino real vs. placeholder explícito.

**Testes necessários:** Cliques nos CTAs; verificação de que anchors hash apontam para ids existentes.

**Dependências:** Nenhuma bloqueante.

---

### QLT-004 — Formulários de contato sem comportamento

**Status:** [!] ISSUE_CONFIRMED
**Prioridade:** P3
**Categoria:** Componentes / Forms

**Evidência:** `contact-details`, `contact-simple`, `contact-split` têm `<label>`+`Input`/`Textarea`+`<Button type="submit">` mas sem `action`/`onSubmit`/estado.

**Arquivo(s):** `components/sections/contact/{contact-details,contact-simple,contact-split}.tsx`

**Comportamento atual:** Os formulários não possuem fluxo de envio da aplicação, persistência, integração ou feedback de sucesso/erro implementado. (O navegador executa o comportamento nativo de submit; o que falta é a lógica da aplicação.)

**Impacto:** UX/qualidade — o consumidor do template precisa implementar o behavior do zero.

**Correção mínima sugerida:** Documentar como template (sem behavior) OU adicionar handler mínimo (`onSubmit` que abre `mailto:`). Definir contrato de props.

**Testes necessários:** Submissão de formulário; verificação de feedback de validação.

**Dependências:** Relacionado a QLT-003 (destino dos CTAs de contato) e QLT-008.

---

### QLT-005 — Componentes de seção/site sem props (todo conteúdo hardcoded)

**Status:** [!] ISSUE_CONFIRMED
**Prioridade:** P2
**Categoria:** Componentes / Reutilização

**Evidência:** Os 6 `site` components + 21 `sections` têm **zero props**; todo texto/telefone/e-mail hardcoded (`Sua Empresa`, `(00) 00000-0000`, `contato@suaempresa.com`). Apenas `components/ui/*` e `library-shell.tsx` accetam props. O catálogo já classifica `site/` e `sections/` como "templates" — condizente, mas sem contrato de props.

**Arquivo(s):** `components/site/**`, `components/sections/**`

**Comportamento atual:** Conteúdo fixo; personalização exige editar o componente.

**Impacto:** Reutilização — dificulta a adaptação por cliente e alimenta component inflation (muitas variantes hardcoded em vez de uma parametrizada).

**Correção mínimo sugerida:** Definir contrato mínimo de props (títulos, links, dados de contato) reaproveitando os placeholders atuais. Baixo risco, alto valor de documentação.

**Testes necessários:** Render de um componente com props customizadas.

**Dependências:** Alto valor conjunto com QLT-003/QLT-004.

---

### QLT-006 — Navegação mobile ausente em 2 headers

**Status:** [!] ISSUE_CONFIRMED
**Prioridade:** P2
**Categoria:** Responsividade / Acessibilidade

**Evidência:** `header-basic` e `header-with-topbar` escondem a navegação em mobile (`hidden md:flex`) sem hamburger/toggle → o menu desaparece em viewport estreita. `header-centered` usa `flex-wrap` (visível).

**Arquivo(s):** `components/site/headers/header-basic.tsx`, `components/site/headers/header-with-topbar.tsx`

**Comportamento atual:** Navegação invisível em mobile nesses 2 headers.

**Impacto:** Responsividade/acessibilidade — mobile quebrado em 2 de 3 headers.

**Correção mínimo sugerida:** Adicionar menu mobile (toggle + navegação acessível por teclado) aos 2 headers; reaproveitar padrão criado primeiro.

**Testes necessários:** Render em viewport estreita; navegação por teclado; (futuro) Playwright.

**Dependências:** Nenhum.

---

### QLT-007 — `<nav>` sem `aria-label` nos headers e no `/library`

**Status:** [!] ISSUE_CONFIRMED
**Prioridade:** P3
**Categoria:** Acessibilidade

**Evidência:** Elementos `<nav>` dos headers (`header-basic`, `header-centered`, `header-with-topbar`) e do wrapper do `/library` não possuem `aria-label`, dificultando a identificação da região de navegação por leitores de tela.

**Sobre os ícones decorativos (descartado):** verificado na implementação real de `lucide-react@0.554.0` (`node_modules/lucide-react/dist/esm/Icon.js`) que o `Icon` injeta automaticamente `aria-hidden="true"` sempre que o ícone não recebe `children` nem prop `aria-*`/`role`/`title` (via `!children && !hasA11yProp(rest)`). Todos os ícones decorativos usados (`Phone`, `Mail`, `MapPin`, `ArrowRight`, ícones de serviços) são renderizados como `<Icon className="..." />`, sem `children` nem props de a11y, portanto **já recebem `aria-hidden="true"` automaticamente**. Afirmar que seriam lidos por screen readers não é comprovado — parte removida deste finding.

**Arquivo(s):** `components/site/headers/header-basic.tsx`, `components/site/headers/header-centered.tsx`, `components/site/headers/header-with-topbar.tsx`, `components/sections/library-shell.tsx`

**Comportamento atual:** Navegadores/leitores de tela não têm um rótulo semântico para as regiões de navegação.

**Impacto:** Acessibilidade — descoberta pior de regiões de navegação por leitores de tela. Baixo.

**Correção mínimo sugerida:** Adicionar `aria-label` descritivo nos `<nav>` (ex.: "Navegação principal", "Navegação do biblioteca/library").

**Testes necessários:** Verificação de ordem de tabulação e rótulo das regiões `<nav>` em leitor de tela.

**Dependências:** Nenhum.

---

### QLT-008 — Labels de formulário não associados aos inputs

**Status:** [!] ISSUE_CONFIRMED
**Prioridade:** P3
**Categoria:** Acessibilidade

**Evidência:** Form de contato com `<label>` sem `htmlFor` e inputs sem `id` → associação programática ausente (WCAG 3.3.2 / 1.3.1).

**Arquivo(s):** `components/sections/contact/contact-split.tsx` (padrão similar nos demais `contact-*`)

**Comportamento atual:** Labels visuais sem rótulo acessível.

**Impacto:** Acessibilidade — formulários inacessíveis.

**Correção mínimo sugerida:** Associar `htmlFor`/`id` ou envolver o input em `<label>`.

**Testes necessários:** Verificação de label association; teclado.

**Dependências:** Relacionado a QLT-004.

---

### QLT-009 — Theme light morto (dark forçado sem toggle)

**Status:** [!] ISSUE_CONFIRMED
**Prioridade:** P3
**Categoria:** Design System / Theming

**Evidência:** `app/layout.tsx` aplica `className="dark"` fixo; a paleta `:root` (light) em `app/globals.css` torna-se inalcançável. DEC-004 diz light/dark opcional — a infra técnica existe, mas sem toggle o tema light é dead code.

**Arquivo(s):** `app/layout.tsx`, `app/globals.css`

**Comportamento actual:** Só o tema dark renderiza; as variáveis light não são usadas.

**Impacto:** Design system — duplicidade de tokens e ambiguidade sobre a intenção (tema único vs. toggle futuro).

**Correção mínimo sugerida:** Documentar a intenção (tema único dark) e remover/observar o bloco light OU adicionar toggle (DEC-004 já contempla). Decidir e registrar.

**Testes necessários:** Alternância de tema (se implementado); verificação de que light renderiza se habilitado.

**Dependências:** Nenhum.

---

### QLT-010 — Padrão inconsistente nas páginas do `/library` (7 de 9 desatualizadas)

**Status:** [!] ISSUE_CONFIRMED
**Prioridade:** P2
**Categoria:** Showcase / Manutenibilidade

**Evidência:** `headers`/`footers` seguem o padrão novo (`metadata`, array tipado `XxxItem[]`, preview `<Component />`, label `<code>{id}</code>`). As 7 restantes ainda têm comentário `// app/sections/...`, função `*SectionsPage`, sem `metadata` e preview hardcoded ("Variação 01 · ..."). O import funciona (não quebra o build), mas a descoberta é pior e há markup duplicado.

**Arquivo(s):** `app/library/{hero,about,services,testimonials,pricing,contact,cta}/page.tsx`

**Comportamento actual:** O showcase renderiza (sem quebrar), mas 7 páginas com padrão obsoleto e sem `metadata`/`id` do componente.

**Impacto:** Manutenibilidade/descoberta — consistência do showcase comprometida.

**Correção mínimo sugerida:** Migrar as 7 páginas ao padrão de `headers`/`footers` (reaproveitar template). Baixo risco.

**Testes necessários:** Render de cada página do library; verificação de `metadata` e do `id` exibido.

**Dependências:** Relacionado a QLT-002 (metadata).

---

### QLT-011 — Ruídos de acessibilidade menor e de código

**Status:** [!] ISSUE_CONFIRMED
**Prioridade:** P4
**Categoria:** Acessibilidade / Código

**Evidência:**
- `hero-steps` pula heading (h1 → h3).
- `app/library/layout.tsx` reimporta `../globals.css` (redundante, dedupado pelo App Router) e traz comentário de cabeçalho desatualizado (`// app/sections/layout.tsx`).
- Comento de dev deixado em `app/(site)/page.tsx` (`{ // depois você adiciona outras sections ... }`).
- `lang="pt-br"` — capitalização recomendada `pt-BR`.
- `app/(site)/layout.tsx` usa `<div>` wrapper em vez de conteúdo direto do `<body>` (nit semântico).

**Arquivo(s):** `components/sections/hero/hero-steps.tsx`, `app/library/layout.tsx`, `app/(site)/page.tsx`, `app/layout.tsx`, `app/(site)/layout.tsx`

**Comportamento actual:** Sem quebras; ruídos cosméticos/acessibilidade menor.

**Impacto:** P4 — cosmético/incremental.

**Correção mínimo sugerida:** Limpar os comentários desatualizados; padronizar `pt-BR`; ajustar a hierarquia de headings no `hero-steps`.

**Testes necessários:** Verificação visual/manual.

**Dependências:** Nenhum.

---

### QLT-012 — Imports não usados (5 warnings do lint)

**Status:** [!] ISSUE_CONFIRMED
**Prioridade:** P3
**Categoria:** Código / Manutenibilidade

**Evidência:** `npm run lint` reporta 5 warnings `@typescript-eslint/no-unused-vars`:
- `app/(site)/layout.tsx:3` → `FooterColumns` importado e não usado.
- `app/(site)/page.tsx:3` → `AboutTimeline` não usado.
- `app/(site)/page.tsx:5` → `CtaBanner` não usado.
- `app/(site)/page.tsx:7` → `HeroCenterCta` não usado.
- `app/(site)/page.tsx:10` → `ServicesSplitWithHighlight` não usado.

**Arquivo(s):** `app/(site)/layout.tsx`, `app/(site)/page.tsx`

**Comportamento actual:** O **lint passa** (`0 errors / 5 warnings`); os 5 warnings de imports não usados geram ruído e indicam seções que não estão sendo compostas na home. **Esses warnings não são a causa da falha do build** — o production build falha exclusivamente pelo QLT-001 (`blog/[slug]/page.tsx` vazio).

**Impacto:** Manutenibilidade — código morto e possível omissão de seções esperadas na home.

**Correção mínimo sugerida:** Remover os imports não usados OU adicionar as seções correspondentes à composição da home (decidir o intendido).

**Testes necessários:** `npm run lint` → 0 warnings; verificar se as seções omitidas deveriam compor a home.

**Dependências:** Relacionado a QLT-011 (revisão da home).

---

## Distribuição de prioridades

| Prioridade | Qtd | Findings |
|---|---|---|
| **P0** | 1 | QLT-001 |
| **P1** | 0 | — |
| **P2** | 5 | QLT-002, QLT-003, QLT-005, QLT-006, QLT-010 |
| **P3** | 5 | QLT-004, QLT-007, QLT-008, QLT-009, QLT-012 |
| **P4** | 1 | QLT-011 |

**Total:** 12 findings.

---

# UM PRÓXIMO ITEM

**QLT-001 — Preencher `app/(site)/blog/[slug]/page.tsx` (ou remover/redirectar a rota).**

**Motivo:** É o **único P0 confirmado** e o **único que bloquea o `next build`** (confirmado no baseline: `File '.../blog/[slug]/page.tsx' is not a module`). Recuperar um baseline de build verde deve preceder novas evoluções técnicas do Svitordev UI Lab. Fluxo recomendado: `quality-review → plan → safe-implementation`.

> **Gates independentes (baseline real):** lint e build são gates separados. O **lint está verde** (`0 errors / 5 warnings`), mesmo com o build falhando. Portanto o lint **não é inválido nem não confiável** — valida estática/código independentemente do build. A **validação visual automatizada ainda não existe** porque o Playwright não foi configurado (ver baseline).

---

## Não feito nesta revisão (conforme escopo)

- Nenhuma correção de código/página/CSS.
- Nenhuma instalação de dependências (incl. Playwright / `baseline-browser-mapping`).
- Nenhum `commit` / `push` / `git add`.
- Nenhuma alteração de documentação além deste `QUALITY-REVIEW.md`.
- Nenhum finding marcado como `FIXED`/`VERIFIED`.

## Valeração final

- `git status --short --untracked-files=all` → apenas `QUALITY-REVIEW.md` novo.
- `git diff --stat` → sem alterações em arquivos do projeto.
- `git diff -- QUALITY-REVIEW.md` → diff desta única arquivo.
