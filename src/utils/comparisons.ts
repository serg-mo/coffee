import DataShapePair from 'types/DataShapePair';
import DataShapeQuad from 'types/DataShapeQuad';

function mostCommonValue(array: string[]) {
  const counts: Record<string, number> = {};
  for (const value of array) {
    counts[value] = (counts[value] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

console.assert(mostCommonValue(['a', 'a', 'a']) === 'a');
console.assert(mostCommonValue(['a', 'a', 'b']) === 'a');
console.assert(mostCommonValue(['a', 'b', 'a']) === 'a');
console.assert(mostCommonValue(['b', 'a', 'a']) === 'a');

function getWins(comparisons: string[]) {
  const wins: Record<string, Record<string, string[]>> = {};
  for (const comparison of comparisons) {
    // NOTE: abc produces a > b, a > c, and b > c stored twice, e.g., A vs B = B vs A
    for (let i = 0; i < comparison.length; i++) {
      for (let j = i + 1; j < comparison.length; j++) {
        const winner = comparison[i];
        const loser = comparison[j];

        if (!wins[winner]) wins[winner] = {};
        if (!wins[winner][loser]) wins[winner][loser] = [];
        if (!wins[loser]) wins[loser] = {};
        if (!wins[loser][winner]) wins[loser][winner] = [];

        // NOTE: derived pairwise comparisons will be symmetrical, e.g., A vs B = B vs A
        wins[winner][loser].push(winner);
        wins[loser][winner].push(winner);
      }
    }
  }
  return wins;
}

// single pairwise comparison, symmetrical 2x1
console.assert(
  JSON.stringify(getWins(['ab'])) ===
    JSON.stringify({
      a: { b: ['a'] },
      b: { a: ['a'] },
    }),
);

// 2 + 1 pairwise comparisons, symmetrical 3x2
console.assert(
  JSON.stringify(getWins(['abc'])) ===
    JSON.stringify({
      a: { b: ['a'], c: ['a'] },
      b: { a: ['a'], c: ['b'] },
      c: { a: ['a'], b: ['b'] },
    }),
);

// 3 + 2 + 1 pairwise comparisons, symmertical 4x3
console.assert(
  JSON.stringify(getWins(['abcd'])) ===
    JSON.stringify({
      a: { b: ['a'], c: ['a'], d: ['a'] },
      b: { a: ['a'], c: ['b'], d: ['b'] },
      c: { a: ['a'], b: ['b'], d: ['c'] },
      d: { a: ['a'], b: ['b'], c: ['c'] },
    }),
);

export function convertQuadToPair(comparisons: Record<string, string>) {
  const names = ['a', 'b', 'c', 'd', 'e'];
  const wins = getWins(Object.values(comparisons));
  // console.log({ comparisons , wins});

  return Object.fromEntries(
    names.map((a) => [
      a,
      Object.fromEntries(
        names.filter((b) => a !== b).map((b) => [b, mostCommonValue(wins[a][b]) as string]),
      ),
    ]),
  );
}

export function isQuad(dataset: DataShapeQuad | DataShapePair) {
  return typeof (dataset?.comparisons ? Object.values(dataset.comparisons) : [])[0] === 'string';
}

export function getTotals(dataset: DataShapeQuad | DataShapePair): [string, number][] {
  const names = Object.keys(dataset.names); // a, b, c, d, e
  let totals = names.map((name): [string, number] => [dataset.names[name], 0]); // skus only

  if (dataset?.comparisons) {
    // NOTE: DatasetCheck expects pairwise comparisons, convert quad to pair
    const comparisons = isQuad(dataset)
      ? convertQuadToPair(dataset.comparisons)
      : dataset.comparisons;

    const comparisonsFlat = Object.values(comparisons).flatMap(Object.values);

    // NOTE: wins are based on keys, not values (sku)
    const getTotalWins = (name: string) =>
      comparisonsFlat.filter((winner: string) => winner === name).length;

    // SKU => total wins, desc
    totals = names.map((name): [string, number] => [dataset.names[name], getTotalWins(name)]); // [sku, wins]
    totals.sort((a, b) => b[1] - a[1]); // wins desc
  }

  return totals;
}

console.assert(
  JSON.stringify(getTotals({ names: { a: 'A', b: 'B', c: 'C', d: 'D', e: 'E' } })) ===
    JSON.stringify([
      ['A', 0],
      ['B', 0],
      ['C', 0],
      ['D', 0],
      ['E', 0],
    ]),
);
