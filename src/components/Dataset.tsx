import React, { useEffect, useState } from "react";
import DataShapeQuad from "types/DataShapeQuad";
import DataShapePair from "types/DataShapePair";
import DatasetComparisonsPair from "./DatasetComparisonsPair";
import DatasetComparisonsQuad from "./DatasetComparisonsQuad";
import DatasetRankings from "./DatasetRankings";
import BeanShape from "types/BeanShape";

export const TABS = ["rankings", "comparisons"]; // must match with below

export default function Dataset({
  year,
  region,
  beanNames,
  onBeansClick,
  onDatasetClick,
  tab,
}: {
  year: number;
  region: string;
  beanNames: string[];
  onBeansClick: (bean: string) => void;
  onDatasetClick: (names: string[]) => void;
  tab: number;
}) {
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
    <div className="">
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
          {tab === 0 && (
            <DatasetRankings
              dataset={dataset}
              beanNames={beanNames}
              onBeansClick={onBeansClick}
            />
          )}

          {tab === 1 && (
            <DatasetComparisonsPair dataset={dataset as DataShapePair} />
          )}
        </>
      )}
    </div>
  );
}
