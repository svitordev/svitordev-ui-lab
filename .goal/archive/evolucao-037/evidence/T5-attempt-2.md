# Evidência T5 — Documentação + QLT-005 (attempt 2)

Data: 2026-11-19 · Builder: Strata Qwen3.8 Flash Next 256K · Goal 037 (b69dab192d266c66)

Attempt 2 por autorização explícita do operador (bloqueio procedural da attempt 1: o
Inspector retornou PASS mas o validador fail-closed exigiu evidência verificável adicional —
nenhum finding funcional; nenhum arquivo alterado entre a attempt 1 e esta; fingerprint
preservado). Gates reexecutados agora com output real capturado.

## 1. Estado da documentação (diff real — git diff --stat)

```
 QUALITY-REVIEW.md               |  8 +++++++-
 docs/COMPONENT-CATALOG.md       |  2 +-
 docs/ROADMAP-1000-EVOLUTIONS.md | 10 +++++-----
 memory-bank/CHANGELOG.md        | 10 ++++++++++
 memory-bank/CURRENT-STATE.md    |  7 ++++---
 5 files changed, 27 insertions(+), 10 deletions(-)
```

Provas no disco (verificáveis por leitura):
- **QUALITY-REVIEW.md** — bloco "Verificação (Evolução 037, 2026-11-19)" no QLT-005:
  **contagem 21 → 20 (14 sections + 6 site), permanece ISSUE_CONFIRMED / ABERTO**; AboutTimeline
  registrado como migrado (lista de migrações inclui a 037); **QLT-011 inalterado** (parcial,
  aberto).
- **docs/COMPONENT-CATALOG.md** — a entrada EXISTENTE do AboutTimeline marcada
  Pronto/**Data-driven** com o contrato real (`AboutTimelineItem`/`AboutTimelineProps`;
  `title`/`items` obrigatórios; `description?`/`supportingText?` condicionais; sem defaults;
  sem eyebrow/action/period; `desc` → `description`; Server Component; consumer
  `aboutTimelineDemo` copy 1:1). AboutSimple/AboutSplit permanecem Template. Contagens do topo
  inalteradas: 12 UI / 8 site / 32 sections / 2 wrappers / total 54 — **nenhum component novo**.
- **docs/ROADMAP-1000-EVOLUTIONS.md** — status do lote: **037 ✅ VERIFIED (2026-11-19)**,
  **próxima 038**; linha da tabela 036→037 marcada; seção QLT-005 "hoje 20 (14 sections +
  6 site)" com verificação da 037; "o lote migra mais 6 (038×3, 040×3)"; breakdown 14 confere
  (about 2, services 1, testimonials 3, contact 3, cta 3, pricing 2, site 0); lista de
  migrações: 12 itens, 5 concluídas com AboutTimeline ✅ (037).
- **memory-bank/CURRENT-STATE.md** — lote 026–037 ✅; entrada Evolução 037 no formato das
  anteriores; **próxima execução 038**.
- **memory-bank/CHANGELOG.md** — entrada [2026-11-19] — Evolução 037 no topo, **somente estado
  final** (sem retries/reviews/debugging — esses pertencem ao `.goal`).
- `docs/DESIGN-SYSTEM.md` e `memory-bank/DECISIONS.md` — **sem alteração** (fora do diffstat).

## 2. Evidência dos testes — suíte completa REEXECUTADA agora (output real)

Comando: `npm run test:e2e` (Chromium, dual-project desktop 1280×720 + mobile 375×667,
webServer próprio — porta 3000 verificada sem servidor órfão antes da execução).

```
  ✓ 110 [mobile] › tests\smoke.spec.ts:1640:5 › services: home mantém a copy real do contrato migrado (consumer dono dos dados) (568ms)
  ✓ 111 [desktop] › tests\smoke.spec.ts:1668:5 › about: página da Library prova o contrato do AboutTimeline via consumer (ordem, copy, zero overflow) (366ms)
  ✓ 112 [mobile] › tests\smoke.spec.ts:1668:5 › about: página da Library prova o contrato do AboutTimeline via consumer (ordem, copy, zero overflow) (379ms)

  3 skipped
  109 passed (42.4s)
E2E_EXIT=0
```

**56 testes / 112 execuções — 109 passed + 3 skipped + 0 failed — exit 0.**
(3 skipped = skips históricos do config, presentes desde o baseline T1: 107+3 → 109+3 com o
teste novo dual-project da T4, aprovado na revisão T4.)

## 3. Gates da T5 (reexecutados agora, output real)

```
npm run lint        → LINT_EXIT=0   (0 erros / 0 warnings)
npm run build       → BUILD_EXIT=0  (Compiled successfully in 2.2s;
                                     Generating static pages (24/24) in 996.0ms — 24 rotas)
git diff --check    → DIFFCHECK_EXIT=0
```

## 4. Contagens finais (estado real do disco)

```
components = 54   (UI 12 · site 8 · sections 32 · wrappers 2)
rotas      = 24   (nenhuma nova)
Playwright = 56 testes / 112 execuções — 109 passed + 3 skipped (exit 0, acima)
```

## 5. Findings

```
QLT-005: 21 → 20 (14 sections + 6 site)
status:  ABERTO (nunca VERIFIED; AboutTimeline removido da dívida nesta goal)

QLT-011: preservado (nada nesta goal o toca)
status:  ABERTO / parcial
```

## 6. Conformidade

- Documentação reflete o código real (contrato conferido contra os arquivos de produção
  aprovados em T2/T3; suíte conferida contra o output real acima).
- Zero mudança de código nesta attempt; zero componente/rota/dependência nova; QLT-005
  permanece ABERTO; 038 não iniciada.
- Sem commit/push/deploy (regra da goal).
