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
        const data = snapshot.val();
        const updatedItems = data
          ? Object.entries(data).map(([id, item]) => ({ id, ...item }))
          : [];
        setverifiedItems(updatedItems);
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
        const data = snapshot.val();
        const updatedItems = data
          ? Object.entries(data).map(([id, item]) => ({ id, ...item }))
          : [];
        setdeniedItems(updatedItems);
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
        <div className="flex justify-between py-5">
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-bold">Transaction 1</h3>
            <p>Amount $100</p>
          </div>
          <div className="flex flex-col items-center justify-center pr-5">
            <h3 className="font-bold">Status</h3>
            <div className="p-2">
              <i
                className="fa-solid fa-circle-check fa-2xl"
                // style="color: #028056"
              ></i>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex justify-between py-5">
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-bold">Transaction 2</h3>
            <p>Amount $100</p>
          </div>
          <div className="flex flex-col items-center justify-center pr-5">
            <h3 className="font-bold">Status</h3>
            <div className="p-2">
              <i
                className="fa-solid fa-circle-check fa-2xl"
                // style="color: #028056"
              ></i>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex justify-between py-5">
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-bold">Transaction 3</h3>
            <p>Amount $100</p>
          </div>
          <div className="flex flex-col items-center justify-center pr-5">
            <h3 className="font-bold">Status</h3>
            <div className="p-2">
              <i
                className="fa-solid fa-circle-minus fa-2xl"
                // style="color: #f1c232"
              ></i>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex justify-between py-5">
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-bold">Transaction 3</h3>
            <p>Amount $100</p>
          </div>
          <div className="flex flex-col items-center justify-center pr-5">
            <h3 className="font-bold">Status</h3>
            <div className="p-2">
              <i
                className="fa-solid fa-circle-xmark fa-2xl"
                // style="color: #cc0000"
              ></i>
            </div>
          </div>
        </div>
        <hr />

        <div className="overflow-y-auto">
          <div className={`${verifiedList ? "" : "hidden"}`}>
            <ul className="py-5 w-full">
              {verifiedItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col justify-center pt-5 w-full bg-white rounded-2xl shadow-lg px-5"
                >
                  <div className="font-bold text-lg">{item.id}</div>
                  <div className="flex items-center justify-between py-1">
                    <p>Amount: </p>
                    <p>{item.amount}</p>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <p>Date:</p>
                    <p>{item.date}</p>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <p>Payer: </p>
                    <p>{item.payer}</p>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <p>Registration No: </p>
                    <p>{item.regNo}</p>
                  </div>
                  <hr className="w-full mt-5"></hr>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${deniedList ? "" : "hidden"}`}>
            <ul className="py-5 w-full">
              {deniedItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col justify-center p-5 w-full bg-white rounded-2xl shadow-lg"
                >
                  <div className="font-bold text-lg">{item.id}</div>
                  <div className="flex items-center justify-between py-1">
                    <p>Amount: </p>
                    <p>{item.amount}</p>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <p>Date:</p>
                    <p>{item.date}</p>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <p>Payer: </p>
                    <p>{item.payer}</p>
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

        <div className="py-2 flex gap-4 justify-between">
          <button
            id="verifiedListBtn"
            className="border w-full p-2 bg-[#02B056] rounded-lg"
            onClick={openVerifiedList}
          >
            Verified List
          </button>
          <button
            id="deniedListBtn"
            className="border w-full p-2 bg-red-500 rounded-lg"
            onClick={openDeniedList}
          >
            Denied List
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;
