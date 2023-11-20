import React from "react";
import StudentSideBar from "./StudentSideBar";
import Home from "./Home";
import Upload from "./Upload";
import History from "./History";
import Notifications from "./Notifications";
import Settings from "./Settings";
import OptionsBar from "./OptionsBar";

const MainContent = ({ selectedSection, setSelectedSection }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center max-w-screen m-auto pt-10 md:pt-5 bg-[#F4F6F9] md:ml-[30%] lg:ml-[25%]">
        <StudentSideBar setSelectedSection={setSelectedSection} />
        <OptionsBar />
        {selectedSection === "home" && <Home />}
        {selectedSection === "upload" && <Upload />}
        {selectedSection === "history" && <History />}
        {selectedSection === "notifications" && <Notifications />}
        {selectedSection === "settings" && <Settings />}
      </div>
    </div>
  );
};

export default MainContent;
