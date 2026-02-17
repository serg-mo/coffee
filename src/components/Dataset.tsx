import React from "react";
import DatasetCheck from "./DatasetCheck";

export default function Dataset({
  name,
  dataset,
  beanNames,
  onBeansClick,
  onDatasetClick,
}) {
  const names = Object.keys(dataset.names); // a, b, c, d, e
  const comparisonsFlat = Object.values(dataset.comparisons).flatMap((comparisons) =>
    Object.values(comparisons),
  );

  if (comparisonsFlat.length !== 20) {
    console.error(`Invalid dataset: total comparisons should be 20`);
  }

  const getWinCount = (name: string) => comparisonsFlat.filter((winner: string) => winner === name).length;

  const cellClassName = "border border-gray-300 h-8 w-8 bg-gray-100 cursor-pointer"

  return (
    <div className="p-6 w-64">
      <h2
        className="text-xl font-bold text-center capitalize cursor-pointer flex items-center gap-2 justify-center"
        onClick={() => onDatasetClick(Object.values(dataset.names)) /* every bean in the dataset */}
      >
        <span>{name}</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="m-auto border-collapse text-center">
          <thead>
            <tr>
              <th key="transitively-complete" className={cellClassName}>
                <DatasetCheck {...dataset} />
              </th>
              {names.map((col) => (
                <th
                  key={col}
                  className={cellClassName}
                  onClick={() => onBeansClick(dataset.names[col])}
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
                >
                  {row.toUpperCase()}
                </th>
                {names.map((col) => (
                  <td
                    key={col}
                    className={`border border-gray-300 h-8 w-8 ${row === col && beanNames.includes(dataset.names[row]) ? "font-bold" : ""} ${row === col ? "bg-gray-200 cursor-pointer" : "bg-white select-none"}`}
                    onClick={
                      row === col
                        ? () => onBeansClick(dataset.names[row])
                        : () => { }
                    }
                  >
                    {row === col
                      ? getWinCount(row)
                      : dataset.comparisons[row][col].toUpperCase()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
