import React, { useEffect, useState } from "react";

import BeanCard from "./components/BeanCard";
import Datasets from "./components/Datasets";
import About from "./components/About";
import BeanChart from "./components/BeanChart";
import BeanTable from "./components/BeanTable";
import BeanShape from "types/BeanShape";

const beanCache = new Map<string, BeanShape>();

function getBeanData(name: string) {
  const url = `./data/beans/${name.toLowerCase()}.json`;

  if (beanCache.has(url)) {
    return Promise.resolve(beanCache.get(url));
  }

  return fetch(url)
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (data) beanCache.set(url, data);
      return data;
    })
    .catch(() => null); // NOTE: silent fail for missing bean data
}

export default function App() {
  // TODO: limit beanNames to 5 max
  // NOTE: names change, data stays
  const [beanNames, setBeanNames] = useState<string[]>([]); // 1 - show card, 2+ - show radar charts
  const [beanData, setBeanData] = useState<Record<string, BeanShape>>({});

  useEffect(() => {
    // NOTE: we re-try missing ones every time the list changes
    const missingNames = beanNames.filter((name) => !beanData[name]);
    if (!missingNames.length) return;

    Promise.all(missingNames.map(getBeanData)).then((results) => {
      setBeanData((data) => ({
        ...data,
        ...Object.fromEntries(
          missingNames
            .map((name, i) => [name, results[i]])
            .filter(([, value]) => value), // SKU => BeanShape
        ),
      }));
    });
  }, [beanNames]);

  const beans = beanNames.map((name) => beanData[name]).filter(Boolean);
  // console.log({ beanNames, beanData, beans })

  return (
    <div className="flex flex-col m-auto w-full lg:w-4xl max-w-4xl gap-2">
      <Datasets
        beanNames={beanNames}
        setBeanNames={setBeanNames}
        beanData={beanData}
      />

      {beans.length ? (
        <div className="w-full flex flex-col">
          <BeanChart beans={beans} />
          {beans.length === 1 && beans[0] && <BeanCard {...beans[0]} />}
          {beans.length > 1 && <BeanTable beans={beans} />}
        </div>
      ) : (
        <About />
      )}
    </div>
  );
}
