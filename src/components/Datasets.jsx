import React, { useEffect, useState } from "react";
import Dataset from "./Dataset";

export default function Datasets({ onBeansClick, onDatasetClick }) {
  const [datasets, setDatasets] = useState(null);

  // must be relative path because the production is on /coffee/
  const urls = [
    "./data/africa.json",
    "./data/indonesia.json",
    "./data/south-america.json",
  ];

  useEffect(() => {
    Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((response) => response.json())
          .then((data) => ({
            data,
            name: url.split("/").pop().split(".")[0].replace("-", " "),
          }))
          .catch(() => null),
      ),
    )
      .then((results) => results.filter((result) => result))
      .then(setDatasets);
  }, []);

  if (!datasets) {
    return <div>Loading...</div>;
  }

  if (datasets.length === 0) {
    return <div>No valid comparison data found</div>;
  }

  return (
    <div className="flex justify-center items-center">
      {datasets.map(({ data, name }) => (
        <Dataset
          name={name}
          data={data}
          key={name}
          onBeansClick={onBeansClick}
          onDatasetClick={onDatasetClick}
        />
      ))}
    </div>
  );
}
