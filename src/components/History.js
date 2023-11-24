import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import database from "../api/Firebase";

const History = () => {
  const [verifiedItems, setverifiedItems] = useState([]);
  const [deniedItems, setdeniedItems] = useState([]);
  const [verifiedList, setverifiedList] = useState(false);
  const [deniedList, setdeniedList] = useState(false);

  const openVerifiedList = () => {
    setverifiedList(!verifiedList);
    setdeniedList(false);
  };

  const openDeniedList = () => {
    setdeniedList(!deniedList);
    setverifiedList(false);
  };

  useEffect(() => {
    const fetchAndListenForUpdates = () => {
      const dbRef = ref(database, "verifiedList");

      const unsubscribe = onValue(dbRef, (snapshot) => {
        // Fetch data from the real time database
        const data = snapshot.val();

        // Go over each of the entries in the denied list table
        Object.entries(data).forEach(([key, item]) => {
          // Iterate over each entry in the entries under denied list
          // If entry exists, return a list as an id, item pair else return an empty list
          const updatedItems = item
            ? Object.entries(item).map(([id, item]) => ({ id, ...item }))
            : [];
          // Then we move into the individual items inside the list
          for (const innerkey in item) {
            if (item.hasOwnProperty(innerkey)) {
              const value = item[innerkey];
              // Check if the payer is "Ocan David"
              if (value.payer === "Ocan David") {
                setverifiedItems(updatedItems);
              }
            }
          }
        });
      });

      return unsubscribe;
    };

    const unsubscribe = fetchAndListenForUpdates();

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const fetchAndListenForUpdates = () => {
      const dbRef = ref(database, "deniedList");

      const unsubscribe = onValue(dbRef, (snapshot) => {
        // Fetch data from the real time database
        const data = snapshot.val();

        // Go over each of the entries in the denied list table
        Object.entries(data).forEach(([key, item]) => {
          // Iterate over each entry in the entries under denied list
          // If entry exists, return a list as an id item pair else return an empty list
          const updatedItems = item
            ? Object.entries(item).map(([id, item]) => ({ id, ...item }))
            : [];

          // Then we move into the individual items inside the list
          for (const innerkey in item) {
            if (item.hasOwnProperty(innerkey)) {
              const value = item[innerkey];
              // Check if the payer is "Ocan David"
              if (value.payer === "Ocan David") {
                setdeniedItems(updatedItems);
              }
            }
          }
        });
      });

      return unsubscribe;
    };

    const unsubscribe = fetchAndListenForUpdates();

    return () => unsubscribe();
  }, []);

  return (
    <div id="transactions" className="px-10 py-12 md:py-5 w-full">
      <div className="">
        <h2 className="font-bold text-2xl">History</h2>
      </div>
      <div className="py-5 w-full">
        {/* Buttons to show the history of transactions  */}
        <div className="py-2 flex gap-4 justify-between">
          <button
            id="verifiedListBtn"
            className="border w-full p-2 hover:bg-[#02B056] rounded-lg"
            // onClick={openVerifiedList}
          >
            Last 5 Transactions
          </button>
          <button
            id="verifiedListBtn"
            className="border w-full p-2 hover:bg-[#02B056] rounded-lg"
            onClick={openVerifiedList}
          >
            Verified List
          </button>
          <button
            id="deniedListBtn"
            className="border w-full p-2 hover:bg-red-500 rounded-lg"
            onClick={openDeniedList}
          >
            Denied List
          </button>
        </div>

        <div className="overflow-y-auto">
          <div className={`${verifiedList ? "" : "hidden"}`}>
            <h1 className="font-bold text-xl pt-10">Verified Items</h1>

            <ul className="py-5 w-full">
              {verifiedItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col justify-center p-5 w-full bg-white rounded-2xl shadow-lg mt-5"
                >
                  <div className="font-bold text-lg">{item.payer}</div>
                  <div className="flex items-center justify-between py-1">
                    <p>Amount: </p>
                    <p>{item.amount}</p>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <p>Date:</p>
                    <p>{item.date}</p>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <p>Registration No: </p>
                    <p>{item.regNo}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${deniedList ? "" : "hidden"}`}>
            <h1 className="font-bold text-xl py-10">Denied Items</h1>

            <ul className="w-full max-h-[600px] overflow-hidden overflow-y-auto rounded-2xl">
              {deniedItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col justify-center p-5 w-full bg-white rounded-2xl shadow-lg mb-5"
                >
                  <div className="font-bold text-lg">{item.payer}</div>
                  <div className="flex items-center justify-between py-1">
                    <p>Amount: </p>
                    <p>{item.amount}</p>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <p>Date:</p>
                    <p>{item.date}</p>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <p>Registration No: </p>
                    <p>{item.regNo}</p>
                  </div>
                  {/* <hr className="w-full mt-5"></hr> */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
