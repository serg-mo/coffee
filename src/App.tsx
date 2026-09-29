import React, { useEffect, useState } from "react";

import Datasets from "./components/Datasets";
import About from "./components/About";
import BeanChart from "./components/BeanChart";
import BeanTable from "./components/BeanTable";
import BeanShape from "types/BeanShape";

const MAX_NAMES = 5;
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
  const [beanNames, setBeanNames] = useState<string[]>([]);
  const [beanData, setBeanData] = useState<Record<string, BeanShape>>({}); // NOTE: names change, data stays

  useEffect(() => {
    // NOTE: we re-try missing ones every time the list changes
    const missingNames = beanNames.filter((sku) => !beanData[sku]);
    if (!missingNames.length) return;

    Promise.all(missingNames.map(getBeanData)).then((results) => {
      setBeanData((prev) => ({
        ...prev,
        ...Object.fromEntries(
          missingNames
            .map((sku, i) => [sku, results[i]])
            .filter(([, value]) => value), // SKU => BeanShape
        ),
      }));
    });
  }, [beanNames]);

  const toggleBean = (name: string) =>
    setBeanNames((prev: string[]) =>
      prev.includes(name)
        ? prev.filter((v: string) => v !== name)
        : [...prev, name].slice(0, MAX_NAMES),
    );

  const beans = beanNames.map((name) => beanData[name]).filter(Boolean);
  // console.log({ beanNames, beanData, beans });

  // TODO: some old descriptions have literal '\n', not newlines
  // TODO: this is where you set the context for beanData, setBeanNames, and toggleBean
  return (
    <div className="flex flex-col m-auto w-full lg:w-4xl max-w-4xl text-gray-600">
      <Datasets
        beanNames={beanNames}
        setBeanNames={setBeanNames}
        toggleBean={toggleBean}
      />

      {beans.length > 0 ? <BeanChart beans={beans} /> : <About />}

      {beans.length > 0 &&
        (beans.length === 1 ? (
          <div className="flex flex-row w-full gap-4">
            <div className="w-1/2">
              <BeanTable beans={beans} toggleBean={toggleBean} />
            </div>

            <div className="w-1/2 leading-relaxed whitespace-pre-line text-justify">
              {beans[0].description}
            </div>
          </div>
        ) : (
          <BeanTable beans={beans} toggleBean={toggleBean} />
        ))}
    </div>
  );
}
