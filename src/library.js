export function isTransitivelyComplete(data) {
  const { comparisons, names } = data;
  const keys = Object.keys(names);
  const messages = [];

  // Warshall's Algorithm for transitive closure
  for (let a of keys) {
    for (let b of keys) {
      for (let c of keys) {
        if (
          comparisons[a][b] === a && comparisons[b][a] === a && // a > b AND b < a
          comparisons[b][c] === b && comparisons[c][b] === b && // b > c AND c < b
          comparisons[a][c] !== a && comparisons[c][a] !== a    // BUT NOT a > c AND c < a
        ) {
          // NOTE: two answers for each pair must agreed or be ignored (ab vs ba)
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
