import React from "react";
import { profile_pic } from "../assets";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import StudentSideBar from "./StudentSideBar";
import { useState } from "react";

const StudentsOptionsBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex items-center justify-around bg-white w-full p-2 md:hidden fixed top-0 left-0 rounded-2xl m-2">
        {/* Side bar icon  */}

        <div onClick={toggleNavigation}>
          {isOpen ? <IoClose /> : <FaBars />}
        </div>

        {/* Search */}
        <input
          className="border-none focus:outline-none px-2 lg:w-[500px]"
          type="search"
          name="search"
          id="searchSmallScreen"
          placeholder="Search..."
        />

        {/* Profile Picture */}

        <div className="flex flex-col items-start justify-center pr-2">
          <div className="flex items-center justify-center rounded-full border h-10 w-10">
            <img src={profile_pic} alt="Default Porfile pic" />
          </div>
        </div>
      </div>

      {isOpen &&
       <StudentSideBar />
    
       }
    </div>
  );
};

export default StudentsOptionsBar;
