import React from 'react';
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

ChartJS.defaults.font.family = 'Trebuchet MS';

export default function RadarChart({
  data,
  max,
  fontSize,
}: {
  data: any;
  max: number;
  fontSize: number;
}) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        min: 0,
        max,
        // TODO: whole number increment, I think step is 1 by default
        ticks: {
          display: false, // no labels on scale
        },
        pointLabels: {
          font: {
            size: fontSize,
          },
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
      legend: {
        display: false,
      },
      tooltip: {
        titleFont: {
          size: fontSize,
        },
        bodyFont: {
          size: fontSize,
        },
        footerFont: {
          size: fontSize,
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
}
