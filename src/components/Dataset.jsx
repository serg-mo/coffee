import React from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { isTransitivelyComplete } from "../library";

export default function Dataset({ name, data, beanNames, onBeansClick, onDatasetClick }) {
  const names = Object.keys(data.names);
  const comparisons = Object.values(data.comparisons).flatMap((comparisons) =>
    Object.values(comparisons),
  );

  if (comparisons.length !== 20) {
    console.error(`Invalid dataset: total comparisons should be 20`);
  }

  const getWinCount = (name) =>
    comparisons.filter((winner) => winner === name).length;

  return (
    <div className="p-6 w-64">
      <h2
        className="text-xl font-bold mb-4 text-center capitalize cursor-pointer flex items-center gap-2 justify-center"
        onClick={() => onDatasetClick(Object.values(data.names))}
      >
        {isTransitivelyComplete(comparisons) ? <FiCheckCircle /> : <FiXCircle />}
        <span>{name}</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="m-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              {["", ...names].map((name) => (
                <th
                  key={name}
                  className="border border-gray-300 w-6 bg-gray-100 cursor-pointer"
                  onClick={() => onBeansClick(data.names[name])
                  }
                >
                  {name.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {names.map((row) => (
              <tr key={row}>
                <td
                  className="border border-gray-300 font-bold bg-gray-100 text-center group relative cursor-pointer"
                  onClick={() => onBeansClick(data.names[row])
                  }
                >
                  {row.toUpperCase()}
                </td>
                {names.map((col) => (
                  <td
                    key={col}
                    className={`border border-gray-300 w-6 text-center ${row === col && beanNames.includes(data.names[row]) ? "font-bold" : ""} ${row === col ? "bg-gray-200 cursor-pointer" : ""}`}
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
