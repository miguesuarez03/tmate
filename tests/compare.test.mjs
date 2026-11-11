// Comparador: quién va por delante y veredicto. Ejecutar con `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { getCompareLeader, COMPARE_MIN_LEAD } from "../src/lib/cities.js";

test("una décima de diferencia no corona a nadie: empate técnico", () => {
  assert.deepEqual(getCompareLeader([7.6, 7.5]), { winnerIdx: -1, tiedIdx: [0, 1] });
  assert.deepEqual(getCompareLeader([8.0, 8.0, 7.9]), { winnerIdx: -1, tiedIdx: [0, 1, 2] });
});

test("con ventaja suficiente hay una mejor puntuación clara", () => {
  assert.equal(COMPARE_MIN_LEAD, 0.3);
  assert.deepEqual(getCompareLeader([7.6, 7.3]), { winnerIdx: 0, tiedIdx: [] });
  assert.deepEqual(getCompareLeader([6.9, 8.1, 7.5]), { winnerIdx: 1, tiedIdx: [] });
});

test("en un empate técnico solo entran las que están cerca de la mejor", () => {
  // 8.1 y 8.0 empatan; 7.2 queda fuera del empate.
  assert.deepEqual(getCompareLeader([8.1, 7.2, 8.0]), { winnerIdx: -1, tiedIdx: [0, 2] });
});
