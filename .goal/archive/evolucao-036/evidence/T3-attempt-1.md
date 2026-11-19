# T3 — Service B migrada: ServicesGridSimple (Goal 036)

Contrato implementado exatamente como aprovado na T1 (Service B). Consumer único:
`app/library/services/page.tsx` (mapeado na auditoria — GridSimple não tem consumer fora
da Library). T2 permanece íntegra: `services-with-icons.tsx` inalterado nesta task (o diff
cumulativo inclui T2+T3 porque nada foi commitado entre tasks — `git diff --stat` real:
`app/(site)/page.tsx` [T2], `app/library/services/page.tsx` [T2+T3],
`services-grid-simple.tsx` [T3], `services-with-icons.tsx` [T2]).

## Diff real — `components/sections/services/services-grid-simple.tsx`

```diff
-const services = [ ...3 items hardcoded (title/desc)... ];
+// Evolução 036 — contrato data-driven local (QLT-005 incremental). O consumer é
+// dono dos dados; o componente mantém apenas a estrutura (grid, cards) com tokens
+// existentes. Sem ícones — nada de icon API; sem CTA — nada de actions.
+
+export type ServiceGridItem = {
+  title: string;
+  description: string;
+};
+
+export type ServicesGridSimpleProps = {
+  title: string;
+  description?: string;
+  services: ServiceGridItem[];
+};

-export function ServicesGridSimple() {
+export function ServicesGridSimple({ title, description, services }: ServicesGridSimpleProps) {
```

- Heading/description da seção e os 3 items passaram a vir das props; `description` com
  renderização condicional; `desc` → `description` (naming DS).
- **Estrutura interna intacta:** `section bg-muted/30`, grid `md:grid-cols-3`, cards
  `rounded-xl border bg-background`, `h2`/`h3`, tokens — zero redesign, zero classe
  alterada. Server Component preservado.

## Diff real — `app/library/services/page.tsx` (consumer dono dos dados)

```diff
+const servicesGridSimpleDemo: ServicesGridSimpleProps = {
+  title: "Como sua empresa ajuda os clientes",
+  description: "Uma visão geral dos principais serviços, deixando claro o que o cliente pode esperar ao escolher o seu atendimento.",
+  services: [ ...3 items com copy original 1:1... ],
+};
...
-    Component: ServicesGridSimple,
+    preview: <ServicesGridSimple {...servicesGridSimpleDemo} />,
```

- Copy movida **1:1** do componente original (heading, description, 3 items na ordem
  original).
- `preview: React.ReactNode` já estava no padrão desde a T2 (página heterogênea — padrão
  da página de hero); ordem e ids das entries preservados.
- SplitWithHighlight continua renderizado sem props (fica na dívida — fora da 036).

## T2 intacta (verificação cruzada)

`services-with-icons.tsx` sem nenhuma alteração nesta task; `app/(site)/page.tsx`
exatamente como aprovado na T2 (revisão APPROVED). Nenhum outro arquivo de produção
tocado.

## Gates reais (executados, exit codes reais)

- `npm run lint` → **LINT_EXIT=0** (0 erros / 0 warnings).
- `npm run build` → **BUILD_EXIT=0** (`Compiled successfully in 1824.1ms`).
- `git diff --check` → **CHECK_EXIT=0**.
- `npx playwright test -g "rotas sem smoke"` → **TEST_EXIT=0**, **2 passed** (desktop +
  mobile — teste existente que visita `/library/services` via shell com `firstId:
  services-grid-simple` e zero overflow; cobre a página dos dois migrados).

## Conformidade com os critérios T3

- Service B data-driven; consumer dono dos dados; copy preservada 1:1; visual preservado
  (zero classe alterada); boundary Server preservado; T2 íntegra; nenhuma dívida nova;
  gates verdes com diff + outputs + exit codes.
