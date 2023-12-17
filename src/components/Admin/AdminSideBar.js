import React, { useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { VscFeedback } from "react-icons/vsc";
import { Link, Navigate, useNavigate } from "react-router-dom";

const AdminSideBar = ({ sideBar, setSelectedSection }) => {
  // const [selectedSection, setSelectedSection] = useState("home");
  const navigate = useNavigate();

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    navigate(`/${section}`);
  };

  const openHome = () => handleSectionChange("home");
  const openUpload = () => handleSectionChange("upload");
  const openHistory = () => handleSectionChange("history");
  const openFeedback = () => handleSectionChange("feedback");
  const openSettings = () => handleSectionChange("settings");

  return (
    <div className="font-bodyFont">
      <div
        id="sideBar"
        className={`md:w-[30%] lg:w-[25%] h-full bg-white shadow-2xl top-24 md:top-0 left-0 fixed rounded-tr-3xl md:block ${
          sideBar ? "block" : "hidden"
        }`}
      >
        <div className="flex gap-2 p-8 md:p-8 items-center justify-center">
          <div className="p-1 flex items-center">
            <RiAdminFill className="w-10 h-10 text-[#02b056]" />
          </div>
          <h1 className="font-bold text-[24px] font-body">Admin Dashboard</h1>
        </div>

        {/* Sidebar navigation menu */}

        <div className="flex flex-col items-center">
          <ul className="md:pt-5 lg:pl-10 w-full">
            <Link to="home">
              <li
                onClick={() => handleSectionChange("home")}
                className="py-2 px-5 cursor-pointer hover:bg-slate-200 rounded-l-xl"
              >
                <div className="flex gap-5">
                  <div className="flex items-center justify-center">
                    <FaHome />
                  </div>
                  Home
                </div>
              </li>
            </Link>
            <Link to="upload">
              <li
                onClick={openUpload}
                className="py-2 px-5 cursor-pointer hover:bg-slate-200 rounded-l-xl"
              >
                <div className="flex gap-5">
                  <div className="flex items-center justify-center">
                    <FaUpload />
                  </div>
                  Upload
                </div>
              </li>
            </Link>
            <Link to="history">
              <li
                onClick={openHistory}
                className="py-2 px-5 cursor-pointer hover:bg-slate-200 rounded-l-xl"
              >
                <div className="flex gap-5">
                  <div className="flex items-center justify-center">
                    <FaHistory />
                  </div>
                  History
                </div>
              </li>
            </Link>
            <Link to="feedback">
              <li
                onClick={openFeedback}
                className="py-2 px-5 cursor-pointer hover:bg-slate-200 rounded-l-xl"
              >
                <div className="flex gap-5">
                  <div className="flex items-center justify-center">
                    <VscFeedback />
                  </div>
                  FeedBack
                </div>
              </li>
            </Link>
            <Link to="settings">
              <li
                onClick={openSettings}
                className="py-2 px-5 cursor-pointer hover:bg-slate-200 rounded-l-xl"
              >
                <div className="flex gap-5">
                  <div className="flex items-center justify-center">
                    <IoMdSettings />
                  </div>
                  Settings
                </div>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
