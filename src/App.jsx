import React, { useEffect, useState } from "react";
import BeanCard from "./components/BeanCard";
import ComparisonsMatrix from "./components/ComparisonsMatrix";

const urls = [
  "/data/africa.json",
  "/data/indonesia.json",
  "/data/south-america.json",
];

export default function Comparisons() {
  const [datasets, setDatasets] = useState(null);
  const [beans, setBeans] = useState(null);

  useEffect(() => {
    Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((response) => response.json())
          .then((data) => ({ data, name: url.split("/").pop().split(".")[0] }))
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
    <>
      <div className="flex justify-center items-center">
        {datasets.map(({ data, name }) => (
          <ComparisonsMatrix
            name={name.replace("-", " ")}
            data={data}
            key={name}
            setBeans={setBeans}
          />
        ))}
      </div>
      {beans && <BeanCard name={beans} />}
    </>
  );
}
