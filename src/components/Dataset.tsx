import React, { useState } from "react";
import DataShapeQuad from "types/DataShapeQuad";
import DataShapePair from "types/DataShapePair";
import Slider from "./Slider";
import DatasetMatrix from "./DatasetMatrix";
import DatasetTotals from "./DatasetTotals";

export default function Dataset({
  name,
  dataset,
  beanNames,
  onBeansClick,
  onDatasetClick,
}: {
  name: string;
  dataset: DataShapeQuad | DataShapePair | null;
  beanNames: string[];
  onBeansClick: (bean: string) => void;
  onDatasetClick: (names: string[]) => void;
}) {
  const [slide, setSlide] = useState(0);

  return (
    <div className="">
      <h2
        className="
        text-xl font-bold text-center capitalize
        cursor-pointer flex items-center gap-2 justify-center
      "
        onClick={
          dataset
            ? () => onDatasetClick(Object.values(dataset.names))
            : () => {}
        }
      >
        {name}
      </h2>

      <Slider slide={slide} setSlide={setSlide} direction="horizontal">
        {[
          <DatasetMatrix
            key="comparisons"
            dataset={dataset}
            beanNames={beanNames}
            onBeansClick={onBeansClick}
          />,
          <DatasetTotals
            key="rankings"
            dataset={dataset}
            beanNames={beanNames}
            onBeansClick={onBeansClick}
          />,
        ]}
      </Slider>
    </div>
  );
}
