import React, { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import StudentSideBar from "../components/StudentSideBar";
import MainContent from "../components/MainContent";
import LoginForm from "./LoginForm";

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
          <Route path="feedback" />
          <Route path="notifications" />
          <Route path="settings" />
        </Route>
        <Route path="login" element={<LoginForm />} />
      </Routes>
    </div>
  );
};

export default StudentDashboard;
