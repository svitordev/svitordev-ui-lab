# T5 — Documentação final (Goal 035)

## Arquivos alterados (diff real — `git diff --stat`)

```
 docs/COMPONENT-CATALOG.md              |  16 ++--
 docs/ROADMAP-1000-EVOLUTIONS.md        |   4 +-
 memory-bank/CHANGELOG.md               |  10 +++
 memory-bank/CURRENT-STATE.md           |   7 +-
 memory-bank/DECISIONS.md               |  10 +++
```

(Arquivos de produção/testes no fingerprint: `components/site/consent/consent-preferences.tsx`
[T2, aprovada], `app/layout.tsx` + `components/site/footers/footer-cta.tsx` [T3, aprovada],
`tests/smoke.spec.ts` [T4, aprovada] — inalterados nesta task.)

## O que foi atualizado

- **`docs/COMPONENT-CATALOG.md`**: contagens site **7 → 8**, total **53 → 54**; nova seção
  `### Consent — components/site/consent/ (1)` com 1 entrada (path real, comportamento,
  storage key, reabertura via custom event, client boundary, zero dependências novas,
  limitações reais — descrito como componente de comportamento, NÃO como CMP jurídica);
  observações de precisão nos footers: FooterCta agora renderiza o trigger; FooterColumns
  não tem trigger (é demo de composition).
- **`docs/ROADMAP-1000-EVOLUTIONS.md`**: status do lote — **035 ✅ VERIFIED (2026-11-12)**,
  próxima execução **036** (não iniciada); linha da 035 marcada VERIFIED com o path real
  aprovado na auditoria T1 (`components/site/consent/consent-preferences.tsx` + integração
  root layout + FooterCta + testes). Tabela anti-inflação intacta (consumer planejado 046
  não antecipado).
- **`memory-bank/CURRENT-STATE.md`**: lote 02 com 026–035 ✅ e **036 como próxima**; entrada
  da Evolução 035 na lista (contagens reais: site 8, total 54, sections 32, rotas 24,
  Playwright 53 testes / 106 execuções — 103 passed + 3 skipped; comportamento de consent:
  storage local, fail-safe, reabertura, copy factual, DEC-012); parágrafo "Próxima fase" e
  "Próxima execução" alinhados para a 036.
- **`memory-bank/CHANGELOG.md`**: entrada [2026-11-12] — Evolução 035 (VERIFIED) somente
  com o estado final.
- **`memory-bank/DECISIONS.md`**: **DEC-012** adicionada — política duradoura de consent
  (storage local apenas com key namespaced versionada, zero integração fictícia, copy
  factual sem alegação jurídica, reabertura obrigatória, anti-dark-pattern, comunicação
  mínima sem lib global), com "como revisar" atrelado à chegada de uma integração real.
  Justificativa da durabilidade: é comportamento de template — projetos derivados herdam.
- **`docs/DESIGN-SYSTEM.md`**: inalterado — nenhuma convenção visual global nova (o
  componente usa somente tokens existentes; a política de comportamento vive na DEC-012).
- **`QUALITY-REVIEW.md`**: inalterado — **QLT-005 (23, aberto) e QLT-011 (parcial, aberto)
  preservados** (nenhuma dívida nova; nenhum legacy migrado nesta evolução).

## Gates reais (executados, exit codes reais)

- `npm run lint` → **LINT_EXIT=0** (0 erros / 0 warnings).
- `npm run build` → **BUILD_EXIT=0**.
- `git diff --check` → **CHECK_EXIT=0**.

## Contagens finais confirmadas

- Catálogo: UI **12** · site **8** · sections **32** · wrappers **2** · total **54**.
- Rotas: **24** (nenhuma nova).
- Playwright: **53** testes (106 execuções dual-project: **103 passed + 3 skipped** —
  suíte verde, exit 0, executada na T4 com os nomes finais dos testes).
