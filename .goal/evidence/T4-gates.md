# T4 — Testes Playwright Gallery + gates (Goal 034)

Arquivo alterado: `tests/smoke.spec.ts` (1 teste abrangente de alto valor ao final — sem inflar contagem; cobertura completa de teclado do primitive já existe no teste da 029, linha 1148, não duplicada aqui).

## Cobertura do teste (executa nos 2 projetos: desktop 1280x720 + mobile 375x667)

1. Section renderiza: h1 da página + h2 "Projetos em destaque" da section (hierarquia h1→h2→h3).
2. Tablist único com os 3 triggers vindos dos dados do consumer (Conjunto A/B/C).
3. Tab inicial `aria-selected="true"` com painel mostrando o conteúdo do conjunto A.
4. Clique na tab B troca o conteúdo ativo; painel inativo sai da árvore (Radix desmonta — `toHaveCount(0)` prova que conteúdo inativo não aparece como ativo).
5. Teclado no consumer: `ArrowRight` a partir da tab B focada seleciona a tab C e o painel corresponde ao trigger (wiring real via Radix).
6. Apenas 1 `tabpanel` visível por vez.
7. Zero overflow horizontal (`scrollWidth === clientWidth`) nos dois viewports.

## Diff real (trecho adicionado em tests/smoke.spec.ts)

```diff
@@ -1400,3 +1400,52 @@
+test('gallery: tabs reais alternam conjuntos com conteudo dos dados (teclado + zero overflow)', async ({ page }) => {
+  await page.goto('/library/gallery');
+
+  // Page header + heading da section (h1 pagina → h2 section → h3 cards).
+  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
+  await expect(page.getByRole('heading', { level: 2, name: 'Projetos em destaque' })).toBeVisible();
+
+  // Tablist com os 3 conjuntos do contrato (dados do consumer).
+  await expect(page.getByRole('tablist')).toHaveCount(1);
+  const tabA = page.getByRole('tab', { name: 'Conjunto A' });
+  const tabB = page.getByRole('tab', { name: 'Conjunto B' });
+  const tabC = page.getByRole('tab', { name: 'Conjunto C' });
+  await expect(tabA).toBeVisible();
+  await expect(tabB).toBeVisible();
+  await expect(tabC).toBeVisible();
+
+  // Estado inicial: primeira tab selecionada; painel mostra o conteudo do conjunto A.
+  await expect(tabA).toHaveAttribute('aria-selected', 'true');
+  await expect(page.getByRole('heading', { level: 3, name: 'Peça de destaque' })).toBeVisible();
+
+  // Clique troca o conteudo ativo (painel inativo sai da arvore — Radix desmonta).
+  await tabB.click();
+  await expect(tabB).toHaveAttribute('aria-selected', 'true');
+  await expect(tabA).toHaveAttribute('aria-selected', 'false');
+  await expect(page.getByRole('heading', { level: 3, name: 'Outro conjunto, mesmos dados de contrato' })).toBeVisible();
+  await expect(page.getByRole('heading', { level: 3, name: 'Peça de destaque' })).toHaveCount(0);
+
+  // Teclado no consumer: foco ja esta em tabB; ArrowRight -> Conjunto C selecionado
+  // (cobertura completa de teclado do primitive ja existe no teste da 029).
+  await page.keyboard.press('ArrowRight');
+  await expect(tabC).toHaveAttribute('aria-selected', 'true');
+  await expect(page.getByRole('heading', { level: 3, name: 'Item sem descrição' })).toBeVisible();
+  await expect(page.getByRole('heading', { level: 3, name: 'Outro conjunto, mesmos dados de contrato' })).toHaveCount(0);
+
+  // Conteudo inativo nao aparece como ativo: apenas 1 painel visivel por vez.
+  await expect(page.getByRole('tabpanel')).toHaveCount(1);
+
+  // Zero overflow horizontal (mobile 375 + desktop 1280).
+  expect(
+    await page.evaluate(
+      () => document.documentElement.scrollWidth === document.documentElement.clientWidth,
+    ),
+  ).toBe(true);
+});
```

## Resultados dos gates (executados de fato, com exit codes)

- `npm run test:e2e` → **exit 0** — **94 execuções: 91 passed + 3 skipped (skips históricos de menu mobile) + 0 failed**; o teste novo passou nos DOIS projetos:
  - `ok 93 [desktop] » gallery: tabs reais alternam conjuntos... (605ms)`
  - `ok 94 [mobile] » gallery: tabs reais alternam conjuntos... (619ms)`
- `npm run lint` → **exit 0**, 0 erros / 0 warnings.
- `npm run build` → **exit 0**, `Compiled successfully in 1849.3ms`, 24/24 páginas.
- `git diff --check` → **exit 0**.

## Contagens reais confirmadas

- Sections: 31 → **32** (`gallery/gallery-tabs.tsx`) · UI: **12** (inalterado) · total: **53** · rotas: **24** · Playwright: **47 testes / 94 execuções = 91 passed + 3 skipped**.
