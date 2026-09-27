import React, { useState } from "react";
import DataShapeQuad from "types/DataShapeQuad";
import DataShapePair from "types/DataShapePair";
import Slider from "./Slider";
import DatasetComparisonsPair from "./DatasetComparisonsPair";
import DatasetComparisonsQuad from "./DatasetComparisonsQuad";
import DatasetRankings from "./DatasetRankings";
import BeanShape from "types/BeanShape";

export default function Dataset({
  name,
  dataset,
  beanNames,
  onBeansClick,
  onDatasetClick,
  beanData
}: {
  name: string;
  dataset: DataShapeQuad | DataShapePair;
  beanNames: string[];
  onBeansClick: (bean: string) => void;
  onDatasetClick: (names: string[]) => void;
  beanData: Record<string, BeanShape>;
}) {
  const [slide, setSlide] = useState(0);

  // NOTE: slider children render a placeholder for empty datasets, which do exist
  return (
    <div>
      <h2
        className="
        text-xl font-bold text-center capitalize
        cursor-pointer flex items-center gap-2 justify-center
      "
        onClick={
          dataset
            ? () => onDatasetClick(Object.values(dataset.names))
            : () => { }
        }
      >
        {name}
      </h2>

      <Slider slide={slide} setSlide={setSlide} direction="horizontal">
        {[
          <DatasetRankings
            key="rankings"
            dataset={dataset}
            beanNames={beanNames}
            beanData={beanData}
            onBeansClick={onBeansClick}
          />,
          typeof (
            dataset?.comparisons ? Object.values(dataset?.comparisons) : []
          )[0] === "string" ? (
            <DatasetComparisonsQuad
              key="comparisonsV2"
              dataset={dataset}
              beanNames={beanNames}
              onBeansClick={onBeansClick}
            />
          ) : (
            <DatasetComparisonsPair
              key="comparisons"
              dataset={dataset}
              beanNames={beanNames}
              onBeansClick={onBeansClick}
            />
          ),
        ]}
      </Slider>
    </div>
  );
}
