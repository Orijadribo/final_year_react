import { kiu_logo_2 } from "../assets";
import React, { useState } from "react";
import {
  firestore,
  auth,
  createUserWithEmailAndPassword,
  collection,
  doc,
  setDoc,
} from "../api/FirebaseFirestone";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regNo, setRegNo] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorRegNo, setErrorRegNo] = useState("");

  const navigate = useNavigate();

  // Function to clear the form
  const handleClearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRegNo("");
    setErrorEmail("");
    setErrorRegNo("");
  };

  const handleSignup = async () => {
    try {
      const emailRegex = /^[a-zA-Z0-9._-]+@studmc.kiu.ac.ug$/;
      const regNoRegex = /^\d{4}-\d{2}-\d{5}$/;

      if (!emailRegex.test(email)) {
        setErrorEmail("Invalid student email format");
        return;
      } else if (!regNoRegex.test(regNo)) {
        setErrorRegNo("Invalid student registration number");
        return;
      } else {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Store additional user information in Firestore
        const userRef = doc(firestore, "users", user.uid);
        await setDoc(userRef, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          regNo: regNo,
        });

        // Drop a notification and navigate to login page upon signup
        toast.success("User created Successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
          // Styling the pop-up message
          style: {
            backgroundColor: "#02B056",
            color: "#fff",
            textAlign: "center",
          },
          icon: false,
          // Remove the progress bar
          hideProgressBar: true,
          onClose: () => {
            // Redirect to Home.js after the toast message is closed
            navigate("/");
          },
        });

        console.log("User signed up");
      }
    } catch (error) {
      console.error("Sign up error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen m-auto  bg-[#F4F6F9]">
      {/* Login form container */}
      <div className="flex flex-col items-center justify-center rounded-lg w-[600px] bg-[#FFFFFF] p-14 shadow-xl">
        {/* Logo and title section */}
        <div className="flex flex-col items-center justify-center w-1/2">
          <img src={kiu_logo_2} alt="KIU Logo" />
          <h1 className="py-5 font-medium font-titleFont text-center text-xl">
            Bank Slip Verification Student SignUp
          </h1>
        </div>

        {/* SignUp form */}
        <form className="flex flex-col w-full" action="" id="registerForm">
          <label className="pb-2" htmlFor="email">
            Student Email
          </label>
          <input
            className={`border rounded-lg p-2 mb-5 ${
              errorEmail ? "border-red-500" : ""
            }`}
            id="email"
            name="email"
            type="email"
            placeholder="Enter your school email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Email input error message */}
          <div id="emailError" className="error-message">
            {errorEmail && (
              <p className="text-red-500 mt-[-20px]">{errorEmail}</p>
            )}
          </div>

          <label className="pb-2" htmlFor="password">
            Password
          </label>
          <input
            className="border rounded-lg p-2 mb-5"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="pb-2" htmlFor="first_name">
            First Name
          </label>
          <input
            className="border rounded-lg p-2 mb-5"
            id="first_name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label className="pb-2" htmlFor="last_name">
            Last Name
          </label>
          <input
            className="border rounded-lg p-2 mb-5"
            id="last_name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className="pb-2" htmlFor="reg_no">
            Registration Number
          </label>
          <input
            className={`border rounded-lg p-2 mb-5 ${
              errorRegNo ? "border-red-500" : ""
            }`}
            id="reg_no"
            type="text"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
          />
          {/* RegNo input error message */}
          <div id="regNoError" className="error-message">
            {errorRegNo && (
              <p className="text-red-500 mt-[-20px]">{errorRegNo}</p>
            )}
          </div>
        </form>

        {/* Terms and conditions */}
        <div className="flex items-center justify-center w-full pb-5">
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              //   value="terms"
            />
            <label className="pl-2 text-sm" htmlFor="terms">
              I have read and agree to <span> </span>
              <span className="text-[#02B056]">
                <a href="/terms&conditions" className=" underline">
                  Terms and Conditions
                </a>
              </span>
            </label>
          </div>
        </div>

        <div className="flex w-full gap-5">
          {/* Login button with custom background color */}
          <button
            className="w-full rounded-lg py-2 bg-white border"
            type="button"
            id="clearButton"
            onClick={handleClearForm}
          >
            Clear Form
          </button>

          {/* Form Clear button with custom background color */}
          <button
            className="w-full rounded-lg py-2 bg-[#02B056]"
            type="button"
            id="loginButton"
            onClick={handleSignup}
          >
            Register Now
          </button>
        </div>

        <div className="text-sm mt-5">
          Already have an account?<span> </span>
          <span className="text-[#02B056] underline">
            <a href="/"> Login</a>
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUpPage;
