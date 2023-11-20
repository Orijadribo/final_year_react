import React from "react";
import { kiu_logo_2 } from "../assets";

const LoginForm = () => {
  return (
    <div className="flex items-center justify-center max-w-screen-2xl m-auto h-screen bg-[#F4F6F9]">
      {/* Login form container */}
      <div className="flex flex-col items-center justify-center rounded-lg w-[600px] bg-[#FFFFFF] p-14 shadow-xl">
        {/* Logo and title section */}
        <div className="flex flex-col items-center justify-center w-1/2">
          <img src={kiu_logo_2} alt="KIU Logo" />
          <h1 className="py-5 font-medium font-titleFont text-center text-xl">
            Bank Slip Verification Login
          </h1>
        </div>

        {/* Login form */}
        <form className="flex flex-col w-full" action="">
          <label className="pb-2" htmlFor="email">
            Email
          </label>
          <input
            className="border rounded-lg p-2 mb-5"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your school email address"
            required
          />

          {/* Email input error message */}
          <div id="emailError" className="error-message"></div>

          <label className="pb-2" htmlFor="password">
            Password
          </label>
          <input
            className="border rounded-lg p-2 mb-5"
            id="password"
            type="password"
          />
        </form>

        {/* Remember me checkbox and forgot password link */}
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

        {/* Login button with custom background color */}
        <button
          className="w-full rounded-lg py-2 bg-[#02B056]"
          type="button"
          id="loginButton"
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
    </div>
  );
};

export default LoginForm;
