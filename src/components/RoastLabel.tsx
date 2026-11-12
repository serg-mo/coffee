import React, { useState, useRef, useEffect } from 'react';
import BeanShape, { MAX_FLAVOR, MAX_ATTRIBUTE } from '../types/BeanShape';
import BeanChart from './BeanChart';
import LineChart from './LineChart';
import RoastShape from '../types/RoastShape';
import moment from 'moment';
import { formatSeconds, formatPercent, getBeanData } from '../utils/beans';
import RadarChart from './RadarChart';

// TODO: this is bad, not properly preheated
// "preheatTemperature": 230,
// "beanChargeTemperature": 110.97,
// "drumChargeTemperature": 163.99,

function formatRoastLevel(temp: number): string {
  if (temp < 196) return 'Underdeveloped';
  if (temp < 210) return 'Light'; // city
  if (temp < 218) return 'Medium'; // City+ or Full City
  if (temp < 224) return 'Medium-Dark'; // Full City+
  return 'Dark';
}

function RoastLabelHeader({ roast, bean }: { roast: RoastShape; bean: BeanShape }) {
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
    <div className="text-center flex flex-col gap-1 text-[10px] font-bold m-2">
      <div className="text-[22px] text-center leading-tight">
        {bean.specifications?.['country']}: {bean.specifications?.['local region']}
      </div>

      <div className="text-[16px] text-center leading-tight my-2">
        <div>{formatRoastLevel(dropTemp)} Roast</div>
        <div>{moment(roast.dateTime).format('MMM D')}</div>
      </div>

      <div className="grid grid-cols-3">
        <div className="text-left uppercase">{bean.sku}</div>
        <div className="text-center">{bean.specifications?.['process']}</div>
        <div className="text-right">{bean.specifications?.['altitude']}</div>
      </div>

      <div className="grid grid-cols-3">
        <div className="text-left">
          {roast.weightGreen}g in / {roast.weightRoasted}g out
        </div>
        <div className="text-center">
          {formatPercent(yieldPercentage)} yield / {formatPercent(1 - yieldPercentage)} loss
        </div>
        <div className="text-right">
          {roast.ambient}C at {roast.humidity}% ambient
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="text-left">
          DRY {formatPercent(dryingPercentage)}{' '}
          {dryingPercentage >= 0.3 && dryingPercentage <= 0.4 ? '✓' : '×'}
        </div>

        <div className="text-center">
          ROAST {formatPercent(roastingPercentage)}{' '}
          {roastingPercentage >= 0.35 && roastingPercentage <= 0.45 ? '✓' : '×'}
        </div>

        <div className="text-right">
          DEVELOP {formatPercent(developingPercentage)}{' '}
          {developingPercentage >= 0.15 && developingPercentage <= 0.25 ? '✓' : '×'}
        </div>
      </div>
    </div>
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

  const attributeData = {
    labels: Object.keys(bean['attributes'] || {}),
    datasets: [
      {
        label: bean.sku,
        data: Object.values(bean['attributes']),
        borderWidth: 1,
        borderColor: '#374151',
        pointRadius: 0,
      },
    ],
  };

  const flavorData = {
    labels: Object.keys(bean['flavors'] || {}),
    datasets: [
      {
        label: bean.sku,
        data: Object.values(bean['flavors']),
        borderWidth: 1,
        borderColor: '#374151',
        pointRadius: 0,
      },
    ],
  };

  // TODO: maybe two two slots, top and bottom, where every click swaps between radar + 2 line charts
  return (
    <div className="h-[6in] w-[4in] overflow-hidden flex flex-col gap-2 mx-auto">
      <RoastLabelHeader roast={roast} bean={bean} />

      <div className="w-full flex flex-row justify-between items-center m-auto">
        <div className="w-1/2">
          <RadarChart data={attributeData} max={MAX_ATTRIBUTE} fontSize={10} />
        </div>
        <div className="w-1/2">
          <RadarChart data={flavorData} max={MAX_FLAVOR} fontSize={10} />
        </div>
      </div>

      <div className="cursor-pointer" onClick={() => setIsBts(!isBts)}>
        {isBts ? (
          <LineChart roast={roast} temperature="ibtsTemperature" derivative="ibtsDerivative" />
        ) : (
          <LineChart roast={roast} temperature="beanTemperature" derivative="beanDerivative" />
        )}
      </div>
    </div>
  );
}
