import React, { useEffect, useState } from "react";
import BeanCard from "./components/BeanCard";
import Datasets from "./components/Datasets";
import RadarChart from "./components/RadarChart";
import BeanShape from "types/BeanShape";

export default function Comparisons() {
  // NOTE: names change, data stays
  const [beanNames, setBeanNames] = useState<string[]>([]); // 1 - show card, 2+ - show radar charts
  const [beanData, setBeanData] = useState<Record<string, BeanShape>>({});

  // this breaks if I try to make local variables
  const getChartData = (key) => ({
    labels: Object.keys(Object.values(beanData)[0]?.[key] || {}),
    datasets: Object.entries(beanData).map(([label, data]) => ({
      label,
      data: Object.values(data[key]),
      backgroundColor: `rgba(217, 119, 6, 0.30)`, // same opacity works best
      borderWidth: 0,
    })),
  });

  useEffect(() => {
    if (beanNames.length === 0) {
      setBeanData({});
      return;
    }

    // must be relative because production is on /coffee/
    Promise.all(
      beanNames.map((name) =>
        fetch(`./data/beans/${name.toLocaleLowerCase()}.json`)
          .then((res) => res.json())
          .catch(() => null),
      ),
    ).then((results) => {
      const newBeanData = {};
      beanNames.forEach((name, index) => {
        if (results[index]) {
          newBeanData[name] = results[index];
        }
      });
      setBeanData(newBeanData);
    });
  }, [beanNames]);

  const toggleBeans = (name: string) =>
    setBeanNames((prev) =>
      prev.includes(name) ? prev.filter((v) => v !== name) : [...prev, name],
    );

  return (
    <div className="flex flex-col m-auto w-3/5">
      <Datasets
        beanNames={beanNames}
        onBeansClick={toggleBeans}
        onDatasetClick={setBeanNames}
      />
      {beanNames.length > 0 ? (
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-row justify-between items-center m-auto">
            <div className="w-1/2">
              <RadarChart data={getChartData("attributes")} max={7} />
            </div>
            <div className="w-1/2">
              <RadarChart data={getChartData("flavors")} max={4} />
            </div>
          </div>
          {beanNames.length === 1 && beanData[beanNames[0]] && (
            <BeanCard {...beanData[beanNames[0]]} />
          )}
        </div>
      ) : (
        <div className="mt-10 mx-5 px-6 py-5 rounded-2xl border border-amber-200 bg-amber-50/80 text-amber-900 shadow-sm">
          <h2 className="text-center text-lg font-semibold tracking-tight text-amber-900">
            Ranked beans with the same roast and grind
          </h2>
          <p className="mt-2 leading-relaxed">
            Samples come in half-pound bags and sometimes that's not enough to
            fill the whole matrix. With pairwise comparisons, there are two
            tastings for every pairing, e.g., A vs B and B vs A. If the two
            cells disagree, there is no definite winner and no transitive
            completeness.
          </p>
          <p className="mt-2 leading-relaxed">
            I can taste all beans in 10 groups of 3 or 5 groups of 4. Both ways
            compare each pairing 3 times, so there is a definite winner, but
            groups of 4 are easier to remember, i.e., exclude one bean at each
            tasting. Groups of 5 would work too, but I only have 4 puck screens.
          </p>
        </div>
      )}
    </div>
  );
}
