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
    names.map((name) => [dataset.names[name], getTotalWins(name)])
      .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
  );

  return (
    <div className="h-48 grid grid-cols-[1fr_auto] w-full">
      {Object.entries(totals).map(([name, wins]) => (
        <>
          <div className={`text-left w-full cursor-pointer ${beanNames.includes(name) ? "font-bold" : ""}`} onClick={() => onBeansClick(name)}>
            {name.toUpperCase()}
          </div>
          <div className="text-center">
            {wins}
          </div>
        </>
      ))}
    </div>
  );
}
