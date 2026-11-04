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

test('hero centralizada data-driven renderiza heading e CTAs como links reais', async ({ page }) => {
  await page.goto('/library/hero');

  const hero = page
    .locator('section')
    .filter({ hasText: 'Apresentamos sua empresa de forma clara, profissional e confiável.' });

  await expect(
    hero.getByRole('heading', {
      level: 1,
      name: 'Apresentamos sua empresa de forma clara, profissional e confiável.',
    }),
  ).toBeVisible();

  await expect(hero.getByRole('link', { name: 'Falar com a equipe' })).toHaveAttribute(
    'href',
    'mailto:contato@suaempresa.com',
  );
  await expect(hero.getByRole('link', { name: 'Ver conteúdos' })).toHaveAttribute(
    'href',
    '/blog',
  );
});

test('feature comparison: tabela semântica com headers, valores textuais e estados acessíveis', async ({ page }) => {
  await page.goto('/library/features');

  const table = page.getByRole('table');
  await expect(table).toBeVisible();

  // Cabeçalho semântico explícito + uma coluna por opção.
  await expect(table.getByRole('columnheader', { name: 'Recurso' })).toBeVisible();
  await expect(table.getByRole('columnheader', { name: 'Essencial' })).toBeVisible();
  await expect(table.getByRole('columnheader', { name: 'Profissional' })).toBeVisible();
  await expect(table.getByRole('columnheader', { name: 'Completo' })).toBeVisible();

  // Pelo menos um recurso com valor textual.
  const projectsRow = table.getByRole('row').filter({ hasText: 'Projetos ativos' });
  await expect(projectsRow.getByRole('rowheader', { name: 'Projetos ativos' })).toBeVisible();
  await expect(projectsRow.getByText('Ilimitado')).toBeVisible();

  // Estados booleanos acessíveis (ícone decorativo + texto sr-only).
  // exact: true — sem isso, "Incluído" também casaria com "Não incluído" (substring).
  const supportRow = table.getByRole('row').filter({ hasText: 'Suporte' });
  await expect(supportRow.getByText('Não incluído', { exact: true })).toHaveCount(1);
  await expect(supportRow.getByText('Incluído', { exact: true })).toHaveCount(2);

  // Valor ausente: representação própria, diferente de false.
  const reportsRow = table
    .getByRole('row')
    .filter({ has: page.getByRole('rowheader', { name: 'Relatórios', exact: true }) });
  await expect(reportsRow.getByText('Não informado', { exact: true })).toHaveCount(1);
});

test('reduced motion: hero media showcase permanece visivel sem animacao', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/library/hero');

  // Escopo pela variante específica (HeroMediaShowcase) — a página tem outras heroes.
  const heading = page.getByRole('heading', {
    level: 1,
    name: 'Veja seu negócio funcionando em um painel claro e objetivo.',
  });
  await expect(heading).toBeVisible();

  // Container animado (section do componente > container principal) — sob reduced motion
  // nenhuma animação deve executar; o conteúdo aparece direto no estado final.
  const container = heading.locator('xpath=ancestor::section[1]/div[1]');
  await expect(container).toBeVisible();
  await expect
    .poll(async () => container.evaluate((el) => getComputedStyle(el).animationName))
    .toBe('none');
});

test('contact forms: associacao label-campo com htmlFor/id, ids unicos e foco por label', async ({ page }) => {
  await page.goto('/library/contact');

  // Escopo semântico pelos headings das variants (ordem visual não é contrato do teste).
  const simple = page
    .getByRole('heading', { name: 'Fale com nossa equipe' })
    .locator('xpath=ancestor::section[1]');
  const split = page
    .getByRole('heading', { name: 'Conte um pouco sobre o que você precisa' })
    .locator('xpath=ancestor::section[1]');
  const details = page
    .getByRole('heading', { name: 'Canais de contato' })
    .locator('xpath=ancestor::section[1]');

  // QLT-008: as 10 associações label<->campo (label exato -> id esperado -> tag do campo).
  const associations = [
    { section: simple, label: 'Nome', id: 'contact-simple-name', tag: 'input' },
    { section: simple, label: 'E-mail', id: 'contact-simple-email', tag: 'input' },
    { section: simple, label: 'Assunto', id: 'contact-simple-subject', tag: 'input' },
    { section: simple, label: 'Mensagem', id: 'contact-simple-message', tag: 'textarea' },
    { section: split, label: 'Nome', id: 'contact-split-name', tag: 'input' },
    { section: split, label: 'E-mail ou WhatsApp', id: 'contact-split-contact', tag: 'input' },
    { section: split, label: 'Assunto', id: 'contact-split-subject', tag: 'input' },
    { section: split, label: 'Mensagem', id: 'contact-split-message', tag: 'textarea' },
    { section: details, label: 'Nome', id: 'contact-details-name', tag: 'input' },
    { section: details, label: 'Mensagem', id: 'contact-details-message', tag: 'textarea' },
  ];

  for (const { section, label, id, tag } of associations) {
    // O label aponta para o id esperado (htmlFor -> for no HTML).
    await expect(section.getByText(label, { exact: true })).toHaveAttribute('for', id);
    // O campo correspondente possui esse id e é a tag esperada.
    await expect(section.locator(`${tag}[id="${id}"]`)).toHaveCount(1);
    // Associated name real via label programático (getByLabel só resolve por associação).
    await expect(section.getByLabel(label, { exact: true })).toHaveCount(1);
  }

  // Foco nativo por label: 1 label representativo por variant.
  await simple.getByText('Nome', { exact: true }).click();
  await expect(simple.locator('input[id="contact-simple-name"]')).toBeFocused();

  await split.getByText('Nome', { exact: true }).click();
  await expect(split.locator('input[id="contact-split-name"]')).toBeFocused();

  await details.getByText('Nome', { exact: true }).click();
  await expect(details.locator('input[id="contact-details-name"]')).toBeFocused();

  // Ids de campo únicos na página (apenas input[id]/textarea[id] dos 3 forms de contact).
  const ids = await page.evaluate(() =>
    [...document.querySelectorAll('input[id], textarea[id]')].map((el) => el.id),
  );
  expect(ids).toHaveLength(10);
  expect(new Set(ids).size).toBe(10);
});

test('newsletter: success limpa o campo e mantem a live region acessivel', async ({ page }) => {
  await page.goto('/library/newsletter');

  const input = page.getByLabel('Seu e-mail');
  const button = page.getByRole('button', { name: 'Inscrever-se' });
  const status = page.getByRole('status');

  await input.fill('valido@exemplo.com');
  await button.click();

  // Janela de submitting: input e botão bloqueados, botão com o label de envio
  // (cobre na prática a prevenção de submit duplicado).
  await expect(input).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Enviando...' })).toBeDisabled();

  await expect(status).toContainText('Inscrição realizada com sucesso.');

  await expect(input).toHaveValue('');
  await expect(input).toBeEnabled();
  await expect(button).toBeEnabled();
  await expect(input).not.toHaveAttribute('aria-invalid');
});

test('newsletter: error preserva o valor, edicao limpa e retry conclui com success', async ({ page }) => {
  await page.goto('/library/newsletter');

  const input = page.getByLabel('Seu e-mail');
  const button = page.getByRole('button', { name: 'Inscrever-se' });
  const status = page.getByRole('status');

  await input.fill('erro@exemplo.com');
  await button.click();

  await expect(status).toContainText('Não foi possível concluir a inscrição.');
  await expect(input).toHaveValue('erro@exemplo.com');
  await expect(input).toHaveAttribute('aria-invalid', 'true');

  const describedBy = await input.getAttribute('aria-describedby');
  expect(describedBy).toBeTruthy();
  await expect(status).toHaveAttribute('id', describedBy!);

  // Correção: digitar novamente limpa o erro (volta para idle).
  await input.fill('valido@exemplo.com');
  await expect(status).toHaveText('');
  await expect(input).not.toHaveAttribute('aria-invalid');

  // Retry: novo submit conclui com success e limpa o campo.
  await button.click();
  await expect(status).toContainText('Inscrição realizada com sucesso.');
  await expect(input).toHaveValue('');
});

test('pricing: alterna periodo de cobranca e mantem CTAs reais', async ({ page }) => {
  await page.goto('/library/pricing');

  const group = page.getByRole('group', { name: 'Período de cobrança' });
  const monthly = group.getByRole('button', { name: 'Mensal' });
  const yearly = group.getByRole('button', { name: 'Anual' });

  // Estado inicial: mensal selecionado (default interno do componente).
  await expect(monthly).toHaveAttribute('aria-pressed', 'true');
  await expect(yearly).toHaveAttribute('aria-pressed', 'false');

  // Escopo semântico pelo heading do plano (nome vindo da demo data-driven).
  const plan = page
    .getByRole('heading', { name: 'Profissional', exact: true })
    .locator('xpath=ancestor::div[2]');

  await expect(plan.getByText('R$ 99/mês')).toBeVisible();

  // Alternar para anual: aria-pressed inverte e o preço exibido muda (dado, não só visual).
  await yearly.click();
  await expect(monthly).toHaveAttribute('aria-pressed', 'false');
  await expect(yearly).toHaveAttribute('aria-pressed', 'true');
  await expect(plan.getByText('R$ 990/ano')).toBeVisible();

  // Retornar para mensal: estado e preços restaurados.
  await monthly.click();
  await expect(monthly).toHaveAttribute('aria-pressed', 'true');
  await expect(yearly).toHaveAttribute('aria-pressed', 'false');
  await expect(plan.getByText('R$ 99/mês')).toBeVisible();

  // CTA é link real (convenção 001), não botão morto.
  await expect(plan.getByRole('link', { name: 'Falar com a equipe' })).toHaveAttribute(
    'href',
    'mailto:contato@suaempresa.com',
  );
});
