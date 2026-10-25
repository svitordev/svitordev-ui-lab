import { test, expect } from '@playwright/test';

test('home carrega com main, banner e um heading nivel 1', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
});

test('blog lista os posts existentes', async ({ page }) => {
  await page.goto('/blog');

  await expect(page.getByRole('heading', { level: 1, name: 'Blog' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Por que sua empresa precisa de um site hoje' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Quando é hora de sair da planilha e ir para um sistema web' }),
  ).toBeVisible();
});

test('blog exibe post de slug valido', async ({ page }) => {
  await page.goto('/blog/por-que-sua-empresa-precisa-de-um-site-hoje');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Por que sua empresa precisa de um site hoje' }),
  ).toBeVisible();
});

test('blog retorna 404 para slug inexistente', async ({ page }) => {
  const response = await page.goto('/blog/slug-inexistente');

  expect(response?.status()).toBe(404);
});

test('library redireciona para /library/headers', async ({ page }) => {
  await page.goto('/library');

  await expect(page).toHaveURL(/\/library\/headers$/);
});

test('library headers exibe a categoria com previews', async ({ page }) => {
  await page.goto('/library/headers');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Headers / Cabeçalhos' }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible();
});

test('library footers exibe a categoria com previews', async ({ page }) => {
  await page.goto('/library/footers');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Footers / Rodapés' }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible();
});

test('navegacao home -> blog pelo header', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('banner').getByRole('link', { name: 'Blog', exact: true }).click();

  await expect(page).toHaveURL(/\/blog$/);
});

test('menu mobile do header basico abre pelo teclado e fecha com Escape devolvendo o foco', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'menu mobile existe apenas abaixo do breakpoint md');

  await page.goto('/library/headers');

  const button = page.locator('button[aria-expanded]').first();
  await expect(button).toBeVisible();
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(button).toHaveAttribute('aria-label', 'Abrir menu');

  await button.focus();
  await page.keyboard.press('Enter');

  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(button).toHaveAttribute('aria-label', 'Fechar menu');

  const panelId = await button.getAttribute('aria-controls');
  expect(panelId).toBeTruthy();

  const panel = page.locator(`nav[id="${panelId}"]`);
  await expect(panel).toBeVisible();
  await expect(panel).toHaveAttribute('aria-label', 'Navegação principal');
  await expect(panel.getByRole('link', { name: 'Início' })).toBeVisible();
  await expect(panel.getByRole('link', { name: 'Contato' })).toBeVisible();

  await page.keyboard.press('Escape');

  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(button).toHaveAttribute('aria-label', 'Abrir menu');
  await expect(button).toBeFocused();
});

test('menu mobile do header com topbar abre pelo botao e fecha com clique fora', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'menu mobile existe apenas abaixo do breakpoint md');

  await page.goto('/library/headers');

  const button = page.locator('button[aria-expanded]').nth(1);
  await button.click();

  await expect(button).toHaveAttribute('aria-expanded', 'true');

  const panelId = await button.getAttribute('aria-controls');
  expect(panelId).toBeTruthy();

  const panel = page.locator(`nav[id="${panelId}"]`);
  await expect(panel).toBeVisible();
  await expect(panel.getByRole('link', { name: 'Blog' })).toBeVisible();

  await page.mouse.click(20, 600);

  await expect(button).toHaveAttribute('aria-expanded', 'false');
});

test('review cards: rating exibe nome acessível com estrelas preenchidas', async ({ page }) => {
  await page.goto('/library/testimonials');

  const cardAna = page.locator('article').filter({ hasText: 'Ana Souza' });
  await expect(cardAna.getByLabel('5 de 5 estrelas')).toHaveCount(1);

  const cardRicardo = page.locator('article').filter({ hasText: 'Ricardo Almeida Albuquerque' });
  await expect(cardRicardo.getByLabel('4 de 5 estrelas')).toHaveCount(1);
});

test('review cards: avatar com src quebrado exibe o fallback', async ({ page }) => {
  await page.goto('/library/testimonials');

  const card = page.locator('article').filter({ hasText: 'Ricardo Almeida Albuquerque' });
  await expect(card.getByText('RA', { exact: true })).toBeVisible();
});

test('review cards: avatar com imagem válida carrega e fica visível', async ({ page }) => {
  await page.goto('/library/testimonials');

  const card = page.locator('article').filter({ hasText: 'Ana Souza' });
  const image = card.locator('[data-slot="avatar-image"]');
  await expect(image).toBeVisible();

  // alt="" torna a imagem decorativa; naturalWidth > 0 prova que ela carregou de fato.
  await expect
    .poll(async () =>
      image.evaluate((el) => (el as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
});
