import React from "react";
import DataShapePair from "types/DataShapePair";
import DatasetCheck from "./DatasetCheck";
import { convertQuadToPair, isQuad } from "../utils/comparisons";
import DataShapeQuad from "types/DataShapeQuad";

export default function DatasetComparisonsPair({
  dataset,
}: {
  dataset: DataShapePair | DataShapeQuad | null;
}) {
  if (!dataset || !dataset.comparisons) {
    return (
      <div className="h-48 w-48 flex items-center justify-center border border-dashed border-gray-300">
        comparisons
      </div>
    );
  }
  // console.log(dataset.comparisons);

  const names = Object.keys(dataset.names); // a, b, c, d, e

  const comparisons = isQuad(dataset)
    ? convertQuadToPair(dataset.comparisons)
    : dataset.comparisons;

  const comparisonsFlat = Object.values(comparisons).flatMap(Object.values);
  const getTotalWins = (name: string) =>
    comparisonsFlat.filter((winner: string) => winner === name).length;

  const cellClassName = "border border-gray-300 w-8 h-8 bg-gray-200";

  const getBg = (row, col) => {
    if (comparisons[row][col] != comparisons[col][row]) {
      return "text-red-600 bg-white";
    }
    return `${row === col ? "bg-gray-200" : "bg-white"}`;
  };

  const getTitle = (row, col) => {
    return row === col
      ? [row.toUpperCase(), "won", getTotalWins(row)].join(" ")
      : [
          row.toUpperCase(),
          row == comparisons[row][col] ? ">" : "<",
          col.toUpperCase(),
        ].join(" ");
  };

  return (
    <table className="border-collapse text-center select-none">
      <thead>
        <tr>
          <th key="transitively-complete" className={cellClassName}>
            {/* <DatasetCheck {...dataset} /> */}
          </th>
          {names.map((col) => (
            <th key={col} className={cellClassName} title={dataset.names[col]}>
              {col.toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {names.map((row) => (
          <tr key={row}>
            <th className={cellClassName} title={dataset.names[row]}>
              {row.toUpperCase()}
            </th>
            {names.map((col) => (
              <td
                key={col}
                className={`${cellClassName} ${getBg(row, col)}`}
                title={getTitle(row, col)}
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
  );
}
