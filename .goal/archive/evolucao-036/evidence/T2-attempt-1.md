# T2 — Service A migrada: ServicesWithIcons (Goal 036)

Contrato implementado exatamente como aprovado na T1 (Service A). Três arquivos alterados
(componente + 2 consumers). Nenhum outro componente tocado (GridSimple e
SplitWithHighlight intactos — B é a próxima task).

## Diff real — `components/sections/services/services-with-icons.tsx`

```diff
-import { Globe2, LayoutDashboard, Workflow } from "lucide-react";
+// Evolução 036 — contrato data-driven local (QLT-005 incremental). O consumer é
+// dono dos dados; o componente mantém apenas a estrutura (grid, cards, moldura do
+// ícone) com tokens existentes. Icon = componente (lucide-react é dependência real).

-const servicesWithIcons = [ ...3 items hardcoded (title/desc/Icon)... ];
+export type ServiceWithIcon = {
+  title: string;
+  description: string;
+  icon: React.ComponentType<{ className?: string }>;
+};
+
+export type ServicesWithIconsProps = {
+  title: string;
+  description?: string;
+  services: ServiceWithIcon[];
+};

-export function ServicesWithIcons() {
+export function ServicesWithIcons({ title, description, services }: ServicesWithIconsProps) {
```

- Heading/description da seção e os 3 items passaram a vir das props; `description` com
  renderização condicional; `desc` → `description` (naming DS).
- **Estrutura interna intacta:** `section`/`div`/`h2`/`h3`, grid `md:grid-cols-3`, cards
  `rounded-2xl border bg-muted/20`, moldura do ícone `h-10 w-10 rounded-xl bg-muted` com
  `Icon className="h-5 w-5 text-muted-foreground"` — zero redesign, zero classe alterada.
- Server Component preservado (sem `"use client"` — boundary atual mantido).

## Diff real — `app/(site)/page.tsx` (consumer real da home)

```diff
-import { ServicesWithIcons } from "@/components/sections/services/services-with-icons";
+import {
+  ServicesWithIcons,
+  type ServicesWithIconsProps,
+} from "@/components/sections/services/services-with-icons";
 import { TestimonialsGrid } from "@/components/sections/testimonials/testimonials-grid";
+import { Globe2, LayoutDashboard, Workflow } from "lucide-react";
+
+// Copy original dos services da home, movida para o consumer (Evolução 036).
+const servicesHomeData: ServicesWithIconsProps = { title, description, services[3] };
...
       <div id="services">
-        <ServicesWithIcons />
+        <ServicesWithIcons {...servicesHomeData} />
       </div>
```

Copy movida **1:1** do componente original (títulos, descrições e ícones Globe2/
LayoutDashboard/Workflow na mesma ordem).

## Diff real — `app/library/services/page.tsx` (consumer demo)

- `Component: React.ComponentType` → `preview: React.ReactNode` (padrão da página de hero
  para páginas heterogêneas — `React.ComponentType` sem props não compila com props
  obrigatórias no TS strict).
- `servicesWithIconsDemo: ServicesWithIconsProps` com a copy original 1:1; GridSimple e
  SplitWithHighlight renderizados sem props (ainda hardcoded — B/C).
- **Ordem e ids das entries preservados** (`services-grid-simple` continua primeiro —
  assertado por teste existente).

## Gates reais (executados, exit codes reais)

- `npm run lint` → **LINT_EXIT=0** (0 erros / 0 warnings).
- `npm run build` → **BUILD_EXIT=0** (`Compiled successfully in 3.9s`).
- `git diff --check` → **CHECK_EXIT=0**.
- `npx playwright test -g "rotas sem smoke|navegacao representativa|landing: compoe"` →
  **TEST_EXIT=0**, **6 passed** (testes existentes que cobrem as áreas afetadas: shell →
  `/library/services` com `firstId: services-grid-simple`, âncoras `#services` da home,
  landing composition — ambos os projetos).

### Incidente auditável (não é defeito da migração)

1ª execução dos testes acima: 6 falhas — snapshot das páginas em **404**. Causa provada:
dev server **órfão** das 11:26 (PID 8816, anterior às edições desta sessão) segurando a
porta 3000 com `reuseExistingServer: true` e cache corrompido pelo `npm run build`.
Após `taskkill /PID 8816 /T /F` (só o órfão), re-execução idêntica: **6/6 verdes**.
Nenhum assert de teste foi alterado.

## Conformidade com os critérios T2

- Service A data-driven; consumers donos dos dados (home + Library); copy preservada 1:1;
  visual preservado (zero classe alterada); boundary Server preservado; nenhuma dívida
  nova (contrato mínimo aprovado, sem defaults, sem actions inventadas — nenhum CTA hoje);
  gates verdes com diff + outputs + exit codes.
