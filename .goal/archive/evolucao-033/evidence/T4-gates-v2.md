# T4 — Evidência verificável completa (v2, pós-unblock operador)

Retomada via `controller.py unblock --operator-authorization` (motivo: bloqueio exclusivamente por evidência insuficiente; código/fingerprint/working tree inalterados). Nenhum código foi alterado desde o submit anterior — este arquivo apenas incorpora o material bruto verificável.

## 1. Diff real dos testes adicionados (`git diff -- tests/smoke.spec.ts`, saída bruta)

```diff
diff --git a/tests/smoke.spec.ts b/tests/smoke.spec.ts
index 0778c58..b2b3fef 100644
--- a/tests/smoke.spec.ts
+++ b/tests/smoke.spec.ts
@@ -1330,3 +1330,72 @@
+test('breadcrumbs: landmark nav com accessible name e lista ordenada', async ({ page }) => {
+  await page.goto('/library/breadcrumbs');
+
+  // Landmark de navegacao com nome acessivel (padrao breadcrumb).
+  const navs = page.getByRole('navigation', { name: 'breadcrumb' });
+  await expect(navs).toHaveCount(2);
+
+  // Listas ordenadas na arvore de acessibilidade (separadores decorativos nao contam).
+  const firstList = navs.first().locator('ol');
+  await expect(firstList).toBeVisible();
+  await expect(firstList.getByRole('listitem')).toHaveCount(2);
+
+  const secondList = navs.nth(1).locator('ol');
+  await expect(secondList).toBeVisible();
+  await expect(secondList.getByRole('listitem')).toHaveCount(3);
+
+  // Ordem dos niveis no demo de 3 itens (asChild + next/link).
+  const items = secondList.getByRole('listitem');
+  await expect(items.nth(0)).toContainText('Library');
+  await expect(items.nth(1)).toContainText('Blog');
+  await expect(items.nth(2)).toContainText('Breadcrumbs');
+});
+
+test('breadcrumbs: links, aria-current=page e separador decorativo', async ({ page }) => {
+  await page.goto('/library/breadcrumbs');
+
+  // Links raiz presentes (exact evita substring - armadilha conhecida do getByText/getByRole).
+  await expect(page.getByRole('link', { name: 'Library', exact: true })).toHaveCount(2);
+  await expect(page.getByRole('link', { name: 'Blog', exact: true })).toHaveCount(1);
+
+  // Pagina atual: span com aria-current=page (nao e link).
+  const current = page.locator('[data-slot="breadcrumb-page"]');
+  await expect(current).toHaveCount(2);
+  await expect(current.first()).toHaveAttribute('aria-current', 'page');
+  await expect(current.first()).not.toHaveAttribute('role', 'link');
+
+  // Separadores decorativos: aria-hidden=true, fora da arvore de acessibilidade.
+  const separators = page.locator('[data-slot="breadcrumb-separator"]');
+  await expect(separators).toHaveCount(3);
+  for (let i = 0; i < 3; i++) {
+    await expect(separators.nth(i)).toHaveAttribute('aria-hidden', 'true');
+  }
+});
+
+test('breadcrumbs: teclado percorre os links com foco visivel', async ({ page }) => {
+  await page.goto('/library/breadcrumbs');
+
+  const firstLink = page.getByRole('link', { name: 'Library', exact: true }).first();
+  await firstLink.focus();
+  await expect(firstLink).toBeFocused();
+
+  // Tab avanca para o proximo link focavel (pagina atual nao e link e separador esta fora da arvore).
+  await page.keyboard.press('Tab');
+  const nextLink = page.getByRole('link', { name: 'Library', exact: true }).nth(1);
+  await expect(nextLink).toBeFocused();
+  expect(await page.locator('*:focus-visible').count()).toBeGreaterThan(0);
+});
+
+test('breadcrumbs: demo sem overflow horizontal nos dois viewports', async ({ page }) => {
+  await page.goto('/library/breadcrumbs');
+
+  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
+  expect(
+    await page.evaluate(
+      () => document.documentElement.scrollWidth === document.documentElement.clientWidth,
+    ),
+  ).toBe(true);
+});
```

`git diff --stat` (bruto): `components/sections/library-shell.tsx | 1 +` · `tests/smoke.spec.ts | 69 +++...` · `2 files changed, 70 insertions(+)`.

## 2. Output real do Playwright (`npm run test:e2e`, exit code 0)

Execuções desta rodada (bruto, projetos desktop 1280x720 + mobile 375x667, Chromium):

```
  ok  85 [mobile] » tests\smoke.spec.ts:1334:5 » breadcrumbs: landmark nav com accessible name e lista ordenada (512ms)
  ok  86 [desktop] » tests\smoke.spec.ts:1334:5 » breadcrumbs: landmark nav com accessible name e lista ordenada (510ms)
  ok  87 [mobile] » tests\smoke.spec.ts:1357:5 » breadcrumbs: links, aria-current=page e separador decorativo (333ms)
  ok  88 [desktop] » tests\smoke.spec.ts:1357:5 » breadcrumbs: links, aria-current=page e separador decorativo (337ms)
  ok  89 [mobile] » tests\smoke.spec.ts:1378:5 » breadcrumbs: teclado percorre os links com foco visivel (340ms)
  ok  90 [desktop] » tests\smoke.spec.ts:1378:5 » breadcrumbs: teclado percorre os links com foco visivel (344ms)
  ok  91 [mobile] » tests\smoke.spec.ts:1392:5 » breadcrumbs: demo sem overflow horizontal nos dois viewports (315ms)
  ok  92 [desktop] » tests\smoke.spec.ts:1392:5 » breadcrumbs: demo sem overflow horizontal nos dois viewports (313ms)

  3 skipped
  89 passed (36.6s)
E2E_EXIT=0
```

Resultado final: **92 execuções = 89 passed + 3 skipped (skips históricos de menu mobile, pré-existentes à 033) + 0 failed**. Os 4 testes novos passaram nos DOIS projetos.

## 3. Output real do lint (`npm run lint`, exit code 0)

```
> starter-landing-blog-next@0.1.0 lint
> eslint

[baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
LINT_EXIT=0
```

0 erros / 0 warnings (a linha baseline-browser-mapping é aviso informativo de dependência, não lint warning).

## 4. Output real do build (`npm run build`, exit code 0)

```
   Running TypeScript ...
 ✓ Compiled successfully in 1872.2ms
 ✓ Generating static pages using 15 workers (23/23) in 991.6ms
Route (app)
├ ○ /library/breadcrumbs
BUILD_EXIT=0
```

PASS — 23 rotas, `/library/breadcrumbs` presente na listagem do build.

## 5. `git diff --check`

```
DIFFCHECK_EXIT=0
```

## 6. Contrato semântico comprovado pelos testes (mapeamento teste → critério T1)

| Critério do contrato T1 | Comprovação nos testes (executados, verdes nos 2 projetos) |
|---|---|
| Landmark `nav` com accessible name | `getByRole('navigation', { name: 'breadcrumb' })` → 2 landmarks |
| Lista ordenada | `ol` visível; contagem de `listitem` pela árvore de acessibilidade (2 e 3) — separadores decorativos não contam |
| Links presentes | `getByRole('link', { name: 'Library', exact: true })` ×2, `Blog` ×1 |
| `aria-current="page"` | `[data-slot="breadcrumb-page"]` ×2 com o atributo |
| Página atual não-link | `not.toHaveAttribute('role', 'link')` no BreadcrumbPage |
| Separadores `aria-hidden` | `[data-slot="breadcrumb-separator"]` ×3 todos `aria-hidden="true"` |
| Teclado/foco visível | foco no 1º link → `Tab` → foco no próximo link focável → `*:focus-visible` presente |
| Zero overflow desktop/mobile | `scrollWidth === clientWidth` no demo, nos 2 viewports |

## Estado do working tree (bruto)

```
 M components/sections/library-shell.tsx
 M tests/smoke.spec.ts
?? app/library/breadcrumbs/
?? components/ui/breadcrumb.tsx
```

(renames `.goal/**` = arquivamento do Goal 032 já staged; não afetam o fingerprint da revisão.)
