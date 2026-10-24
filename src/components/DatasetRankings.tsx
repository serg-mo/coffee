import React, { useContext } from 'react';
import DataShapePair from 'types/DataShapePair';
import DataShapeQuad from 'types/DataShapeQuad';
import { getTotals } from '../utils/comparisons';
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

  const totals = getTotals(dataset);

  return (
    <table className="w-48 border-collapse text-nowrap">
      <tbody>
        {totals.map(([name, wins]) => (
          <tr
            key={name}
            className={`cursor-pointer border border border-gray-300 ${beanNames.includes(name) ? 'font-bold' : ''} ${wins === MAX_WINS ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => toggleBean(name)}
          >
            <td title={name.toUpperCase()} className="w-full p-2 truncate">
              {beanData[name]?.specifications?.['country'] || name.toUpperCase()}
            </td>
            <td className="p-2 text-right">{wins}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
