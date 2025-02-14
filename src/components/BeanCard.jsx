import React, { useEffect, useState } from "react";
import RadarChart from "./RadarChart";

export default function BeanCard({ name }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/data/beans/${name}.json`)
      .then((res) => res.json())
      .then(setData)
      .catch(() => null);
  }, [name]);

  if (!data) {
    return null;
  }

  const { specifications, attributes, flavors, description } = data;

  const attributesData = {
    labels: Object.keys(attributes),
    datasets: [
      {
        data: Object.values(attributes),
        backgroundColor: "rgba(217, 119, 6, 0.2)",
        borderColor: "rgb(217, 119, 6)",
        borderWidth: 1,
      },
    ],
  };

  const flavorsData = {
    labels: Object.keys(flavors),
    datasets: [
      {
        data: Object.values(flavors),
        backgroundColor: "rgba(217, 119, 6, 0.2)",
        borderColor: "rgb(217, 119, 6)",
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className="m-auto w-2/3 bg-white shadow-xl rounded-lg p-2 border border-gray-200 space-y-6">
      <h4 className="font-semibold mb-3 text-gray-700 text-center">{name}</h4>
      <div className="space-y-2">
        {Object.entries(specifications).map(([key, value]) => (
          <div className="flex w-1/2 m-auto justify-between" key={key}>
            <span className="text-gray-600">{key}</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>

      <div className="w-1/2 flex flex-row justify-between items-center ">
        <RadarChart data={attributesData} max={7} />
        <RadarChart data={flavorsData} max={4} />
      </div>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
