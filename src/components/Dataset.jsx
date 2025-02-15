import React from "react";

export default function Dataset({ name, data, onBeansClick, onDatasetClick }) {
  const names = Object.keys(data.names);

  const getWinCount = (name) =>
    Object.values(data.comparisons)
      .flatMap((comparisons) => Object.values(comparisons))
      .filter((winner) => winner === name).length;

  return (
    <div className="p-6">
      <h2
        className="text-2xl font-bold mb-4 text-center capitalize cursor-pointer"
        onClick={() => onDatasetClick(Object.values(data.names))}
      >
        {name}
      </h2>
      <div className="overflow-x-auto">
        <table className="m-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              {["", ...names].map((name) => (
                <th
                  key={name}
                  className="border border-gray-300 w-6 bg-gray-100 cursor-pointer"
                  onClick={() =>
                    onBeansClick(data.names[name], getWinCount(name))
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
                  onClick={() =>
                    onBeansClick(data.names[row], getWinCount(row))
                  }
                >
                  {row.toUpperCase()}
                </td>
                {names.map((col) => (
                  <td
                    key={col}
                    className={`border border-gray-300 w-6 text-center ${row === col ? "bg-gray-200 cursor-pointer" : ""}`}
                    onClick={
                      row === col
                        ? () => onBeansClick(data.names[row], getWinCount(row))
                        : () => {}
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
