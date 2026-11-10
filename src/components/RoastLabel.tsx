import React, { useState, useRef, useEffect } from 'react';
import BeanShape from '../types/BeanShape';
import BeanChart from './BeanChart';
import LineChart from './LineChart';
import RoastShape from '../types/RoastShape';
import moment from 'moment';
import { formatSeconds, formatPercent, getBeanData } from '../utils/beans';

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

function RoastLabelHeader({ roast, bean }: { roast: RoastShape; bean: BeanShape }) {
  const dropTemp = roast.ibtsTemperature[roast.ibtsTemperature.length - 1];

  return (
    <>
      <div>
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
    </>
  );
}

function RoastLabelFooter({ roast }: { roast: RoastShape; }) {
  const yieldPercentage = roast.weightRoasted / roast.weightGreen;

  const dryingPercentage = roast.indexYellowingStart / (roast.ibtsTemperature.length - 1);
  const dryingSeconds = Math.round(dryingPercentage * roast.totalRoastTime);

  const roastingPercentage =
    (roast.indexFirstCrackStart - roast.indexYellowingStart) / (roast.ibtsTemperature.length - 1);
  const roastingSeconds = Math.round(roastingPercentage * roast.totalRoastTime);

  const developingSeconds = roast.totalRoastTime - dryingSeconds - roastingSeconds;
  const developingPercentage = developingSeconds / roast.totalRoastTime;

  return (
    <>
      <div className="grid grid-cols-4 divide-x text-[7px] text-center font-black">
        <div>{roast.weightGreen}g in</div>
        <div>{roast.weightRoasted}g out</div>
        <div>{formatPercent(yieldPercentage)} yield</div>
        <div>{formatPercent(1 - yieldPercentage)} loss</div>
      </div>

      <div className="grid grid-cols-3 items-stretch text-[7px] text-center font-bold uppercase">
        <div className="relative">
          <div>Dry [30-40%]</div>
          <div>
            {formatSeconds(dryingSeconds)} ({formatPercent(dryingPercentage)})
          </div>
        </div>

        <div className="border-x">
          <div>Roast [35-45%]</div>
          <div>
            {formatSeconds(roastingSeconds)} ({formatPercent(roastingPercentage)})
          </div>
        </div>

        <div className="relative">
          <div>Develop [15-25%]</div>
          <div>
            {formatSeconds(developingSeconds)} ({formatPercent(developingPercentage)})
          </div>
        </div>
      </div>
    </>
  );
}

// http://localhost:8080/label/lmMqWqKR7hYYnZtQRFEF5
export default function RoastLabel({ roast }: { roast: RoastShape }) {
  const [bean, setBean] = useState<BeanShape | null>(null);
  const [isBts, setIsBts] = useState(true);
  const requested = useRef(false);

  useEffect(() => {
    if (!roast.beanName || requested.current) return;

    requested.current = true;

    getBeanData(roast.beanName).then(setBean).catch(console.error);
  }, [roast]);

  if (!requested.current || !bean) return null;

  // TODO: maybe two two slots, top and bottom, where every click swaps between radar + 2 line charts
  return (
    <div className="h-[6in] w-[4in] overflow-hidden flex flex-col gap-2 p-2 font-black mx-auto">
      <RoastLabelHeader roast={roast} bean={bean} />

      <BeanChart beans={[bean]} fontSize={10} />

      <div className="cursor-pointer" onClick={() => setIsBts(!isBts)}>
        {isBts ? (
          <LineChart roast={roast} temperature="ibtsTemperature" derivative="ibtsDerivative" />
        ) : (
          <LineChart roast={roast} temperature="beanTemperature" derivative="beanDerivative" />
        )}
      </div>

      <RoastLabelFooter roast={roast} />
    </div>
  );
}
