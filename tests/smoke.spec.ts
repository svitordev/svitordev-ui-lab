import { test, expect } from '@playwright/test';
import { formatDateOnly } from '../lib/format-date';

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

test('faq: suporta comportamento single e collapsible', async ({ page }) => {
  await page.goto('/library/faq');

  // Contrato principal: Trigger buttons por accessible name (perguntas reais da demo).
  const first = page.getByRole('button', { name: 'Posso reutilizar estes componentes em outros projetos?' });
  const second = page.getByRole('button', { name: 'Os componentes funcionam bem em dispositivos móveis?' });
  const firstAnswer = page.getByText('Sim. Cada seção é independente e recebe o conteúdo por dados');
  const secondAnswer = page.getByText('Sim. As seções são pensadas para mobile primeiro');

  await expect(first).toHaveAttribute('aria-expanded', 'false');

  // Abrir o primeiro item.
  await first.click();
  await expect(first).toHaveAttribute('aria-expanded', 'true');
  await expect(firstAnswer).toBeVisible();

  // Associação aria-controls -> painel real, lida DEPOIS de abrir (montagem é decisão do Radix).
  const controls = await first.getAttribute('aria-controls');
  expect(controls).toBeTruthy();
  const panel = page.locator(`[id="${controls}"]`);
  await expect(panel).toHaveCount(1);
  await expect(panel).toContainText('Cada seção é independente');

  // Single: abrir o segundo fecha o primeiro.
  await second.click();
  await expect(second).toHaveAttribute('aria-expanded', 'true');
  await expect(first).toHaveAttribute('aria-expanded', 'false');
  await expect(secondAnswer).toBeVisible();
  await expect(firstAnswer).toBeHidden();

  // Collapsible: clicar novamente no item aberto o fecha.
  await second.click();
  await expect(second).toHaveAttribute('aria-expanded', 'false');
  await expect(secondAnswer).toBeHidden();
});

test('faq: suporta navegacao por teclado e reduced motion', async ({ page }) => {
  await page.goto('/library/faq');

  const first = page.getByRole('button', { name: 'Posso reutilizar estes componentes em outros projetos?' });
  const second = page.getByRole('button', { name: 'Os componentes funcionam bem em dispositivos móveis?' });
  const last = page.getByRole('button', { name: 'Como integro estas seções no meu projeto Next.js?' });

  await first.focus();
  await expect(first).toBeFocused();

  // Enter abre, Space fecha — comportamento nativo do Radix, sem handlers próprios.
  await page.keyboard.press('Enter');
  await expect(first).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Space');
  await expect(first).toHaveAttribute('aria-expanded', 'false');

  // Navegação entre triggers fornecida pelo Radix (roving focus).
  await page.keyboard.press('ArrowDown');
  await expect(second).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await expect(first).toBeFocused();
  await page.keyboard.press('End');
  await expect(last).toBeFocused();
  await page.keyboard.press('Home');
  await expect(first).toBeFocused();

  // Reduced motion: o estado visual continua mudando (apenas a transição é desligada).
  await page.emulateMedia({ reducedMotion: 'reduce' });

  const chevron = first.locator('svg');
  // Lê o estado de rotação real (Tailwind 4 pode aplicar rotate como propriedade própria).
  const readRotation = (el: Element) => {
    const s = getComputedStyle(el);
    return [s.transform, s.rotate, s.translate, s.scale].join('|');
  };
  const before = await chevron.evaluate(readRotation);
  await page.keyboard.press('Enter');
  await expect(first).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('Sim. Cada seção é independente e recebe o conteúdo por dados')).toBeVisible();
  const after = await chevron.evaluate(readRotation);
  expect(after).not.toBe(before);
});

test('library: paginas migradas seguem o padrao moderno', async ({ page }) => {
  const migrated = [
    { route: '/library/hero', h1: 'Hero / Destaques', firstId: 'hero-primary' },
    { route: '/library/about', h1: 'About / Sobre', firstId: 'about-simple' },
    { route: '/library/services', h1: 'Services / Serviços', firstId: 'services-grid-simple' },
    { route: '/library/testimonials', h1: 'Testimonials / Depoimentos', firstId: 'testimonials-grid' },
    { route: '/library/pricing', h1: 'Pricing / Planos', firstId: 'pricing-three-tiers' },
    { route: '/library/contact', h1: 'Contact / Contato', firstId: 'contact-simple' },
    { route: '/library/cta', h1: 'CTAs / Chamadas para ação', firstId: 'cta-simple' },
  ];

  for (const { route, h1, firstId } of migrated) {
    await page.goto(route);

    await expect(page.getByRole('heading', { level: 1, name: h1 })).toBeVisible();

    // Padrão moderno: label "Componente: <code>{id}</code>" da primeira entry.
    await expect(page.getByText('Componente:').first()).toBeVisible();
    await expect(page.locator('code').filter({ hasText: firstId })).toBeVisible();

    // Zero overflow horizontal em cada página migrada.
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth === document.documentElement.clientWidth,
      ),
    ).toBe(true);
  }
});

test('sticky cta bar: permanece presa ao fundo do scroll container durante scroll', async ({ page }) => {
  await page.goto('/library/cta');

  // Landmark complementary (aside), escopado pelo conteúdo da demo.
  const bar = page.getByRole('complementary').filter({ hasText: 'Pronto para usar no próximo projeto?' });
  await expect(bar).toBeVisible();

  // Configuração CSS: sticky bottom-0 (prova a configuração, não só a classe).
  const css = await bar.evaluate((el) => {
    const s = getComputedStyle(el);
    return { position: s.position, bottom: s.bottom };
  });
  expect(css.position).toBe('sticky');
  expect(css.bottom).toBe('0px');

  // Ancestral realmente rolável, identificado subindo o DOM (sem cadeia hardcodada).
  const scrollInfo = await bar.evaluate((el) => {
    const sc = (() => {
      let node = el.parentElement;
      while (node) {
        const oy = getComputedStyle(node).overflowY;
        if (oy === 'auto' || oy === 'scroll') return node;
        node = node.parentElement;
      }
      return null;
    })();
    return sc ? { scrollHeight: sc.scrollHeight, clientHeight: sc.clientHeight } : null;
  });
  expect(scrollInfo).not.toBeNull();
  expect(scrollInfo!.scrollHeight).toBeGreaterThan(scrollInfo!.clientHeight);

  // Geometria: bottom da barra vs bottom do scroll container (tolerância p/ border/rounding).
  const geometry = () =>
    bar.evaluate((el) => {
      let node = el.parentElement;
      while (node) {
        const oy = getComputedStyle(node).overflowY;
        if (oy === 'auto' || oy === 'scroll') break;
        node = node.parentElement;
      }
      const c = (node ?? document.documentElement).getBoundingClientRect();
      const a = el.getBoundingClientRect();
      return { containerBottom: c.bottom, asideBottom: a.bottom, asideTop: a.top };
    });

  // Estado A — posição inicial do scroll: barra já presa ao fundo do container.
  const before = await geometry();
  expect(Math.abs(before.containerBottom - before.asideBottom)).toBeLessThanOrEqual(2);

  // Estado B — scroll intermediário significativo (50%).
  await bar.evaluate((el) => {
    let node = el.parentElement;
    while (node) {
      const oy = getComputedStyle(node).overflowY;
      if (oy === 'auto' || oy === 'scroll') {
        node.scrollTop = Math.floor((node.scrollHeight - node.clientHeight) * 0.5);
        return;
      }
      node = node.parentElement;
    }
  });
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));

  const during = await geometry();
  expect(Math.abs(during.containerBottom - during.asideBottom)).toBeLessThanOrEqual(2);
  expect(during.asideTop).toBeLessThan(during.containerBottom); // barra visível, não só colapsada no fim

  // Links reais (convenção 001) — sem navegar para o mailto.
  await expect(bar.getByRole('link', { name: 'Explorar componentes' })).toHaveAttribute('href', '/library/headers');
  await expect(bar.getByRole('link', { name: 'Falar com a equipe' })).toHaveAttribute('href', 'mailto:contato@suaempresa.com');

  // Zero overflow horizontal.
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth === document.documentElement.clientWidth,
    ),
  ).toBe(true);
});

test('sticky column split: coluna sticky apenas em desktop, mobile em fluxo normal', async ({ page }, testInfo) => {
  await page.goto('/library/features');

  // Section do componente = section ancestral mais próxima do heading da demo;
  // a coluna sticky é o pai direto do heading (localização por conteúdo).
  const heading = page.getByRole('heading', { level: 2, name: 'Contexto sempre visível' });
  await expect(heading).toBeVisible();

  // Coluna sticky localizada de forma robusta: o pai direto do heading da demo.
  const info = await heading.evaluate((h) => {
    const column = h.parentElement!;
    let sc: HTMLElement | null = column.parentElement;
    while (sc) {
      const oy = getComputedStyle(sc).overflowY;
      if (oy === 'auto' || oy === 'scroll') break;
      sc = sc.parentElement;
    }
    if (!sc) return null;
    const s = getComputedStyle(column);
    return { position: s.position, top: s.top, scrollHeight: sc.scrollHeight, clientHeight: sc.clientHeight };
  });
  expect(info).not.toBeNull();

  // Scroll real no container da demo (obrigatório — sem scroll, o teste falha).
  expect(info!.scrollHeight).toBeGreaterThan(info!.clientHeight);

  // Geometria relativa ao scroll container (não coordenada absoluta de viewport).
  const measure = () =>
    heading.evaluate((h) => {
      const column = h.parentElement!;
      let sc: HTMLElement | null = column.parentElement;
      while (sc) {
        const oy = getComputedStyle(sc).overflowY;
        if (oy === 'auto' || oy === 'scroll') break;
        sc = sc.parentElement;
      }
      const c = (sc ?? document.documentElement).getBoundingClientRect();
      const a = column.getBoundingClientRect();
      return { deltaTop: Math.round(a.top - c.top), scrollTop: sc ? sc.scrollTop : 0 };
    });

  const scrollTo = (fraction: number) =>
    heading.evaluate((h, f) => {
      const column = h.parentElement!;
      let sc: HTMLElement | null = column.parentElement;
      while (sc) {
        const oy = getComputedStyle(sc).overflowY;
        if (oy === 'auto' || oy === 'scroll') break;
        sc = sc.parentElement;
      }
      if (sc) sc.scrollTop = Math.floor((sc.scrollHeight - sc.clientHeight) * f);
    }, fraction);

  const settle = () => page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));

  if (testInfo.project.name === 'mobile') {
    // Mobile: lg:sticky não se aplica — coluna deve permanecer em fluxo normal.
    expect(info!.position).not.toBe('sticky');

    const before = await measure();
    await scrollTo(0.5);
    await settle();
    const after = await measure();

    // A coluna se move junto com o conteúdo (sticky não engatou).
    expect(Math.abs(after.deltaTop - before.deltaTop)).toBeGreaterThan(20);
  } else {
    // Desktop: configuração CSS comprovada (parte central do comportamento).
    expect(info!.position).toBe('sticky');
    expect(info!.top).toBe('32px');

    // Scroll intermediário: sticky engajado — deltaTop em relação ao scrollport ≈ top-8.
    await scrollTo(0.5);
    await settle();
    const mid = await measure();
    expect(Math.abs(mid.deltaTop - 32)).toBeLessThanOrEqual(2);

    // Boundary: rolando até o fim (conteúdo demo-only após a section), a coluna
    // deixa de ocupar o offset — o containing block terminou e ela foi empurrada.
    await scrollTo(1);
    await settle();
    const end = await measure();
    expect(Math.abs(end.deltaTop - 32)).toBeGreaterThan(20);
  }

  // Zero overflow horizontal.
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth === document.documentElement.clientWidth,
    ),
  ).toBe(true);
});

test('landing: compoe sections em uma pagina completa', async ({ page }) => {
  await page.goto('/library/landing');

  // Hero da landing (h1 por texto exato — o h1 do shell e o da landing coexistem).
  await expect(
    page.getByRole('heading', { level: 1, name: 'Organize sua operação e entregue uma experiência melhor aos seus clientes.' }),
  ).toBeVisible();

  // Ordem relativa das sections principais por heading único (bounding box, sem nth global).
  const headings = [
    'Empresas que confiam no nosso trabalho',
    'Números que mostram a operação',
    'Compare os recursos disponíveis em cada plano',
    'O que dizem os clientes',
    'Planos para cada fase do negócio',
    'Perguntas frequentes',
    'Pronto para simplificar sua operação?',
  ];
  const ys: number[] = [];
  for (const name of headings) {
    const heading = page.getByRole('heading', { level: 2, name });
    await expect(heading).toBeVisible();
    const box = await heading.boundingBox();
    expect(box).not.toBeNull();
    ys.push(box!.y);
  }
  for (let i = 1; i < ys.length; i++) {
    expect(ys[i]).toBeGreaterThan(ys[i - 1]);
  }

  // Sticky CTA (aside) e footer presentes — localizados por conteúdo, não por landmark global.
  await expect(page.getByRole('complementary')).toBeVisible();
  await expect(page.locator('footer').filter({ hasText: '©' })).toBeVisible();

  // Fragmentos LOCAIS (fragmento puro criado pelos dados da landing) precisam
  // resolver no DOM da própria página.
  for (const sel of ['#services', '#contact']) {
    const found = await page.evaluate((s) => document.querySelector(s) !== null, sel);
    expect(found, `âncora local ${sel} inexistente`).toBe(true);
  }
  await expect(page.getByRole('link', { name: 'Ver recursos' })).toHaveAttribute('href', '#services');
  await expect(page.getByRole('link', { name: 'Ver planos' })).toHaveAttribute('href', '#services');
  await expect(page.getByRole('link', { name: 'Começar com o Profissional' })).toHaveAttribute('href', '#contact');

  // Links root+fragment do footer (/#...) são navegação real para a home —
  // NÃO são validados contra o DOM atual (pathname importa; falso positivo corrigido).
  const rootFragments = await page.evaluate(() =>
    [...document.querySelectorAll('footer a')]
      .map((a) => a.getAttribute('href')!)
      .filter((h) => h.includes('#')),
  );
  expect(rootFragments.length).toBeGreaterThan(0);
  for (const href of rootFragments) {
    expect(href.startsWith('/')).toBe(true); // destino: outra rota (home), não âncora local
  }

  // Zero overflow horizontal.
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth === document.documentElement.clientWidth,
    ),
  ).toBe(true);
});

test('landing: mantem interacoes client funcionando em conjunto', async ({ page }) => {
  await page.goto('/library/landing');

  // Pricing — toggle Mensal/Anual (Client Component dentro da page Server).
  const group = page.getByRole('group', { name: 'Período de cobrança' });
  await expect(group.getByRole('button', { name: 'Mensal' })).toHaveAttribute('aria-pressed', 'true');
  await expect(group.getByRole('button', { name: 'Anual' })).toHaveAttribute('aria-pressed', 'false');
  await expect(page.getByText('R$ 99/mês')).toBeVisible();

  await group.getByRole('button', { name: 'Anual' }).click();

  await expect(group.getByRole('button', { name: 'Anual' })).toHaveAttribute('aria-pressed', 'true');
  await expect(group.getByRole('button', { name: 'Mensal' })).toHaveAttribute('aria-pressed', 'false');
  await expect(page.getByText('R$ 990/ano')).toBeVisible();

  // FAQ — accordion (closed -> open), no mesmo page load.
  const trigger = page.getByRole('button', { name: 'Posso adaptar a plataforma ao meu negócio?' });
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');

  await trigger.click();

  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(
    page.getByText('Sim. A estrutura é configurável: você define serviços, horários e campos conforme a rotina do seu atendimento.'),
  ).toBeVisible();
});

test('metadata: paginas estaticas representativas com title e description proprios', async ({ page }) => {
  const routes = [
    { path: '/', title: 'Início | Svitordev UI Lab' },
    { path: '/blog', title: 'Blog | Svitordev UI Lab' },
    { path: '/library/landing', title: 'Library · Landing | Svitordev UI Lab' },
    { path: '/library/faq', title: 'Library · FAQ | Svitordev UI Lab' },
  ];

  for (const { path, title } of routes) {
    await page.goto(path);

    await expect(page).toHaveTitle(title);

    // O nome do site aparece uma única vez no title (sem duplicação do template).
    const occurrences = title.split('Svitordev UI Lab').length - 1;
    expect(occurrences, `title duplicado em ${path}`).toBe(1);

    // Meta description presente e não vazia.
    const description = await page.evaluate(
      () => document.querySelector('meta[name="description"]')?.getAttribute('content') ?? null,
    );
    expect(description, `description ausente em ${path}`).toBeTruthy();

    // Viewport padrão continua presente.
    await expect(
      page.locator('meta[name="viewport"]').first(),
    ).toHaveAttribute('content', /width=device-width/);
  }
});

test('metadata: blog dinamico usa title e description reais do post', async ({ page }) => {
  const slug = 'por-que-sua-empresa-precisa-de-um-site-hoje';
  await page.goto(`/blog/${slug}`);

  // generateMetadata: title = título real + template; description = excerpt real.
  await expect(page).toHaveTitle('Por que sua empresa precisa de um site hoje | Svitordev UI Lab');

  const description = await page.evaluate(
    () => document.querySelector('meta[name="description"]')?.getAttribute('content') ?? null,
  );
  expect(description).toBe(
    'Mesmo com redes sociais fortes, ter um site próprio aumenta a credibilidade e o controle da sua presença digital.',
  );

  // Slug inexistente → 404 sem metadata enganosa (sem title/excerpt do post real).
  const response = await page.goto('/blog/slug-inexistente-023');
  expect(response?.status()).toBe(404);

  const title404 = await page.title();
  expect(title404).not.toContain('Por que sua empresa precisa de um site hoje');
  const description404 = await page.evaluate(
    () => document.querySelector('meta[name="description"]')?.getAttribute('content') ?? null,
  );
  expect(description404).not.toBe(
    'Mesmo com redes sociais fortes, ter um site próprio aumenta a credibilidade e o controle da sua presença digital.',
  );
});

test('blog: datas date-only sao renderizadas sem deslocamento', async ({ page }) => {
  // Prova direta do helper puro (import relativo — a suíte não resolve alias tsconfig):
  // sem Date, sem Intl, sem timezone, sem locale — o resultado é determinístico
  // em qualquer ambiente (a formatação ocorre no Server Component).
  expect(formatDateOnly('2025-11-01')).toBe('01/11/2025');
  expect(formatDateOnly('2025-11-10')).toBe('10/11/2025');

  // E2E listagem — escopado pelo article do post (sem getByText global).
  await page.goto('/blog');
  const card = page
    .locator('article')
    .filter({ has: page.getByRole('link', { name: 'Por que sua empresa precisa de um site hoje' }) });
  await expect(card).toContainText('01/11/2025');

  // E2E detalhe — mesma data editorial cadastrada na fonte.
  await page.goto('/blog/por-que-sua-empresa-precisa-de-um-site-hoje');
  await expect(page.getByText('01/11/2025', { exact: true })).toBeVisible();
});
