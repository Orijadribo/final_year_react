import React from "react";
import { kiu_logo_2 } from "../assets";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center max-w-screen-2xl m-auto  bg-[#F4F6F9]">
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
        <form className="flex flex-col w-full" action="">
          <label className="pb-2" htmlFor="email">
            Student Email
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
          <label className="pb-2" htmlFor="first_name">
            First Name
          </label>
          <input
            className="border rounded-lg p-2 mb-5"
            id="first_name"
            type="text"
          />
          <label className="pb-2" htmlFor="last_name">
            Last Name
          </label>
          <input
            className="border rounded-lg p-2 mb-5"
            id="last_name"
            type="text"
          />
          <label className="pb-2" htmlFor="reg_no">
            Registration Number
          </label>
          <input
            className="border rounded-lg p-2 mb-5"
            id="reg_no"
            type="text"
          />
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
                <a href="/login" className=" underline">
                  {" "}
                  Terms and Conditions
                </a>
              </span>
            </label>
          </div>
        </div>

        {/* Login button with custom background color */}
        <button
          className="w-full rounded-lg py-2 bg-[#02B056]"
          type="button"
          id="loginButton"
        >
          Register Now
        </button>
        <div className="text-sm mt-5">
          Already have an account?<span> </span>
          <span className="text-[#02B056] underline">
            <a href="/"> Login</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
