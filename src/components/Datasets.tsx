import React, { useEffect, useState } from "react";
import Dataset from "./Dataset";

const YEARS = [2025, 2024];
const REGIONS = ["africa", "indonesia", "central-america", "south-america"]; // NOTE: 4 columns

export default function Datasets({ beanNames, onBeansClick, onDatasetClick }) {
  const [datasets, setDatasets] = useState<{ dataset: any; name: string }[]>(
    [],
  );

  useEffect(() => {
    // must be relative, see webpack.config.js::publicPath
    const urls = YEARS.flatMap((year) =>
      REGIONS.map((region) => `./data/${year}/${region}.json`),
    );

    const getDatasetName = (url: string) => {
      const parts = url.split("/");
      const region = parts[parts.length - 1].split(".")[0].replace("-", " ");
      const year = parts[parts.length - 2];

      return `${year} ${region}`;
    };

    Promise.all(
      urls.map((url: string) =>
        fetch(url)
          .then((response) => response.json())
          .then((dataset) => ({
            dataset,
            name: getDatasetName(url),
          })),
      ),
    ).then(setDatasets);
  }, []);

  if (datasets.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-4">
      {datasets.map(({ dataset, name }) => (
        <Dataset
          name={name}
          dataset={dataset}
          key={name}
          beanNames={beanNames}
          onBeansClick={onBeansClick}
          onDatasetClick={onDatasetClick}
        />
      ))}
    </div>
  );
}
