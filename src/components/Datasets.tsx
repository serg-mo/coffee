import React, { useEffect, useState } from "react";
import Dataset, { TABS } from "./Dataset";

const YEARS = [2026, 2025, 2024];
const REGIONS = ["africa", "indonesia", "central-america", "south-america"];

export default function Datasets({
  beanNames,
  setBeanNames,
  toggleBean,
}: {
  beanNames: string[];
  setBeanNames: (names: string[]) => void;
  toggleBean: (name: string) => void;
}) {
  const [year, setYear] = useState(YEARS[0]);
  const [tab, setTab] = useState(0);

  // TODO: if (beanNames.length) then add an X icon to clear them
  // TODO: clicking a year should summarize all 4 regions
  // TODO: visualize the ranking value on the radar chart (0..8) range
  // TODO: fetch which slide to show from DatasetContext
  // TODO: maybe clicking the year only selected the beans with 8
  // TODO: add > and < around the years instead of scroller
  return (
    <div className="m-2">
      <div className="">
        <header className="text-xl font-bold text-center">
          {YEARS.includes(year - 1) && (
            <a onClick={() => setYear(year - 1)} className="cursor-pointer">
              &lt;
            </a>
          )}
          <a onClick={() => setBeanNames([])} className="cursor-pointer">
            {year}
          </a>
          {YEARS.includes(year + 1) && (
            <a onClick={() => setYear(year + 1)} className="cursor-pointer">
              &gt;
            </a>
          )}
        </header>
        <div className="flex flex-wrap items-start justify-between gap-1">
          {REGIONS.map((region) => (
            <Dataset
              key={`${year} ${region}`}
              year={year}
              region={region}
              beanNames={beanNames}
              onBeansClick={toggleBean}
              onDatasetClick={setBeanNames}
              tab={tab}
            />
          ))}
        </div>
      </div>

      <nav className="flex flex-row justify-center gap-1 mt-2">
        {TABS.map((name, index) => (
          <button
            key={name}
            title={name}
            className={`h-2 w-2 rounded-full transition-colors duration-800 ${tab === index ? "bg-gray-600" : "bg-gray-300"}`}
            onClick={() => setTab(index)}
          />
        ))}
      </nav>
    </div>
  );
}
