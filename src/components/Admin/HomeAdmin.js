import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const HomeAdmin = () => {
  const data = {
    labels: ["Verified", "Declined"],
    datasets: [
      { 
        data: [3, 6], 
        backgroundColor: ["green", "blue"] 
      },
    ],
  };

const options = {
  // maintainAspectRatio: false, // Disable aspect ratio to allow chart resizing
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom", // Change the legend position
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context) => {
          const label = context.label || "";
          if (label) {
            return `${label}: ${context.formattedValue}`;
          }
          return "";
        },
      },
    },
  },
};
  return (
    <div id="home" className="px-10 py-12 md:py-5 w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Home</h1>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h1 className="p-5 font-bold text-lg">Analytics</h1>
      </div>
      <div className=" flex items-center justify-center w-auto">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default HomeAdmin;
