# Evidência T3 — Consumers + preservação funcional/visual (attempt 1)

Data: 2026-11-19 · Builder: Strata Qwen3.8 Flash Next 256K · Goal 037 (b69dab192d266c66)

## 0. Natureza desta tarefa

O consumer único foi atualizado na T2 (acoplamento documentado na evidência T2: props
obrigatórias quebrariam o build sem dados no consumer). Esta T3 é a VERIFICAÇÃO FORMAL:
consumers completos, nenhum uso da API antiga, copy 1:1, outras variants intactas, gates.
Nenhuma edição de código nesta tarefa (diff = mesmo diff da T2, nenhum arquivo adicional).

## 1. Consumers completos (grep real no código de produção)

Grep por `AboutTimeline|about-timeline` em `app/`, `components/`, `lib/`, `tests/`:
- `app/library/about/page.tsx` — ÚNICO consumer; usa a API NOVA:
  `preview: <AboutTimeline {...aboutTimelineDemo} />` (import do componente + type
  `AboutTimelineProps`).
- `components/sections/about/about-timeline.tsx` — a definição do contrato.
- Nenhum outro uso; nenhum `<AboutTimeline />` sem props remanescente (API antiga = zero).
- Home não importa o componente (histórico QLT-012); nenhuma composition o usa — confere
  com a auditoria T1 aprovada.

## 2. Copy 1:1 (consumer dono dos dados)

`aboutTimelineDemo` no consumer reproduz EXATAMENTE o conteúdo original do componente:
- title: "Um pouco da nossa trajetória"
- description: "Uma história construída ao lado de clientes que confiam no nosso trabalho e crescem junto conosco."
- items (ordem original preservada):
  1. "Início das atividades" — "Primeiros atendimentos, entendendo na prática as principais necessidades dos clientes e da área de atuação."
  2. "Crescimento e consolidação" — "Ampliação da carteira de clientes, organização dos processos internos e aprofundamento em serviços especializados."
  3. "Atuação atual" — "Atendimento focado em oferecer soluções personalizadas, com acompanhamento próximo e foco em resultados concretos para cada cliente."
- supportingText: "Você pode adaptar os textos dessa linha do tempo para escritórios, clínicas, consultorias e outros tipos de empresas, mantendo a mesma estrutura visual."

Nenhuma reescrita de copy; nenhuma mudança de ordem.

## 3. Outras About variants intactas

- `git diff -- components/sections/about/about-simple.tsx components/sections/about/about-split.tsx`
  → vazio (zero alteração; permanecem Template/dívida do QLT-005).
- Página `/library/about`: ids (`about-simple`, `about-split`, `about-timeline`), nomes,
  descrições das entries e ORDEM preservados; preview boxes padronizados mantidos; metadata
  inalterada; teste da shell (h1 "About / Sobre" + firstId `about-simple`) continua válido.

## 4. Diff total do working tree (produção)

```
app/library/about/page.tsx                   | 45 ++++++++++++++++++----
components/sections/about/about-timeline.tsx | 56 +++++++++++++++-------------
2 files changed, 69 insertions(+), 32 deletions(-)
```
Apenas os 2 arquivos do escopo T2+T3. Zero componente novo, zero rota nova, zero dependência.

## 5. Gates (execuções reais, nesta ordem)

| Gate | Comando | Exit | Resultado |
|---|---|---|---|
| ESLint | `npm run lint` | 0 | 0 erros / 0 warnings |
| Build | `npm run build` | 0 | Compiled successfully; 24 rotas |
| git diff --check | `git diff --check` | 0 | limpo |

## 6. Conformidade com os critérios T3

- Todos os consumers migrados (1/1): ✔ · nenhum uso da API antiga: ✔ · copy 1:1: ✔ ·
  ordem preservada: ✔ · AboutSimple/AboutSplit intactos: ✔ · gates verdes: ✔.
