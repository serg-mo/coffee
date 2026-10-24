import React from 'react';
import BeanShape from 'types/BeanShape';
import BeanChart from './BeanChart';
import RoastShape from 'types/RoastShape';
import moment from 'moment';

const formatSeconds = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')} `;

export default function BeanRoast({ roast }: { roast: RoastShape }) {
  const yieldPercentage = roast.weightRoasted / roast.weightGreen;

  const dryingPercentage = roast.indexYellowingStart / (roast.beanTemperature.length - 1);
  const dryingSeconds = Math.round(dryingPercentage * roast.totalRoastTime);

  const roastingPercentage = roast.indexFirstCrackStart / (roast.beanTemperature.length - 1);
  const roastingSeconds = Math.round(roastingPercentage * roast.totalRoastTime) - dryingSeconds;

  const developingSeconds = roast.totalRoastTime - dryingSeconds - roastingSeconds;
  const developingPercentage = developingSeconds / roast.totalRoastTime;

  return (
    <div>
      <div className="grid grid-cols-4 divide-x text-[7px] text-center mb-2">
        <div className="">
          <div className="font-bold">In</div>
          <div className="font-black">{roast.weightGreen}g</div>
        </div>

        <div className="">
          <div className="font-bold">Yield</div>
          <div className="font-black">{(yieldPercentage * 100).toFixed()}%</div>
        </div>

        <div className="">
          <div className="font-bold">Loss</div>
          <div className="font-black">{((1 - yieldPercentage) * 100).toFixed()}%</div>
        </div>

        <div className="">
          <div className="font-bold">Out</div>
          <div className="font-black">{roast.weightRoasted}g</div>
        </div>
      </div>

      <div className="grid grid-cols-3 items-stretch border-t text-[7px] text-center font-bold uppercase">
        <div className="relative">
          <div className="font-bold pt-2">Drying</div>
          <div className="font-black">
            {formatSeconds(dryingSeconds)} · {(100 * dryingPercentage).toFixed()}%
          </div>

          <div className="absolute left-0 top-0 -translate-y-1/2 -translate-x-[2px] bg-white pr-1 ">
            Green
          </div>

          <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-white px-1 ">
            Yellow
          </div>
        </div>

        <div className="border-x">
          <div className="font-bold pt-2">Browning</div>
          <div className="font-black">
            {formatSeconds(roastingSeconds)} · {(100 * roastingPercentage).toFixed()}%
          </div>
        </div>

        <div className="relative">
          <div className="font-bold pt-2">Development</div>
          <div className="font-black">
            {formatSeconds(developingSeconds)} · {(100 * developingPercentage).toFixed()}%
          </div>

          <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-1 ">
            First Crack
          </div>

          <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-[2px] bg-white pl-1 ">
            Drop
          </div>
        </div>
      </div>
    </div>
  );
}
