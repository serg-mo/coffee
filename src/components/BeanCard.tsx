import React from "react";
import BeanShape from "types/BeanShape";
import OriginMap from "./OriginMap";

export default function BeanCard({
  sku,
  specifications,
  description,
}: BeanShape) {
  const url = `https://www.coffeebeancorral.com/product/${sku.toUpperCase()}.aspx`;
  const country = specifications.Country as string;

  return (
    <div className="text-sm w-full space-y-6">
      <div className="flex flex-row text-gray-600">
        <div className="w-1/2 mr-4">
          <div className="flex w-full m-auto justify-between">
            <span>SKU</span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium"
            >
              {sku}
            </a>
          </div>

          {Object.entries(specifications).map(([key, value]) => (
            <div className="flex w-full m-auto justify-between" key={key}>
              <span>{key}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>

        <div className="w-1/2 space-y-4">
          <p className="text-sm leading-relaxed">{description}</p>
        </div>
      </div>

      <OriginMap country={country} />
    </div>
  );
}
