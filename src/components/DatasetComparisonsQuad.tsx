import React from "react";
import DataShapePair from "types/DataShapePair";
import DataShapeQuad from "types/DataShapeQuad";

export default function DatasetComparisonsQuad({
  dataset,
  beanNames,
  onBeansClick,
}: {
  dataset: DataShapeQuad | DataShapePair | null;
  beanNames: string[];
  onBeansClick: (bean: string) => void;
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

  return (
    <table className="h-48 w-48 m-auto border-collapse text-center text-xl">
      <thead>
        <tr>
          <th
            key="transitively-complete"
            className="border border-gray-300 h-8 w-8 bg-gray-100"
          >
            {/* <DatasetCheck {...dataset} /> */}
          </th>
          {[1, 2, 3, 4].map((col) => (
            <th
              key={col}
              className="border border-gray-300 h-8 w-8 bg-gray-100"
            >
              {String(col).toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {Object.entries(dataset.comparisons).map(
          ([name, comparison], index) => (
            <tr key={name}>
              <th className="border border-gray-300 h-8 w-8 bg-gray-100">
                -{names[index].toUpperCase()}
              </th>
              {[0, 1, 2, 3].map((index) => (
                <th key={index} className="border border-gray-300 h-8 w-8 bg-white">
                  {comparison[index].toUpperCase()}
                </th>
              ))}
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
}
