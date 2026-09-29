import React from "react";
import RadarChart from "./RadarChart";
import BeanShape from "types/BeanShape";

export default function BeanChart({ beans }: { beans: BeanShape[] }) {
  // this breaks if I try to make local variables
  // TODO: refactor to just dump whole bunch of BeanShapes + dimension names
  if (!beans.length) {
    return;
  }

  const attributeData = {
    labels: Object.keys(beans[0]["attributes"] || {}),
    datasets: beans.map((bean: BeanShape) => ({
      label: bean.sku,
      data: Object.values(bean["attributes"]),
      backgroundColor: `rgba(217, 119, 6, 0.30)`, // same opacity works best
      borderWidth: 0,
    })),
  };

  const flavorData = {
    labels: Object.keys(beans[0]["flavors"] || {}),
    datasets: beans.map((bean: BeanShape) => ({
      label: bean.sku,
      data: Object.values(bean["flavors"]),
      backgroundColor: `rgba(217, 119, 6, 0.30)`, // same opacity works best
      borderWidth: 0,
    })),
  };

  return (
    <div className="w-full flex flex-row justify-between items-center m-auto">
      <div className="w-1/2">
        <RadarChart data={attributeData} max={7} />
      </div>
      <div className="w-1/2">
        <RadarChart data={flavorData} max={4} />
      </div>
    </div>
  );
}
