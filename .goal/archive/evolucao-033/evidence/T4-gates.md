# T4 — Testes Playwright de breadcrumbs

Arquivo alterado: `tests/smoke.spec.ts` (4 testes novos ao final, no padrão da suíte).

## Cobertura adicionada (cada teste roda nos 2 projetos: desktop 1280x720 + mobile 375x667)

1. **Landmark + lista ordenada**: `getByRole('navigation', { name: 'breadcrumb' })` encontra 2 landmarks; `ol` visível; contagem de `listitem` na árvore de acessibilidade prova que separadores decorativos não contam (2 itens no demo 1, 3 no demo 2); ordem dos níveis Library → Blog → Breadcrumbs verificada.
2. **Links + aria-current + separador**: links `Library` (×2) e `Blog` (×1) com `{ exact: true }` (armadilha de substring conhecida); `[data-slot="breadcrumb-page"]` ×2 com `aria-current="page"` e sem `role="link"` (não-link); `[data-slot="breadcrumb-separator"]` ×3 todos com `aria-hidden="true"`.
3. **Teclado + foco**: foco programático no primeiro link, `Tab` avança para o próximo link focável (página atual não é link, separador fora da árvore) e `*:focus-visible` presente (foco visível).
4. **Zero overflow horizontal** no demo nos dois viewports (`scrollWidth === clientWidth`).

## Resultados dos gates (executados de fato)

- `npm run test:e2e` → **92 execuções: 89 passed + 3 skipped (os 3 skips históricos de menu mobile) + 0 failed** — os 4 testes novos passaram nos DOIS projetos.
- `npm run lint` → 0 erros, 0 warnings.
- `npm run build` → compilado com sucesso, 23 rotas.
- `git diff --check` → limpo.
