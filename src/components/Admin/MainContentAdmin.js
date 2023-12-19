import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import AdminSideBar from "./AdminSideBar";
import OptionsBarAdmin from "./OptionsBarAdmin";
import Feedback from "./Feedback";
import HomeAdmin from "./HomeAdmin";
import SettingsAdmin from "./SettingsAdmin";
import HistoryAdmin from "./HistoryAdmin";
import Records from "./Records";
import Details from "./Details"; // Import Details component

const MainContentAdmin = ({ selectedSection, setSelectedSection }) => {
  const [sideBar, setSideBar] = useState(false);

  const openSideBar = () => {
    setSideBar(!sideBar);
  };

  // Use useParams to get the key from the URL
  const { key } = useParams();

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
        {selectedSection === "records" && <Records />}
        {selectedSection === "history" && <HistoryAdmin />}
        {selectedSection === "feedback" && <Feedback />}
        {selectedSection === "settings" && <SettingsAdmin />}
        {/* Render the Details component when selectedSection is "details" */}
        {selectedSection === "details" && key && <Details key={key} />}
      </div>
    </div>
  );
};

export default MainContentAdmin;
