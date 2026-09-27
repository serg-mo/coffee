import React from "react";
import DataShapeQuad from "types/DataShapeQuad";

export default function DatasetComparisonsQuad({
  dataset,
}: {
  dataset: DataShapeQuad | null;
}) {
  if (!dataset || !dataset.comparisons) {
    return (
      <div className="h-48 w-full flex items-center justify-center border border-dashed border-gray-300">
        comparisons
      </div>
    );
  }

  if (typeof Object.values(dataset.comparisons)[0] !== "string") {
    return (
      <div className="h-48 w-full flex items-center justify-center border border-dashed border-gray-300">
        not supported
      </div>
    );
  }

  const names = Object.keys(dataset.names); // a, b, c, d, e
  const cellClassName = "border border-gray-300 h-8 w-8 bg-gray-200";

  return (
    <table className="h-48 w-48 m-auto border-collapse text-center text-l select-none">
      <thead>
        <tr>
          <th key="transitively-complete" className={cellClassName}>
            {/*  DatasetCheck expects pairwise comparisons */}
            {/* <DatasetCheck {...dataset} /> */}
          </th>
          {Array.from({ length: names.length - 1 }).map((_, index) => (
            <th key={index} className={cellClassName}>
              {String(index + 1).toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {Object.entries(dataset.comparisons).map(([name, comparison]) => (
          <tr key={name}>
            <th className={cellClassName}>
              {/*TODO: make this square */}
              {name.toUpperCase()}
            </th>
            {Array.from({ length: names.length - 1 }).map((_, index) => (
              <td key={index} className={`${cellClassName} bg-white`}>
                {comparison[index].toUpperCase()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
