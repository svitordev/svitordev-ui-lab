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
- **Evolução 004:** ✅ IMPLEMENTADA / VERIFIED (Badge — UI primitive, `<span>` não interativo, CVA com default/secondary/outline, sem sizes/asChild/motion).
- **Evolução 005:** ✅ IMPLEMENTADA / VERIFIED (Stats / métricas — `StatsGrid` data-driven, primeiro consumo do Badge, grid 2/4 colunas, demo com value longo validada em 375px).
- **Evolução 006:** ✅ IMPLEMENTADA / VERIFIED (`aria-label` nas 4 navs — "Navegação principal" nos 3 headers + "Navegação da biblioteca" no shell; QLT-007 VERIFIED).
- **Evolução 007:** ✅ IMPLEMENTADA / VERIFIED (Mobile nav acessível — `MobileNav` compartilhado integrado a `header-basic` e `header-with-topbar`; `header-centered` mantido; QLT-006 VERIFIED).
- **Evolução 008:** ✅ IMPLEMENTADA / VERIFIED (Avatar — `components/ui/avatar.tsx`, Radix Avatar (`@radix-ui/react-avatar` ^1.3.1, dependência aprovada), Client Component, API composicional `Avatar`/`AvatarImage`/`AvatarFallback`, tamanho único, `className`/`data-slot`, sem variants/initials automáticas/status/group; Avatar 008 validado visualmente na Evolução 009: imagem válida, fallback por erro e fallback sem src).
- **Evolução 009:** ✅ IMPLEMENTADA / VERIFIED (Review cards com rating — `TestimonialsRatingCards`, quarta variant de testimonials, contrato data-driven, rating inteiro 1–5 acessível via `aria-label`, semântica `article`/`blockquote`/`footer`, Avatar 008 consumido sem mudança de API; contribui para a estratégia de migração gradual de QLT-005).
- **Evolução 010:** ✅ IMPLEMENTADA / VERIFIED (`hero-center-cta` migrada para o contrato — `HeroCenterCta` agora data-driven (`title` obrigatório; `description?`/`supportingText?`/`actions?`; type local; Server Component; sem eyebrow; visual preservado); página da library como consumer real; os dois botões falsos viraram links reais (interno `Ver conteúdos` → `/blog`); contribui para QLT-003 (11→10 ocorrências, permanece aberto) e QLT-005 (permanece aberto).
- **Evolução 011:** ✅ IMPLEMENTADA / VERIFIED (Feature comparison — novo grupo `features`, `FeatureComparison` data-driven, tabela HTML semântica real (`Recurso` + `scope`), `boolean | string` com `values` keyed por `option.id`, fallback defensivo para valor ausente (distinto de `false`), Check/X + sr-only, Server Component, CSS-only responsive com scroll horizontal interno no mobile e page overflow 0; nova rota `/library/features` + link "Features" na library).
- **Evolução 012:** ✅ IMPLEMENTADA / VERIFIED (Motion pass — motion pass controlado em 2 componentes: `HeroMediaShowcase` com entrance motion-safe e `TestimonialsRatingCards` com microinteraction de hover motion-safe; `MobileNav` intocado por decisão de escopo; nenhum Client Component novo; nenhuma dependência nova; padrão Motion documentado no Design System).
- **Evolução 013:** ✅ IMPLEMENTADA / VERIFIED (Separator + Skeleton — `components/ui/separator.tsx` e `components/ui/skeleton.tsx`, ambos nativos, Server Components, zero dependências; Separator: único `<div>`, horizontal/vertical, `decorative=true` default sem semântica, modo semântico com `role`/`aria-orientation` derivados de `decorative`/`orientation` como fonte de verdade; Skeleton: `bg-muted` + `rounded-md` + `motion-safe:animate-pulse` (convenção Motion da 012), sem `role="status"` automático — anúncio de loading é do consumer; nenhum consumer artificial, nenhuma rota nova, nenhum teste novo).
- **Evolução 014:** ✅ IMPLEMENTADA / VERIFIED (Newsletter com estados — `NewsletterForm`, novo grupo `newsletter`, primeira section funcional de form do Lab; Client Component justificado; contrato data-driven com callback externo `onSubmit`, nenhum backend acoplado; estados idle/submitting/success/error; email controlado; label real + `htmlFor` + `useId`; live region persistente única; acessibilidade validada; rota `/library/newsletter` + link na library com client wrapper só de showcase; demo determinística; +2 testes Playwright; contribui para QLT-004, que permanece aberto; QLT-008 permanece aberto).
- **Evolução 015:** ✅ IMPLEMENTADA / VERIFIED (Labels dos formulários existentes — QLT-008 encerrado: os 3 contact forms corrigidos com 10 associações `htmlFor`↔`id` 1:1; IDs determinísticos prefixados por variant e únicos na página; Server Components preservados; zero mudança visual; zero comportamento novo; +1 teste Playwright abrangente; QLT-004 e QLT-010 continuam abertos; os `<section id="contact">` duplicados são pré-existentes e ficaram fora do escopo).
- **Evolução 016:** ✅ IMPLEMENTADA / VERIFIED (Pricing com toggle — decisão anti-inflação: `PricingThreeTiers` evoluído, nenhum componente novo; contrato data-driven; Client Component justificado (estado do intervalo); toggle mensal/anual com `role="group"` + `aria-pressed`, teclado nativo, estado inicial mensal; preços como strings do consumer, sem cálculo comercial; `featured` separado de `action.variant`; CTAs como links reais; consumers: `/library/pricing` e home (identificada durante o build, copy movida para o consumer, ambas Server Components); +1 teste Playwright; contribui para QLT-003 e QLT-005, que permanecem abertos com uma ocorrência a menos; QLT-010 intocado).
- **Evolução 017:** ✅ IMPLEMENTADA / VERIFIED (technical — Accessible Accordion: `components/ui/accordion.tsx`, Radix Accordion (`@radix-ui/react-accordion` ^1.3.1, dependência aprovada), Client Component, compound API com 4 exports (Header interno), single/multiple, collapsible, controlled/uncontrolled pela API nativa, keyboard/ARIA delegados ao Radix, Chevron decorativo com rotação pelo `data-state` do Trigger (também com reduced motion, instantânea; transição motion-safe), Content sem animação, nenhum consumer/rota/teste novo. Validação técnica concluída na 017; validação visual/keyboard em browser será feita na Evolução 018, primeiro consumer real — precedente Avatar 008→009).
- **Próxima execução:** Evolução 018 (FAQ).

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

- **9** UI components (`components/ui/` — + `badge` via Evolução 004, + `avatar` via Evolução 008, + `separator` e `skeleton` via Evolução 013, + `accordion` via Evolução 017)
- **7** site components (`components/site/` — headers + footers; + `mobile-nav` via Evolução 007)
- **28** section components (`components/sections/` — 7 grupos × 3 + `cta-split-actions` + `logos-strip` + `hero-media-showcase` + `stats-grid` + `testimonials-rating-cards` + `feature-comparison` + `newsletter-form`; grupo Newsletter = 1, `NewsletterForm` disponível)
- **2** wrappers/shells (`library-shell.tsx` + `app/library/layout.tsx`)
- **Total: 46** componentes reutilizáveis relevantes

## `/library` (DEC-001)

Showcase oficial. Estrutura `app/library/[categoria]/page.tsx` renderiza cada variação em caixa com borda e rótulo. Será evoluído futuramente (índice, filtros, preview de código).

## Estado de qualidade (atualizado após Playwright mínimo — 2026-10-14)

Production build **verde** (PASS, 18 rotas). Lint atual: **0 errors / 0 warnings**. Rota `/blog/[slug]` funcional.

- **Playwright mínimo:** ✅ **VERIFIED** — `@playwright/test` 1.64.1, **Chromium** somente; projects desktop **1280×720** e mobile **375×667**; **20 smoke tests / 40 execuções** (38 passed + 2 skips intencionais — testes mobile-only da Evolução 007 pulam o project desktop). Execução da DEC-006.
- **QLT-001:** ✅ VERIFIED. **QLT-006:** ✅ VERIFIED (Evolução 007). **QLT-007:** ✅ VERIFIED (Evolução 006). **QLT-008:** ✅ VERIFIED (Evolução 015). **QLT-012:** ✅ VERIFIED.
- **QLT-003:** continua aberto, com uma ocorrência a menos (`pricing-three-tiers` — CTAs viraram links reais, Evolução 016). **QLT-005:** continua aberto, com uma ocorrência a menos (`pricing-three-tiers` migrado para o contrato, Evolução 016). **QLT-010:** continua aberto (Evolução 019).
- **`/library`:** READY.
- **Design System:** READY.
- **Total de findings:** 13 (QLT-001, QLT-006, QLT-007, QLT-008 e QLT-012 VERIFIED; os demais permanecem pendentes).
- **Fonte compartilhada de posts:** `lib/blog.ts` (usada pela listagem e pela rota dinâmica).

### Próxima fase

Roadmap macro versionado em `docs/ROADMAP-1000-EVOLUTIONS.md` (lote ativo 001–025). Evoluções 001–017 concluídas (017 = technical VERIFIED; validação visual/keyboard do Accordion reservada para a 018). Próxima execução: Evolução 018 (FAQ). Ainda não há consumer do Accordion e nenhuma FAQ criada.

### Problemas resolvidos

- **QLT-001** (P0): Rota dinâmica `/blog/[slug]` implementada e verificada
  - Fonte compartilhada em `lib/blog.ts`
  - Listagem consome fonte compartilhada
  - Rota dinâmica consome mesma fonte
  - `notFound()` para slugs inexistentes
  - href público corrigido para `/blog/${slug}`
  - Lint PASS, build PASS, runtime 200/404 verificados

- **QLT-006** (P2): Mobile nav acessível nos 2 headers afetados (verificado — Evolução 007)
  - `MobileNav` compartilhado criado (`components/site/headers/mobile-nav.tsx`) e integrado a `header-basic` e `header-with-topbar`; `header-centered` reavaliado e mantido (flex-wrap)
  - Botão Menu/X com `aria-expanded`/`aria-controls` (`useId`) e `aria-label` dinâmico; painel landmark `nav` com `ul[role=list]`; Escape devolve foco; clique fora fecha; sem focus trap/Sheet/portal
  - 2 testes Playwright focados mobile-only adicionados ao smoke; validação live 375×667 e 1280×720 sem overflow
  - Lint 0/0; build PASS (16 rotas); e2e 18 passed + 2 skipped

- **QLT-007** (P3): `aria-label` adicionado nas 4 `<nav>` (verificado — Evolução 006)
  - "Navegação principal" nos 3 headers; "Navegação da biblioteca" no `library-shell`
  - Rótulos confirmados na árvore de acessibilidade; tabulação inalterada; nada visual mudou
  - Lint 0/0; build PASS; e2e 16/16

- **QLT-008** (P3): Labels de formulário associados aos inputs nos 3 contact forms (verificado — Evolução 015)
  - 10 labels com `htmlFor` + 10 campos com `id` (associação 1:1); IDs determinísticos prefixados por variant, únicos na página
  - Server Components preservados; zero mudança visual; zero comportamento novo; nenhuma ARIA artificial
  - 1 teste Playwright abrangente adicionado ao smoke (10 associações, `getByLabel`, htmlFor/id, tipos de campo, foco por label, unicidade de IDs)
  - Validação live 375×667 e 1280×720: label click foca o campo correto, zero overflow
  - Lint 0/0; build PASS (18 rotas); e2e 36 passed + 2 skipped

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
