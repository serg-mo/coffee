import React, { useEffect, useState } from "react";
import Dataset from "./Dataset";
import Slider from "./Slider";

const YEARS = [2026, 2025, 2024];
const REGIONS = ["africa", "indonesia", "central-america", "south-america"]; // NOTE: grid-cols-4 below

// must be relative, see webpack.config.js::publicPath
const datasetUrl = (year: number, region: string) =>
  `./data/${year}/${region}.json`;

export default function Datasets({
  beanNames,
  onBeansClick,
  onDatasetClick,
}: {
  beanNames: string[];
  onBeansClick: (name: string) => void;
  onDatasetClick: (names: string[]) => void;
}) {
  const [datasets, setDatasets] = useState<Record<string, any>>({});
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    Promise.all(
      YEARS.flatMap((year) =>
        REGIONS.map((region) => datasetUrl(year, region)),
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

  if (Object.keys(datasets).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Slider slide={slide} setSlide={setSlide} direction="vertical">
      {YEARS.map((year) => (
        <div key={year}>
          <h2 className="text-xl font-bold text-center flex items-center justify-center">
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
                  onBeansClick={onBeansClick}
                  onDatasetClick={onDatasetClick}
                />
              );
            })}
          </div>
        </div>
      ))}
    </Slider>
  );
}
