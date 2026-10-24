import React, { useContext } from 'react';
import BeanLink from './BeanLink';
import BeanContext from '../BeanContext';
import BeanShape from '../types/BeanShape';

const COMPARISON_SPECS = [
  'category', // conventional or organic
  'country',
  'process',
  'variety',
  'altitude',
  'harvest',
];

function formatBeanSpec(bean: BeanShape, spec: string) {
  const value = bean.specifications?.[spec];
  if (!value) return '-'

  if (spec === 'altitude') {
    return formatAltitude(value);
  } else if (spec === 'harvest') {
    return formatHarvest(value);
  }

  return value
}

function formatAltitude(value: string) {
  const numbers = value.match(/[0-9,]+/g)?.map((n) => Number(n.replace(/,/g, ''))) ?? [];
  if (!numbers.length) {
    return '-';
  }

  const avg = Math.round(numbers.reduce((a, b) => a + b, 0) / numbers.length);
  return avg < 600 ? "Low" : avg < 1200 ? "Mid" : "High";
}

function formatHarvest(value: string) {
  const months = ['january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'];

  const [start, end = start] = value.toLowerCase().match(/[a-z]+/g) ?? [];
  if (!start || !end) return [];

  const from = months.findIndex((m) => start.startsWith(m));
  const to = months.findIndex((m) => end.startsWith(m));
  if (from < 0 || to < 0) return [];

  // 'May - September' => [5, 6, 7, 8, 9] 
  const nums = Array.from(
    { length: (to - from + 12) % 12 + 1 }, // inclusive
    (_, i) => (from + i) % 12 + 1, // january is 1
  )

  // NOTE: peak freshness at 3-6 months
  return nums.join(', ');
}

// TODO: sometimes the "close" icon shrinks for really longs SKUs
export default function BeanTable() {
  const { beanNames, beanData } = useContext(BeanContext);
  const beans = beanNames.map((name) => beanData[name]).filter(Boolean);

  const specs = beans.length === 1 ? Object.keys(beans[0].specifications) : COMPARISON_SPECS;
  const colStyle = beans.length === 1 ? 'w-min' : 'w-24 max-w-min';

  // I want a complete redraw every time the beans change, hence the key
  return (
    <table className="w-full table-fixed" key={`bean-table-${beans.length}`}>
      <thead>
        <tr className="bg-gray-200">
          <th className={`${colStyle} p-2 text-left font-bold`}>SKU</th>
          {/* one column per bean */}
          {beans.map((bean) => (
            <td key={bean.sku} className="p-2 truncate">
              <BeanLink bean={bean} />
            </td>
          ))}
        </tr>
      </thead>

      <tbody>
        {specs.map((spec) => (
          <tr key={spec} className="border-b border-gray-300">
            <td className="p-2 text-left font-bold text-nowrap capitalize">{spec}</td>
            {/* one column per bean */}
            {beans.map((bean) => (
              <td key={bean.sku} title={bean.specifications?.[spec] || '-'} className="truncate p-2">
                {formatBeanSpec(bean, spec)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
