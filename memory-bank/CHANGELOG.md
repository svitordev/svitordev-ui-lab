# CHANGELOG — Svitordev UI Lab

Registro de mudanças técnicas importantes ao longo da evolução. Formato inspirado em Keep a Changelog.

---

## [0.1.0] — 2026-09-30

### Fundação

- Criada a fundação documental da FASE 2.
- Documentação criada:
  - `AGENTS.md` — ponto de entrada para Agents.
  - `.github/copilot-instructions.md` — instruções para GitHub Copilot.
  - `README.md` — reescrito para GitHub Template.
  - `PROJETO.md` — visão do produto.
  - `docs/ARQUITETURA.md` — arquitetura real atual.
  - `docs/DESIGN-SYSTEM.md` — sistema de design existente.
  - `docs/COMPONENT-CATALOG.md` — inventário de componentes (33).
  - `docs/DEFINITION-OF-DONE.md` — critérios de evolução concluída.
  - `memory-bank/CURRENT-STATE.md`, `DECISIONS.md`, `CHANGELOG.md`.
- Decisões aprovadas: DEC-001 a DEC-010.

### Conhecido (não corrigido nesta fase)

- `app/(site)/blog/[slug]/page.tsx` vazio quebra o `next build`. Será tratado posteriormente via `quality-review` → finding → `plan` → `safe-implementation`.
