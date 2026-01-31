
// NOTE: it is possible 
export function isTransitivelyComplete(comparisons, names) {
  const messages = [];

  for (let a of names) {
    for (let b of names) {
      for (let c of names) {
        if (
          comparisons[a][b] === a && comparisons[b][a] === a && // a > b AND b < a
          comparisons[b][c] === b && comparisons[c][b] === b && // b > c AND c < b
          comparisons[a][c] !== a && comparisons[c][a] !== a    // BUT NOT a > c AND c < a
        ) {
          // NOTE: two answers for each pair must agree or be ignored (ab vs ba)
          messages.push(`${a} > ${b} and ${b} > ${c} BUT NOT ${a} > ${c}`);
        }
      }
    }
  }

  return {
    result: messages.length === 0,
    messages,
  };
}

export function isPair(comparisons) { 
  // 5 * 4 pairs, opposite sides of the diagonal, a vs b and b vs a
  return comparisons.length == 20
}

export function isQuad(comparisons) {
  // 5 quads, with 3 direct comparisons for each unique pair
  // abcd, abce, abde, acde, bcde (exclude one bean on every tasting)

  return comparisons.length == 10
}