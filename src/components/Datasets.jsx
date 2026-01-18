import React, { useEffect, useState } from "react";
import Dataset from "./Dataset";

export default function Datasets({ beanNames, onBeansClick, onDatasetClick }) {
  const [datasets, setDatasets] = useState(null);
  const [year, setYear] = useState(2025);

  useEffect(() => {
    // must be relative path because the production is on /coffee/
    const urls = [
      `./data/${year}/africa.json`,
      `./data/${year}/indonesia.json`,
      `./data/${year}/central-america.json`,
      `./data/${year}/south-america.json`,
    ];

    const formatFileName = (url) =>
      url.split("/").pop().split(".")[0].replace("-", " ");

    Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((response) => response.json())
          .then((data) => ({ data, name: formatFileName(url) })),
      ),
    ).then(setDatasets);
  }, [year]);

  if (!datasets) {
    return <div>Loading...</div>;
  }

  if (datasets.length === 0) {
    return <div>No valid comparison data found</div>;
  }

  return (
    <div>
      <div className="flex justify-center items-end">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="font-bold text-xl"
        >
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>
      <div className="flex justify-center items-end">
        {datasets.map(({ data, name }) => (
          <Dataset
            name={name}
            data={data}
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
