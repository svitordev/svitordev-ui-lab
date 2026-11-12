# T5 — Documentação da Evolução 033 (Breadcrumbs)

## Arquivos alterados (4)

1. **`docs/COMPONENT-CATALOG.md`** — contagens UI 11 → **12**, total 51 → **52**; nova linha "Breadcrumbs" na tabela de UI components (caminho real `components/ui/breadcrumb.tsx`); nova seção "Contrato do Breadcrumbs (resumo)" com exemplo de composição e regras do contrato (6 exports, `asChild` só no Link, separador decorativo, `aria-current` no Page, Server-compatible).
2. **`docs/ROADMAP-1000-EVOLUTIONS.md`** — status do Lote 02: **033 ✅ VERIFIED (2026-11-12)**, próxima execução **034**; linha da 033 corrigida para o path real `components/ui/breadcrumb.tsx` (singular — convenção majoritária do repositório, aprovado na auditoria T1).
3. **`memory-bank/CURRENT-STATE.md`** — linha do lote ativo com 033 ✅ e "034 é a próxima"; nova entrada "Evolução 033: ✅ IMPLEMENTADA / VERIFIED" com o resumo real (arquivo, 6 exports, semântica, padrões, demo, +4 testes, suíte 46/92 = 89 passed + 3 skipped, contagens UI 12 / total 52 / rotas 23, nota do BLOCKED procedural da T4 e retomada por autorização do operador); "Próxima execução: Evolução 034 — Gallery (section)".
4. **`memory-bank/CHANGELOG.md`** — novo entry `[2026-11-12] — Evolução 033: Breadcrumbs (primitive) (VERIFIED)` no topo, no formato dos entries anteriores (componente, semântica, padrões, demo, testes, contagens, processo do Goal Orchestrator, documentação impactada).

**`QUALITY-REVIEW.md` inalterado** — nenhum finding alterado por esta evolução (nada de hardcoded content novo; primitivo puro consumido pela demo; consistente com o padrão das evoluções de primitivos 013/027/029). `docs/DESIGN-SYSTEM.md` e `memory-bank/DECISIONS.md` inalterados (nenhuma convenção nova).

## Números reais refletidos na documentação

- UI components: **12** · total: **52** · rotas: **23** · Playwright: **46 testes / 92 execuções = 89 passed + 3 skipped** (executado na T4, suíte completa dual-project).

## Resultados dos gates (executados de fato, após as edições)

- `npm run lint` → exit 0, 0 erros / 0 warnings.
- `npm run build` → exit 0, compilado com sucesso, 23/23 páginas geradas.
- `git diff --check` → exit 0.

---

## Anexo A — diff bruto da documentacao (git diff, saida real)

diff --git a/docs/COMPONENT-CATALOG.md b/docs/COMPONENT-CATALOG.md
index 86ea8fc..6e09393 100644
--- a/docs/COMPONENT-CATALOG.md
+++ b/docs/COMPONENT-CATALOG.md
@@ -4,15 +4,15 @@

 ## Contagem total

-- **11** UI components
+- **12** UI components
 - **7** site components
 - **31** section components
 - **2** wrappers/shells
-- **Total: 51** componentes reutiliz├íveis relevantes
+- **Total: 52** componentes reutiliz├íveis relevantes

 ---

-## UI components ÔÇö `components/ui/` (11)
+## UI components ÔÇö `components/ui/` (12)

 | Nome | Path | Tipo | Status | Reutiliza├º├úo | Observa├º├Áes |
 |---|---|---|---|---|---|
@@ -27,6 +27,7 @@
 | Accordion | `components/ui/accordion.tsx` | Primitive de UI (Radix) | Pronto | Alta | **Evolu├º├úo 017.** Compound primitive acess├¡vel de disclosure; baseado em `@radix-ui/react-accordion` (^1.3.1, depend├¬ncia aprovada); Client Component; API nativa do Radix preservada ÔÇö `type="single"` (com `collapsible`) / `type="multiple"`, controlled (`value`/`onValueChange`) e uncontrolled (`defaultValue`), sem state wrapper pr├│prio; exatamente 4 exports p├║blicos `Accordion`/`AccordionItem`/`AccordionTrigger`/`AccordionContent` (o `Header` do Radix ├® interno ao Trigger, sem export); keyboard semantics e ARIA (`aria-expanded`, associa├º├úo Trigger/Content) fornecidos pelo Radix, sem handlers customizados; focus-visible coerente com Button; `ChevronDown` decorativo com `aria-hidden="true"` expl├¡cito, rotaciona 180┬░ pelo `data-state` do Trigger ÔÇö a rota├º├úo acontece tamb├®m com reduced motion (instant├ónea), apenas a transi├º├úo ├® `motion-safe`; Content sem anima├º├úo, spacing neutro, `overflow-hidden`; `data-slot` (`accordion`/`accordion-item`/`accordion-trigger`/`accordion-content`); `className` via `cn()` nos quatro; visual neutro sem Card/shadow; primeiro consumer real: `FaqAccordion` (Evolu├º├úo 018); valida├º├úo runtime visual/keyboard conclu├¡da na Evolu├º├úo 018 ÔÇö single, collapsible, ARIA, keyboard, foco, Chevron e reduced motion confirmados |
 | Alert | `components/ui/alert.tsx` | Primitive de UI (nativo) | Pronto | Alta | **Evolu├º├úo 027.** Primitive est├ítico de feedback; Server Component, zero depend├¬ncias; CVA com variantes `default`/`destructive` (somente tokens existentes ÔÇö nenhum token novo, nenhuma cor raw); `data-slot` (`alert`/`alert-title`/`alert-description`); `cn()`; `React.ComponentProps<"div">` nos tr├¬s exports ÔÇö aceita props HTML normais; N├âO imp├Áe `role`/`aria-live` (sem├óntica live ├® do consumer); destructive com styling contextual tamb├®m na description; sem `forwardRef`, sem `asChild`, sem sizes, sem motion, sem ├¡cone autom├ítico (suporta `svg` como child); exports `Alert`/`AlertTitle`/`AlertDescription` + `alertVariants` (1 entrada de cat├ílogo); demo em `/library/alerts`; consumers planejados (ainda n├úo executados): 028 ÔÇö Contact forms e 042 ÔÇö Contact page |
 | Tabs | `components/ui/tabs.tsx` | Primitive de UI (Radix) | Pronto | Alta | **Evolu├º├úo 029.** Primitive de abas; baseado em `@radix-ui/react-tabs` (^1.2.1, ├║nica depend├¬ncia nova ÔÇö teclado/foco/ARIA nativos do Radix, consist├¬ncia com Accordion/Avatar; a vers├úo `^1.3.1` citada no plano n├úo existe no registry); Client Component (boundary apenas no primitive); API p├║blica preserva a API do Radix ÔÇö controlled/uncontrolled via `value`/`defaultValue`/`onValueChange`, `orientation` preservada pelas props do Root; activation mode padr├úo do Radix preservado (autom├ítico ÔÇö setas movem sele├º├úo e foco; Home/End; sem wrappers ou estado extra); `data-slot` (`tabs`/`tabs-list`/`tabs-trigger`/`tabs-content`); `cn()`; `React.ComponentProps` do primitive Radix correspondente em cada export; visual somente tokens (focus-visible `ring` do projeto, `bg-muted`, `data-[state=active]` com `bg-background`/`shadow-sm`, disabled `opacity-50`); transi├º├úo CSS simples `motion-safe`; sem variants extras; exports `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent` (1 entrada de cat├ílogo); demo em `/library/tabs`; consumer planejado (ainda n├úo executado): 034 ÔÇö Gallery |
+| Breadcrumbs | `components/ui/breadcrumb.tsx` | Primitive de UI (nativo) | Pronto | Alta | **Evolu├º├úo 033.** Navega├º├úo hier├írquica sem├óntica; Server Component; zero depend├¬ncias novas (`@radix-ui/react-slot` e `lucide-react` j├í existentes); exatamente 6 exports `Breadcrumb`/`BreadcrumbList`/`BreadcrumbItem`/`BreadcrumbLink`/`BreadcrumbPage`/`BreadcrumbSeparator`; `nav` com `aria-label="breadcrumb"` default sobrescrev├¡vel; `ol`/`li` na sem├óntica; `BreadcrumbPage` n├úo-link com `aria-current="page"` default; separador decorativo `role="presentation"` + `aria-hidden="true"` com `ChevronRight` default (lucide-react), children sobrescrev├¡vel, sem prop `icon`; `asChild` via Slot somente em `BreadcrumbLink`; `data-slot` nos seis; `cn()`; `React.ComponentProps`; sem `forwardRef`, sem estado, sem contexto, sem motion, sem cor raw; demo em `/library/breadcrumbs`; consumer planejado (ainda n├úo executado): 045 ÔÇö Blog article layout |

 Contrato do Separator (resumo):

@@ -76,6 +77,24 @@ Contrato do Tabs (resumo ÔÇö API nativa do Radix preservada):

 Exports: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`. Controlled/uncontrolled via `value`/`defaultValue`/`onValueChange` do Radix; `orientation` do Radix preservada; activation mode padr├úo (autom├ítico) sem wrappers.

+Contrato do Breadcrumbs (resumo):
+
+```tsx
+<Breadcrumb> {/* nav, aria-label="breadcrumb" default */}
+  <BreadcrumbList> {/* ol */}
+    <BreadcrumbItem> {/* li */}
+      <BreadcrumbLink href="...">...</BreadcrumbLink> {/* a; asChild via Slot */}
+    </BreadcrumbItem>
+    <BreadcrumbSeparator /> {/* li decorativo, aria-hidden, ChevronRight default */}
+    <BreadcrumbItem>
+      <BreadcrumbPage>...</BreadcrumbPage> {/* span n├úo-link, aria-current="page" */}
+    </BreadcrumbItem>
+  </BreadcrumbList>
+</Breadcrumb>
+```
+
+`React.ComponentProps` do elemento nativo correspondente em cada export; `asChild` apenas em `BreadcrumbLink` (`@radix-ui/react-slot`, depend├¬ncia existente); `data-slot` nos seis exports; separador decorativo com children sobrescrev├¡veis e sem prop `icon`; `BreadcrumbPage` n├úo-link com `aria-current="page"` default. Server-compatible, sem estado, sem contexto, sem motion. Exports: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`.
+
 ## Site components ÔÇö `components/site/` (7)

 ### Headers ÔÇö `components/site/headers/` (4)
diff --git a/docs/ROADMAP-1000-EVOLUTIONS.md b/docs/ROADMAP-1000-EVOLUTIONS.md
index 2af2669..8b66e47 100644
--- a/docs/ROADMAP-1000-EVOLUTIONS.md
+++ b/docs/ROADMAP-1000-EVOLUTIONS.md
@@ -386,7 +386,7 @@ Working tree limpo em `main` (HEAD = origin/main), roadmap aprovado, nenhuma dep

 # Lote 02 ÔÇö Evolu├º├Áes 026ÔÇô050

-**Status:** **EM EXECU├ç├âO** ÔÇö planejado na reprioriza├º├úo ao fim do Lote 01 (2026-11-09). **026 Ô£à VERIFIED (2026-11-09)**; **027 Ô£à VERIFIED (2026-11-09)**; **028 Ô£à VERIFIED (2026-11-10)**; **029 Ô£à VERIFIED (2026-11-10)**; **030 Ô£à VERIFIED (2026-11-10)**; **031 Ô£à VERIFIED (2026-11-11)**; **032 Ô£à VERIFIED (2026-11-11)**; 033ÔÇô050 planejadas e n├úo iniciadas. Pr├│xima execu├º├úo: **033**.
+**Status:** **EM EXECU├ç├âO** ÔÇö planejado na reprioriza├º├úo ao fim do Lote 01 (2026-11-09). **026 Ô£à VERIFIED (2026-11-09)**; **027 Ô£à VERIFIED (2026-11-09)**; **028 Ô£à VERIFIED (2026-11-10)**; **029 Ô£à VERIFIED (2026-11-10)**; **030 Ô£à VERIFIED (2026-11-10)**; **031 Ô£à VERIFIED (2026-11-11)**; **032 Ô£à VERIFIED (2026-11-11)**; **033 Ô£à VERIFIED (2026-11-12)**; 034ÔÇô050 planejadas e n├úo iniciadas. Pr├│xima execu├º├úo: **034**.

 ## Vis├úo geral

@@ -403,7 +403,7 @@ O lote abre com a d├¡vida real de confian├ºa do template (026 ÔÇö QLT-003) e com
 | 030 | Tema: definir pol├¡tica e alinhar implementa├º├úo Ô£à VERIFIED | quality | Decidir com base no produto: A) dark-only ÔåÆ explicitar c├│digo+DS e eliminar/reclassificar light enganoso; B) suportar light/dark ÔåÆ mecanismo real de acesso. Plan pr├│prio antes de implementar | decis├úo + implementa├º├úo alinhada | QLT-009 Ô£à | ÔÇö | PequenoÔÇôm├®dio |
 | 031 | Migrar hero-primary para contrato Ô£à VERIFIED | refactor | QLT-005 incremental | contrato + demo | QLT-005 (25ÔåÆ24, aberto) | 026 | Pequeno |
 | 032 | Migrar hero-steps + corrigir heading Ô£à VERIFIED | refactor | Contrato + heading sem skip (h1ÔåÆh3 rejeitado por evid├¬ncia; steps h3ÔåÆh2) | contrato + heading hierarchy | QLT-005 (24ÔåÆ23, aberto), QLT-011 (parcial) | 026 | Pequeno |
-| 033 | Breadcrumbs (primitive) | UI | Navega├º├úo hier├írquica | `components/ui/breadcrumbs.tsx` + demo | ÔÇö | ÔÇö | Pequeno |
+| 033 | Breadcrumbs (primitive) | UI | Navega├º├úo hier├írquica | `components/ui/breadcrumb.tsx` + demo (path real, singular ÔÇö conven├º├úo do reposit├│rio, aprovado na auditoria T1) | ÔÇö | ÔÇö | Pequeno |
 | 034 | Gallery (section) | section | Grid de m├¡dia data-driven, estruturalmente distinta, **usando Tabs como parte funcional** (conjuntos reais da demo) | nova section + categoria + demo | ÔÇö | 029 | M├®dio |
 | 035 | Consent preferences banner | site | Componente de UI/comportamento de consentimento (n├úo compliance engine); persist├¬ncia expl├¡cita, acess├¡vel, sem tracking real, demo segura | `components/site/consent-banner.tsx` + demo + teste | ÔÇö | 026 | Pequeno |
 | 036 | Migrar services├ù2 para contrato | refactor | QLT-005 incremental | 2 contratos + demos | QLT-005 | 026 | M├®dio |
diff --git a/memory-bank/CHANGELOG.md b/memory-bank/CHANGELOG.md
index 60d6f61..d27b287 100644
--- a/memory-bank/CHANGELOG.md
+++ b/memory-bank/CHANGELOG.md
@@ -4,6 +4,19 @@ Registro de mudan├ºas t├®cnicas importantes ao longo da evolu├º├úo. Formato insp

 ---

+## [2026-11-12] ÔÇö Evolu├º├úo 033: Breadcrumbs (primitive) (VERIFIED)
+
+- **`components/ui/breadcrumb.tsx`** (singular ÔÇö conven├º├úo majorit├íria de nomes em `components/ui/`; o roadmap citava `breadcrumbs.tsx` e foi corrigido) ÔÇö 1 entrada de cat├ílogo com exatamente 6 exports `Breadcrumb`/`BreadcrumbList`/`BreadcrumbItem`/`BreadcrumbLink`/`BreadcrumbPage`/`BreadcrumbSeparator`; sem exports extras (sem Ellipsis/Dropdown/Menu/Icon/Provider ÔÇö nenhum consumer real).
+- **Sem├óntica/a11y:** `nav` com `aria-label="breadcrumb"` default sobrescrev├¡vel; `ol`/`li`; `BreadcrumbPage` n├úo-link com `aria-current="page"` default; separador decorativo `role="presentation"` + `aria-hidden="true"` com `ChevronRight` default (lucide-react), children sobrescrev├¡veis, sem prop `icon`; `asChild` via Slot somente em `BreadcrumbLink` (`@radix-ui/react-slot`, depend├¬ncia existente ÔÇö padr├úo do repo via Button).
+- **Padr├Áes:** Server Component; `data-slot` nos seis exports; `cn()`; `React.ComponentProps`; sem `forwardRef`, sem estado, sem contexto, sem motion, sem cor raw (somente tokens); **zero depend├¬ncias novas**.
+- **Demo:** nova rota `/library/breadcrumbs` no padr├úo moderno (metadata, page header, entries tipadas, preview boxes, label Componente) ÔÇö 2 entries: caminho simples (`BreadcrumbLink` `<a>`) e 3 n├¡veis com `asChild` + `next/link`; link "Breadcrumbs" adicionado na Library Shell antes de Landing (Landing permanece a ├║ltima; nada reordenado).
+- +4 testes Playwright dual-project (landmark nav com accessible name + lista ordenada pela ├írvore de acessibilidade; links + `aria-current="page"` + separadores `aria-hidden`; teclado com foco vis├¡vel; zero overflow). Su├¡te: 46 testes / 92 execu├º├Áes ÔÇö **89 passed + 3 skipped**. Lint **0/0**; build **PASS** (23 rotas, `/library/breadcrumbs` presente); `git diff --check` limpo.
+- Contagens: UI 11 ÔåÆ **12**, total 51 ÔåÆ **52**; rotas 22 ÔåÆ **23**. Consumer planejado (045 ÔÇö Blog article layout) n├úo antecipado. Nenhum finding de QUALITY-REVIEW alterado.
+- **Processo (Goal Orchestrator):** T1ÔÇôT5 aprovadas pelo Inspector; T4 teve um BLOCKED procedural na 1┬¬ revis├úo (evid├¬ncia resumida sem diff/outputs brutos), retomado por autoriza├º├úo expl├¡cita do operador com evid├¬ncia verific├ível completa ÔÇö nenhum c├│digo alterado na retomada; nenhuma self-approval.
+- Documenta├º├úo atualizada: `docs/COMPONENT-CATALOG.md` (entrada Breadcrumbs + contrato), `docs/ROADMAP-1000-EVOLUTIONS.md` (033 VERIFIED, pr├│xima 034, path real), `memory-bank/CURRENT-STATE.md` (pr├│xima execu├º├úo: 034). `docs/DESIGN-SYSTEM.md`, `memory-bank/DECISIONS.md` e `QUALITY-REVIEW.md` inalterados (nenhuma conven├º├úo nova, nenhum finding alterado).
+
+---
+
 ## [2026-11-11] ÔÇö Evolu├º├úo 032: Migrar HeroSteps para contrato + corrigir heading (VERIFIED ÔÇö QLT-005 incremental, QLT-011 parcial)

 - **`HeroSteps`** (`components/sections/hero/hero-steps.tsx`) migrado para contrato data-driven local ÔÇö visual e Server Component preservados: tipos locais `HeroStep`/`HeroStepsAction`/`HeroStepsProps`; `title`/`steps` obrigat├│rios; `description?`/`action?`/`supportingText?` opcionais com renderiza├º├úo condicional; sem defaults internos escondendo conte├║do; campo `desc` renomeado para `description` (naming do DS); linguagem id├¬ntica aos contratos 001/003/010/016 (union restrita `default | outline`, conven├º├úo 001 para links).
diff --git a/memory-bank/CURRENT-STATE.md b/memory-bank/CURRENT-STATE.md
index 7fa67ed..cb31ba5 100644
--- a/memory-bank/CURRENT-STATE.md
+++ b/memory-bank/CURRENT-STATE.md
@@ -9,7 +9,7 @@ Reposit├│rio base (GitHub Template) em fase de **funda├º├úo documental**.
 - **Fase atual:** FASE 2 ÔÇö Documenta├º├úo.
 - **Prepara├º├úo t├®cnica pr├®-rotina:** conclu├¡da.
 - **Roadmap:** macro aprovado e versionado em `docs/ROADMAP-1000-EVOLUTIONS.md`.
-- **Lote ativo:** 02 (026ÔÇô050) ÔÇö **em execu├º├úo**: 026 Ô£à, 027 Ô£à, 028 Ô£à, 029 Ô£à, 030 Ô£à, 031 Ô£à, 032 Ô£à conclu├¡das; **033 ├® a pr├│xima**. Lote 01 (001ÔÇô025) Ô£à conclu├¡do.
+- **Lote ativo:** 02 (026ÔÇô050) ÔÇö **em execu├º├úo**: 026 Ô£à, 027 Ô£à, 028 Ô£à, 029 Ô£à, 030 Ô£à, 031 Ô£à, 032 Ô£à, 033 Ô£à conclu├¡das; **034 ├® a pr├│xima**. Lote 01 (001ÔÇô025) Ô£à conclu├¡do.
 - **Evolu├º├úo 001:** Ô£à IMPLEMENTADA / VERIFIED (CTA Split Actions data-driven + contrato exemplar de props).
 - **Evolu├º├úo 002:** Ô£à IMPLEMENTADA / VERIFIED (Logos / social proof strip ÔÇö wordmark tipogr├ífico, sem imagem/links/motion).
 - **Evolu├º├úo 003:** Ô£à IMPLEMENTADA / VERIFIED (Hero Media Showcase ÔÇö composi├º├úo vertical/showcase, media frame HTML/Tailwind dominante, sem imagem/motion).
@@ -42,7 +42,8 @@ Reposit├│rio base (GitHub Template) em fase de **funda├º├úo documental**.
 - **Evolu├º├úo 030:** Ô£à IMPLEMENTADA / VERIFIED (Tema ÔÇö **pol├¡tica dark-only oficial**, DEC-011; **QLT-009 ÔåÆ VERIFIED**: auditoria real antes de decidir (evid├¬ncia em `.goal/evidence/T1-theme-audit.md`); Op├º├úo A aprovada ÔÇö paleta ├║nica oficial no `:root` (valores dark), blocos `.dark` e `@custom-variant dark` removidos, `color-scheme: dark` adicionado; `className="dark"` e `suppressHydrationWarning` removidos do layout raiz; os 8 utilit├írios `dark:` dos 3 bases shadcn (`button`/`input`/`textarea`) resolvidos inline com os valores hoje efetivos ÔÇö render preservado, nenhuma classe morta; sem toggle/provider/persist├¬ncia ÔÇö nenhum mecanismo fake; Op├º├úo B rejeitada por falhar o pr├│prio gate (componente novo sem consumer + QA light inexistente); +1 teste Playwright dual-project em 5 rotas representativas; nenhuma depend├¬ncia nova; contagens 31/11/51 e rotas 22 inalteradas; lint 0/0; build PASS (22 rotas); e2e 75 passed + 3 skipped).
 - **Evolu├º├úo 031:** Ô£à IMPLEMENTADA / VERIFIED (HeroPrimary migrada para contrato data-driven ÔÇö QLT-005 incremental, 25 ÔåÆ 24, permanece aberto; tipos locais `HeroPrimaryAction`/`HeroPrimaryProps` na linguagem dos contratos 001/003/010/016; `title`/`actions` obrigat├│rios, opcionais condicionais, sem defaults internos; consumer `app/library/hero/page.tsx` dono dos dados; CTAs preservam os destinos da 026 como links reais; visual, responsividade, dark-only DEC-011 e Server Component preservados; as outras 3 variants de `/library/hero` intactas; +1 teste Playwright dual-project; contagens 31/11/51 e rotas 22 inalteradas; nenhuma depend├¬ncia nova; lint 0/0; build PASS (22 rotas); e2e 77 passed + 3 skipped).
 - **Evolu├º├úo 032:** Ô£à IMPLEMENTADA / VERIFIED (HeroSteps migrado para contrato data-driven + heading corrigido ÔÇö tipos locais `HeroStep`/`HeroStepsAction`/`HeroStepsProps`; `title`/`steps` obrigat├│rios, opcionais condicionais, sem defaults internos; `desc` ÔåÆ `description` (naming DS); consumers donos dos dados (`app/(site)/page.tsx` + `app/library/hero/page.tsx`); CTA preserva o destino da 026 (`/#contact`) como link real; visual, responsividade, dark-only DEC-011 e Server Component preservados; demais 3 variants de `/library/hero` intactas). **Heading (QLT-011, provado pelo c├│digo):** steps h3 ÔåÆ h2 (elimina o skip); o palpite do roadmap h1 ÔåÆ h3 foi rejeitado ÔÇö o h1 do componente ├® o ├║nico h1 da home (2 testes o protegem). +2 testes Playwright dual-project; su├¡te 42 testes / 84 execu├º├Áes ÔÇö 81 passed + 3 skipped; lint 0/0; build PASS (22 rotas). Contagens 31/11/51 e rotas 22 inalteradas; nenhuma depend├¬ncia nova. **QLT-005: 24 ÔåÆ 23, permanece aberto. QLT-011: parcial (evid├¬ncia hero-steps resolvida), N├âO VERIFIED.**
-- **Pr├│xima execu├º├úo:** Evolu├º├úo 033 ÔÇö Breadcrumbs (primitive). Aguardar ordem de in├¡cio.
+- **Evolu├º├úo 033:** Ô£à IMPLEMENTADA / VERIFIED (Breadcrumbs (primitive) ÔÇö `components/ui/breadcrumb.tsx` (singular ÔÇö conven├º├úo majorit├íria do reposit├│rio; roadmap corrigido na T5), 1 entrada de cat├ílogo com exatamente 6 exports `Breadcrumb`/`BreadcrumbList`/`BreadcrumbItem`/`BreadcrumbLink`/`BreadcrumbPage`/`BreadcrumbSeparator`; Server-compatible; zero depend├¬ncias novas (`@radix-ui/react-slot` s├│ no `asChild` de `BreadcrumbLink`; `lucide-react` s├│ no `ChevronRight` default do separador); `nav` com `aria-label="breadcrumb"` default; `ol`/`li`; `BreadcrumbPage` n├úo-link com `aria-current="page"` default; separador decorativo `role="presentation"` + `aria-hidden="true"` com children sobrescrev├¡veis e sem prop `icon`; `data-slot` nos seis; `cn()`; `React.ComponentProps`; sem `forwardRef`, sem estado, sem contexto, sem motion, sem cor raw; nova demo `/library/breadcrumbs` no padr├úo moderno (2 entries: caminho simples + 3 n├¡veis com `asChild`/`next/link`) + link "Breadcrumbs" na Library Shell antes de Landing; +4 testes Playwright dual-project (landmark nav + accessible name, lista ordenada pela ├írvore de acessibilidade, links, aria-current, separadores decorativos, teclado/foco vis├¡vel, zero overflow); su├¡te 46 testes / 92 execu├º├Áes ÔÇö 89 passed + 3 skipped; lint 0/0; build PASS (23 rotas); `git diff --check` limpo. UI 11 ÔåÆ 12, total 51 ÔåÆ 52; rotas 22 ÔåÆ 23. Consumer planejado 045 n├úo antecipado. T4 teve um BLOCKED procedural (evid├¬ncia resumida insuficiente para o Inspector), retomado por autoriza├º├úo do operador com evid├¬ncia verific├ível completa ÔÇö nenhum c├│digo alterado na retomada.)
+- **Pr├│xima execu├º├úo:** Evolu├º├úo 034 ÔÇö Gallery (section). Aguardar ordem de in├¡cio.

 ## Stack confirmada


## Anexo B — outputs brutos dos gates (exit codes reais)

LINT_EXIT=0 (0 erros / 0 warnings)
BUILD_EXIT=0 (Compiled successfully, 23/23 paginas geradas)
DIFFCHECK_EXIT=0
