import React, { useEffect, useState } from "react";

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

  return (
    <div className="text-sm w-full space-y-6">
      <div className="flex flex-row">
        <div className="w-1/2 mr-4">
          {Object.entries(specifications).map(([key, value]) => (
            <div className="flex w-full m-auto justify-between" key={key}>
              <span className="text-gray-600">{key}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>

        <p className="w-1/2 text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
