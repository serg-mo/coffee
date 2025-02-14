import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import React from "react";
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

export default function RadarChart({ data, max }) {
  const options = {
    scales: {
      r: {
        min: 0,
        max,
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
          },
        },
        pointLabels: {
          font: {
            size: 12,
          },
        },
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
