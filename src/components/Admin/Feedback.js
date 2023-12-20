import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../api/Firebase";

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Function to fetch feedback data from the database
    const fetchFeedbackData = async () => {
      const feedbackRef = ref(database, "feedback");

      // Attach an event listener for value changes in the database
      onValue(feedbackRef, (snapshot) => {
        const data = snapshot.val();

        // If data exists, update the state with the feedback data
        if (data) {
          const feedbackArray = Object.values(data);
          setFeedbackData(feedbackArray);
        }
      });
    };

    // Call the function to fetch feedback data
    fetchFeedbackData();
  }, []); // Run this effect only once on component mount

  return (
    <div id="home" className="px-10 py-12 md:py-5 w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Feedback</h1>
      </div>

      <div className="mt-5">
        <h2 className="text-lg font-semibold mb-3">Recent Feedback:</h2>

        {feedbackData.length > 0 ? (
          <ul>
            {feedbackData.map((feedback, index) => (
              <li key={index} className="mb-3">
                <strong>Name:</strong> {feedback.name} | <strong>Email:</strong>{" "}
                {feedback.email} | <strong>Rating:</strong> {feedback.rating} |{" "}
                <strong>Feedback:</strong> {feedback.feedbackText}
              </li>
            ))}
          </ul>
        ) : (
          <p>No feedback available.</p>
        )}
      </div>
    </div>
  );
};

export default Feedback;
