import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../api/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { firestore, doc, getDoc } from "../api/FirebaseFirestone";
import { auth } from "../api/Firebase";

const Notifications = () => {
  const [items, setItems] = useState([]);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [available, setAvailable] = useState(false);

  //Fetching data for notifications
  useEffect(() => {
    const fetchAndListenForUpdates = () => {
      try {
        const dbRef = ref(database, "notifications");

        const unsubscribe = onValue(
          dbRef,
          (snapshot) => {
            // Fetch data from the real-time database
            const data = snapshot.val();

            if (data) {
              // Go over each of the entries in the denied list table
              Object.entries(data).forEach(([key, item]) => {
                // Iterate over each entry in the entries under the denied list
                // If entry exists, return a list as an id, item pair else return an empty list

                if (
                  key === firstName + " " + lastName ||
                  key === lastName + " " + firstName
                ) {
                  console.log("Match found:", key);

                  const updatedItems = item
                    ? Object.entries(item).map(([id, item]) => ({
                        id,
                        ...item,
                      }))
                    : [];

                  // Set the state with the updated items
                  setItems(updatedItems);
                  setAvailable(!available);
                }
              });
            }
          },
          (error) => {
            // Handle errors here
            console.error("Error fetching data:", error);
            // Display an error message to the user or perform other error handling steps
          }
        );

        return () => unsubscribe();
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    };

    const unsubscribe = fetchAndListenForUpdates();

    return () => unsubscribe();
  }, [firstName, lastName]);

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
            const firstName = userData.firstName;
            const lastName = userData.lastName;
            setFirstName(firstName);
            setLastName(lastName);
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
    <div id="notifications" className="px-10 py-12 md:py-5 w-full">
      <h1 className="font-bold text-2xl font-body">Notifications</h1>
      {available ? (
        <div>
          <ul className="py-5 w-full">
            {items
              .slice()
              .reverse()
              .map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col items-start justify-center pt-5"
                >
                  <p>{item.message}</p>
                  <p className="italic text-gray-500">{item.timestamp}</p>
                  <hr className="w-full mt-5"></hr>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div className="py-5 w-full">There are no notifications for you</div>
      )}
    </div>
  );
};

export default Notifications;
