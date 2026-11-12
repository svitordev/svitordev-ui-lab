# T4 — Cobertura Playwright de alto valor + suíte completa verde (Goal 035)

Arquivo alterado: `tests/smoke.spec.ts` (+149 linhas de testes novos, +5 linhas de helper
em testes existentes). Diff real via `git diff` (acentos UTF-8 corretos no arquivo; a
saída de console pode exibir mojibake por codepage — os testes rodam com os acentos reais).

## Testes novos (6 testes × 2 projetos = 12 execuções, todos passando)

1. `consent: primeira visita mostra banner acessivel com acoes de mesmo peso` — heading
   via `getByRole('heading')` (aria-labelledby), copy factual, Aceitar/Recusar ambos
   visíveis e ativos (mesmo peso), teclado: Enter no summary abre o painel, Necessários
   `toBeChecked` + `toBeDisabled` (roles reais, não CSS).
2. `consent: aceitar opcionais persiste no storage e reload mantem banner oculto` —
   clique → storage `{version:1, necessary:true, analytics:true, marketing:true}` →
   reload → banner oculto.
3. `consent: recusar opcionais salva analytics e marketing false com necessary true` —
   idem com ambos false; reload respeita.
4. `consent: personalizar altera categoria por label e salvar persiste decisao` —
   interação via label real (getByRole checkbox por nome do label), `role=status`
   inexistente antes da ação (`toHaveCount(0)`), salvar em primeira visita fecha o
   banner (feedback visual — T1 §9), storage reflete a decisão.
5. `consent: reabertura pelo footer carrega estado anterior e nova decisao sobrescreve` —
   recusar → fechar → reabrir por TECLADO (focus + Enter no botão real do footer) →
   painel reabre com estado anterior carregado (ambos desmarcados) → ligar Marketing →
   Salvar → `role=status` anuncia (live region só existe após ação do usuário) → storage
   sobrescrito `{necessary:true, analytics:false, marketing:true}`.
6. `consent: storage corrompido e tratado como ausencia sem quebrar a pagina` —
   `localStorage.setItem(key, '{json quebrado')` → reload → banner reaparece (fail-safe),
   ações funcionais, zero overflow horizontal (assert nos dois viewports via projeto
   dual: desktop 1280×720 + mobile 375×667).

Cobertura dos 7 cenários do plano: primeira visita (1), aceitar+persistência+reload (2),
recusar com necessary true (3), personalizar+salvar (4), reabertura com estado anterior +
sobrescrita + live region (5), storage inválido sem quebrar + zero overflow mobile/desktop
(6). Acessibilidade com roles reais: getByRole heading/button/checkbox, labels por
associação htmlFor↔id, estado checked/disabled, teclado (Enter em summary e trigger).

## Helper mínimo explícito em 5 testes existentes (interferência real comprovada)

Execução inicial SEM helper: **10 falhas** (registradas em `test-results/`), todas por
interferência do banner site-wide — exatamente o risco auditado na T1 §11 ("se houver
interferência real, criar helper mínimo explícito, não localStorage.setItem em todos"):
- `contact forms: associacao label-campo...` (d+m): contagem global de `input[id]`
  passou de 10 → 13 (banner adiciona 3 inputs com id).
- `newsletter: success` + `newsletter: error` (mobile): clique em `Inscrever-se` coberto
  pelo banner fixed bottom.
- `contact forms: submit demonstrativo` (mobile): botões Enviar cobertos em mobile.
- `menu mobile do header com topbar...` (mobile): clique-fora em (20,600) caía sobre o
  banner.
- (2 falhas restantes eram dos meus próprios testes — corrigidas: checkbox Necessários só
  entra na árvore com o painel aberto; salvar em primeira visita fecha o banner, live
  region pertence ao painel reaberto.)

Helper aplicado SOMENTE nesses 5 testes (não global):

```ts
async function seedConsentDecision(page: import('@playwright/test').Page) {
  await page.addInitScript((key) => {
    localStorage.setItem(
      key,
      JSON.stringify({ version: 1, necessary: true, analytics: false, marketing: false }),
    );
  }, CONSENT_KEY);
}
```

Cada chamada tem comentário explícito do motivo da interferência. Nenhum assert existente
foi alterado; nenhum helper mascara bug do componente (o banner funciona — ele
legitimamente cobre o rodapé).

## Diff real (git diff --stat)

```
 app/layout.tsx                         |   3 +   (T3, já aprovada — no fingerprint)
 components/site/footers/footer-cta.tsx |   4 +   (T3, já aprovada — no fingerprint)
 tests/smoke.spec.ts                    | 153 +++++++++++++++++++++++++++++++++
 3 files changed, 160 insertions(+)
```

## Gates reais (executados, exit codes reais)

- `npm run lint` → **LINT_EXIT=0** (0 erros / 0 warnings).
- `npm run build` → **BUILD_EXIT=0** (`Compiled successfully in 3.2s`; 24 rotas).
- `npm run test:e2e` → **E2E_EXIT=0** — **103 passed + 3 skipped** (106 execuções:
  53 testes × 2 projetos; os 3 skips são os condicionais de projeto já existentes —
  2 mobile-only + 1; nenhum skip novo).
- `git diff --check` → **CHECK_EXIT=0**.

## Contagens (para T5)

- Catálogo: site **7 → 8**, total **53 → 54** (1 componente novo:
  `components/site/consent/consent-preferences.tsx`).
- Playwright: **47 → 53** testes (12 execuções novas, todas verdes nos dois projetos).
- Rotas: **24** (nenhuma nova).
