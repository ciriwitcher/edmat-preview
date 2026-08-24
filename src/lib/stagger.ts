/**
 * Opóźnienie dla i-tego elementu w staggerowanej liście — rośnie z indeksem,
 * ale ograniczone górnym pułapem, żeby długie siatki nie sprawiały wrażenia
 * powolnej strony.
 *
 * Zwykła funkcja (bez "use client"), więc może być wywoływana zarówno w
 * Server, jak i Client Components — w przeciwieństwie do eksportów z
 * Reveal.tsx, które jako moduł kliencki mogą być tylko renderowane jako JSX.
 */
export function staggerDelay(index: number, step = 70, max = 420) {
  return Math.min(index * step, max);
}
