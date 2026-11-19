# Evidência T2 — Migrar AboutTimeline para o contrato (attempt 1)

Data: 2026-11-19 · Builder: Strata Qwen3.8 Flash Next 256K · Goal 037 (b69dab192d266c66)

## 0. Nota de acoplamento (T2/T3)

O contrato aprovado na T1 torna `title`/`items` obrigatórios (sem defaults). Isso força o
consumer a fornecer os dados para o build compilar — por isso o consumer único
(`app/library/about/page.tsx`) foi atualizado nesta tarefa junto com o componente (preview
`React.ReactNode` + `aboutTimelineDemo`, exatamente como prescrito na T1/T3). T3 torna-se
verificação formal (consumers completos, copy 1:1, outras variants intactas, gates).

## 1. Diff real (git diff --stat desde o último commit)

```
 app/library/about/page.tsx                   | 45 ++++++++++++++++++----
 components/sections/about/about-timeline.tsx | 56 +++++++++++++++-------------
 2 files changed, 69 insertions(+), 32 deletions(-)
```

### `components/sections/about/about-timeline.tsx` (antes → depois)

- ANTES: array `const timeline = [...]` interno (3 items `{title, desc}`) + h2/descrição/
  nota finais hardcoded; `export function AboutTimeline()` sem props.
- DEPOIS: contrato exatamente como aprovado na T1:

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

- Renderização 100% a partir das props: `{title}`, `{description}` condicional
  (`{description ? <p>…</p> : null}`), `items.map(...)`, `{supportingText}` condicional.
- `desc` → `description` (naming do DS). Sem defaults internos. Sem eyebrow/action (não
  existem no componente — sem inflação). Sem `Date`/period (marcador = número do passo via
  índice — estrutura, não dado).
- Estrutura intacta: `section`/container/breakpoints, header (h2 + p), lista `space-y-4`,
  cards `flex gap-3 rounded-2xl border bg-muted/20 p-4 text-sm shadow-sm`, marcador numerado
  `h-6 w-6 rounded-full bg-foreground text-background` com `index + 1`, h3 + p `text-xs`,
  parágrafo final `mt-4 text-[11px]`, tokens, dark-only. Keys `item.title` preservadas.
- Server Component preservado (sem `"use client"` — apresentacional puro).

### `app/library/about/page.tsx` (consumer único)

- `AboutItem.Component: React.ComponentType` → `preview: React.ReactNode` (página vira
  heterogênea — padrão das páginas hero/services).
- `const aboutTimelineDemo: AboutTimelineProps` com **copy 1:1** do conteúdo original
  (título, descrição, 3 items na ordem original, nota final) — consumer dono dos dados.
- AboutSimple/AboutSplit: renderizados sem props (`preview: <AboutSimple />` etc.), ids,
  nomes, descrições das entries e ordem (simple → split → timeline) preservados.
- `<Component />` → `{preview}` dentro do mesmo preview box.

## 2. Gates (execuções reais, nesta ordem)

| Gate | Comando | Exit | Resultado |
|---|---|---|---|
| ESLint | `npm run lint` | 0 | 0 erros / 0 warnings |
| Build | `npm run build` | 0 | Compiled successfully; 24/24 rotas geradas |
| git diff --check | `git diff --check` | 0 | limpo |

Teste focado pertinente: nenhum teste existente asserta o conteúdo do timeline (cobertura da
página é só shell/h1/firstId — linha ~524 do smoke); teste do contrato entra na T4 (plano
T1 aprovado). Nenhum teste quebrado pela mudança (build type-check passou; JSX/roles
preservados).

## 3. Conformidade com os critérios T2

- Contrato exato da T1: ✔ · hardcode removido do componente: ✔ (todo conteúdo configurável
  vem das props) · visual preservado: ✔ (classes/tokens/estrutura idênticos) · Server
  boundary: ✔ · semântica (h2/h3, keys estáveis): ✔ · zero dependências: ✔ · gates verdes: ✔.
