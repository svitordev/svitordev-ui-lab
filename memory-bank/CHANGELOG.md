# CHANGELOG — Svitordev UI Lab

Registro de mudanças técnicas importantes ao longo da evolução. Formato inspirado em Keep a Changelog.

---

## [2026-11-05] — Evolução 022: Landing composition completa (VERIFIED)

- Nova rota `/library/landing` — primeira landing completa montada apenas por composição, sem nenhum component novo. Page Server Component; demo data no consumer; narrativa brand-neutral única, coerente entre as sections (Features e Pricing usam os mesmos planos).
- Composição final: HeroMediaShowcase → LogosStrip → StatsGrid → FeatureComparison → TestimonialsRatingCards → PricingThreeTiers → FaqAccordion → CtaSplitActions → StickyCtaBar → FooterColumns.
- Header omitido após inventário real dos hrefs: os headers existentes usam links root+fragment (`/#...`) que navegam para a home — incompatíveis com navegação local desta rota. FooterColumns reutilizado como está (exigência do roadmap); seus `/#...` continuam sendo links reais para a home.
- Fragmentos locais apenas com consumer real na rota: `#services` (hero, sticky bar) e `#contact` (actions do pricing). Pricing (toggle mensal/anual, `aria-pressed`) e FAQ (accordion, `aria-expanded`) coexistem na mesma página.
- StickyCtaBar validada no document scroll real (computed `sticky`/`bottom 0`; desktop `barBottom 720 = innerHeight`, mobile `667 = 667`) com boundary antes do footer (desktop `barBottom 409 ≤ footerTop 449`; mobile `93 ≤ 133`).
- Mobile 375×667 e desktop 1280×720 validados, zero overflow. +2 testes Playwright. Suíte: 27 testes / 54 execuções — **52 passed + 2 skipped**.
- Lint **0/0**; build **PASS** (20 rotas); `git diff --check` limpo. Nenhuma dependência nova. Contagens: sections 31, UI 9, total 49 (inalterado). QLT-002, QLT-003, QLT-005 e QLT-011 inalterados.
- Documentação atualizada: `docs/ROADMAP-1000-EVOLUTIONS.md` (022 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 023).

---

## [2026-11-05] — Evolução 021: Sticky-column split (VERIFIED)

- Criado `components/sections/features/sticky-column-split.tsx` — `StickyColumnSplit`, nova section no grupo `features`; anti-duplicação confirmada por inventário (nenhuma sticky-column existente; nenhuma section legacy refatorada).
- Section editorial de duas colunas — coluna de contexto à esquerda, conteúdo detalhado à direita; responsiva: mobile em fluxo normal, `md` grid de 2 colunas ainda sem sticky, `lg+` coluna esquerda sticky (`md:self-start lg:sticky lg:top-8`) limitada pelo containing block; Server Component; CSS-only — sem JS de scroll, sem IntersectionObserver, sem scrollspy; sem z-index customizado; sem motion; nenhuma dependência nova.
- Contrato data-driven local (`StickyColumnItem`/`StickyColumnSplitProps`); items semânticos `<article>` com título `h3`; root `<section>`; eyebrow opcional em texto; título em `h2`.
- `/library/features` 1 → 2 entries (nova entry `sticky-column-split`, demo com scroll container próprio e conteúdo posterior que torna o boundary da section observável); `FeatureComparison` intacto; nenhuma rota nova.
- Runtime geométrico validado: `scrollHeight 965 > clientHeight 420`; `deltaTop` relativo ao scroll container — inicial 64px (posição natural), intermediário 32px (sticky engajado exatamente no `top-8`), final −84px (coluna liberada pelo fim do containing block). Mobile: computed `static`, coluna acompanha o scroll (breakpoint CSS), 6 items. Mobile 375×667 e desktop 1280×720, zero overflow.
- +1 teste Playwright (section pelo conteúdo, ancestral rolável, scroll real, mobile sem sticky, desktop sticky com top 32px, geometria relativa ao scroll container, boundary no final, zero overflow). Suíte: 25 testes / 50 execuções — **48 passed + 2 skipped**.
- Lint **0/0**; build **PASS** (19 rotas); `git diff --check` limpo.
- Contagens: sections 31, UI 9, total 49. Rotas: 19 → 19. QLT-002, QLT-003, QLT-005 e QLT-011 inalterados.
- Documentação atualizada: `docs/COMPONENT-CATALOG.md` (StickyColumnSplit + contagens), `docs/ROADMAP-1000-EVOLUTIONS.md` (021 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 022).

---

## [2026-11-05] — Evolução 020: Sticky CTA bar (VERIFIED)

- Criado `components/sections/cta/sticky-cta-bar.tsx` — `StickyCtaBar`, nova section no grupo CTA existente; anti-duplicação confirmada por inventário (nenhuma CTA sticky/fixed existente; nenhuma CTA legacy refatorada).
- `position: sticky; bottom: 0` — o comportamento fica limitado pelo containing/scroll block do consumer (não é `fixed`); Server Component; CSS-only — sem scroll listeners, sem visibility state; sem z-index customizado; sem compensação de safe-area; sem motion; nenhuma dependência nova.
- Contrato data-driven local (`StickyCtaAction`/`StickyCtaBarProps`); actions reais pela convenção 001 — interno via `next/link`, protocolo/externo via `<a>`, `Button asChild`; root `<aside>`; mobile-first, horizontal em desktop.
- `/library/cta` 4 → 5 entries (nova entry `sticky-cta-bar`, demo com scroll container próprio da página); nenhuma rota nova; home e `library-shell` intactos.
- Runtime sticky comprovado por geometria: desktop `scrollHeight 521 > clientHeight 420`, mobile `909 > 420`; delta `containerBottom − asideBottom = 0` no início, meio e final do scroll. Validação live 375×667 e 1280×720, zero overflow.
- +1 teste Playwright (aside por conteúdo, computed `sticky`/`bottom 0`, ancestral rolável, scroll real, geometria em múltiplas posições, links reais, zero overflow). Suíte: 24 testes / 48 execuções — **46 passed + 2 skipped**.
- Lint **0/0**; build **PASS** (19 rotas); `git diff --check` limpo.
- Contagens: sections 30, UI 9, total 48. Rotas: 19 → 19. QLT-003, QLT-005 e QLT-011 inalterados.
- Documentação atualizada: `docs/COMPONENT-CATALOG.md` (StickyCtaBar + contagens), `docs/ROADMAP-1000-EVOLUTIONS.md` (020 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 021).

---

## [2026-11-04] — Evolução 019: Standardize legacy /library pages (VERIFIED — QLT-010)

- As 7 páginas legacy (`hero`, `about`, `services`, `testimonials`, `pricing`, `contact`, `cta`) migradas para o padrão moderno consolidado da `/library`: `metadata` local, page headers modernos, entries locais tipadas, preview boxes padronizados, labels `Componente: <code>{id}</code>`.
- Tipagem preservada: páginas simples usam `Component`; páginas heterogêneas usam `preview: React.ReactNode` — zero `any`, zero `Record<string, unknown>`, nenhuma abstração global compartilhada.
- Variants, ordem e demo props preservados (Hero 4, About 3, Services 3, Testimonials 4, Pricing 3, Contact 3, CTA 4); zero component novo; components internos intactos; navigation intacta; páginas permanecem Server Components.
- Varredura final: nenhum padrão legacy restante nas 7 páginas — único resíduo (comentário em `layout.tsx`) pertence ao QLT-011, fora do escopo.
- +1 teste Playwright (teste único cobre as 7 páginas migradas: h1, primeiro component id, label `Componente:`, zero overflow). Suíte: 23 testes / 46 execuções — **44 passed + 2 skipped**.
- Validação live nas representativas (hero, testimonials, contact) em 375×667 e 1280×720 — zero overflow.
- Contagens: sections 29, UI 9, total 47 (inalterado). Rotas: 19 → 19.
- Lint **0/0**; build **PASS** (19 rotas); `git diff --check` limpo.
- Findings: **QLT-010 VERIFIED** (100% dos casos migrados). QLT-002, QLT-003, QLT-005 e QLT-011 inalterados.
- Documentação atualizada: `QUALITY-REVIEW.md` (QLT-010 VERIFIED + tabela/totais), `docs/ROADMAP-1000-EVOLUTIONS.md` (019 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 020).

---

## [2026-11-04] — Evolução 018: FAQ (VERIFIED)

- Criado `components/sections/faq/faq-accordion.tsx` — `FaqAccordion`, novo grupo `faq`; data-driven; Server Component; primeiro consumer real do Accordion (017).
- `type="single"` + `collapsible` — uma resposta por vez, item aberto pode colapsar; nenhum state wrapper próprio; nenhuma dependência nova; Accordion primitive intacto.
- Nova rota `/library/faq` (Server Component) + link "FAQ" na navegação da library; demo genérica com 6 perguntas; visual editorial neutro; sem Card por item; sem motion adicional.
- Runtime validation da Evolução 017 concluída nesta evolução (deliberadamente reservada pela 017): mouse, open/close, single, collapsible, `aria-expanded`, `aria-controls`, Enter/Space/setas/Home/End, focus-visible, Chevron, reduced motion, heading hierarchy.
- Validação live 375×667 (FAQ funcional, tap target adequado, respostas sem corte, chevron, foco, zero overflow) e 1280×720 (comportamento completo, teclado, foco, zero overflow).
- +2 testes Playwright (aria-expanded/aria-controls/painel associado/single/collapsible; Enter/Space/ArrowDown/ArrowUp/Home/End/reduced motion/Chevron-state). Suíte: 22 testes / 44 execuções — **42 passed + 2 skipped**.
- Contagens: sections 28→29, total 46→47 (UI 9 inalterado). Rotas: 18→19.
- Lint **0/0**; build **PASS** (19 rotas); `git diff --check` limpo.
- Findings: QLT-005 inalterado (nasce data-driven, não remove ocorrência legacy); QLT-010 inalterado (Evolução 019); QLT-003 n/a.
- Documentação atualizada: `docs/COMPONENT-CATALOG.md` (entrada FaqAccordion + nota do Accordion + contagens), `docs/ROADMAP-1000-EVOLUTIONS.md` (018 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 019).

---

## [2026-11-04] — Evolução 017: Accessible Accordion (technical VERIFIED)

- Criado `components/ui/accordion.tsx` — novo UI primitive compound de disclosure acessível, baseado em `@radix-ui/react-accordion` (^1.3.1, dependência aprovada no Plan).
- Exatamente 4 exports públicos: `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` — o `Header` do Radix permanece interno ao Trigger (sem export).
- API nativa do Radix preservada: `type="single"` (com `collapsible`) / `type="multiple"`; controlled (`value`/`onValueChange`) e uncontrolled (`defaultValue`); nenhum state wrapper próprio.
- Client Component (`"use client"` somente no primitive); keyboard semantics e ARIA (`aria-expanded`, associação Trigger/Content) fornecidos pelo Radix, sem handlers customizados; focus-visible coerente com Button.
- `ChevronDown` decorativo com `aria-hidden="true"` explícito: rotação de 180° controlada pelo `data-state` do Trigger — a rotação acontece também com reduced motion (instantânea); apenas a transição usa `motion-safe` (convenção da Evolução 012). Content sem animação, spacing neutro, `overflow-hidden`; visual propositalmente mínimo.
- `data-slot`s (`accordion`/`accordion-item`/`accordion-trigger`/`accordion-content`); `className` via `cn()` nos quatro exports.
- Nenhum consumer, nenhuma rota nova, nenhum teste Playwright novo — a validação visual e de interação em browser será realizada na Evolução 018 (FAQ), primeiro consumer real; precedente Avatar 008→009.
- Contagens: UI 8→9, total 45→46 (compound primitive = 1 unidade; sections 28 inalterado).
- Lint **0/0**; build **PASS** (18 rotas); Playwright **38 passed + 2 skipped** (20 testes / 40 execuções, inalterado); `git diff --check` limpo.
- Findings: nenhum.
- Documentação atualizada: `docs/COMPONENT-CATALOG.md` (entrada + exports + contagens), `docs/ROADMAP-1000-EVOLUTIONS.md` (017 VERIFIED — technical), `memory-bank/CURRENT-STATE.md` (próxima execução: 018).

---

## [2026-11-04] — Evolução 016: Pricing com toggle (VERIFIED)

- `PricingThreeTiers` evoluído (decisão anti-inflação: nenhum componente novo, nenhuma variante nova, contagem inalterada — sections 28, UI 8, total 45).
- Contrato data-driven (`PricingInterval`/`PricingAction`/`PricingPlan`/`PricingThreeTiersProps` — tipos locais); Client Component justificado (estado do intervalo); toggle mensal/anual via `role="group"` com botões `aria-pressed` (selecionado = default, não selecionado = outline), teclado nativo, estado inicial mensal.
- Preços como strings completas fornecidas pelo consumer, sem cálculo comercial no componente; `featured` controla apenas o destaque do card; `action.variant` é a fonte da variant do CTA; CTAs como links reais (convenção 001); features `string[]`; sem Badge forçado, sem `aria-live`, sem motion novo, nenhuma dependência nova.
- Consumers: Variação 01 da `/library/pricing` e a home. A home foi identificada durante o build como segunda consumidora real; a solução final manteve o contrato obrigatório, moveu a copy/dados anteriormente internos para a home e nenhuma default data foi reintroduzida no componente; ambas as páginas continuam Server Components.
- Validação live em 4 cenários — library 375×667, library 1280×720, home 375×667, home 1280×720: toggle funcional nos dois sentidos, preços corretos por período, CTAs reais, featured preservado, cards empilhados no mobile, zero overflow nos quatro cenários.
- +1 teste Playwright (grupo por accessible name, `aria-pressed` inicial, troca mensal→anual→mensal com preços, CTA com href real). Suíte: 20 testes / 40 execuções — **38 passed + 2 skipped**.
- Lint **0/0**; build **PASS** (18 rotas); `git diff --check` limpo.
- Findings: QLT-003 contribuído (evidência recalculada: 10→9 arquivos), continua aberto; QLT-005 contribuído (componente migrou para o contrato), continua aberto; QLT-010 intocado (Evolução 019).
- Documentação atualizada: `QUALITY-REVIEW.md` (evidências de QLT-003/QLT-005), `docs/COMPONENT-CATALOG.md` (entrada do PricingThreeTiers + contrato), `docs/ROADMAP-1000-EVOLUTIONS.md` (016 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 017).

---

## [2026-11-04] — Evolução 015: Labels dos formulários existentes (VERIFIED — QLT-008)

- Corrigidos os 3 contact forms legados (`contact-simple`, `contact-split`, `contact-details`): **10 labels** agora com `<label htmlFor>` e **10 campos** com `id` correspondente — associação programática 1:1 restaurada (WCAG 3.3.2 / 1.3.1).
- IDs determinísticos e prefixados por variant (`contact-simple-*`, `contact-split-*`, `contact-details-*`), únicos entre as 3 variants na mesma página.
- Server Components preservados; nenhum `"use client"`; nenhum hook; zero mudança visual; zero comportamento novo; nenhum `name`/`required`/ARIA adicionada; placeholders e copy preservados.
- Os `<section id="contact">` duplicados são pré-existentes e continuam — fora do escopo da Evolução 015.
- +1 teste Playwright abrangente (as 10 associações via escopo semântico pelos headings, `getByLabel`, `htmlFor`/`id`, tipos de campo, foco por clique no label, unicidade dos 10 IDs). Suíte: 19 testes / 38 execuções — **36 passed + 2 skipped**.
- Validação live: 375×667 e 1280×720 — label click foca o campo correto, visual preservado, overflow 0.
- Lint **0/0**; build **PASS** (18 rotas); `git diff --check` limpo.
- Findings: **QLT-008 VERIFIED** (100% dos casos corrigidos); QLT-004 continua aberto; QLT-010 continua aberto (Evolução 019).
- Documentação atualizada: `QUALITY-REVIEW.md` (QLT-008 VERIFIED + tabela/totais), `docs/COMPONENT-CATALOG.md` (observações das 3 sections), `docs/ROADMAP-1000-EVOLUTIONS.md` (015 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 016).

---

## [2026-11-04] — Evolução 014: Newsletter com estados (VERIFIED)

- Criada `components/sections/newsletter/newsletter-form.tsx` — `NewsletterForm`, novo grupo `newsletter`, primeira section funcional de form do Lab; Client Component justificado (estado, `useId`, submit handler, callback); contrato data-driven com callback externo `onSubmit` (union `{ success: true } | { success: false; message? }`; exceções tratadas com fallback `errorMessage`, nunca `exception.message`); nenhum backend acoplado.
- Estados idle/submitting/success/error: submitting desabilita input/button, troca o label (`submittingLabel`) e marca o form com `aria-busy`; success limpa o campo; error preserva o valor; editar após success/error volta para idle; retry permitido.
- Acessibilidade: label real visível com `htmlFor`/`useId`; live region persistente única `role="status"` (`aria-live="polite"`, `aria-atomic`); `aria-invalid`/`aria-describedby` somente no erro.
- Nova rota `/library/newsletter` (Server Component) com client wrapper apenas de showcase (fora do catálogo) e link "Newsletter" na nav da library; demo determinística (delay ~400ms; `erro@*` → erro, demais válidos → sucesso); sem Skeleton/Separator forçados; sem motion novo.
- Validação live: 375×667 (form empilhado) e 1280×720 (input+button inline, feedback abaixo) — feedback quebra corretamente, overflow 0.
- +2 testes Playwright (success com submitting/disabled/label de envio/campo limpo; error com `aria-invalid`/`aria-describedby`, edição que limpa o erro e retry até success). Suíte: 18 testes / 36 execuções — **34 passed + 2 skipped**.
- Contagens: sections 27→28, total 44→45 (UI 8 inalterado).
- Lint **0/0**; build **PASS** (18 rotas); `git diff --check` limpo.
- Findings: 014 contribui para QLT-004 (comportamento mínimo de form estabelecido), que **permanece aberto** (os 3 contact forms legados seguem sem comportamento); QLT-008 **permanece aberto** (nasce correta por construção; legado destinado à 015).
- Documentação atualizada: `docs/COMPONENT-CATALOG.md` (grupo Newsletter + contagens), `docs/ROADMAP-1000-EVOLUTIONS.md` (014 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 015).

---

## [2026-11-02] — Evolução 013: Separator + Skeleton (VERIFIED)

- Criado `components/ui/separator.tsx` — `Separator`, novo primitive com implementação nativa (zero dependências), Server Component, único `<div>`; orientação `horizontal` (default) / `vertical`; `decorative=true` por padrão (modo decorativo sem `role`/`aria-orientation`); modo semântico (`decorative=false`) com `role="separator"` + `aria-orientation` derivado de `orientation`; `data-slot`/`data-orientation`; `bg-border`; a precedência das props do Separator foi ajustada para preservar `decorative`/`orientation` como fonte de verdade dos atributos controlados.
- Criado `components/ui/skeleton.tsx` — `Skeleton`, novo primitive visual de loading, Server Component; `React.ComponentProps<"div">` com dimensões definidas pelo consumer via `className`; `bg-muted` + `rounded-md`; `motion-safe:animate-pulse` (reduced motion → estático, convenção Motion da 012); sem `role="status"`/`aria-live`/`aria-busy` automáticos — anunciar loading é responsabilidade do consumer/container.
- Nenhum consumer artificial, nenhuma rota nova, nenhum teste novo.
- Contagens: UI 6→8, total 42→44 (sections 27 inalterado).
- Lint **0/0**; build **PASS** (17 rotas); Playwright **30 passed + 2 skipped** (16 testes / 32 execuções, inalterado); `git diff --check` limpo.
- Findings: nenhum.
- Documentação atualizada: `docs/COMPONENT-CATALOG.md` (entradas Separator/Skeleton + contagens), `docs/ROADMAP-1000-EVOLUTIONS.md` (013 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 014).

---

## [2026-11-02] — Evolução 012: Motion pass (VERIFIED)

- Motion pass controlado: exatamente 2 componentes existentes alterados, nenhum componente novo, nenhuma dependência nova, nenhuma abstração de motion criada.
- `HeroMediaShowcase`: entrance discreto (fade + pequeno translate-y) via CSS/tw-animate-css já instalado, aplicado ao container principal.
- `TestimonialsRatingCards`: microinteraction de hover com translate-y mínimo + shadow discreto.
- Todo motion novo protegido por `motion-safe`; reduced motion validado — conteúdo aparece diretamente no estado final, sem animação e sem transform residual.
- Server Components preservados; nenhum Client Component novo.
- `MobileNav` deliberadamente excluído desta evolução (montagem condicional produziria animação assimétrica).
- Validação live: 375×667 e 1280×720 — entrance/hover funcionando, conteúdo íntegro, hover libera sem ficar preso, overflow 0 em todos os casos.
- Adicionado 1 teste Playwright de reduced motion (HeroMediaShowcase visível com `animationName` computado sem animação). Suíte: 16 testes / 32 execuções — **30 passed + 2 skipped** (skips intencionais mobile-only da 007).
- Lint **0/0**; build **PASS** (17 rotas); `git diff --check` limpo.
- Findings: nenhum.
- Documentação atualizada: `docs/DESIGN-SYSTEM.md` (nova seção Motion — princípio, hierarquia tecnológica, reduced motion obrigatório, durações preferenciais, propriedades, padrões que exigem justificativa, Server Components), `docs/COMPONENT-CATALOG.md` (observações de motion nas entradas alteradas — contagens inalteradas 27/6/42), `docs/ROADMAP-1000-EVOLUTIONS.md` (012 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 013).

---

## [2026-10-31] — Evolução 011: Feature Comparison (VERIFIED)

- Criado o novo grupo `components/sections/features/` — `feature-comparison.tsx` (`FeatureComparison`), Server Component, data-driven, primeiro membro do grupo.
- Contrato: `ComparisonValue = boolean | string`; `ComparisonOption {id, label}`; `ComparisonFeature {label, values: Record<string, ComparisonValue>}` com `values` keyed pelo id da opção; `FeatureComparisonProps` com `eyebrow?`/`title`/`description?`/`options`/`features` (tipos locais, sem `className` público).
- Tabela HTML semântica real: `Recurso` como primeiro column header explícito, `scope="col"`/`scope="row"`; booleanos via `Check`/`X` Lucide `aria-hidden` com textos acessíveis via sr-only (Incluído/Não incluído); strings renderizadas como dados; valor ausente com representação própria distinta de `false` (`—` + sr-only "Não informado").
- Server Component; CSS-only responsive; sem pricing, sem CTA, sem highlight, sem feature groups, sem tooltip; nenhuma dependência nova.
- Mobile com scroll horizontal interno controlado: o wrapper da tabela usa contexto posicionado (`relative`) junto ao `overflow-x-auto` para manter os elementos `sr-only` absolutamente posicionados dentro do contexto de clipping/scroll correto — o scroll permanece interno e o documento não recebe overflow horizontal (não generalizado como regra global).
- Validação live: 375×667 (page overflow 0; scroll interno testado e utilizável; label longo quebra corretamente; sem clipping indevido) e 1280×720 (page overflow 0; 3 opções alinhadas; tabela íntegra; sem scroll horizontal desnecessário).
- Nova rota `/library/features` (padrão atual do showcase, demo tipada) + link "Features" adicionado ao menu da library (após Services, antes de Logos).
- Adicionado 1 teste Playwright ao smoke (tabela semântica, header Recurso, Essencial/Profissional/Completo, valor textual, estados acessíveis Incluído/Não incluído/Não informado). Suíte: 15 testes / 30 execuções — **28 passed + 2 skipped** (skips intencionais mobile-only da 007).
- Lint **0/0**; build **PASS** (17 rotas); `git diff --check` limpo.
- Findings: nenhum — a section nova já nasce data-driven e a página já nasce no padrão atual (QLT-005 e QLT-010 não reduzem ocorrências legadas).
- Documentação atualizada: `docs/COMPONENT-CATALOG.md` (grupo Features + contagens 27/42), `docs/ROADMAP-1000-EVOLUTIONS.md` (011 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 012).

---

## [2026-10-26] — Evolução 010: HeroCenterCta data-driven (VERIFIED)

- `components/sections/hero/hero-center-cta.tsx` migrada para o contrato — mesmo componente, sem redesign; toda a copy e os CTAs hardcoded saíram do componente.
- Contrato: `HeroCenterAction`/`HeroCenterCtaProps` (tipos locais, sem shared type); `title` obrigatório; `description?`, `supportingText?` e `actions?` opcionais; sem eyebrow; sem `className` público; sem props cosméticas.
- Server Component preservado; `Button asChild` com links reais — internos via `next/link`, protocolos/externos via `<a>` (convenção 001/003); uso típico de 1–2 actions (ausente/vazio → sem bloco).
- Demo movida para `/library/hero` (consumer real, constante tipada); os dois botões falsos da Hero viraram links reais; CTA interno da demo ajustado para "Ver conteúdos" → `/blog` (coerência de destino).
- Adicionado 1 teste Playwright focado (Hero renderizada via contrato: heading + CTA `mailto:` + CTA `/blog`). Suíte: 14 testes / 28 execuções — **26 passed + 2 skipped** (skips intencionais mobile-only da 007).
- Validação live: 375×667 (title, description, 2 CTAs como links, wrapping correto, supporting text, zero elementos vazios, zero overflow) e 1280×720 (layout central, typography/spacing preservados, zero overflow).
- Lint **0/0**; build **PASS** (16 rotas); `git diff --check` limpo.
- Findings: QLT-003 recebe correção real (hero-center-cta removida da evidência — 11→10 ocorrências, permanece aberto); QLT-005 recebe mais uma contribuição (permanece aberto); QLT-010 intocado (reservado para a 019).
- Documentação atualizada: `QUALITY-REVIEW.md` (evidência do QLT-003), `docs/COMPONENT-CATALOG.md` (entrada HeroCenterCta → data-driven), `docs/ROADMAP-1000-EVOLUTIONS.md` (010 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 011).

---

## [2026-10-25] — Evolução 009: Review cards com rating (VERIFIED)

- Criado `components/sections/testimonials/testimonials-rating-cards.tsx` — `TestimonialsRatingCards`, Server Component, data-driven, quarta variante do grupo testimonials e estruturalmente distinta das três legadas (rating + avatar + review cards).
- Contrato: `ReviewItem`/`ReviewAvatar`/`TestimonialsRatingCardsProps` (tipos locais); `items` obrigatório; `avatar` obrigatório por item (`src` opcional, `fallback` obrigatório, sem geração automática de initials); `role` opcional; sem `className` público.
- Rating inteiro 1–5 com normalização defensiva; exatamente 5 estrelas Lucide; accessible name no container `N de 5 estrelas`; ícones `aria-hidden`; semântica `article`/`blockquote`/`footer`; layout 1 coluna mobile / 3 colunas desktop; sem motion; sem ações interativas.
- Primeiro consumer real do `Avatar` (008), sem alterar sua API: imagem válida (data URL SVG inline) carregou; src quebrado acionou `AvatarFallback`; sem src renderizou `AvatarFallback` direto. **Avatar 008 — validação visual image/fallback concluída pela Evolução 009.**
- Variação 04 adicionada à `/library/testimonials` no padrão atual da página (sem antecipar a migração da 019), com demo tipada na página cobrindo os três casos do Avatar.
- Adicionados 3 testes Playwright focados ao smoke (rating acessível; fallback por src quebrado; imagem válida carregada). Suíte: 13 testes / 26 execuções — **24 passed + 2 skipped** (skips intencionais mobile-only da 007), confirmado em duas execuções consecutivas.
- Validação live: 375×667 (3 cards em 1 coluna, ratings íntegros, Avatar válido, fallback por erro, fallback sem src, role opcional, zero overflow) e 1280×720 (3 colunas, cards/ratings/Avatar íntegros, zero overflow).
- Lint **0/0**; build **PASS** (16 rotas); `git diff --check` limpo.
- Findings: nenhum. 009 contribui para a estratégia de migração gradual de QLT-005 (permanece aberto); QLT-010 segue reservado para a Evolução 019.
- Documentação atualizada: `docs/COMPONENT-CATALOG.md` (entrada + contagem 41), `docs/ROADMAP-1000-EVOLUTIONS.md` (009 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 010).

---

## [2026-10-23] — Evolução 008: Avatar (VERIFIED)

- Criado `components/ui/avatar.tsx` — `Avatar`, UI primitive baseado em `@radix-ui/react-avatar` (^1.3.1, dependência nova aprovada no Plan — decisão localizada do primitive, sem DEC global), Client Component ("use client"), API composicional com exatamente 3 exports: `Avatar` (Root), `AvatarImage`, `AvatarFallback`.
- Tamanho base único (`size-10` no Root); `className` + `data-slot` (`avatar`/`avatar-image`/`avatar-fallback`) nos três — padrões reais dos primitives locais (`cn()`, tokens); sem CVA, sem size variants.
- Imagem com `object-cover`; fallback com tokens existentes (`bg-muted`, `text-muted-foreground`) — comportamento image/fallback fornecido pelo Radix (sem máquina de estado própria no projeto); conteúdo do fallback e `alt` fornecidos pelo consumer; sem geração automática de iniciais; sem status/group; sem interatividade própria.
- Sem consumer artificial — nenhuma página/demo criada; a validação visual image → fallback será realizada na Evolução 009, primeiro consumer real do Avatar.
- Lint **0/0**; build **PASS** (16 rotas); e2e **18 passed + 2 skipped**; `git diff --check` limpo.
- Findings: nenhum.
- Documentação atualizada: `docs/COMPONENT-CATALOG.md` (entrada + contagem 40), `docs/ROADMAP-1000-EVOLUTIONS.md` (008 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 009).

---

## [2026-10-20] — Evolução 007: Mobile nav acessível (VERIFIED — QLT-006)

- Criado `components/site/headers/mobile-nav.tsx` — `MobileNav`, Client Component (`useState`/`useId`/`useRef`/`useEffect` com cleanup), contrato `MobileNavLink`/`MobileNavProps` (somente `links` obrigatório) — primeiro componente interativo compartilhado do laboratório.
- Toggle: `Button` real (ghost, icon-lg) com lucide `Menu`/`X`, `aria-label` dinâmico ("Abrir menu"/"Fechar menu"), `aria-expanded`, `aria-controls` via `useId` (ids únicos por instância, sem duplicar no DOM).
- Painel: landmark `<nav aria-label="Navegação principal">` condicional com `ul[role="list"]` (decisão do Plan — painel preserva semântica de navegação); fecha pelo botão, `Escape` (devolve foco ao botão) e clique fora; sem focus trap, sem Sheet, sem portal; visível somente abaixo de `md`.
- Modificados `header-basic.tsx` (MobileNav no grupo direito, depois do CTA — hamburger é o elemento mais à direita, garantindo o painel dentro da viewport em 375px; CTA permanece fora do menu) e `header-with-topbar.tsx` (MobileNav na linha principal; topbar intacta). `header-centered` reavaliado e intencionalmente mantido (flex-wrap funciona; sem hamburger).
- Adicionados 2 testes Playwright focados ao `tests/smoke.spec.ts` (mobile-only, pulam o project desktop): abrir por teclado → `aria-expanded`/`aria-controls` → painel landmark com links → `Escape` fecha e devolve foco; abrir por clique → clique fora fecha. Suíte: 10 testes / 20 execuções.
- Validação live: 375×667 (painel dentro da viewport — left 87→right 311 no Basic, left 86→right 310 no Topbar; ids únicos; independência de estado entre instâncias; link fecha menu e navega; active state preservado; zero overflow) e 1280×720 (botão mobile invisível, painel inexistente, nav desktop preservada, zero overflow).
- Lint **0/0**; build **PASS** (16 rotas); e2e **18 passed + 2 skipped** (20 execuções; skips intencionais dos testes mobile-only no project desktop).
- **QLT-006 → VERIFIED** no `QUALITY-REVIEW.md` (seção + tabela de prioridade P2 + total).
- Documentação atualizada: `QUALITY-REVIEW.md`, `docs/ROADMAP-1000-EVOLUTIONS.md` (007 VERIFIED), `docs/COMPONENT-CATALOG.md` (MobileNav + contagem 39), `memory-bank/CURRENT-STATE.md` (próxima execução: 008).

---

## [2026-10-19] — Evolução 006: `aria-label` nas navegações (VERIFIED — QLT-007)

- `aria-label="Navegação principal"` adicionado nos `<nav>` dos 3 headers (`header-basic`, `header-centered`, `header-with-topbar`); `aria-label="Navegação da biblioteca"` no `<nav>` do `library-shell` — exatamente os 4 `<nav>` do escopo, rótulos em pt-BR aprovados no Plan.
- `<nav>` já é landmark nativo — apenas o nome acessível faltava; nenhum outro ARIA adicionado; nada visual mudou; tab order inalterado.
- Rótulos confirmados na árvore de acessibilidade em `/` (HeaderCentered ativo), `/library/headers` (os 3 previews) e `/library/stats` (shell ativo).
- Lint **0/0**; build **PASS** (16 rotas); e2e **16/16** (suíte inalterada — smoke de navegação por role/texto continua verde).
- **QLT-007 → VERIFIED** no `QUALITY-REVIEW.md` (seção + tabela de prioridade P3 + total).
- Documentação atualizada: `QUALITY-REVIEW.md`, `docs/ROADMAP-1000-EVOLUTIONS.md` (006 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 007).

---

## [2026-10-19] — Evolução 005: Stats / métricas (VERIFIED)

- Criado `components/sections/stats/stats-grid.tsx` — `StatsGrid`, Server Component (sem `"use client"`), data-driven, seguindo o contrato exemplar da Evolução 001.
- Contrato: `StatItem = { value, label, description? }` (tipo local) + `StatsGridProps = { eyebrow?, title?, description?, items }` — `items` obrigatório; sem `className` público; sem props cosméticas.
- Primeiro consumo real do `Badge` (004): `eyebrow` renderiza via `<Badge variant="secondary">` centralizado no header — requisito explícito do roadmap.
- Lista: `ul[role="list"]` em `grid grid-cols-2 gap-8 md:grid-cols-4`; `li` por item com value (`text-3xl/4xl font-bold tabular-nums`) + label + description opcional; key `value-label`; tokens apenas; sem motion (reservado para a 012).
- Criada `app/library/stats/page.tsx` no padrão atual do showcase (metadata, array tipado, preview, label code) — demo fornecida pela página com 4 métricas conceituais; inclui value longo `R$ 2 mi` para validar o grid de 2 colunas em 375px.
- Modificado `components/sections/library-shell.tsx` — link "Stats" adicionado ao menu após "Logos" (+1 linha).
- Responsivo (375×667: grid 2×2, value longo sem truncamento, gap 32px, sem overflow; 1280×720: 4 colunas, sem overflow); acessível (h2, `ul[role=list]`, Badge nativo, tokens, sem ARIA gratuito).
- Lint **0/0**; build **PASS** (16 rotas); e2e **16/16** (suíte inalterada).
- Findings: nenhum.
- Documentação atualizada: `docs/COMPONENT-CATALOG.md` (entrada + contagem 38), `docs/ROADMAP-1000-EVOLUTIONS.md` (005 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 006). `docs/DESIGN-SYSTEM.md`: não alterado.

---

## [2026-10-18] — Evolução 004: Badge (VERIFIED)

- Criado `components/ui/badge.tsx` — `Badge`, UI primitive, Server Component (sem `"use client"`), `<span>` não interativo por conceito.
- API: `React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>`; `defaultVariants: { variant: "default" }`; `data-slot="badge"`; `className` combinado via `cn()` — padrões reais dos primitives locais (button/card/input/textarea), sem cópia da web.
- Variantes (decisão do Plan): `default`, `secondary`, `outline` — somente tokens, sem cor hardcoded; sem `destructive` por enquanto.
- Sem sizes, sem `asChild`/Radix Slot, sem hover próprio, sem motion (reservado para a 012); sem dependência nova; sem shadcn CLI.
- Sem página no `/library` — igual aos demais primitives; verificação visual quando consumido pela 005/009.
- Lint **0/0**; build **PASS** (15 rotas); e2e **16/16** (suíte inalterada).
- Findings: nenhum.
- Documentação atualizada: `docs/COMPONENT-CATALOG.md` (entrada + contagem 37), `docs/ROADMAP-1000-EVOLUTIONS.md` (004 VERIFIED), `memory-bank/CURRENT-STATE.md` (próxima execução: 005). `docs/DESIGN-SYSTEM.md`: não alterado.

---

## [2026-10-17] — Evolução 003: Hero Media Showcase (VERIFIED)

- Criado `components/sections/hero/hero-media-showcase.tsx` — `HeroMediaShowcase`, Server Component (sem `"use client"`), data-driven, seguindo o contrato exemplar da Evolução 001.
- Contrato: `HeroAction` (tipo local, sem abstração compartilhada prematura com `CtaAction`) + `HeroMediaShowcaseProps` — `title` obrigatório; `eyebrow`/`description`/`actions`/`mediaCaption` opcionais; sem `className` nem props cosméticas.
- Composição **vertical/showcase** (decisão do Plan, anti-inflação com `hero-primary`): conteúdo editorial centralizado no topo (eyebrow → h1 → descrição → actions) + media frame dominante full-width abaixo + legenda opcional — nenhuma coluna lateral de mídia.
- Media frame estruturalmente fixo: mock de browser/dashboard em HTML + Tailwind + tokens (chrome com dots, sidebar, stat cards, gráfico de barras, linhas) — sem imagem, sem asset, sem vídeo, sem ReactNode/render-prop, sem texto interno, sem `aria-*`/`role` gratuitos; legenda via `figcaption` (filho direto do `figure`).
- Actions via `Button asChild`: internos via `next/link`, protocolos/externos via `<a>` (padrão 001); sem motion (reservado para a Evolução 012).
- Modificado `app/library/hero/page.tsx` — constante local tipada `heroMediaShowcaseDemo` + bloco "Variante 04 · Showcase vertical com media frame" no padrão atual da página (página não reconstruída; QLT-010 segue na 019).
- Responsivo (375×667 e 1280×720 sem overflow, ordem DOM natural; media ≈ 1,9× a altura do conteúdo no desktop); acessível (h1, links reais, `figure`/`figcaption`, tokens, foco nativo do Button).
- Lint **0/0**; build **PASS** (15 rotas); e2e **16/16** (suíte inalterada — opção A, smoke novo na 025).
- Findings: nenhum.
- Documentação atualizada: `docs/COMPONENT-CATALOG.md` (entrada + contagem 36), `docs/ROADMAP-1000-EVOLUTIONS.md` (003 VERIFIED, renomeada para Hero Media Showcase), `memory-bank/CURRENT-STATE.md` (próxima execução: 004). `docs/DESIGN-SYSTEM.md`: não alterado (aplica o padrão já documentado).

---

## [2026-10-16] — Evolução 002: Logos / Social Proof Strip (VERIFIED)

- Criado `components/sections/logos/logos-strip.tsx` — `LogosStrip`, Server Component (sem `"use client"`), data-driven, seguindo o contrato exemplar da Evolução 001.
- Contrato mínimo: `LogoItem = { name }` via `items` obrigatório; `title` opcional; sem imagem, links, motion, `className` ou props cosméticas (suporte a imagem/links fica para evolução futura somente com demanda real).
- Wordmarks tipográficos em `<ul role="list">` com `<li>` por marca; flex-wrap centralizado; tokens apenas.
- Criada `app/library/logos/page.tsx` no padrão atual do showcase (metadata, array tipado, preview, label code) — demo fornecida pela página.
- Modificado `components/sections/library-shell.tsx` — link "Logos" adicionado ao menu (+1 linha).
- Responsivo (375 e 1280 sem overflow); acessível (h2, `ul[role=list]`, texto real, sem ARIA desnecessário).
- Lint **0/0**; build **PASS** (15 rotas); e2e **16/16** (suíte inalterada).
- Findings: nenhum (segundo caso de uso do contrato da 001).
- Documentação atualizada: `docs/COMPONENT-CATALOG.md` (entrada + contagem 35), `docs/ROADMAP-1000-EVOLUTIONS.md` (002 VERIFIED).

---

## [2026-10-15] — Evolução 001: CTA Split Actions data-driven + contrato exemplar (VERIFIED)

- Criado `components/sections/cta/cta-split-actions.tsx` — `CtaSplitActions`, Server Component (sem `"use client"`), data-driven, sem conteúdo hardcoded.
- Primeiro contrato de props do laboratório: `CtaAction` + `CtaSplitActionsProps` (`title` e `actions` obrigatórios; `eyebrow`/`description`/`supportingText` opcionais; `variant` restrito a `default | outline`; sem props cosméticas).
- Coluna editorial + painel de conversão; estruturalmente distinto do `cta-split.tsx` legado (caso de uso: decisão/conversão).
- Links internos via `next/link`; protocolos/externos via `<a>`; key das actions por `href + label`.
- Demo fornecida pela página `app/library/cta/page.tsx` (constante local tipada) — 4º bloco adicionado, página não reconstruída.
- Responsivo (1 coluna em 375, 2 colunas em 1280, sem overflow); acessível (h2, links reais, foco, tokens, sem ARIA desnecessário).
- Lint **0/0**; build **PASS**; e2e **16/16**.
- Findings: QLT-005 **PARCIAL** (início do padrão), QLT-003 **PARCIAL** (actions do exemplar).
- Documentação atualizada: `docs/DESIGN-SYSTEM.md` (padrão de contrato), `docs/COMPONENT-CATALOG.md` (entrada + contagem 34), `docs/ROADMAP-1000-EVOLUTIONS.md` (001 VERIFIED).

---

## [2026-10-15] — Roadmap oficial das 1000 evoluções (documental)

- Criado `docs/ROADMAP-1000-EVOLUTIONS.md` — fonte de verdade do roadmap evolutivo.
- Distribuição macro por áreas somando exatamente 1000 (direcional, rebalanceável entre lotes).
- Primeiro lote 001–025 detalhado; marcos 100/250/500/750/1000 descritos por maturidade.
- Estratégia de lotes de ~25 com reavaliação ao fim de cada lote e quality review maior a cada ~100 registrada no documento.
- `PROJETO.md` e `memory-bank/CURRENT-STATE.md` atualizados minimamente (referência ao roadmap oficial; lote ativo e próxima execução).
- **Nenhuma evolução implementada nesta mudança** — somente documentação.

---

## [2026-10-14] — Playwright mínimo pré-rotina (VERIFIED)

- `@playwright/test` **1.64.1** instalado (devDependency — única dependência nova).
- Navegador: **Chromium somente**.
- Criado `playwright.config.ts`: `testDir: ./tests`, `baseURL: http://localhost:3000`, `webServer` com `npm run dev` (`reuseExistingServer: !CI`, timeout 120000).
- Criado `tests/smoke.spec.ts`: **8 smoke tests** (`/`, `/blog` listagem, post de slug válido, slug inexistente/404, `/library` redirect, `/library/headers`, `/library/footers`, navegação home → blog).
- **Dois projects:** desktop (1280×720) e mobile (375×667).
- Script `npm run test:e2e` adicionado; `.gitignore` com `/test-results/` e `/playwright-report/`.
- **16/16** (8 testes × 2 projects) em **duas execuções consecutivas**, sem retries.
- Lint **0 errors / 0 warnings**; build **PASS**.
- **Infraestrutura Playwright pré-rotina VERIFIED** (DEC-006 executada).
- Não incluído (posterior): visual regression, CI, Firefox, WebKit.

---

## [0.1.0] — 2026-09-30

### Fundação

- Criada a fundação documental da FASE 2.
- Documentação criada:
  - `AGENTS.md` — ponto de entrada para Agents.
  - `.github/copilot-instructions.md` — instruções para GitHub Copilot.
  - `README.md` — reescrito para GitHub Template.
  - `PROJETO.md` — visão do produto.
  - `docs/ARQUITETURA.md` — arquitetura real atual.
  - `docs/DESIGN-SYSTEM.md` — sistema de design existente.
  - `docs/COMPONENT-CATALOG.md` — inventário de componentes (33).
  - `docs/DEFINITION-OF-DONE.md` — critérios de evolução concluída.
  - `memory-bank/CURRENT-STATE.md`, `DECISIONS.md`, `CHANGELOG.md`.
- Decisões aprovadas: DEC-001 a DEC-010.

### Conhecido (não corrigido nesta fase)

- `app/(site)/blog/[slug]/page.tsx` vazio quebra o `next build`. **RESOLVIDO** via QLT-001 (ver abaixo).

### Correções

- **QLT-001** (P0): Implementação da rota dinâmica `/blog/[slug]`
  - Criado `lib/blog.ts` com fonte de dados compartilhada
  - Implementado busca por slug com `getPostBySlug()`
  - Implementado `notFound()` para slugs inexistentes
  - Corrigido href para formato público `/blog/${slug}`
  - Listagem agora consome fonte compartilhada
  - Rota dinâmica consome mesma fonte compartilhada
  - **Testes:** lint PASS, build PASS, runtime 200/404 verificados

- **QLT-012** (P3): Removidos 5 imports não utilizados
  - `app/(site)/layout.tsx`: `FooterColumns`
  - `app/(site)/page.tsx`: `AboutTimeline`, `CtaBanner`, `HeroCenterCta`, `ServicesSplitWithHighlight`
  - 2 arquivos modificados, 5 linhas removidas, JSX preservado
  - **Testes:** ESLint 0 errors / 0 warnings, build PASS
  - **QLT-012 VERIFIED**

### Novo finding

- **QLT-013** (P2): Datas date-only podem exibir o dia anterior por conversão de timezone
  - Evidência: `2025-11-01` renderizou como `31/10/2025` durante verificação runtime
  - Causa: `new Date(post.date).toLocaleDateString("pt-BR")` interpreta date-only como UTC
  - **Não corrigido** nesta fase — registrado para tratamento futuro
