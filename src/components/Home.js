import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { firestore, doc, getDoc } from "../api/FirebaseFirestone";
import { auth } from "../api/Firebase";

const Home = () => {
  const [verifiedItemsCount, setverifiedItemsCount] = useState(0);
  const [deniedItemsCount, setdeniedItemsCount] = useState(0);
  const [regNo, setRegNo] = useState(null);

  const getverifiedItemsCount = (verifiedList, setCount, userRegNo) => {
    const db = getDatabase();
    const collectionRef = ref(db, verifiedList);

    onValue(
      collectionRef,
      (snapshot) => {
        if (snapshot.exists()) {
          // Initialize an object to store counts for each logged in user entry
          const counts = {};
          var index = 0;

          // Loop through each entry in the snapshot
          Object.entries(snapshot.val()).forEach(([key, item]) => {
            // Initialize count for this entry if not already done

            for (const innerkey in item) {
              if (item.hasOwnProperty(innerkey)) {
                const value = item[innerkey];
                // Check if the payer's registration number matches with database
                if (value.regNo === userRegNo) {
                  // Increment the count for each entry
                  index++;
                }
              }
            }

            counts[key]++;

            // console.log(key);
          });

          // Console log to see if the user exists    this will have to be changed to a pop up message or something that shows
          if (index > 0) {
            console.log("User found. Count:", index);
          } else {
            console.log("User not found");
          }

          setverifiedItemsCount(index);
        } else {
          console.log("No data found for the collection");
          // Handle the case where no data is found
        }
      },
      (error) => {
        console.error("Error fetching collection data:", error);
        // Handle the error appropriately
      }
    );
  };

  const getdeniedItemsCount = (deniedList, setCount, userRegNo) => {
    const db = getDatabase();
    const collectionRef = ref(db, deniedList);

    onValue(
      collectionRef,
      (snapshot) => {
        if (snapshot.exists()) {
          // Initialize an object to store counts for each logged in user entry
          const counts = {};

          // Loop through each entry in the snapshot
          Object.entries(snapshot.val()).forEach(([key, item]) => {
            // Initialize count for this entry if not already done
            for (const innerkey in item) {
              if (item.hasOwnProperty(innerkey)) {
                const value = item[innerkey];

                // Check if the payer's registration number matches with database
                if (value.regNo === userRegNo) {
                  // Increment the count for each entry
                  var len = Object.keys(item).length;
                  setdeniedItemsCount(len);
                }
              }
            }

            counts[key]++;

            // console.log(key);
          });
        } else {
          console.log("No data found for the collection");
          // Handle the case where no data is found
        }
      },
      (error) => {
        console.error("Error fetching collection data:", error);
        // Handle the error appropriately
      }
    );
  };

  useEffect(() => {
    getverifiedItemsCount("verifiedList", setverifiedItemsCount, regNo);
  }, [regNo]);

  useEffect(() => {
    getdeniedItemsCount("deniedList", setdeniedItemsCount, regNo);
  }, [regNo]);

  // Get user information upon sign in such as firstname last name etc
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const userRef = doc(firestore, "users", userId);

        try {
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            const regNo = userData.regNo;
            setRegNo(regNo);
          } else {
            console.error("User data not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      } else {
        console.log("User is signed out");
      }
    });

    return () => unsubscribe();
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
