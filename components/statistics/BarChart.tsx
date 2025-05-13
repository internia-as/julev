import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

// Define types for chart data
interface ChartData {
  labels: string[];
  datasets: {
    type: "bar" | "line";
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }[];
}

const MonthlySearchesChart: React.FC = () => {
  // Data for months and corresponding searches
  const labels: string[] = [
    "Januar",
    "Februar",
    "Mars",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const data: ChartData = {
    labels, // Month names
    datasets: [
      {
        type: "bar", // Bar chart for searches
        label: "Månedlige søk",
        data: [
          1200, 1500, 800, 2000, 1800, 2200, 2400, 2600, 2100, 1900, 2300, 2500,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        type: "line", // Line chart overlay
        label: "Månedlig trend",
        data: [
          1200, 1500, 800, 2000, 1800, 2200, 2400, 2600, 2100, 1900, 2300, 2500,
        ],
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Position of the legend
      },
      tooltip: {
        enabled: true, // Enable hover tooltips
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Searches",
        },
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlySearchesChart;
