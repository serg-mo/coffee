import React from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { isTransitivelyComplete } from "../library";

export default function Dataset({
  name,
  data,
  beanNames,
  onBeansClick,
  onDatasetClick,
}) {
  const names = Object.keys(data.names);
  const comparisons = Object.values(data.comparisons).flatMap((comparisons) =>
    Object.values(comparisons),
  );

  if (comparisons.length !== 20) {
    console.error(`Invalid dataset: total comparisons should be 20`);
  }

  const getWinCount = (name) =>
    comparisons.filter((winner) => winner === name).length;

  const cellClassName = "border border-gray-300 h-8 w-8 bg-gray-100 cursor-pointer"

  const { result, messages } = isTransitivelyComplete(names, comparisons);

  return (
    <div className="p-6 w-64">
      <h2
        className="text-xl font-bold text-center capitalize cursor-pointer flex items-center gap-2 justify-center"
        onClick={() => onDatasetClick(Object.values(data.names))}
      >
        <span>{name}</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="m-auto border-collapse text-center">
          <thead>
            <tr>
              <th key="transitively-complete" className={cellClassName}>
                <div className="flex items-center justify-center h-full">
                  <div className="cursor-pointer" onClick={() => console.log(messages)}>
                    {result ? (
                      <FiCheckCircle title="Transitively Complete" />
                    ) : (
                      <FiXCircle title={`Not Transitively Complete`} />
                    )}
                  </div>
                </div>
              </th>
              {names.map((name) => (
                <th
                  key={name}
                  className={cellClassName}
                  onClick={() => onBeansClick(data.names[name])}
                >
                  {name.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {names.map((row) => (
              <tr key={row}>
                <th
                  className={cellClassName}
                  onClick={() => onBeansClick(data.names[row])}
                >
                  {row.toUpperCase()}
                </th>
                {names.map((col) => (
                  <td
                    key={col}
                    className={`border border-gray-300 h-8 w-8 ${row === col && beanNames.includes(data.names[row]) ? "font-bold" : ""} ${row === col ? "bg-gray-200 cursor-pointer" : "bg-white select-none"}`}
                    onClick={
                      row === col
                        ? () => onBeansClick(data.names[row])
                        : () => { }
                    }
                  >
                    {row === col
                      ? getWinCount(row)
                      : data.comparisons[row][col].toUpperCase()}
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
