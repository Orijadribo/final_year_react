import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { profile_pic } from "../assets";
import { Link } from "react-router-dom";
import { VscFeedback } from "react-icons/vsc";

const OptionsBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!e.target.closest("#signOut")) {
        // setIsOpen(true);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="w-[95%] hidden md:block sticky z-50 top-0 right-0">
      {/* User Information and shortcuts bar */}
      <div className="">
        <div className="flex flex-row items-center justify-between gap-4 bg-white px-4 py-2 rounded-xl shadow-sm w-full">
          {/* Search */}
          <div className="flex items-center justify-center py-1  rounded-md">
            <div className="">
              <CiSearch />
            </div>
            <input
              className="border-none focus:outline-none px-2 "
              type="search"
              name="search"
              id="search"
              placeholder="Search..."
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <div className="px-5">
              <div className="flex flex-row items-center relative justify-center px-1 gap-5">
                <div>
                <VscFeedback />
                </div>
                <div className="cursor-pointer">
                  <FaBell />
                </div>
                <div className="bg-white h-3 w-3 rounded-full absolute flex items-center justify-center top-0 right-0">
                  <div className="bg-[#FF0000] h-2 w-2 rounded-full"></div>
                </div>
              </div>
            </div>
            <h1>Daniel</h1>
            <div className="flex items-center justify-center rounded-full border h-8 w-8">
              <img src={profile_pic} alt="Default Porfile pic" />
            </div>

            {/* SignOut section */}
            <div className="relative">
              <div
                onClick={toggleNavigation}
                aria-expanded={isOpen}
                className="cursor-pointer"
              >
                {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>

              <div
                id="signOut"
                className={`absolute bg-white shadow-sm rounded-md right-0 top-10 ${
                  isOpen ? "" : "hidden"
                }`}
              >
                <div className="flex flex-col items-center justify-center py-2 px-10">
                  <div className="flex flex-col items-center justify-center gap-5 py-2">
                    <div className="flex items-center justify-center rounded-full border h-16 w-16">
                      <img src={profile_pic} alt="Default Porfile pic" />
                    </div>
                    <div>
                      <p>danielorija@studmc.kiu.ac.ug</p>
                    </div>
                    <hr className="w-full" />
                    <div className="flex flex-col items-center justify-center hover:rounded-xl hover:bg-[#F4F6F9] py-1 w-full cursor-pointer">
                      <Link to="/">
                        <p>Sign Out</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsBar;
