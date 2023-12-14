import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../api/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { firestore, doc, getDoc } from "../api/FirebaseFirestone";
import { auth } from "../api/Firebase";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaHistory } from "react-icons/fa";

const History = () => {
  const [verifiedItems, setVerifiedItems] = useState([]);
  const [deniedItems, setDeniedItems] = useState([]);
  const [regNo, setRegNo] = useState(null);
  const [verifiedItemsToDisplay, setVerifiedItemsToDisplay] = useState(false);
  const [deniedItemsToDisplay, setDeniedItemsToDisplay] = useState(false);
  const [historyToDisplay, setHistoryToDisplay] = useState(true);

  const sortByDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

  const openVerifiedList = () => {
    if (!verifiedItemsToDisplay) {
      setVerifiedItemsToDisplay(true);
      setDeniedItemsToDisplay(false);
      setHistoryToDisplay(false);
    }
  };

  const openDeniedList = () => {
    if (!deniedItemsToDisplay) {
      setDeniedItemsToDisplay(true);
      setVerifiedItemsToDisplay(false);
      setHistoryToDisplay(false);
    }
  };

  const openHistory = () => {
    if (!historyToDisplay) {
      setHistoryToDisplay(true);
      setVerifiedItemsToDisplay(false);
      setDeniedItemsToDisplay(false);
    }
  };

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

  // Combine and sort both verified and denied items
  const allItems = [...verifiedItems, ...deniedItems];
  console.log(allItems)
  const sortedItems = allItems.sort(sortByDateDesc);

  return (
    <div id="transactions" className="px-10 py-12 md:py-5 w-full">
      <div className="">
        <h2 className="font-bold text-2xl">History</h2>
      </div>
      <div className="py-5 w-full">
        {/* Buttons to show the history of transactions  */}
        <div className="flex p-1 bg-neutral-200 justify-between rounded-l">
          <button
            id="verifiedListBtn"
            className={`w-full p-2 hover:bg-[#565656] rounded-lg ${
              historyToDisplay ? "bg-[#565656]" : ""
            }`}
            onClick={openHistory}
          >
            History of Transactions
          </button>
          <div className="border-2 border-neutral-200 rounded-full m-2"></div>
          <button
            id="verifiedListBtn"
            className={`w-full p-2 hover:bg-[#02B056] rounded-lg ${
              verifiedItemsToDisplay ? "bg-[#02B056]" : ""
            }`}
            onClick={openVerifiedList}
          >
            Verified List
          </button>
          <div className="border-2 border-neutral-200 rounded-full m-2"></div>
          <button
            id="deniedListBtn"
            className={`w-full p-2 hover:bg-[#b00202] rounded-lg ${
              deniedItemsToDisplay ? "bg-[#b00202]" : ""
            }`}
            onClick={openDeniedList}
          >
            Denied List
          </button>
        </div>

        {/* List of past transactions (all of them)  */}
        <div className="overflow-y-auto">
          <div className={`${historyToDisplay ? "" : "hidden"}`}>
            <div className="flex items-center gap-5">
              <h1 className="font-bold text-xl py-5">Your Past Transactions</h1>
              <div className=" text-2xl">
                <FaHistory />
              </div>
            </div>
            {sortedItems.length > 0 ? (
              <div>
                <ul className="w-full max-h-[350px] overflow-y-auto rounded-2xl">
                  {sortedItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col justify-center p-5 w-full bg-white rounded-2xl shadow-lg mb-5"
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
                  ))}
                </ul>
              </div>
            ) : (
              <div>Nothing to show here</div>
            )}
          </div>
        </div>

        {/* verified Items List  */}
        <div className="overflow-y-auto">
          <div className={`${verifiedItemsToDisplay ? "" : "hidden"}`}>
            <div className="flex items-center gap-5">
              <h1 className="font-bold text-xl py-5">Verified Items</h1>
              <div className="text-[#02B056] text-2xl">
                <IoIosCheckmarkCircle />
              </div>
            </div>
            {verifiedItems.length > 0 ? (
              <div>
                <ul className="w-full max-h-[350px] overflow-y-auto rounded-2xl">
                  {verifiedItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col justify-center p-5 w-full bg-white rounded-2xl shadow-lg mb-5"
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
                  ))}
                </ul>
              </div>
            ) : (
              <div>Nothing to show here</div>
            )}
          </div>

          {/* Declined Items List  */}
          <div className={`${deniedItemsToDisplay ? "" : "hidden"}`}>
            <div className="flex items-center gap-5">
              <h1 className="font-bold text-xl py-5">Denied Items</h1>
              <div className="text-[#b00202] text-2xl">
                <IoIosCloseCircle />
              </div>
            </div>
            {deniedItems.length > 0 ? (
              <div>
                <ul className="w-full md:max-h-[550px] overflow-y-auto rounded-2xl">
                  {deniedItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col justify-center p-5 w-full bg-white rounded-2xl shadow-lg mb-5"
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
  );
};

export default History;
