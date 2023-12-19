import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../../api/Firebase";

const Records = () => {
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchAndListenForUpdates = () => {
      const dbRef = ref(database, "verifiedList");

      const unsubscribe = onValue(
        dbRef,
        (snapshot) => {
          const data = snapshot.val();

          if (data) {
            const usersArray = Object.entries(data).map(([user, records]) => ({
              user,
              records: Object.entries(records).map(([recordKey, record]) => ({
                recordKey,
                ...record,
              })),
            }));

            setUsersData(usersArray);
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
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user === selectedUser ? null : user);
  };

  return (
    <div id="home" className="px-10 py-12 md:py-5 w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Records</h1>
      </div>
      <div className="overflow-y-auto">
        <div className="flex items-center gap-5">
          <h1 className="text-xl py-5">
            Click to display verification information
          </h1>
        </div>
        {usersData.length > 0 ? (
          <div>
            {usersData.map((user) => (
              <div key={user.user}>
                <h2
                  className="text-lg font-semibold cursor-pointer"
                  onClick={() => handleUserClick(user.user)}
                >
                  {user.user}
                </h2>
                {selectedUser === user.user && (
                  <ul className="w-full max-h-[350px] overflow-y-auto rounded-2xl">
                    {user.records.map((record) => (
                      <li
                        key={record.recordKey}
                        className="flex flex-col justify-center pt-2 w-full"
                      >
                        {/* Display record details */}
                        <div className="pb-2">
                          Amount: {record.amount}, Date: {record.date}, Payer:{" "}
                          {record.payer}, RegNo: {record.regNo}
                        </div>
                        <hr className="" />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>Nothing to show here</div>
        )}
      </div>
    </div>
  );
};

export default Records;
