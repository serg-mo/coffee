import React from "react";
import DataShapePair from "types/DataShapePair";
import DataShapeQuad from "types/DataShapeQuad";
import { convertQuadToPairwise } from "../utils/comparisons";
import BeanShape from "types/BeanShape";

export default function DatasetRankings({
  dataset,
  beanNames,
  onBeansClick,
  beanData
}: {
  dataset: DataShapeQuad | DataShapePair | null;
  beanNames: string[];
    onBeansClick: (bean: string) => void;
    beanData: Record<string, BeanShape>
}) {
  if (!dataset) {
    return (
      <div className="h-48 w-48 m-auto flex items-center justify-center border border-dashed border-gray-300">
        rankings
      </div>
    );
  }

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

  // TODO: beanData[name]?.specifications?.Country and fall back to name
  return (
    <table className="h-48 w-48 m-auto border-collapse text-nowrap">
      <tbody>
        {Object.entries(totals).map(([name, wins], index) => (
          <tr
            key={name}
            className={`cursor-pointer border border border-gray-300 ${beanNames.includes(name) ? "font-bold" : ""} ${index < 3 ? "bg-gray-100" : "bg-white"}`}
            onClick={() => onBeansClick(name)}
          >
            <td className="w-full px-2 ">
              {index + 1}. {(beanData[name]?.specifications?.Country || name).toUpperCase()}
            </td>
            <td className="text-right px-2">{wins}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
