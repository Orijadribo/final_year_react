// StudentDashboard.js
import React, { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import StudentSideBar from "../components/StudentSideBar";
import StudentsOptionsBar from "../components/StudentsOptionsBar";
import MainContent from "../components/MainContent";
import Home from "../components/Home";
import Upload from "../components/Upload";
import History from "../components/History";
import Notifications from "../components/Notifications";
import Settings from "../components/Settings";
import LoginForm from "./LoginForm";
import OptionsBar from "../components/OptionsBar";

const Layout = () => {
  const [selectedSection, setSelectedSection] = useState("home");

  return (
    <div>
      <StudentSideBar setSelectedSection={setSelectedSection} />
      <MainContent
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <Outlet /> {/* This is where child routes will be rendered */}
    </div>
  );
};

const StudentDashboard = () => {
  return (
    <div className="font-titleFont">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="home" />
          <Route path="upload" />
          <Route path="history" />
          <Route path="notifications" />
          <Route path="settings" />
        </Route>
        <Route path="login" element={<LoginForm />} />
      </Routes>
    </div>
  );
};

export default StudentDashboard;
