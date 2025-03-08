import React, { useEffect, useState } from "react";
import BeanCard from "./components/BeanCard";
import Datasets from "./components/Datasets";
import RadarChart from "./components/RadarChart";

export default function Comparisons() {
  const [beanNames, setBeanNames] = useState([]);
  const [beanData, setBeanData] = useState({});

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
        fetch(`./data/beans/${name}.json`)
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

  const onBeansClick = (name) => {
    // toggle
    setBeanNames((prev) =>
      prev.includes(name) ? prev.filter((v) => v !== name) : [...prev, name],
    );
  };

  return (
    <div className="flex flex-col m-auto w-3/5">
      <Datasets beanNames={beanNames} onBeansClick={onBeansClick} onDatasetClick={setBeanNames} />
      <div className="w-full flex flex-col">
        {Object.values(beanData).length > 0 && (
          <div className="w-full flex flex-row justify-between items-center m-auto">
            <div className="w-1/2">
              <RadarChart data={getChartData("attributes")} max={7} />
            </div>
            <div className="w-1/2">
              <RadarChart data={getChartData("flavors")} max={4} />
            </div>
          </div>
        )}
        {beanNames.length === 1 && !!beanData[beanNames[0]] && (
          <BeanCard {...beanData[beanNames[0]]} />
        )}
      </div>
    </div>
  );
}
