import React from "react";
import DataShapePair from "types/DataShapePair";
import DataShapeQuad from "types/DataShapeQuad";
import { convertQuadToPairwise } from "../utils/comparisons";

export default function DatasetMatrix({
  dataset,
  beanNames,
  onBeansClick,
}: {
  dataset: DataShapeQuad | DataShapePair;
  beanNames: string[];
  onBeansClick: (bean: string) => void;
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

  // SKU => total wins, desc
  const totals = Object.fromEntries(
    names.map((name) => [dataset.names[name], getTotalWins(name)])
      .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
  );

  const cellClassName =
    "border border-gray-300 h-8 w-8 bg-gray-100 text-xl cursor-pointer";

  return (
    <table className="h-48 m-auto border-collapse text-center">
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
                    : () => { }
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
  );
}
