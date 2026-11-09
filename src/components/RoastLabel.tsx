import React, { useState, useRef, useEffect } from 'react';
import BeanShape from '../types/BeanShape';
import BeanChart from './BeanChart';
import LineChart from './LineChart';
import RoastShape from '../types/RoastShape';
import moment from 'moment';
import { formatSeconds, getBeanData } from '../utils/beans';

// TODO: this is bad, not properly preheated
// "preheatTemperature": 230,
// "beanChargeTemperature": 110.97,
// "drumChargeTemperature": 163.99,

function formatRoastLevel(temp: number): string {
  if (temp < 196) return 'Underdeveloped';
  if (temp < 210) return 'Light (City)';
  if (temp < 218) return 'Medium (City+ / Full City)';
  if (temp < 224) return 'Medium-Dark (Full City+)';
  return 'Dark';
}

// http://localhost:8080/label/lmMqWqKR7hYYnZtQRFEF5
export default function RoastLabel({ roast }: { roast: RoastShape }) {
  const [bean, setBean] = useState<BeanShape | null>(null);
  const requested = useRef(false);

  useEffect(() => {
    if (!roast.beanName || requested.current) return;

    requested.current = true;

    getBeanData(roast.beanName).then(setBean).catch(console.error);
  }, [roast]);

  if (!requested.current || !bean) return null;

  const yieldPercentage = roast.weightRoasted / roast.weightGreen;

  const dryingPercentage = roast.indexYellowingStart / (roast.ibtsTemperature.length - 1);
  const dryingSeconds = Math.round(dryingPercentage * roast.totalRoastTime);

  const roastingPercentage =
    (roast.indexFirstCrackStart - roast.indexYellowingStart) / (roast.ibtsTemperature.length - 1);
  const roastingSeconds = Math.round(roastingPercentage * roast.totalRoastTime);

  const developingSeconds = roast.totalRoastTime - dryingSeconds - roastingSeconds;
  const developingPercentage = developingSeconds / roast.totalRoastTime;

  const dropTemp = roast.ibtsTemperature[roast.ibtsTemperature.length - 1];

  return (
    <div className="h-[6in] w-[4in] overflow-hidden flex flex-col gap-2 p-2 font-black mx-auto">
      <div className="">
        <div className="text-2xl font-black leading-none tracking-tight text-center">
          {bean.specifications?.['country']} ({bean.sku})
        </div>

        <div className="mt-1 text-[9px] font-bold uppercase tracking-widest flex flex-row justify-between items-center">
          <div>{bean.specifications?.['local region']}</div>
          <div>{bean.specifications?.['process']}</div>
          <div>{bean.specifications?.['altitude']}</div>
        </div>
      </div>

      <div className="border-y p-2 text-center text-xl font-black leading-none">
        WHOLE BEANS
        <br />
        {formatRoastLevel(dropTemp)} Roast
        <br />
        {moment(roast.dateTime).format('MMM D')}
      </div>

      <BeanChart beans={[bean]} fontSize={10} />
      <LineChart roast={roast} temperature="ibtsTemperature" derivative="ibtsDerivative" />

      {/* <div className="w-full">
        <LineChart roast={roast} temperature="ibtsTemperature" derivative="ibtsDerivative" />
      </div>
      <div className="w-full">
        <LineChart roast={roast} temperature="beanTemperature" derivative="beanDerivative" />
      </div> */}

      <div className="grid grid-cols-4 divide-x text-[7px] text-center font-black">
        <div className="">{roast.weightGreen}g in</div>
        <div className="">{roast.weightRoasted}g out</div>
        <div className="">{(yieldPercentage * 100).toFixed()}% yield</div>
        <div className="">{((1 - yieldPercentage) * 100).toFixed()}% loss</div>
      </div>

      <div className="grid grid-cols-3 items-stretch text-[7px] text-center font-bold uppercase">
        <div className="relative">
          <div className="">Dry [30-40%]</div>
          <div className="">
            {formatSeconds(dryingSeconds)} ({(100 * dryingPercentage).toFixed()}%)
          </div>
        </div>

        <div className="border-x">
          <div className="">Roast [35-45%]</div>
          <div className="">
            {formatSeconds(roastingSeconds)} ({(100 * roastingPercentage).toFixed()}%)
          </div>
        </div>

        <div className="relative">
          <div className="">Develop [15-25%]</div>
          <div className="">
            {formatSeconds(developingSeconds)} ({(100 * developingPercentage).toFixed()}%)
          </div>
        </div>
      </div>
    </div>
  );
}
