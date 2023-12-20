import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../../api/Firebase";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const HomeAdmin = () => {
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [deniedCount, setDeniedCount] = useState(0);

  // Fetching data for verified and denied counts
  useEffect(() => {
    const fetchAndListenForUpdates = () => {
      const verifiedRef = ref(database, "verifiedList");
      const deniedRef = ref(database, "deniedList");

      const verifiedUnsubscribe = onValue(verifiedRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const count = Object.values(data).reduce(
            (acc, user) =>
              acc +
              Object.values(user).filter((item) => item.amount > 0).length,
            0
          );
          setVerifiedCount(count);
        }
      });

      const deniedUnsubscribe = onValue(deniedRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const count = Object.values(data).reduce(
            (acc, user) =>
              acc +
              Object.values(user).filter((item) => item.amount > 0).length,
            0
          );
          setDeniedCount(count);
        }
      });

      return () => {
        verifiedUnsubscribe();
        deniedUnsubscribe();
      };
    };

    const unsubscribe = fetchAndListenForUpdates();

    return () => unsubscribe();
  }, []);

  const data = {
    labels: ["Verified", "Denied"],
    datasets: [
      {
        data: [verifiedCount, deniedCount],
        backgroundColor: ["green", "blue"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
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
