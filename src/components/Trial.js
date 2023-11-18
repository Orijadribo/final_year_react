// Trial.js
import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import database from "../api/Firebase"; // Adjust the path to your firebase.js file

const Trial = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAndListenForUpdates = () => {
      const dbRef = ref(database, "deniedList");

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
    <div>
      <h2>Denied List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <p>Amount: {item.amount}</p>
            <p>Date: {item.date}</p>
            <p>Payer: {item.payer}</p>
            <p>Reg No: {item.regNo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trial;
