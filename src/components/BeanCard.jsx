import React, { useEffect, useState } from "react";

const Bar = ({ value, label, max }) => (
  <div className="flex items-center gap-2">
    <span className="text-sm text-gray-600 w-24">{label}</span>
    <div className="flex-1 bg-gray-100 rounded-full h-2">
      <div
        className="bg-amber-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
    <span className="text-sm text-gray-500 w-4">{value}</span>
  </div>
);

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
    <div className="m-auto w-1/2 bg-white shadow-xl rounded-lg p-6 border border-gray-200">
      <div className="space-y-6">
        <h4 className="font-semibold mb-3 text-gray-700 text-center">{name}</h4>
        <div className="space-y-2">
          {Object.entries(specifications).map(([key, value]) => (
            <div className="flex justify-between" key={key}>
              <span className="text-gray-600">{key}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-700">Attributes</h4>
        <div className="space-y-2">
          {Object.entries(attributes).map(([key, value]) => (
            <Bar key={key} label={key} value={value} max={7} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-700">Flavors</h4>
        <div className="space-y-2">
          {Object.entries(flavors).map(([key, value]) => (
            <Bar key={key} label={key} value={value} max={4} />
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
