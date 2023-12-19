import React, { useState } from "react";
import { kiu_logo_2 } from "../assets";
import { useNavigate } from "react-router-dom";
import { auth } from "../api/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Perform login logic based on email and password
  const handleLogin = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@studmc.kiu.ac.ug$/;
    const adminEmailRegex = /^[a-zA-Z0-9._-]+@kiu.ac.ug$/;

    if (!emailRegex.test(email) && !adminEmailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log(userCredential);
        //Floating message to the user upon successfull verification
        toast.success("Login Successful!", {
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
            // Redirect to student dashboard after the toast message is closed
            if (emailRegex.test(email)) {
              navigate("/dashboard");
            } else {
              navigate("/admin");
            }
          },
        });
      })
      .catch((error) => {
        console.log("Invalid email or password.");
        toast.error("Login Unsuccessfull!", {
          position: toast.POSITION.TOP_CENTER,
          icon: false,
          // Remove the progress bar
          hideProgressBar: true,
          // Styling the pop-up message
          style: {
            backgroundColor: "red",
            color: "#fff",
            textAlign: "center",
          },
        });
      });
  };

  return (
    <div className="flex items-center justify-center w-screen m-auto h-screen bg-[#F4F6F9]">
      <div className="flex flex-col items-center justify-center rounded-lg w-[600px] bg-[#FFFFFF] p-14 shadow-xl">
        <div className="flex flex-col items-center justify-center w-1/2">
          <img src={kiu_logo_2} alt="KIU Logo" />
          <h1 className="py-5 font-medium font-titleFont text-center text-xl">
            Bank Slip Verification Login
          </h1>
        </div>

        <form className="flex flex-col w-full" action="">
          <label className="pb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`border rounded-lg p-2 mb-5 ${
              error ? "border-red-500" : ""
            }`}
            id="email"
            name="email"
            type="email"
            placeholder="Enter your school email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div id="emailError" className="error-message">
            {error && <p className="text-red-500 mt-[-20px]">{error}</p>}
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
        </form>

        <div className="flex items-center justify-between w-full pb-5">
          <a className="text-sm underline" href="">
            Forgot your password?
          </a>
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              value="Remember me"
            />
            <label className="pl-2 text-sm" htmlFor="remember">
              Remember me?
            </label>
          </div>
        </div>

        <button
          className="w-full rounded-lg py-2 bg-[#02B056]"
          type="submit"
          id="loginButton"
          onClick={handleLogin}
        >
          Login
        </button>

        <div className="text-sm mt-5">
          Don't have an account?<span> </span>
          <span className="text-[#02B056] underline">
            <a href="/registration"> Register</a>
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
