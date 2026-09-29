import { prop } from "cheerio/dist/commonjs/api/attributes";
import { table } from "console";
import React from "react";
import BeanShape from "types/BeanShape";

// NOTE: capitalized labels, props are all lowercase
const BEAN_PROPS = [
  "SKU",
  "Category",
  "Process",
  // "Certifications", // TODO: sometimes they are broken down
  "Variety",
  "Altitude",
  "Harvest",
];

function BeanLink({ sku }: { sku: string }) {
  // TODO: use beans.json lookup here
  // TODO: have a single function for this
  const url = `https://www.coffeebeancorral.com/search?q=${sku}`;

  return (<a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="underline"
  >
    {sku?.toUpperCase()}
  </a>);
}

const getBeanProp = (bean: BeanShape, prop: string) => {
  // NOTE: bean props are all lowercase, normalize them last
  if (prop === "sku") {
    return (<BeanLink sku={bean.sku} />)
  } else {
    // console.log({ prop, specs: bean.specifications })
    return <span className="">{bean.specifications?.[prop] || "-"}</span>;
  }
};

// TODO: add an x next to sku to unselect the bean
export default function BeanTable({ beans }: { beans: BeanShape[] }) {
  return (
    <table className="w-full">
      <tbody>
        {BEAN_PROPS.map((prop) => (
          <tr key={prop} className="border-b border-gray-300">
            <th
              className={`p-2 text-left w-40 ${prop.toLowerCase() == "sku" ? "bg-gray-200" : "bg-white"}`}
            >
              {prop}
            </th>

            {/* one column per bean */}
            {beans.map((bean) => (
              <td
                key={bean.sku}
                className={`p-2 text-left min-w-1/2 max-w-0 truncate ${prop.toLowerCase() == "sku" ? "bg-gray-200" : "bg-white"}`}
              >
                {getBeanProp(bean, prop.toLowerCase())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
