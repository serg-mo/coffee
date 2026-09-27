import React, { useState } from "react";
import DataShapeQuad from "types/DataShapeQuad";
import DataShapePair from "types/DataShapePair";
import Slider from "./Slider";
import DatasetComparisonsPair from "./DatasetComparisonsPair";
import DatasetComparisonsQuad from "./DatasetComparisonsQuad";
import DatasetRankings from "./DatasetRankings";
import BeanShape from "types/BeanShape";
import { useSlider } from "./Slider";

export const maxX = 3; // must match with below

// TODO: duplicate
function isQuad(dataset: DataShapeQuad | DataShapePair) {
  return (
    typeof (
      dataset?.comparisons ? Object.values(dataset?.comparisons) : []
    )[0] === "string"
  );
}

export default function Dataset({
  name,
  dataset,
  beanNames,
  onBeansClick,
  onDatasetClick,
  beanData,
}: {
  name: string;
  dataset: DataShapeQuad | DataShapePair;
  beanNames: string[];
  onBeansClick: (bean: string) => void;
  onDatasetClick: (names: string[]) => void;
  beanData: Record<string, BeanShape>;
}) {
  const { x } = useSlider(); // horizontal NavDots index

  // NOTE: placeholder datasets exist, but are empty, slider cards know how to render a placeholder
  return (
    <div>
      <h2
        className="
        text-xl font-bold text-center capitalize
        cursor-pointer flex items-center gap-2 justify-center
      "
        onClick={() =>
          onDatasetClick(dataset ? Object.values(dataset.names) : [])
        }
      >
        {name}
      </h2>

      {x === 0 && (
        <DatasetRankings
          dataset={dataset}
          beanNames={beanNames}
          beanData={beanData}
          onBeansClick={onBeansClick}
        />
      )}

      {x === 1 &&
        (isQuad(dataset) ? (
          <DatasetComparisonsQuad dataset={dataset} />
        ) : (
          <DatasetComparisonsPair dataset={dataset} />
        ))}

      {x === 2 && dataset?.comparisons && (
        <div className="text-xs whitespace-pre-wrap">
          {JSON.stringify(dataset, null, 2)}
        </div>
      )}
    </div>
  );
}
