import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";

const Upload = () => {
  const fetchDatabaseData = async () => {
    const db = getDatabase();
    const collectionRef = ref(db, "bankDetails"); // Replace with your actual collection name
    const snapshot = await get(collectionRef);

    if (snapshot.exists()) {
      // Extract data from the snapshot
      const databaseData = snapshot.val();
      return databaseData;
    } else {
      console.log("No data found in the collection.");
      return null;
    }
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();

    // Get form data
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;
    const regNo = document.getElementById("regNo").value;
    const payer = document.getElementById("payer").value;

    // Fetch data from the database
    const databaseData = await fetchDatabaseData();

    // Compare form data with database data
    if (databaseData) {
      const matchingRecord = Object.values(databaseData).find(
        (record) =>
          record.amount === amount &&
          record.date === date &&
          record.regNo === regNo &&
          record.payer === payer
      );

      if (matchingRecord) {
        console.log("Details match an existing record in the database.");
        // setSubmission(true);
        // setUnverified(true);

        //Floating message to the user upon successfull verification
        toast.success("Verification Successfull!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        console.log(
          "Details do not match any existing records in the database."
        );
        // setSubmission(true);
        // setUnverified(false);

        //Floating message to the user upon unsuccessfull verification
        toast.error("Verification Unsuccessfull!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }

    // Reset isVisible to true after each submission
    // setIsVisible(true);

    handleClearForm();
  };

  const handleClearForm = () => {
    // Clear all form fields
    document.getElementById("uploadForm").reset();
  };

  // const [verified, setUnverified] = useState(false);
  // const [submission, setSubmission] = useState(false);

  // const [isVisible, setIsVisible] = useState(true);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setIsVisible(false);
  //   }, 5000);

  //   // Clear the timeout to avoid side effects on component unmount or state changes
  //   return () => clearTimeout(timeoutId);
  // }, [isVisible]);

  return (
    <div id="upload" className={`px-10 py-12 md:py-5 w-full `}>
      {/* Display message upon successfull or unsuccessful verification */}

      {/* <div>
        {isVisible && (
          <div
            className={`sticky z-50 top-[200px] right-0 text-center w-[100%] ${
              submission ? "" : "hidden"
            }`}
          >
            <div
              className={`bg-green-200 rounded-lg p-2 ${
                verified ? "" : "hidden"
              }`}
            >
              Verification successfull
            </div>
            <div
              className={`bg-red-200 rounded-lg p-2 ${
                verified ? "hidden" : ""
              }`}
            >
              Verification unsuccessfull
            </div>
          </div>
        )}
      </div> */}

      <h1 className="font-bold text-2xl">Upload Form</h1>
      <div className="py-10">
        {/* Update the form with action and submit button */}
        <form
          action=""
          className="flex flex-col"
          id="uploadForm"
          onSubmit={handleFormSubmission}
        >
          {/* Amount */}
          <label htmlFor="amount" className="pb-2">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="border p-2 px-2 mb-5 rounded-md"
            required
          />

          {/* Date */}
          <label htmlFor="date" className="pb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="border p-2 px-2 mb-5 rounded-md"
            required
          />

          {/* Registration Number */}
          <label htmlFor="regNo" className="pb-2">
            Registration Number
          </label>
          <input
            type="text"
            name="regNo"
            id="regNo"
            className="border p-2 px-2 mb-5 rounded-md"
            required
          />

          {/* Payer/Payee Information */}
          <label htmlFor="payer" className="pb-2">
            Paid In By
          </label>
          <input
            type="text"
            name="payer"
            id="payer"
            className="border p-2 px-2 mb-5 rounded-md"
            required
          />

          {/* File Input */}
          <div className="flex items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#02B056]/[0.1] hover:bg-[#02B056]/[0.3]"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Image or PDF
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                required
              />
            </label>
          </div>

          {/* Cancel and Clear Buttons */}
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
            {/* Submit Button */}
            <div className="w-full">
              <button
                className="border rounded-lg p-2 md:px-20 bg-[#02B056] w-full"
                type="submit"
              >
                Verify
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Upload;
