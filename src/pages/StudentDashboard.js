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

const Layout = () => {
  const [selectedSection, setSelectedSection] = useState("home");

  return (
    <div>
      <StudentSideBar setSelectedSection={setSelectedSection} />
      <StudentsOptionsBar />
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
        <Route path="/" element={<Layout />} />
        <Route path="home" element={<Home />} />
        <Route path="upload" element={<Upload />} />
        <Route path="history" element={<History />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
        <Route path="login" element={<LoginForm />} />
      </Routes>
    </div>
  );
};

export default StudentDashboard;
