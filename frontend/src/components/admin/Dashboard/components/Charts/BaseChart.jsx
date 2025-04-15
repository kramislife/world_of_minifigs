import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Export chartColors as a named export
export const chartColors = {
  primary: {
    base: "#60A5FA",
    light: "rgba(96, 165, 250, 0.6)",
    lighter: "rgba(96, 165, 250, 0.1)",
  },
  secondary: {
    base: "#8B5CF6",
    light: "rgba(139, 92, 246, 0.6)",
  },
  success: {
    base: "#10B981",
    light: "rgba(16, 185, 129, 0.6)",
  },
  danger: {
    base: "#EF4444",
    light: "rgba(239, 68, 68, 0.6)",
  },
  warning: {
    base: "#F59E0B",
    light: "rgba(245, 158, 11, 0.6)",
  },
  gray: {
    base: "#9CA3AF",
    light: "rgba(156, 163, 175, 0.6)",
  },
};

const BaseChart = ({ type = "bar", data, options }) => {
  const ChartComponent = {
    line: Line,
    bar: Bar,
    doughnut: Doughnut,
  }[type];

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales:
      type !== "doughnut"
        ? {
            y: {
              beginAtZero: true,
              grid: { color: "#446080" },
              ticks: {
                color: "white",
                callback: (value) =>
                  options?.currency
                    ? `$${value.toLocaleString()}`
                    : value.toLocaleString(),
              },
            },
            x: {
              grid: { color: "#446080" },
              ticks: { color: "white" },
            },
          }
        : undefined,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
          font: { size: 11 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (options?.currency) {
              return `$${context.parsed.y?.toLocaleString()}`;
            }
            return `${context.parsed.y?.toLocaleString()}`;
          },
        },
      },
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      ...(options?.plugins || {}),
    },
  };

  return <ChartComponent data={data} options={mergedOptions} />;
};

// Export BaseChart as the default export
export default BaseChart;
