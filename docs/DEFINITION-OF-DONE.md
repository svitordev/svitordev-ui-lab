# DEFINITION-OF-DONE.md — Svitordev UI Lab

Critérios para uma evolução (componente, seção, layout, página, infraestrutura, documentação) ser considerada concluída.

## Crítico (obrigatório)

- [ ] **TypeScript** — sem erros de tipo; tipagem explícita onde faz sentido.
- [ ] **Lint** — `npm run lint` sem erros.
- [ ] **Build** — `npm run build` compila sem erros.
- [ ] **Responsividade** — funciona em mobile, tablet e desktop.
- [ ] **Acessibilidade** — HTML semântico, rótulos, navegação por teclado, ARIA onde necessário.
- [ ] **Keyboard** — interações acessíveis por teclado.
- [ ] **Reduced-motion** — respeita `prefers-reduced-motion` (quando há animação).
- [ ] **Overflow** — sem quebras de layout / scroll indesejado.
- [ ] **Documentação** — `docs/` e `memory-bank/` atualizados quando impactados.
- [ ] **Catálogo** — `docs/COMPONENT-CATALOG.md` atualizado (nome, path, status).
- [ ] **Library** — `/library` atualizado quando aplicável (preview da evolução).
- [ ] **Git diff** — revisado antes de commit.
- [ ] **Dependências** — nenhuma dependência nova sem justificativa e registro.

## Importante (quando aplicável)

- [ ] **Testes** — cobertura proporcional à mudança.
- [ ] **Performance** — sem regressão de bundle/rendimento.
- [ ] **Design tokens** — uso de cores/espaçamento temáticos, sem hardcoded.

## Registro de qualidade

- **Playwright = P1** — deve entrar **antes** do início da rotina das 1000 evoluções.
- **Visual regression** — avançado, posterior.
