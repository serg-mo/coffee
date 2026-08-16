import React from "react";
import DataShapePair from "types/DataShapePair";
import DataShapeQuad from "types/DataShapeQuad";
import { convertQuadToPairwise } from "../utils/comparisons";

export default function DatasetTotals({
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
    names
      .map((name) => [dataset.names[name], getTotalWins(name)])
      .sort((a: [string, number], b: [string, number]) => b[1] - a[1]),
  );

  return (
    <div className="h-48 w-full flex flex-col items-center justify-center border border-dashed border-gray-300">
      {Object.entries(totals).map(([name, wins]) => (
        <div
          key={name}
          className={`w-full flex flex-row px-2 cursor-pointer ${beanNames.includes(name) ? "font-bold" : ""}`}
          onClick={() => onBeansClick(name)}
        >
          <div className="w-full py-1">{name.toUpperCase()}</div>
          <div className="text-right w-10">{wins}</div>
        </div>
      ))}
    </div>
  );
}
