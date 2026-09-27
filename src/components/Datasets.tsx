import React, { useEffect, useState } from "react";
import Dataset, { maxX } from "./Dataset";
import Slider from "./Slider";
import BeanShape from "types/BeanShape";
import DataShapePair from "types/DataShapePair";
import DataShapeQuad from "types/DataShapeQuad";

const YEARS = [2026, 2025, 2024];
const REGIONS = ["africa", "indonesia", "central-america", "south-america"]; // NOTE: grid-cols-4 below

// must be relative, see webpack.config.js::publicPath
const datasetUrl = (year: number, region: string) =>
  `./data/${year}/${region}.json`;

export default function Datasets({
  beanNames,
  setBeanNames,
  beanData,
}: {
  beanNames: string[];
  setBeanNames: (names: string[]) => void;
  beanData: Record<string, BeanShape>;
}) {
  const [datasets, setDatasets] = useState<
    Record<string, DataShapeQuad | DataShapePair>
  >({}); // url => dataset

  // TODO: request datasets one year at a time
  useEffect(() => {
    // wait for [[url, dataset]] then turn it into url => dataset hash
    Promise.all(
      YEARS.flatMap((year: number) =>
        REGIONS.map((region: string) => datasetUrl(year, region)),
      ).map((url: string) =>
        fetch(url)
          .then((response) => (response.ok ? response.text() : null))
          .then((text) => [
            url, // key
            text ? JSON.parse(text) : null, // value
          ]),
      ),
    ).then((results) => setDatasets(Object.fromEntries(results)));
  }, []);

  const toggleBeans = (name: string) =>
    setBeanNames((prev: string[]) =>
      prev.includes(name)
        ? prev.filter((v: string) => v !== name)
        : [...prev, name],
    );

  if (Object.keys(datasets).length === 0) {
    return <div>Loading...</div>;
  }

  // TODO: if (beanNames.length) then add an X icon to clear them
  // TODO: clicking a year should summarize all 4 regions
  // TODO: visualize the ranking value on the radar chart (0..8) range
  // TODO: fetch which slide to show from DatasetContext
  return (
    <Slider maxX={maxX}>
      {YEARS.map((year) => (
        <div key={year}>
          <h2
            onClick={() => setBeanNames([])}
            className="text-xl font-bold text-center flex items-center justify-center cursor-pointer"
          >
            {year}
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {REGIONS.map((region) => {
              const key = datasetUrl(year, region);
              const dataset = datasets[key];

              return (
                <Dataset
                  name={region}
                  dataset={dataset}
                  key={key}
                  beanNames={beanNames}
                  beanData={beanData}
                  onBeansClick={toggleBeans}
                  onDatasetClick={setBeanNames}
                />
              );
            })}
          </div>
        </div>
      ))}
    </Slider>
  );
}
