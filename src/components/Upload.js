import React, { useState } from "react";
import { getDatabase, get, ref, push, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";

const Upload = () => {
  const [error, setError] = useState("");

  const sendDataToDatabase = async (data, listName) => {
    const db = getDatabase();
    const listRef = ref(db, listName);
  
    try {
      const { payer, recordKey, ...details } = data;
  
      // Fetch existing data from the database
      const existingData = await fetchDatabaseData(listName);
  
      // Create or update the payer's data
      const payerData = {
        ...existingData[payer],
        [recordKey]: {
          amount: details.amount,
          date: details.date,
          payer: details.payer,
          regNo: details.regNo,
        },
      };
  
      // Set the data in the database
      await set(ref(listRef, payer), payerData);
  
      console.log(`Data successfully added to ${listName}. Payer: ${payer}, Record Key: ${recordKey}`);
    } catch (error) {
      console.error(`Error adding data to ${listName}:`, error.message);
    }
  };
  


  const fetchDatabaseData = async (listName) => {
    const db = getDatabase();
    const listRef = ref(db, listName);

    try {
      const snapshot = await get(listRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log(`No data available in ${listName}`);
        return {};
      }
    } catch (error) {
      console.error(`Error fetching data from the database (${listName}):`, error.message);
      return {};
    }
  };


  const handleFormSubmission = async (event) => {
    event.preventDefault();
  
    const amount = Number(document.getElementById("amount").value);
    const date = document.getElementById("date").value;
    const regNo = document.getElementById("regNo").value;
    const payer = document.getElementById("payer").value;
  
    const bankDetails = await fetchDatabaseData("bankDetails");
    const deniedList = await fetchDatabaseData("deniedList");
    const verifiedList = await fetchDatabaseData("verifiedList");
  
    const successMessage = "Verification Successful!";
    const errorMessage = "Verification Unsuccessful!";
  
    if (bankDetails && deniedList && verifiedList) {
      const matchingRecordBank = Object.values(bankDetails).find(
        (record) =>
          record.amount === amount &&
          record.date === date &&
          record.regNo === regNo &&
          record.payer === payer
      );
  
      if (matchingRecordBank) {
        console.log("Details match an existing record in the bank details.");
        const listName = "verifiedList";
        sendDataToDatabase({ amount, date, regNo, payer }, listName);
        toast.success(successMessage, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        console.log("Details do not match any existing records in the bank details.");
        const listName = "deniedList";
        sendDataToDatabase({ amount, date, regNo, payer }, listName);
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  
    handleClearForm();
  };
  
  

  const handleClearForm = () => {
    document.getElementById("uploadForm").reset();
  };

  return (
    <div id="upload" className={`px-10 py-12 md:py-5 w-full `}>
      <h1 className="font-bold text-2xl">Upload Form</h1>
      <div className="py-10">
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
