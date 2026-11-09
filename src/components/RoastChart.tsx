import React from 'react';
import RadarChart from './RadarChart';
import RoastShape from '../types/RoastShape';
import BeanShape from '../types/BeanShape';
import LineChart from './LineChart';

export default function RoastChart({ roast }: { roast: RoastShape }) {
  return (
    <div className="w-full flex flex-row justify-between items-center m-auto">
      <LineChart roast={roast} />
    </div>
  );
}
