# Evidência T1 — Auditoria AboutTimeline + contrato (attempt 1)

Data: 2026-11-16 · Builder: Strata Qwen3.8 Flash Next 256K · Goal 037
T1 é investigação — NENHUM arquivo de produção alterado (apenas `.goal/`).

## 1. Componente real (verificado no disco)

- **Path exato:** `components/sections/about/about-timeline.tsx`
- **Export:** `AboutTimeline` (nomeado, função) — Server Component (sem `"use client"`;
  apresentacional puro, sem estado/interação → boundary preservado, sem motivo para client).
- **Conteúdo hardcoded hoje:** array `timeline` no topo do arquivo (3 items `{title, desc}`),
  heading h2 "Um pouco da nossa trajetória", parágrafo de descrição e parágrafo final de
  nota ("Você pode adaptar os textos dessa linha do tempo...").
- **Estrutura interna:** `section` > container `max-w-6xl` > header centralizado/esquerdo
  (h2 + p) > lista `space-y-4` de cards `flex gap-3 rounded-2xl border bg-muted/20` com
  **marcador numerado** (círculo `bg-foreground` com `index + 1`) + h3 + p; parágrafo final
  `text-[11px]`. Tokens existentes, dark-only, sem motion, sem dependências.

## 2. Consumers reais (grep global pelo import/export)

| Consumer | Rota/contexto | Conteúdo atual | Migra? |
|---|---|---|---|
| `app/library/about/page.tsx` | `/library/about` (entry `about-timeline`, 3º da lista) | renderiza `<AboutTimeline />` sem props — todo o conteúdo vem do array interno | **SIM** (único consumer) |
| Home (`app/(site)/page.tsx`) | — | **NÃO importa** o componente (import removido na QLT-012/0.1.0; referências em QUALITY-REVIEW:32/401/421 são registro histórico do finding VERIFIED) | n/a |
| Compositions (`/library/landing`, blog, etc.) | — | sem uso | n/a |

Nenhum outro uso. Após a migração, o único consumer passa a ser dono dos dados — nenhum
consumer ficará na API antiga.

**Detalhe do consumer:** `/library/about` é hoje uma página homogênea
(`Component: React.ComponentType`, 3 entries). Com props apenas no timeline, a página vira
heterogênea → converte para `preview: React.ReactNode` (padrão consolidado das páginas
heterogêneas: hero, services). Os outros 2 componentes (AboutSimple, AboutSplit) permanecem
intactos e continuam na dívida.

## 3. Inventário do hardcode

### Conteúdo configurável → props
- heading principal (h2) → `title` (obrigatório — presente hoje).
- parágrafo de descrição → `description?` (opcional, condicional).
- items da timeline (3) → `items` (obrigatório) — cada item: `title` + `description`
  (campo `desc` → `description`, naming do DS — convenção 032/036).
- parágrafo final de nota → `supportingText?` (opcional, condicional — convenção
  HeroPrimary/HeroSteps; é conteúdo editorial, não estrutura).

### Estrutura interna → permanece no componente
- `section`/container/breakpoints; header (h2 + p condicionais); lista `space-y-4`; cards
  flex; **marcador numerado** (derivado do índice — decoração/estrutura, não vira prop);
  classes, tokens, shadow, rounded; parágrafo final (wrapper estrutural com texto do
  consumer); responsividade; dark-only.

## 4. Contrato proposto (mínimo, sem inflação)

```ts
export type AboutTimelineItem = {
  title: string;
  description: string;
};

export type AboutTimelineProps = {
  title: string;
  description?: string;
  items: AboutTimelineItem[];
  supportingText?: string;
};
```

- Nomenclatura alinhada aos contratos vigentes (001/003/010/016/031/032/036): `title`,
  `description`, `items`, `supportingText` — sem criar sinonímia nova.
- **Sem defaults** proibidos: nada de `title = "..."` ou `items = [...]` reproduzindo o
  conteúdo antigo; consumer é dono.
- Sem `action`/CTA (componente não tem CTA hoje — não inflar API).
- Sem `eyebrow` (componente não tem eyebrow hoje — não inflar API; o campo do contrato
  conceitual do plano foi descartado pela auditoria do código real).
- **Sem `period`/datas:** o código real NÃO tem anos/períodos — os marcadores são números de
  passo (`index + 1`). O `period` conceitual do plano não se aplica; nada de `Date`, parsing
  ou timezone nesta evolução.
- Keys: `item.title` (identificador semanticamente estável, já é o key atual — preservado;
  índice só governa o número do marcador).

## 5. Heading hierarchy / A11Y (auditoria, sem ampliação de escopo)

- Componente: h2 (principal) → h3 (items) — hierarquia correta, sem skip. Preservado.
- Na página da Library: h1 da página → h2 da entry (label da shell) → h2/h3 do componente —
  padrão já existente em todas as páginas da Library (serviços/hero). Sem mudança.
- Marcadores numerados são texto visível (número de passo), não ícone decorativo — sem
  ARIA extra. Leitura linear correta (número → título → descrição por item). QLT-011
  preservado (nada a corrigir aqui).

## 6. Visual

**ZERO REDESIGN.** Conteúdo, ordem (3 items na ordem atual), layout, spacing, typography,
marcadores, responsividade e dark-only DEC-011 preservados 1:1. A migração é apenas de
fonte-de-dados: array interno → props do consumer (copy 1:1).

## 7. QLT-005

- Baseline real confirmado no QUALITY-REVIEW (pós-036): **21** (15 sections + 6 site),
  ISSUE_CONFIRMED / ABERTO. AboutTimeline está na dívida (catálogo: Template; lista de
  migrações do roadmap).
- Previsão pós-037: **21 → 20** (14 sections + 6 site). **Permanece ABERTO** — nunca
  VERIFIED. Roadmap pós-lote "about 2" confere (AboutSimple + AboutSplit ficam).
- T1 não edita QUALITY-REVIEW (edição é T5).

## 8. Testes — cobertura atual e lacuna real

- `tests/smoke.spec.ts` cobre `/library/about` apenas via shell (linha ~524: rota + h1
  "About / Sobre" + firstId `about-simple` + zero overflow). Nenhum teste asserta o conteúdo
  do timeline.
- **Lacuna real:** contrato do AboutTimeline via consumer. Plano T4: **+1 teste dual-project**
  (roles/textos reais): h1 da página; ordem das 3 entries; h2 + descrição + 3 h3 do timeline
  na ordem (Início das atividades → Crescimento e consolidação → Atuação atual) com as
  descrições dos dados do consumer; supporting text; zero overflow nos 2 viewports. Sem
  asserts de classes Tailwind/pixels/marcadores internos. Nada redundante.
- Baseline: 55 testes / 110 execuções (107 passed + 3 skipped) → esperado pós-T4:
  56 testes / 112 execuções (109 passed + 3 skipped), exit 0.

## 9. Arquivos previstos (T2–T5)

- T2: `components/sections/about/about-timeline.tsx` (contrato acima, estrutura intacta).
- T3: `app/library/about/page.tsx` (preview ReactNode + `aboutTimelineDemo` com copy 1:1;
  AboutSimple/AboutSplit renderizados sem props; ids/ordem/labels preservados).
- T4: `tests/smoke.spec.ts` (+1 teste dual). Gates: lint/build/test:e2e/diff-check.
- T5: QUALITY-REVIEW (21→20, ABERTO), COMPONENT-CATALOG (entrada existente marcada
  data-driven; contagens 32/12/8/54), ROADMAP (037 VERIFIED, próxima 038), CURRENT-STATE,
  CHANGELOG. DESIGN-SYSTEM/DECISIONS inalterados.

## 10. Riscos

- Conversão da página para `preview` não muda visual nem ids — teste da shell (firstId
  `about-simple`) permanece válido.
- Armadilha conhecida (036/T4): dev server órfão na porta 3000 com cache corrompido por
  build → verificar `Get-NetTCPConnection -LocalPort 3000` antes do Playwright.
- Zero dependências novas; zero componente novo; zero rota nova; commit/push só pelo
  operador.
