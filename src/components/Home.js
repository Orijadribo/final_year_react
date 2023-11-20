import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

const Home = () => {
  const [verifiedItemsCount, setverifiedItemsCount] = useState(0);
  const [deniedItemsCount, setdeniedItemsCount] = useState(0);

  const getverifiedItemsCount = (verifiedList, setCount) => {
    const db = getDatabase();
    const collectionRef = ref(db, verifiedList);

    onValue(
      collectionRef,
      (snapshot) => {

        // Use Object.keys().length to get the count of items
        const count = snapshot.exists()
          ? Object.keys(snapshot.val()).length
          : 0;

        setCount(count);
      },
      (error) => {
        console.error("Error fetching collection count:", error);
        setCount(-1); // Handle the error appropriately
      }
    );
  };

  const getdeniedItemsCount = (deniedList, setCount) => {
    const db = getDatabase();
    const collectionRef = ref(db, deniedList);

    onValue(
      collectionRef,
      (snapshot) => {

        // Use Object.keys().length to get the count of items
        const count = snapshot.exists()
          ? Object.keys(snapshot.val()).length
          : 0;

        setCount(count);
      },
      (error) => {
        console.error("Error fetching collection count:", error);
        setCount(-1); // Handle the error appropriately
      }
    );
  };

  useEffect(() => {
    getverifiedItemsCount("verifiedList", setverifiedItemsCount);
  }, []);

  useEffect(() => {
    getdeniedItemsCount("deniedList", setdeniedItemsCount);
  }, []);
  
  return (
    <div id="home" className="px-10 py-12 md:py-5 w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Home</h1>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h1 className="p-5 font-bold text-lg">Analytics</h1>

        <div className="flex gap-10 justify-center items-center flex-col lg:flex-row w-full">
          <div className="flex-1 flex items-center justify-around">
            <div className="rounded-lg w-[200px] bg-white shadow-lg">
              <div className="flex items-center justify-center border-b">
                <h1 className="font-extrabold text-9xl p-10 text-green-200">
                  {verifiedItemsCount}
                </h1>
              </div>
              <h1 className="flex justify-center p-2">Verified</h1>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-around">
            <div className="rounded-lg w-[200px] bg-white shadow-lg">
              <div className="flex items-center justify-center border-b">
                <h1 className="font-extrabold text-9xl p-10 text-orange-200">
                  -
                </h1>
              </div>
              <h1 className="flex justify-center p-2">Pending</h1>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-around">
            <div className="rounded-lg w-[200px] bg-white shadow-lg">
              <div className="flex items-center justify-center border-b">
                <h1 className="font-extrabold text-9xl p-10 text-red-200">
                  {deniedItemsCount}
                </h1>
              </div>
              <h1 className="flex justify-center p-2">Declined</h1>
            </div>
          </div>
        </div>
        <hr className="w-full m-10" />
        <div className="w-full">
          <h1 className="font-extrabold py-2">Pending Verification requests</h1>
          <p>
            List of pending verification requests with basic transaction details
          </p>
          <div className="py-5">
            <div className="flex justify-between py-5">
              <div className="flex flex-col items-center justify-center">
                <h3 className="font-bold">Transaction 1</h3>
                <p>Amount $100</p>
              </div>
              <div className="flex flex-col items-center justify-center pr-5">
                <h3 className="font-bold">Status</h3>
                <div className="p-2">
                  <i
                    className="fa-solid fa-circle-minus fa-2xl"
                    //   style="color: #f1c232"
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
                    className="fa-solid fa-circle-minus fa-2xl"
                    //   style="color: #f1c232"
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
                    className="fa-solid fa-circle-minus fa-2xl"
                    //   style="color: #f1c232"
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
                    className="fa-solid fa-circle-minus fa-2xl"
                    //   style="color: #f1c232"
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
                    //   style="color: #f1c232"
                  ></i>
                </div>
              </div>
            </div>

            <h1 id="change">Transaction List</h1>
            <ul id="transactionsList"></ul>

            {/* <script>// Your JavaScript code goes here</script> */}

            <div className="transactionDetails">
              <table id="detailsTable"></table>
            </div>

            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;