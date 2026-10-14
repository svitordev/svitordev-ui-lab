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
