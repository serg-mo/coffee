import React from "react";

export default function BeanCard({ sku, specifications, description }) {
  return (
    <div className="text-sm w-full space-y-6">
      <div className="flex flex-row text-gray-600">
        <div className="w-1/2 mr-4">
          <div className="flex w-full m-auto justify-between">
            <span>SKU</span>
            <span className="font-medium">{sku}</span>
          </div>

          {Object.entries(specifications).map(([key, value]) => (
            <div className="flex w-full m-auto justify-between" key={key}>
              <span>{key}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>

        <p className="w-1/2 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
