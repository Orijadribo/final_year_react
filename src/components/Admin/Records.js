import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../../api/Firebase";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Records = () => {
  const [keysToDisplay, setKeysToDisplay] = useState([]);
  const [verifiedItemsToDisplay, setVerifiedItemsToDisplay] = useState(false);

  // Fetching data for verified list
  useEffect(() => {
    const fetchAndListenForUpdates = () => {
      const dbRef = ref(database, "verifiedList");

      const unsubscribe = onValue(
        dbRef,
        (snapshot) => {
          const data = snapshot.val();

          if (data) {
            const keys = [];

            Object.entries(data).forEach(([key, item]) => {
              keys.push(key); // Collect keys
            });

            setKeysToDisplay(keys); // Set the keys value to display
            setVerifiedItemsToDisplay(true);
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
  }, []); // Removed regNo from the dependency array as it wasn't used inside the useEffect

  return (
    <div id="home" className="px-10 py-12 md:py-5 w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Records</h1>
      </div>
      {/* verified Items List  */}
      <div className="overflow-y-auto">
        <div className={`${verifiedItemsToDisplay ? "" : "hidden"}`}>
          <div className="flex items-center gap-5">
            <h1 className="text-xl py-5">
              Click to display verification information
            </h1>
          </div>
          {keysToDisplay.length > 0 ? (
            <div>
              <ul className="w-full max-h-[350px] overflow-y-auto rounded-2xl">
                {keysToDisplay.map((key, index) => (
                  <li
                    key={index}
                    className="flex flex-col justify-center pt-2 w-full "
                  >
                    {/* Use Link to navigate to another page */}
                    <Link
                      to={`/admin/records/${key}`}
                      className="pb-2 cursor-pointer"
                    >
                      {key}
                    </Link>
                    <hr className=""></hr>
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
  );
};

export default Records;
