function mostCommonValue(array: string[]) {
  const counts: Record<string, number> = {};
  for (const value of array) {
    counts[value] = (counts[value] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

console.assert(mostCommonValue(["a", "a", "a"]) === "a");
console.assert(mostCommonValue(["a", "a", "b"]) === "a");
console.assert(mostCommonValue(["a", "b", "b"]) === "b");

function getWins(comparisons: Record<string, string>) {
  const wins: Record<string, Record<string, string[]>> = {};
  for (const comparison of Object.values(comparisons)) {
    // NOTE: includes transitive wins, i.e., b > c, b > d, b > e
    for (let i = 0; i < comparison.length; i++) {
      for (let j = i + 1; j < comparison.length; j++) {
        const winner = comparison[i];
        const loser = comparison[j];

        if (!wins[winner]) wins[winner] = {};
        if (!wins[winner][loser]) wins[winner][loser] = [];
        if (!wins[loser]) wins[loser] = {};
        if (!wins[loser][winner]) wins[loser][winner] = [];

        // NOTE: derived pairwise comparisons will be symmetrical, e.g., ab = ba
        wins[winner][loser].push(winner);
        wins[loser][winner].push(winner);
      }
    }
  }
  return wins;
}

console.assert(
  JSON.stringify(getWins({ name: "ab" })) ===
    JSON.stringify({ a: { b: ["a"] }, b: { a: ["a"] } }),
);

console.assert(
  JSON.stringify(getWins({ name: "abc" })) ===
    JSON.stringify({
      a: { b: ["a"], c: ["a"] },
      b: { a: ["a"], c: ["b"] },
      c: { a: ["a"], b: ["b"] },
    }),
);

export function convertQuadToPairwise(comparisons: Record<string, string>) {
  const names = ["a", "b", "c", "d", "e"];
  const wins = getWins(comparisons);
  // console.log({ comparisons , wins});

  return Object.fromEntries(
    names.map((a) => [
      a,
      Object.fromEntries(
        names
          .filter((b) => a !== b)
          .map((b) => [b, mostCommonValue(wins[a][b]) as string]),
      ),
    ]),
  );
}
