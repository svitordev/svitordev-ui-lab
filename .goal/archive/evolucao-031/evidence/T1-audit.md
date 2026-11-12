# T1 Audit — Evolução 031 (HeroPrimary → contrato data-driven)

Baseline: branch main, HEAD = origin/main = 4409956, working tree limpo no início da task.

## Inventário de consumers reais de `HeroPrimary`

| Consumer | Contexto | Precisa mudar? |
|---|---|---|
| `app/library/hero/page.tsx` | Único consumer real — entry `hero-primary` (1ª de 4 variants), renderiza `<HeroPrimary />` sem props | Sim — passa a ser dono dos dados da demo |
| `tests/smoke.spec.ts` (~L461) | Smoke do padrão moderno da página (`firstId: 'hero-primary'`) | Não — textos da página/shell preservados |
| `tests/smoke.spec.ts` (~L922–923) | Teste dos destinos da 026: `Ver serviços → /#services`, `Falar com a equipe → /#contact` em `/library/hero` | Não — nomes e hrefs preservados pelo consumer |
| `tests/smoke.spec.ts` (~L160) | Teste da hero centralizada, escopo `ancestor::section[1]` (comentário cita HeroPrimary como motivo do escopo) | Não — HeroCenterCta intocado |
| `docs/COMPONENT-CATALOG.md` (L105) | Entry existente (classificada `Template`) | T2 (documentação) |
| `docs/ROADMAP-1000-EVOLUTIONS.md`, `memory-bank/*` | Referências textuais | T2 |

Nenhum outro uso de `HeroPrimary`/`hero-primary` no código (grep `**/*.{ts,tsx,md}`).

## Hardcode real no componente (confirmado no código)

Conteúdo → migra para props:
1. eyebrow: `Site institucional · Empresas e profissionais`
2. título (h1): `Apresente sua empresa com clareza, profissionalismo e confiança.`
3. descrição: `Uma página inicial pensada para explicar quem você é...`
4. supporting text: `Esse modelo funciona bem para escritórios, clínicas...`
5. CTAs (2): `Ver serviços → /#services` (default) e `Falar com a equipe → /#contact` (outline) — destinos da 026 preservados como dados do consumer
6. rótulos textuais do mock visual: `Página inicial` (esquerda) e `Visualização` (direita) — strings legíveis, conteúdo customizável por cliente (mesma natureza dos placeholders QLT-005)

Estrutura → permanece interna:
- section/divs, grid das colunas, spacing, breakpoints (`md:`), container `max-w-6xl`, tokens visuais
- caixas do mock visual (shapes), `size="lg"` dos botões, `text-transform` do eyebrow

## Linguagem de contrato do projeto (referências estudadas)

- Design System (Evolução 001): contrato mínimo e local ao componente; `title` e `actions` obrigatórios; `eyebrow`/`description`/`supportingText` opcionais; `actions[].variant` restrito a `default | outline`; sem props cosméticas; sem render-props.
- `CtaAction` (001), `HeroCenterAction` (010), `HeroAction` (003/012), `PricingAction` (016): todos `{ label; href; variant?: "default" | "outline" }`, tipo local exportado por componente — não existe tipo de action global; cada componente define o seu com a mesma forma. Convenção 001: href interno (`/` mas não `//`) → `next/link`; protocolo/externo → `<a>`.
- HeroMediaShowcase: media frame é estrutura pura (shapes); texto do frame (`mediaCaption`) vem do consumer — precedente direto para os rótulos do mock.

## Contrato final derivado

```ts
export type HeroPrimaryAction = { label: string; href: string; variant?: "default" | "outline" };
export type HeroPrimaryProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  supportingText?: string;
  actions: HeroPrimaryAction[];
  mediaTitle?: string;
  mediaBadge?: string;
};
```

- Sem defaults internos (proibido esconder hardcode); opcionais com renderização condicional; `actions` obrigatório (Design System).
- Server Component preservado; nenhum estado/handler; nenhum `"use client"`; nenhuma dependência nova.
- Visual/responsividade/dark-only (DEC-011) preservados — refactor de contrato, não redesign.

## Testes

- Cobertura existente preservada: padrão moderno (L461), destinos 026 (L922–923), hero centralizada (L160).
- +1 teste novo dual-project provando o contrato via consumer: eyebrow/título/descrição/supporting text/rótulos do mock vindos dos dados da página; CTAs como links reais com hrefs e variantes distintas (estilo computado); zero overflow nos dois viewports.
- Projeção: 39 → 40 testes; 78 → 80 execuções; 75 → 77 passed; 3 skipped.

## Escopo

- Migração: somente `HeroPrimary`. `HeroCenterCta` (já migrado na 010), `HeroSteps` (heading → 032/QLT-011) e `HeroMediaShowcase` (já data-driven) intactos.
- QLT-005: 25 → 24 (1 ocorrência migrada), permanece ISSUE_CONFIRMED/ABERTO.
