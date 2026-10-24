import React, { useContext } from 'react';
import BeanLink from './BeanLink';
import BeanContext from '../BeanContext';

const COMPARISON_SPECS = [
  'category', // conventional or organic
  'country',
  'process',
  // "certifications", // TODO: sometimes they are broken down
  'variety',
  'altitude',
  'harvest',
];

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
              <td key={bean.sku} className="p-2">
                <div className="truncate" title={bean.specifications?.[spec] || '-'}>
                  {bean.specifications?.[spec] || '-'}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
