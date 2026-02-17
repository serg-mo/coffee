import React from "react";
import DatasetCheck from "./DatasetCheck";
import DataShapeQuad from "../types/DataShapeQuad";
import ComparisonsPair from "types/ComparisonsPair";
import ComparisonsQuad from "types/ComparisonsQuad";

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

function convertQuadToPairwise(comparisons: Record<string, string>) {
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

export default function Dataset({
  name,
  dataset,
  beanNames, // only used to highlight selected beans
  onBeansClick,
  onDatasetClick,
}) {
  const names = Object.keys(dataset.names); // a, b, c, d, e

  // NOTE: DatasetCheck expects pairwise comparisons, convert quad to pair
  const comparisons =
    typeof Object.values(dataset.comparisons)[0] === "string"
      ? convertQuadToPairwise(dataset.comparisons)
      : dataset.comparisons;

  const comparisonsFlat = Object.values(comparisons).flatMap(Object.values);

  const getTotalWins = (name: string) =>
    comparisonsFlat.filter((winner: string) => winner === name).length;

  const cellClassName =
    "border border-gray-300 h-8 w-8 bg-gray-100 text-xl cursor-pointer";

  // TODO: bring back DatasetCheck
  // TODO: clicking on a dataset should flip the table and show bean SKUs sorted by the number of wins
  return (
    <div className="p-6 w-64">
      <h2
        className="text-xl font-bold text-center capitalize cursor-pointer flex items-center gap-2 justify-center"
        onClick={
          () =>
            onDatasetClick(
              Object.values(dataset.names),
            ) /* every bean in the dataset */
        }
      >
        <span>{name}</span>
      </h2>
      <table className="m-auto border-collapse text-center">
        <thead>
          <tr>
            <th key="transitively-complete" className={cellClassName}>
              {/* <DatasetCheck {...dataset} /> */}
            </th>
            {names.map((col) => (
              <th
                key={col}
                className={cellClassName}
                onClick={() => onBeansClick(dataset.names[col])}
                title={dataset.names[col]}
              >
                {col.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {names.map((row) => (
            <tr key={row}>
              <th
                className={cellClassName}
                onClick={() => onBeansClick(dataset.names[row])}
                title={dataset.names[row]}
              >
                {row.toUpperCase()}
              </th>
              {names.map((col) => (
                <td
                  key={col}
                  className={`border border-gray-300 h-8 w-8 select-none ${row === col && beanNames.includes(dataset.names[row]) ? "font-bold text-xl" : ""} ${row === col ? "bg-gray-200 cursor-pointer" : "bg-white"}`}
                  onClick={
                    row === col
                      ? () => onBeansClick(dataset.names[row])
                      : () => {}
                  }
                  title={
                    row === col
                      ? dataset.names[row]
                      : dataset.names[comparisons[row][col]]
                  }
                >
                  {row === col
                    ? getTotalWins(row)
                    : comparisons[row][col].toUpperCase()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
