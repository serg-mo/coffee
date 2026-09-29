import React from "react";
import DataShapePair from "types/DataShapePair";
import DataShapeQuad from "types/DataShapeQuad";
import BeanShape from "types/BeanShape";
import { convertQuadToPairwise } from "../utils/comparisons";

const MAX_WINS = 8;

// TODO: duplicate
function isQuad(dataset: DataShapeQuad | DataShapePair) {
  return (
    typeof (
      dataset?.comparisons ? Object.values(dataset?.comparisons) : []
    )[0] === "string"
  );
}

export default function DatasetRankings({
  dataset,
  beanNames,
  onBeansClick,
  beanData,
}: {
  dataset: DataShapeQuad | DataShapePair | null;
  beanNames: string[];
  onBeansClick: (bean: string) => void;
  beanData: Record<string, BeanShape>;
}) {
  if (!dataset || !dataset.comparisons) {
    return (
      <div className="h-48 w-48 m-auto flex items-center justify-center border border-dashed border-gray-300">
        rankings
      </div>
    );
  }

  const names = Object.keys(dataset.names); // a, b, c, d, e

  // NOTE: DatasetCheck expects pairwise comparisons, convert quad to pair
  const comparisons = isQuad(dataset)
    ? convertQuadToPairwise(dataset.comparisons)
    : dataset.comparisons;

  const comparisonsFlat = Object.values(comparisons).flatMap(Object.values);

  const getTotalWins = (name: string) =>
    comparisonsFlat.filter((winner: string) => winner === name).length;

  // SKU => total wins, desc
  const totals = names.map((name) => [dataset.names[name], getTotalWins(name)]); // [name, wins]
  totals.sort((a, b) => b[1] - a[1]); // wins desc

  // TODO: beanData[name]?.specifications?.Country || name
  return (
    <table className="h-48 w-48 m-auto border-collapse text-nowrap">
      <tbody>
        {totals.map(([name, wins]) => (
          <tr
            key={name}
            className={`cursor-pointer border border border-gray-300 ${beanNames.includes(name) ? "font-bold" : ""} ${wins === MAX_WINS ? "bg-gray-200" : "bg-white"}`}
            onClick={() => onBeansClick(name)}
          >
            <td className="w-full px-2">{name.toUpperCase()}</td>
            <td className="px-2 text-right">{wins}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
