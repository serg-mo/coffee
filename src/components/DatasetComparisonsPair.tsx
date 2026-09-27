import React from "react";
import DataShapePair from "types/DataShapePair";
import DatasetCheck from "./DatasetCheck";
import { title } from "process";

export default function DatasetComparisonsPair({
  dataset,
}: {
  dataset: DataShapePair | null;
}) {
  if (!dataset || !dataset.comparisons) {
    return (
      <div className="h-48 w-full flex items-center justify-center border border-dashed border-gray-300">
        comparisons
      </div>
    );
  }
  // console.log(dataset.comparisons);

  const names = Object.keys(dataset.names); // a, b, c, d, e

  const comparisonsFlat = Object.values(dataset.comparisons).flatMap(
    Object.values,
  );
  const getTotalWins = (name: string) =>
    comparisonsFlat.filter((winner: string) => winner === name).length;

  const cellClassName = "border border-gray-300 h-8 w-8 bg-gray-200";

  const getBg = (row, col) => {
    if (dataset.comparisons[row][col] != dataset.comparisons[col][row]) {
      return "text-red-600 bg-white";
    }
    return `${row === col ? "bg-gray-200" : "bg-white"}`;
  };

  return (
    <table className="h-48 m-auto border-collapse text-center text-l select-none">
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
                title={
                  row === col
                    ? [row.toUpperCase(), "won", getTotalWins(row)].join(" ")
                    : [
                        row.toUpperCase(),
                        row == dataset.comparisons[row][col] ? ">" : "<",
                        col.toUpperCase(),
                      ].join(" ")
                }
              >
                {row === col
                  ? getTotalWins(row)
                  : dataset.comparisons[row][col].toUpperCase()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
