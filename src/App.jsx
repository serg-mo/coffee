import React, { useEffect, useState } from "react";
import BeanCard from "./components/BeanCard";
import ComparisonsMatrix from "./components/ComparisonsMatrix";
import RadarChart from "./components/RadarChart";

const urls = [
  "/data/africa.json",
  "/data/indonesia.json",
  "/data/south-america.json",
];

export default function Comparisons() {
  const [datasets, setDatasets] = useState(null);
  const [beans, setBeans] = useState([]);
  const [beanData, setBeanData] = useState({});

  useEffect(() => {
    Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((response) => response.json())
          .then((data) => ({ data, name: url.split("/").pop().split(".")[0] }))
          .catch(() => null),
      ),
    )
      .then((results) => results.filter((result) => result))
      .then(setDatasets);
  }, []);

  useEffect(() => {
    // Fetch data for each selected bean
    Promise.all(
      beans.map((name) =>
        fetch(`/data/beans/${name}.json`)
          .then((res) => res.json())
          .catch(() => null),
      ),
    ).then((results) => {
      const newBeanData = {};
      beans.forEach((name, index) => {
        if (results[index]) {
          newBeanData[name] = results[index];
        }
      });
      setBeanData(newBeanData);
    });
  }, [beans]);

  const toggleBean = (name) => {
    setBeans((prevBeans) =>
      prevBeans.includes(name)
        ? prevBeans.filter((bean) => bean !== name)
        : [...prevBeans, name],
    );
  };

  if (!datasets) {
    return <div>Loading...</div>;
  }

  if (datasets.length === 0) {
    return <div>No valid comparison data found</div>;
  }

  const attributesData = {
    labels: Object.keys(Object.values(beanData)[0]?.attributes || {}),
    datasets: Object.entries(beanData).map(([name, data]) => ({
      label: name,
      data: Object.values(data.attributes),
      backgroundColor: `rgba(217, 119, 6, 0.35)`,
      borderWidth: 0,
    })),
  };

  const flavorsData = {
    labels: Object.keys(Object.values(beanData)[0]?.flavors || {}),
    datasets: Object.entries(beanData).map(([name, data]) => ({
      label: name,
      data: Object.values(data.flavors),
      backgroundColor: `rgba(217, 119, 6, 0.35)`,
      borderWidth: 0,
    })),
  };

  console.log({ attributesData, flavorsData });

  return (
    <div className="m-auto w-3/5">
      <div className="flex justify-center items-center">
        {datasets.map(({ data, name }) => (
          <ComparisonsMatrix
            name={name.replace("-", " ")}
            data={data}
            key={name}
            onBeansClick={toggleBean}
          />
        ))}
      </div>
      <div className="w-full flex flex-col">
        {beans.length > 0 && (
          <div className="w-full flex flex-row justify-between items-center m-auto">
            <div className="w-1/2">
              <RadarChart data={attributesData} max={7} />
            </div>
            <div className="w-1/2">
              <RadarChart data={flavorsData} max={4} />
            </div>
          </div>
        )}
        {beans.length == 1 && <BeanCard name={beans[0]} />}
      </div>
    </div>
  );
}
