import React from "react";

const AttributeBar = ({ value, label, max }) => (
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

export default function Tooltip({ bean }) {
  return (
    <div className="w-96 left-full ml-2 top-0 bg-white shadow-xl rounded-lg p-6 border border-gray-200">
      <div className="space-y-6">
        <h4 className="font-semibold mb-3 text-gray-700">Specifications</h4>
        <div className="space-y-2">
          {Object.entries(bean.specifications).map(([key, value]) => (
            <div className="flex justify-between">
              <span className="text-gray-600">{key}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-700">Attributes</h4>
        <div className="space-y-2">
          {Object.entries(bean.attributes).map(([key, value]) => (
            <AttributeBar key={key} label={key} value={value} max={7} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-700">Flavors</h4>
        <div className="space-y-2">
          {Object.entries(bean.flavors).map(([key, value]) => (
            <AttributeBar key={key} label={key} value={value} max={4} />
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-600 leading-relaxed">
          {bean.description}
        </p>
      </div>

      <div className="flex gap-2 text-xs">
        {bean.specifications["Rainforest Alliance Certified"] === "Yes" && (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
            Rainforest Alliance
          </span>
        )}
        {bean.specifications["Fair Trade"] === "Yes" && (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
            Fair Trade
          </span>
        )}
        {bean.specifications["Organic Certification"] === "Yes" && (
          <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded">
            Organic
          </span>
        )}
      </div>
    </div>
  );
}
