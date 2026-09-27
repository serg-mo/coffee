import React, { useEffect, useState } from "react";
import DataShapeQuad from "types/DataShapeQuad";
import DataShapePair from "types/DataShapePair";
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
      dataset?.comparisons ? Object.values(dataset.comparisons) : []
    )[0] === "string"
  );
}

export default function Dataset({
  year,
  region,
  beanNames,
  onBeansClick,
  onDatasetClick,
  beanData,
}: {
  year: number;
  region: string;
  beanNames: string[];
  onBeansClick: (bean: string) => void;
  onDatasetClick: (names: string[]) => void;
  beanData: Record<string, BeanShape>;
}) {
  const { x } = useSlider(); // horizontal NavDots index
  const [dataset, setDataset] = useState<DataShapeQuad | DataShapePair | null>(
    null,
  );

  useEffect(() => {
    // TODO: this produces two calls for the same url
    // must be relative, see webpack.config.js::publicPath
    const url = `./data/${year}/${region}.json`;

    fetch(url)
      .then((response) => (response.ok ? response.text() : ""))
      .then((text: string) => (text.length ? JSON.parse(text) : null))
      .then(setDataset);
  }, [year, region]);

  // NOTE: placeholder datasets exist, but are empty, slider cards know how to render a placeholder

  return (
    <div>
      <h2
        className="text-xl font-bold text-center capitalize cursor-pointer"
        onClick={() =>
          onDatasetClick(dataset?.names ? Object.values(dataset.names) : [])
        }
      >
        {region.replace("-", " ")}
      </h2>

      {!dataset ? (
        <div className="text-center">loading...</div>
      ) : (
        <>
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
              <DatasetComparisonsQuad dataset={dataset as DataShapeQuad} />
            ) : (
              <DatasetComparisonsPair dataset={dataset as DataShapePair} />
            ))}

          {x === 2 && dataset && (
            <div className="text-xs whitespace-pre-wrap">
              {JSON.stringify(dataset, null, 2)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
