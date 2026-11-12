# T1 Audit — Evolução 032 (HeroSteps → contrato data-driven + heading QLT-011)

Baseline: branch main, HEAD = origin/main = 6a181fd (031 commitada/pushada pelo usuário), working tree limpo no início da task (exceto `.goal/` runtime, fora do fingerprint).

## Consumers reais de `HeroSteps` (grep `**/*.{ts,tsx,md}` — sem assumir quantidade)

| Consumer | Contexto | Precisa mudar? |
|---|---|---|
| `app/(site)/page.tsx` (L73) | Home — HeroSteps é a **primeira section** da composição | Sim — passa a dono dos dados |
| `app/library/hero/page.tsx` (L107) | Entry `hero-steps` (1 das 4 variants), renderiza `<HeroSteps />` | Sim — passa a dono dos dados |
| `tests/smoke.spec.ts` L980 | Teste dos destinos da 026 (`Quero conversar sobre um projeto → /#contact` via `a[href]` + texto) | Não — consumer preserva os mesmos dados |
| `docs/COMPONENT-CATALOG.md` L106 | Entry existente (classificada `Template`) | T4 (documentação) |
| `docs/ROADMAP-1000-EVOLUTIONS.md`, `memory-bank/*` | Referências textuais | T4 |

## `/library/hero` — quantidade real de variants: 4

`hero-primary` (migrada 031), `hero-center-cta` (migrada 010), `hero-steps` (alvo da 032), `hero-media-showcase` (migrada 003/012). A 032 altera SOMENTE `hero-steps`; as outras 3 permanecem intactas.

## Inventário de hardcode real em `hero-steps.tsx` (confirmado no código)

Conteúdo → migra para props:
1. título (h1): `Transformando ideia em sistema web em poucos passos.`
2. descrição: `Nada de processos gigantes e burocráticos...`
3. steps: array de módulo com 3 itens `{title, desc}` — números embutidos nos títulos (`1.`, `2.`, `3.`) são conteúdo do consumer
4. CTA: label `Quero conversar sobre um projeto` → `/#contact` (destino corrigido na 026), variant default, `size="lg"`
5. supporting text (parágrafo rodapé da coluna steps): `Esses mesmos blocos você pode reaproveitar...`

Estrutura → permanece interna: grid `md:grid-cols-[...]`, cards, spacing, breakpoints, tokens, `size="lg"` do Button. Sem eyebrow no componente (não vira prop inventada).

## Contratos modernos estudados (linguagem derivada, sem 3ª forma)

- Design System (001): contrato mínimo local; `title` obrigatório; opcionais condicionais; `variant` restrito `default | outline`; sem props cosméticas; convenção 001 para links.
- `CtaAction` (001), `HeroCenterAction` (010), `HeroAction` (003/012), `PricingAction` (016), `HeroPrimaryAction` (031): todos `{ label; href; variant?: "default" | "outline" }`, tipo local exportado.
- Naming DS: `description` (não `desc`); `supportingText` para parágrafo complementar (padrão 001/010/016).

## Contrato proposto (API mínima derivada do componente real)

```ts
export type HeroStep = { title: string; description: string };
export type HeroStepsAction = { label: string; href: string; variant?: "default" | "outline" };
export type HeroStepsProps = {
  title: string;
  description?: string;
  steps: HeroStep[];
  action?: HeroStepsAction;
  supportingText?: string;
};
```

- `title` e `steps` obrigatórios (essência do componente — "hero com steps"); `description`/`action`/`supportingText` opcionais com renderização condicional.
- **Sem defaults** (proibido esconder hardcode); consumers donos dos dados (home + library, cada um com seus dados explícitos; sem arquivo global de fixtures).
- Server Component preservado; nenhum estado/handler; nenhuma dependência nova.

## Heading / QLT-011 — conclusão provada pelo código (planejamento histórico NÃO confirmado)

- Evidência exata do QLT-011: "`hero-steps` pula heading (h1 → h3)" — o skip é entre o heading principal do componente (h1) e os steps (h3).
- O roadmap sugere `h1 → h3` no heading principal. **O código refuta:** na home, HeroSteps é a primeira section e seu h1 é o **único h1 da página**; os outros 6 blocos da home usam h2/h3. Dois testes existentes protegem isso: `home carrega com main, banner e um heading nivel 1` (linha 4 do smoke) e o teste de navegação mobile da 025 (assert h1 após navegar para `/`). Migrar o heading principal para h3 deixaria a home sem h1 e quebraria os dois testes.
- **Correção correta: steps `h3 → h2`** (elimina o skip: h1 → h2, parent–filho correto; visual preservado — os cards já têm classes explícitas `text-sm font-semibold`, tag não afeta o tamanho). Heading principal permanece h1.
- Na Library, o h1 do componente dentro da entry h2 é inversão — padrão pré-existente dos outros heroes já migrados (HeroCenterCta/HeroMediaShowcase, VERIFIED, fora do escopo da 032). A 032 corrige apenas o skip evidenciado.
- QLT-011 possui outros itens (comentários stale em `library/layout.tsx` e `(site)/page.tsx`, `<div>` wrapper no `(site)/layout.tsx`; o item `lang` já foi resolvido na 023). **QLT-011 NÃO fecha na 032** — atualização parcial e factual na T4.

## Arquivos exatos

- **T2 (contrato):** `components/sections/hero/hero-steps.tsx`, `app/(site)/page.tsx`, `app/library/hero/page.tsx`, `tests/smoke.spec.ts` (+1 teste do contrato via consumer, dual-project). Heading NÃO tocado na T2 (isolado na T3).
- **T3 (heading):** `components/sections/hero/hero-steps.tsx` (steps h3→h2), `tests/smoke.spec.ts` (+1 teste de hierarquia via `getByRole heading level`).
- **T4 (docs):** `QUALITY-REVIEW.md`, `docs/COMPONENT-CATALOG.md`, `docs/ROADMAP-1000-EVOLUTIONS.md`, `memory-bank/CURRENT-STATE.md`, `memory-bank/CHANGELOG.md`. DESIGN-SYSTEM e DECISIONS intocados (nenhuma convenção nova).

## Testes necessários

- T2: +1 teste dual-project provando o contrato pelo consumer na Library: título/descrição/steps (ordem)/CTA href/supporting text vindos dos dados da página; zero overflow nos dois viewports.
- T3: +1 teste provando a hierarquia corrigida (heading principal nível 1 + steps nível 2 via `getByRole`, conteúdo visível, CTA link real, zero overflow); home mantém h1 (testes existentes cobrem).
- Testes existentes impactados: nenhum além dos acima (verificado: asserções de heading em outras rotas não tocam HeroSteps; teste da 026 usa `a[href]` + texto, preservado pelo consumer).

## Riscos

- Nível de heading é fixo num componente reutilizável usado em 2 contextos com hierarquias diferentes — decisão documentada: corrigir o skip (evidência QLT-011) sem quebrar a home; inversão na Library é o padrão dos heroes já migrados.
- Renomear `desc` → `description` no tipo: breaking apenas interno (consumers novos); sem consumidores externos ao repo.

## Impacto esperado

- **QLT-005: 24 → 23** (HeroSteps migrado), permanece ISSUE_CONFIRMED/ABERTO.
- **QLT-011: parcial** — evidência do hero-steps resolvida; itens restantes permanecem; NÃO marcar VERIFIED.
- Contagens: 31/11/51 inalteradas; rotas 22; nenhuma dependência nova.
