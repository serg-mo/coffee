import React from "react";
import BeanShape from "types/BeanShape";

function BeanSpecs({
  sku,
  specifications,
}: {
  sku: string;
  specifications: Object;
}) {
  // TODO: use beans.json lookup here
  // TODO: have a single function for this
  const url = `https://www.coffeebeancorral.com/search?q=${sku}`;

  return (
    <table className="w-1/2">
      <tbody>
        <tr className="border-b border-gray-300 bg-gray-200">
          <th className="p-2 text-left">SKU</th>
          <td className="p-2 truncate">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {sku.toUpperCase()}
            </a>
          </td>
        </tr>

        {Object.entries(specifications).map(([key, value]: any) => (
          <tr key={key} className="border-b border-gray-300">
            <th className="p-2 text-left capitalize">{key}</th>
            <td className="p-2 truncate" title={value}>
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function BeanCard({ bean }: { bean: BeanShape }) {
  const { sku, specifications, description } = bean;
  return (
    <div className="flex flex-row w-full gap-4">
      <BeanSpecs sku={sku} specifications={specifications} />

      <div className="w-1/2 leading-relaxed whitespace-pre-line">
        {description}
      </div>
    </div>
  );
}
