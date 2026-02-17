import React, { useEffect, useState } from "react";
import Dataset from "./Dataset";

export default function Datasets({ beanNames, onBeansClick, onDatasetClick }) {
  const [datasets, setDatasets] = useState<{ dataset: any; name: string }[]>(
    [],
  );
  const [year, setYear] = useState(2025);

  const years = [2025, 2024];

  useEffect(() => {
    // must be relative path because the production is on /coffee/
    const urls = [
      `./data/${year}/africa.json`,
      `./data/${year}/indonesia.json`,
      `./data/${year}/central-america.json`,
      `./data/${year}/south-america.json`,
    ];

    const formatFileName = (url: string) =>
      url.split("/").pop().split(".")[0].replace("-", " ");

    Promise.all(
      urls.map((url: string) =>
        fetch(url)
          .then((response) => response.json())
          .then((dataset) => ({
            dataset,
            name: formatFileName(url),
          })),
      ),
    ).then(setDatasets);
  }, [year]);

  if (datasets.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-center items-end">
        <select
          value={year}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setYear(parseInt(e.target.value))
          }
          className="font-bold text-xl"
        >
          {years.map((year: number) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center items-end">
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
    </div>
  );
}
