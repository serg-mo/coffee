import React, { useEffect, useState } from "react";
import Dataset, { maxX } from "./Dataset";
import Slider from "./Slider";
import BeanShape from "types/BeanShape";

const YEARS = [2026, 2025, 2024];
const REGIONS = ["africa", "indonesia", "central-america", "south-america"]; // NOTE: grid-cols-4 below

export default function Datasets({
  beanNames,
  setBeanNames,
  beanData,
}: {
  beanNames: string[];
  setBeanNames: (names: string[]) => void;
  beanData: Record<string, BeanShape>;
}) {
  const toggleBeans = (name: string) =>
    setBeanNames((prev: string[]) =>
      prev.includes(name)
        ? prev.filter((v: string) => v !== name)
        : [...prev, name],
    );

  // TODO: if (beanNames.length) then add an X icon to clear them
  // TODO: clicking a year should summarize all 4 regions
  // TODO: visualize the ranking value on the radar chart (0..8) range
  // TODO: fetch which slide to show from DatasetContext
  return (
    <Slider maxX={maxX}>
      {YEARS.map((year) => (
        <div key={year}>
          <h2
            onClick={() => setBeanNames([])}
            className="text-xl font-bold text-center flex items-center justify-center cursor-pointer"
          >
            {year}
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {REGIONS.map((region) => (
              <Dataset
                key={`${year} ${region}`}
                year={year}
                region={region}
                beanNames={beanNames}
                beanData={beanData}
                onBeansClick={toggleBeans}
                onDatasetClick={setBeanNames}
              />
            ))}
          </div>
        </div>
      ))}
    </Slider>
  );
}
