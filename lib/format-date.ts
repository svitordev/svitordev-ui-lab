// lib/format-date.ts
// Evolução 024 — formatação de datas civis (DATE-ONLY) sem conversão de timezone.
// new Date("YYYY-MM-DD") trata a string como instante UTC e desloca o dia em
// fusos de offset negativo (QLT-013). O parsing estrutural preserva exatamente
// o dia editorial cadastrado, deterministicamente, em qualquer ambiente.
// Sem Date, sem Intl, sem timezone, sem locale — a fonte é interna e tipada.

export function formatDateOnly(value: string): string {
  const [year, month, day] = value.split("-")

  return `${day}/${month}/${year}`
}
