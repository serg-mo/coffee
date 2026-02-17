import React from "react";
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.defaults.font.family = "Trebuchet MS";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export default function RadarChart({ data, max }: { data: any; max: number }) {
  const options = {
    scales: {
      r: {
        min: 0,
        max,
        ticks: {
          display: false, // Hide labels on scale
        },
        pointLabels: {
          font: {
            size: 14,
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
      tooltip: {},
    },
  };

  return <Radar data={data} options={options} />;
}
