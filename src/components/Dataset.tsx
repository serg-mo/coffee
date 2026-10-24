import React, { useContext, useEffect, useState } from "react";
import DataShapeQuad from "types/DataShapeQuad";
import DataShapePair from "types/DataShapePair";
import DatasetComparisonsPair from "./DatasetComparisonsPair";
import DatasetRankings from "./DatasetRankings";
import BeanContext from "../BeanContext";

export const TABS = ["rankings", "comparisons"]; // must match with below

export default function Dataset({
  year,
  region,
  tab,
}: {
  year: number;
  region: string;
  tab: number;
}) {
  const { setBeanNames } = useContext(BeanContext);
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

  if (!dataset) {
    return <div className="text-center">loading...</div>;
  }

  return (
    <div className="">
      <h2
        className="text-xl font-bold text-center capitalize cursor-pointer"
        onClick={() =>
          setBeanNames(dataset?.names ? Object.values(dataset.names) : [])
        }
      >
        {region.replace("-", " ")}
      </h2>

      {tab === 0 && <DatasetRankings dataset={dataset} />}

      {tab === 1 && (
        <DatasetComparisonsPair dataset={dataset as DataShapePair} />
      )}
    </div>
  );
}
