import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import database from "../api/Firebase";

const Notifications = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAndListenForUpdates = () => {
      const dbRef = ref(database, "notifications");

      const unsubscribe = onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        const updatedItems = data
          ? Object.entries(data).map(([id, item]) => ({ id, ...item }))
          : [];
        setItems(updatedItems);
      });

      return unsubscribe;
    };

    const unsubscribe = fetchAndListenForUpdates();

    return () => unsubscribe();
  }, []);

  return (
    <div id="notifications" className="px-10 py-12 md:py-5 w-full">
      <h1 className="font-bold text-2xl font-body">Notifications</h1>
      <ul className="py-5 w-full">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col items-start justify-center pt-5"
          >
            <p>{item.message}</p>
            <p>{item.time}</p>
            <hr className="w-full mt-5"></hr>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
