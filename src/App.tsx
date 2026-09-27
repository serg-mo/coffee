import React, { useEffect, useState, useMemo } from "react";
import BeanCard from "./components/BeanCard";
import Datasets from "./components/Datasets";
import RadarChart from "./components/RadarChart";
import BeanShape from "types/BeanShape";
import OriginMap from "./components/OriginMap";
import About from "./components/About";
import BeanChart from "./components/BeanChart";

// TODO: rename Indonesia to just Asia

function getBeanData(name: string) {
  return fetch(`./data/beans/${name.toLocaleLowerCase()}.json`)
    .then((res) => res.json())
    .catch(() => null);
}

export default function App() {
  // NOTE: names change, data stays
  const [beanNames, setBeanNames] = useState<string[]>([]); // 1 - show card, 2+ - show radar charts
  const [beanData, setBeanData] = useState<Record<string, BeanShape>>({});

  useEffect(() => {
    if (!beanNames.length) {
      return;
    }

    // must be relative because production is on /coffee/
    Promise.all(beanNames.map(getBeanData)).then((results) => {
      setBeanData(
        Object.fromEntries(
          beanNames
            .map((name, i) => [name, results[i]])
            .filter(([, data]) => data), // no empties
        ),
      );
    });
  }, [beanNames]);

  const countries = useMemo(
    () =>
      Array.from(
        new Set(
          beanNames
            .map((name) => beanData[name]?.specifications?.Country)
            .filter((country: string) => country),
        ),
      ),
    [beanNames, beanData],
  );

  return (
    <div className="flex flex-col m-auto w-3/5">
      <Datasets
        beanNames={beanNames}
        setBeanNames={setBeanNames}
        beanData={beanData}
      />

      {beanNames.length > 0 ? (
        <div className="w-full flex flex-col">
          <BeanChart beanData={beanData} />

          {beanNames.length === 1 && beanData[beanNames[0]] && (
            <BeanCard {...beanData[beanNames[0]]} />
          )}

          <OriginMap countries={countries} />
        </div>
      ) : (
        <About />
      )}
    </div>
  );
}
