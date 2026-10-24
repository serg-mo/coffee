import React, { useContext } from 'react';
import DataShapePair from 'types/DataShapePair';
import DataShapeQuad from 'types/DataShapeQuad';
import { convertQuadToPair, isQuad } from '../utils/comparisons';
import BeanContext from '../BeanContext';

const MAX_WINS = 8;

export default function DatasetRankings({
  dataset,
}: {
  dataset: DataShapeQuad | DataShapePair | null;
}) {
  const { beanData, beanNames, toggleBean } = useContext(BeanContext);
  if (!dataset) {
    return (
      <div className="w-48 h-48 flex items-center justify-center border border-dashed border-gray-300">
        rankings
      </div>
    );
  }

  const names = Object.keys(dataset.names); // a, b, c, d, e
  let totals = names.map((name) => [dataset.names[name], 0]); // skus only

  if (dataset.comparisons) {
    // NOTE: DatasetCheck expects pairwise comparisons, convert quad to pair
    const comparisons = isQuad(dataset)
      ? convertQuadToPair(dataset.comparisons)
      : dataset.comparisons;

    const comparisonsFlat = Object.values(comparisons).flatMap(Object.values);

    const getTotalWins = (name: string) =>
      comparisonsFlat.filter((winner: string) => winner === name).length;

    // SKU => total wins, desc
    totals = names.map((name) => [dataset.names[name], getTotalWins(name)]); // [sku, wins]
    totals.sort((a, b) => b[1] - a[1]); // wins desc
  }

  return (
    <table className="w-48 border-collapse text-nowrap">
      <tbody>
        {totals.map(([name, wins]) => (
          <tr
            key={name}
            className={`cursor-pointer border border border-gray-300 ${beanNames.includes(name) ? 'font-bold' : ''} ${wins === MAX_WINS ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => toggleBean(name)}
          >
            <td className="w-full p-2 truncate">
              <span title={name.toUpperCase()}>
                {beanData[name]?.specifications?.['country'] || name.toUpperCase()}
              </span>
            </td>
            <td className="p-2 text-right">{wins}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
