import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import OptionsBarAdmin from "./OptionsBarAdmin";
import Upload from "../Upload";
import Feedback from "./Feedback";
import HomeAdmin from "./HomeAdmin";
import SettingsAdmin from "./SettingsAdmin";

const MainContentAdmin = ({ selectedSection, setSelectedSection }) => {
  const [sideBar, setSideBar] = useState(false);

  const openSideBar = () => {
    setSideBar(!sideBar);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center max-w-screen m-auto pt-10 md:pt-5 bg-[#F4F6F9] md:ml-[30%] lg:ml-[25%]">
        <AdminSideBar
          sideBar={sideBar}
          setSideBar={sideBar}
          setSelectedSection={setSelectedSection}
        />
        <OptionsBarAdmin sideBar={sideBar} openSideBar={openSideBar} />
        {selectedSection === "home" && <HomeAdmin />}
        {selectedSection === "upload" && <Upload />}
        {/* {selectedSection === "history" && <History />} */}
        {selectedSection === "feedback" && <Feedback />}
        {selectedSection === "settings" && <SettingsAdmin />}
      </div>
    </div>
  );
};

export default MainContentAdmin;
