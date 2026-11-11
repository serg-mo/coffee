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
ChartJS.defaults.font.size = 7;

// TODO: I want to color code the different sections of the line based on how quickly it changes
// 15C/min  red
// 10C/min  yellow
// 7C/min   green
// 4C/min   blue

// TODO: have two line charts + power/fan values in between
export default function LineChart({
  roast,
  temperature,
  derivative,
}: {
  roast: RoastShape;
  temperature: 'ibtsTemperature' | 'beanTemperature';
  derivative: 'ibtsDerivative' | 'beanDerivative';
}) {
  const formatTimeIndex = (index: number) =>
    formatSeconds(Math.round(roast.totalRoastTime * (index / (roast[temperature].length - 1))));

  const formatYIndex = (index: number) =>
    `${Math.round(roast[temperature][index])}C at ${Math.round(roast[derivative][index])}C/m`;

  // TODO: add charge at ambient temp/humidity/drum temp vs preheat
  const events = [
    { index: roast.indexYellowingStart, label: 'Yellowing' },
    { index: roast.indexFirstCrackStart, label: 'First Crack' },
    {
      index: roast[temperature].length - 1,
      label: 'Drop',
      // NOTE: custom props for this label only
      position: 'end',
      yAdjust: 10,
      xAdjust: 5,
    },
  ] as const;

  // TODO: I also have roast.actions, keys by timestamp, that tells me when P/F/D changed
  // TODO: label background looks too dark when printed
  const annotations = Object.fromEntries([
    ...events.map(({ index, label, ...props }) => [
      label,
      {
        // TODO: https://www.chartjs.org/chartjs-plugin-annotation/latest/guide/types/box.html
        type: 'line' as const,
        xMin: index,
        xMax: index,
        borderWidth: 1,
        label: {
          display: true,
          // NOTE: array makes this a multi-line label, string is one line
          content: [
            label, //  at ${formatTimeIndex(index)}
            formatYIndex(index),
          ],
          font: {
            size: 8, // highter than default
          },
          position: 'start' as const,
          padding: 4,
          yAdjust: 5, // move down
          ...props,
        },
      },
    ]),
  ]);

  // NOTE: keep global defaults elsewher
  const borderColor = '#374151';

  const datasets = [
    {
      yAxisID: 'temperature',
      // NOTE: required shape for line charts
      data: roast[temperature].map((value, index) => ({
        x: index,
        y: value,
      })),
      borderColor,
      pointRadius: 0,
      borderWidth: 1,
    },
    {
      yAxisID: 'ror',
      // NOTE: required shape for line charts
      data: roast[derivative].map((value, index) => ({
        x: index,
        y: value,
      })),
      borderColor,
      pointRadius: 0,
      borderWidth: 1,
      borderDash: [1, 3],
      tension: 0.5,
    },
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        type: 'linear' as const,
        min: 0,
        ticks: {
          // NOTE: multiple measurements per second, so given an index, we compute/format seconds
          callback: formatTimeIndex,
          stepSize: 30,
        },
      },
      // two y axes
      temperature: {
        type: 'linear' as const,
        position: 'left' as const,
        title: {
          display: true,
          text: `${temperature} (C)`,
        },
        ticks: {
          stepSize: 5,
        },
      },
      ror: {
        type: 'linear' as const,
        position: 'right' as const,
        min: 0, // ignore negatives
        max: 20, // most aggressive RoR that we care about
        title: {
          display: true,
          text: `${derivative} (C/m)`,
        },
        ticks: {
          stepSize: 2,
          major: { enabled: true },
        },
        grid: {
          drawOnChartArea: false, // one grid for both scales
        },
      },
    },
    animation: false,
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
      <Line data={{ datasets }} options={options} />
    </div>
  );
}
