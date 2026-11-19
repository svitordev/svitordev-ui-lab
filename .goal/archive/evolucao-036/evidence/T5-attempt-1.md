# Evidência T5 — Documentação + QLT-005 (attempt 1)

Data: 2026-11-16 · Builder: Strata Qwen3.8 Flash Next 256K · Goal 036

## 1. Diff desde a primeira revisão (arquivos desta tarefa — só documentação)

### `QUALITY-REVIEW.md`
- Linha de migrações registradas do QLT-005: adicionadas `services-with-icons` +
  `services-grid-simple` (Evolução 036) à lista existente (010, 016, 031, 032).
- Novo bloco **"Verificação (Evolução 036, 2026-11-16)"** no QLT-005: contratos exatos
  (tipos locais, obrigatórios vs condicionais, sem defaults, `desc` → `description`, icon só
  onde já existia, sem actions, Server Components, visual preservado, Split permanece na
  dívida), **contagem 23 → 21 (15 sections + 6 site), permanece ISSUE_CONFIRMED / ABERTO**,
  gate com os números reais da suíte.
- QLT-011: **inalterado** (parcial, aberto — nada nesta tarefa o toca).

### `docs/COMPONENT-CATALOG.md`
- As 2 entradas EXISTENTES de `ServicesGridSimple` e `ServicesWithIcons` marcadas
  **Pronto / Data-driven (Evolução 036)** com o contrato real no Observações (mesmo estilo das
  linhas HeroPrimary/HeroSteps). `ServicesSplitWithHighlight` permanece Template.
- Contagens do topo **inalteradas e corretas**: 12 UI / 8 site / 32 sections / 2 wrappers /
  total 54 (migração de contrato, não de contagem — nenhum componente novo).

### `docs/ROADMAP-1000-EVOLUTIONS.md`
- Status do lote: `036 ✅ VERIFIED (2026-11-16)`; próxima execução **037**.
- Linha da tabela 036: `✅ VERIFIED` + nota da auditoria T1 + QLT-005 (23→21, aberto).
- Seção QLT-005: hoje **21** (15 sections + 6 site); verificação da 036 registrada;
  "o lote migra mais 7" (037, 038×3, 040×3); 14 permanecem após o lote — breakdown confere
  (about 2, services 1, testimonials 3, contact 3, cta 3, pricing 2, site 0 = 14).
- Lista "Migrações do contrato": 12 itens, 4 concluídas; `services-with-icons` adicionada com
  nota explícita de que a auditoria da 036 a selecionou no lugar da Split (que permanece na
  dívida).

### `memory-bank/CURRENT-STATE.md`
- Linha do lote ativo: 026–036 ✅; **037 é a próxima**.
- Entrada **Evolução 036** completa no formato das anteriores (contratos, seleção da auditoria,
  consumers, copy 1:1, gates, suíte 55/110 — 107+3, QLT-005 23→21 aberto, QLT-011 preservado).
- Seção de roadmap (001–036): entrada 036 VERIFIED adicionada; próxima execução 037.

### `memory-bank/CHANGELOG.md`
- Entrada `[2026-11-16] — Evolução 036` no topo (mais recente primeiro), só estado final,
  formato das entradas 034/035.

### `docs/DESIGN-SYSTEM.md` e `memory-bank/DECISIONS.md`
- **Inalterados** — nenhuma convenção visual nova, nenhuma decisão nova (correto: migração
  seguiu convenções existentes 001/003/010/016/031/032).

## 2. Gates (execuções reais, nesta ordem)

| Gate | Comando | Exit | Resultado |
|---|---|---|---|
| ESLint | `npm run lint` | 0 | 0 erros / 0 warnings |
| Build | `npm run build` | 0 | PASS, 24 rotas geradas (24/24) |
| git diff --check | `git diff --check` | 0 | limpo |

(Playwright não re-executado nesta tarefa — mudança exclusivamente documental, não afeta o que
o smoke cobre; suíte verde completa executada na T4: 107 passed + 3 skipped, exit 0.)

## 3. Contagens finais (estado real pós-T5)

- Catálogo: 12 UI / 8 site / 32 sections / 2 wrappers / **total 54** (inalterado).
- Rotas: **24** (nenhuma nova).
- Playwright: **55 testes / 110 execuções — 107 passed + 3 skipped** (verde na T4).
- QLT-005: **23 → 21** (15 sections + 6 site) — **ABERTO**, nunca VERIFIED; exatamente os
  2 componentes desta goal removidos da dívida; Split permanece.
- QLT-011: preservado (parcial, aberto).

## 4. Conformidade com os critérios

- Documentação refletiu o código real (verificada por leitura dos 4 arquivos de produção +
  testes antes de escrever).
- Nenhuma contagem inflada; nenhum componente/rota/dependência nova; QLT-005 permanece aberto.
- Sem commit (regra da goal).
