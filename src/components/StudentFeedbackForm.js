import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { database } from "../api/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentFeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    feedbackText: "",
    rating: 5, // Default rating
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Push feedback data to the database
      const feedbackRef = ref(database, "feedback");
      const newFeedbackRef = push(feedbackRef, feedback);

      // Clear the form after submission
      setFeedback({
        name: "",
        email: "",
        feedbackText: "",
        rating: 5,
      });

      // Provide a success toast notification
      toast.success("Feedback submitted successfully!", {
        position: toast.POSITION.TOP_CENTER,
        style: {
          backgroundColor: "#02B056",
          color: "#fff",
          textAlign: "center",
        },
        hideProgressBar: true,
      });

      console.log("Feedback submitted:", feedback);
      console.log("Feedback key:", newFeedbackRef.key);
    } catch (error) {
      // Provide an error toast notification
      toast.error("Error submitting feedback. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
        style: {
          backgroundColor: "#b00202",
          color: "#fff",
          textAlign: "center",
        },
        hideProgressBar: true,
      });

      console.error("Error submitting feedback:", error.message);
    }
  };

  const handleClearForm = () => {
    document.getElementById("feedbackForm").reset();
    setFeedback({
      name: "",
      email: "",
      feedbackText: "",
      rating: 5,
    });
  };

  return (
    <div className="px-10 py-12 md:py-5 w-full">
      <h2 className="font-bold text-2xl">Student Feedback Form</h2>
      <div className="py-10">
        <form
          id="feedbackForm"
          onSubmit={handleSubmit}
          className="flex flex-col"
        >
          <label htmlFor="name" className="pb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="border p-2 px-2 mb-5 rounded-md"
            name="name"
            value={feedback.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email" className="pb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="border p-2 px-2 mb-5 rounded-md"
            name="email"
            value={feedback.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="feedbackText" className="pb-2">
            Feedback:
          </label>
          <textarea
            id="feedbackText"
            name="feedbackText"
            className="border p-2 px-2 mb-5 rounded-md"
            value={feedback.feedbackText}
            onChange={handleChange}
            required
          />
          <label htmlFor="rating" className="pb-2">
            Rating:
          </label>
          <select
            id="rating"
            name="rating"
            className="border p-2 px-2 mb-5 rounded-md"
            value={feedback.rating}
            onChange={handleChange}
          >
            <option value={5}>5 (Excellent)</option>
            <option value={4}>4 (Good)</option>
            <option value={3}>3 (Average)</option>
            <option value={2}>2 (Fair)</option>
            <option value={1}>1 (Poor)</option>
          </select>

          <div className="flex items-center justify-center gap-5 pt-5">
            <div className="w-full">
              <button
                className="border rounded-lg p-2 md:px-20 w-full bg-white"
                type="button"
                onClick={handleClearForm}
              >
                Clear
              </button>
            </div>
            <div className="w-full">
              <button
                className="border rounded-lg p-2 md:px-20 bg-[#02B056] w-full"
                type="submit"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StudentFeedbackForm;
