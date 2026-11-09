import React from 'react';
import { Line } from 'react-chartjs-2';
import RoastShape from '../types/RoastShape';
import annotationPlugin from 'chartjs-plugin-annotation';
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { formatSeconds } from '../utils/beans';

ChartJS.register(Filler, Legend, LineElement, PointElement, LinearScale, Tooltip, annotationPlugin);

ChartJS.defaults.font.family = 'Trebuchet MS';
ChartJS.defaults.font.size = 6;

// TODO: I want to color code the different sections of the line based on how quickly it changes
// 15C/min  red
// 10C/min  yellow
// 7C/min   green
// 4C/min   blue

export default function LineChart({ roast }: { roast: RoastShape }) {
  // beanTemperature, ibtsTemperature, beanDerivative, ibtsDerivative
  const datasets = [
    {
      prop: 'ibtsTemperature',
      label: 'IBTS Temp',
      borderColor: '#374151',
      yAxisID: 'temperature',
    },
    {
      prop: 'ibtsDerivative',
      label: 'IBTS RoR',
      borderColor: '#374151',
      borderDash: [1, 3],
      yAxisID: 'ror',
    },
  ] as const;

  const formatIndex = (index: number) =>
    formatSeconds(Math.round(roast.totalRoastTime * (index / (roast.ibtsTemperature.length - 1))));

  const milestones = [
    { prop: 'indexYellowingStart', label: 'Yellowing' },
    { prop: 'indexFirstCrackStart', label: 'First Crack' },
  ] as const;

  // TODO: I also have roast.actions, keys by timestamp, that tells me when P/F/D changed
  // TODO: manualy label the ROR value at yellowing and first crack
  const annotations = Object.fromEntries(
    milestones.map(({ prop, label, color }) => [
      prop,
      {
        // TODO: https://www.chartjs.org/chartjs-plugin-annotation/latest/guide/types/box.html
        type: 'line' as const,
        xMin: roast[prop],
        xMax: roast[prop],
        borderColor: color,
        borderWidth: 1,
        label: {
          display: true,
          content: `${label} ${Math.round(roast.ibtsTemperature[roast[prop]])} at ${formatIndex(roast[prop])}`,
          position: 'start' as const,
        },
      },
    ]),
  );

  const data = {
    datasets: datasets.map(({ prop, ...config }) => ({
      ...config,
      // NOTE: required shape for line charts
      data: roast[prop].map((value, index) => ({
        x: index,
        y: value,
      })),
      pointRadius: 0,
      borderWidth: 1,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        type: 'linear' as const,
        min: 0,
        ticks: {
          // NOTE: multiple measurements per second, so given an index, we compute/format seconds
          callback: (index: number) =>
            formatSeconds(
              Math.round(roast.totalRoastTime * (index / roast.ibtsTemperature.length)),
            ),
          stepSize: 30,
          major: { enabled: true },
        },
      },
      temperature: {
        type: 'linear' as const,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Temperature',
        },
        ticks: {
          stepSize: 5,
          major: { enabled: true },
        },
      },
      ror: {
        type: 'linear' as const,
        position: 'right' as const,
        max: 20, // most aggressive RoR that we care about
        grid: {
          drawOnChartArea: false, // same grid for both scales
        },
        title: {
          display: true,
          text: 'Derivative',
        },
      },
    },
    animation: false,
    elements: {
      line: {
        tension: 0.2,
      },
    },
    plugins: {
      annotation: {
        annotations,
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full">
      <Line data={data} options={options} />
    </div>
  );
}
