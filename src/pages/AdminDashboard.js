import React, { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AdminSideBar from "../components/Admin/AdminSideBar";
import MainContentAdmin from "../components/Admin/MainContentAdmin";
import LoginForm from "./LoginForm";
import Details from "../components/Admin/Details";

const Layout = () => {
  const [selectedSection, setSelectedSection] = useState("home");

  return (
    <div>
      <AdminSideBar setSelectedSection={setSelectedSection} />
      <MainContentAdmin
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <Outlet /> 
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="font-titleFont">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="home" />
          <Route path="records" />
          <Route path="history" />
          <Route path="feedback" />
          <Route path="settings" />
        </Route>
        <Route path="login" element={<LoginForm />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
