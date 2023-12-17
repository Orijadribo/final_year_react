import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { firestore, doc, getDoc } from "../api/FirebaseFirestone";
import { auth } from "../api/Firebase";
import { database } from "../api/Firebase";
import { FaHistory } from "react-icons/fa";

const ListItem = ({ item, isVerified }) => (
  <li
    key={item.id}
    className={`flex flex-col justify-center p-5 w-full bg-white rounded-2xl shadow-lg mb-5 ${
      isVerified ? "bg-[#02B056]/[0.2]" : "bg-[#b00202]/[0.1]"
    }`}
  >
    <div className="flex items-center justify-between py-1">
      <p>Amount: </p>
      <p>{item.amount}</p>
    </div>
    <div className="flex items-center justify-between py-1">
      <p>Date:</p>
      <p>{item.date}</p>
    </div>
  </li>
);

const Home = () => {
  const [verifiedItemsCount, setverifiedItemsCount] = useState(0);
  const [deniedItemsCount, setdeniedItemsCount] = useState(0);
  const [regNo, setRegNo] = useState(null);

  const [verifiedItems, setVerifiedItems] = useState([]);
  const [deniedItems, setDeniedItems] = useState([]);
  const [historyToDisplay, setHistoryToDisplay] = useState(true);

  const sortByDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

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

          // Console log to see if the user exists this will have to be changed to a pop up message or something that shows
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

  // Fetching data for verified list
  useEffect(() => {
    const fetchAndListenForUpdates = () => {
      const dbRef = ref(database, "verifiedList");

      const unsubscribe = onValue(
        dbRef,
        (snapshot) => {
          const data = snapshot.val();

          if (data) {
            Object.entries(data).forEach(([key, item]) => {
              const updatedItems = item
                ? Object.entries(item).map(([id, item]) => ({ id, ...item }))
                : [];

              for (const innerkey in item) {
                if (item.hasOwnProperty(innerkey)) {
                  const value = item[innerkey];
                  if (value.regNo === regNo) {
                    setVerifiedItems(updatedItems);
                  }
                }
              }
            });
          }
        },
        (error) => {
          console.error("Error fetching data:", error);
        }
      );

      return unsubscribe;
    };

    const unsubscribe = fetchAndListenForUpdates();

    return () => unsubscribe();
  }, [regNo]);

  // Fetching data for denied list
  useEffect(() => {
    const fetchAndListenForUpdates = () => {
      const dbRef = ref(database, "deniedList");

      const unsubscribe = onValue(
        dbRef,
        (snapshot) => {
          const data = snapshot.val();

          if (data) {
            Object.entries(data).forEach(([key, item]) => {
              const updatedItems = item
                ? Object.entries(item).map(([id, item]) => ({ id, ...item }))
                : [];

              for (const innerkey in item) {
                if (item.hasOwnProperty(innerkey)) {
                  const value = item[innerkey];
                  if (value.regNo === regNo) {
                    setDeniedItems(updatedItems);
                  }
                }
              }
            });
          }
        },
        (error) => {
          console.error("Error fetching data:", error);
        }
      );

      return unsubscribe;
    };

    const unsubscribe = fetchAndListenForUpdates();

    return () => unsubscribe();
  }, [regNo]);

  // Combine and sort both verified and denied items
  const allItems = [...verifiedItems, ...deniedItems];
  const sortedItems = allItems.sort(sortByDateDesc);

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
          <h1 className="font-extrabold text-xl py-2">
            Last five Transactions
          </h1>
          <p>List of last five transactions with basic transaction details</p>

          {/* List of past transactions (all of them)  */}
          <div className="">
            <div className={`py-5 ${historyToDisplay ? "" : "hidden"}`}>
              {sortedItems.length > 0 ? (
                <div>
                  <ul className="w-full rounded-2xl">
                    {sortedItems.slice(0, 5).map((item) => (
                      <ListItem
                        key={item.id}
                        item={item}
                        isVerified={verifiedItems.includes(item)}
                      />
                    ))}
                  </ul>
                </div>
              ) : (
                <div>Nothing to show here</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
