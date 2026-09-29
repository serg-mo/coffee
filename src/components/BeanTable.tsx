import { prop } from "cheerio/dist/commonjs/api/attributes";
import { table } from "console";
import React from "react";
import BeanShape from "types/BeanShape";

// NOTE: capitalized labels, props are all lowercase
const BEAN_PROPS = [
  "SKU",
  "Category",
  "Process",
  "Certifications",
  "Variety",
  "Altitude",
  "Harvest",
];

const getBeanProp = (bean: BeanShape, prop: string) => {
  // NOTE: bean props are all lowercase, normalize them last
  if (prop === "sku") {
    return <span className="font-bold">{bean.sku?.toUpperCase()}</span>;
  } else {
    // console.log({ prop, specs: bean.specifications })
    return bean.specifications?.[prop] || "-";
  }
};

export default function BeanTable({ beans }: { beans: BeanShape[] }) {
  return (
    <table className="w-full table-fixed text-sm text-gray-600">
      <tbody>
        {BEAN_PROPS.map((prop) => (
          <tr key={prop} className="border-b border-gray-200">
            <th className="w-min-content px-3 py-2 text-left font-bold ">
              {prop}
            </th>

            {/* one column per bean */}
            {beans.map((bean) => (
              <td
                key={bean.sku}
                className="max-w-1/6 truncate px-3 py-2 text-center"
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
