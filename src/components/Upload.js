import React, { useState, useEffect } from "react";
import { ref, push, serverTimestamp, get } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { database } from "../api/Firebase";
import { auth } from "../api/Firebase";
import { firestore, doc, getDoc } from "../api/FirebaseFirestone";
import { onAuthStateChanged } from "firebase/auth";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [regNo, setRegNo] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const fetchDatabaseData = async () => {
    const collectionRef = ref(database, "bankDetails");
    const snapshot = await get(collectionRef);

    if (snapshot.exists()) {
      const databaseData = snapshot.val();
      return databaseData;
    } else {
      console.log("No data found in the collection.");
      return null;
    }
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();

    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;
    const regNo = document.getElementById("regNo").value;
    const payer = document.getElementById("payer").value;
    const bankslipImage = document.getElementById("dropzone-file").value;

    // Replace serverTimestamp() with Date.now()
    const timestamp = Date.now();

    const databaseData = await fetchDatabaseData();

    if (databaseData) {
      const matchingRecord = Object.values(databaseData).find(
        (record) =>
          record.amount === amount &&
          record.date === date &&
          record.regNo === regNo &&
          record.payer === payer
      );

      if (matchingRecord) {
        // If the record matches what is from the bank, add the details to the verified list in the database on successfull verification
        const verifiedListPayerRef = ref(database, `verifiedList/${payer}`);
        push(verifiedListPayerRef, {
          amount,
          date,
          regNo,
          bankslipImage,
          timestamp,
        });

        // If the record matches what is from the bank, generate a notification on successfull verification
        const notificationsRef = ref(database, `notifications/${payer}`);
        push(notificationsRef, {
          message: `Payment details of amount ${amount} paid on ${date} verified successfully. Thank you for your payment.`,
          timestamp,
        });

        // Provide an alert to the user upon verification
        toast.success("Verification Successful!", {
          position: toast.POSITION.TOP_CENTER,
          // autoClose: 50,
          // Styling the pop-up message
          style: {
            backgroundColor: "#02B056",
            color: "#fff",
            textAlign: "center",
          },
          icon: false,
          // Remove the progress bar
          hideProgressBar: true,
        });
      } else {
        // If the record matches what is from the bank, add the details to the verified list in the database on successfull verification
        const deniedListPayerRef = ref(database, `deniedList/${payer}`);
        push(deniedListPayerRef, {
          amount,
          date,
          regNo,
          bankslipImage,
          timestamp,
        });

        // If the record matches what is from the bank, generate a notification on successfull verification
        const notificationsRef = ref(database, `notifications/${payer}`);
        push(notificationsRef, {
          message: `Payment details of amount ${amount} paid on ${date} denied. Please check the information and try again.`,
          timestamp,
        });

        // Provide an alert to the user upon verification
        toast.error("Verification Unsuccessful!", {
          position: toast.POSITION.TOP_CENTER,
          // autoClose: 50,
          // Styling the pop-up message
          style: {
            backgroundColor: "#b00202",
            color: "#fff",
            textAlign: "center",
          },
          icon: false,
          // Remove the progress bar
          hideProgressBar: true,
        });
      }
    }

    handleClearForm();
  };

  const handleClearForm = () => {
    document.getElementById("uploadForm").reset();
    setSelectedFile();
  };

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
            const regNo = userData.regNo;
            setFirstName(firstName);
            setLastName(lastName);
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

  return (
    <div id="upload" className="px-10 py-12 md:py-5 w-full">
      <h1 className="font-bold text-2xl">Upload Form</h1>
      <p className="italic text-sm pt-2">
        (Ensure to enter the correct information)
      </p>
      <div className="py-10">
        <form
          action=""
          className="flex flex-col"
          id="uploadForm"
          onSubmit={handleFormSubmission}
        >
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

          <label htmlFor="regNo" className="pb-2">
            Registration Number
          </label>
          <input
            type="text"
            name="regNo"
            id="regNo"
            className="border p-2 px-2 mb-5 rounded-md"
            value={regNo}
            required
            readOnly
          />

          <label htmlFor="payer" className="pb-2">
            Paid In By
          </label>
          <input
            type="text"
            name="payer"
            id="payer"
            className="border p-2 px-2 mb-5 rounded-md"
            value={lastName + " " + firstName}
            required
            readOnly
          />

          <div className="flex items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#02B056]/[0.1] hover:bg-[#02B056]/[0.3]"
            >
              {selectedFile ? (
                <div>
                  <p className="mb-2 text-md text-gray-500 dark:text-gray-400">
                    <span className="font-bold">Filename: </span>
                    {selectedFile.name}
                  </p>
                  <p className="mb-2 text-md text-gray-500 dark:text-gray-400">
                    <span className="font-bold">Filetype: </span>
                    {selectedFile.type}
                  </p>
                  <p className="mb-2 text-md text-gray-500 dark:text-gray-400">
                    <span className="font-bold">Size in bytes: </span>
                    {(selectedFile.size / 1024).toFixed(2) + " KB"}
                  </p>
                </div>
              ) : (
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Image or PDF
                  </p>
                </div>
              )}

              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                required
                onChange={changeHandler}
                accept=".pdf, image/*"
              />
            </label>
          </div>

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
