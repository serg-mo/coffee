export function isTransitivelyComplete(comparisons) {
  const coffees = Object.keys(comparisons);

  // convert comparisons into an adjacency matrix
  const preferenceMap = {};
  coffees.forEach(a => {
    preferenceMap[a] = {};
    coffees.forEach(b => {
      if (a !== b) {
        preferenceMap[a][b] = comparisons[a][b] === a; // true if a is preferred over b
      } else {
        preferenceMap[a][b] = false; // no self-preference
      }
    });
  });

  // apply Warshall's Algorithm for transitive closure
  for (let k of coffees) {
    for (let i of coffees) {
      for (let j of coffees) {
        if (preferenceMap[i][k] && preferenceMap[k][j] && !preferenceMap[i][j]) {
          return false; // missing transitive preference
        }
      }
    }
  }

  return true; // transitively complete
}