import React, {useState} from "react";
import StudentSideBar from "../components/StudentSideBar";
import StudentsOptionsBar from "../components/StudentsOptionsBar";
import MainContent from "../components/MainContent";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
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
      <ScrollRestoration />
      <StudentsOptionsBar />
      <ScrollRestoration />
      <MainContent selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
      <ScrollRestoration />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/upload", element: <Upload /> },
      { path: "/history", element: <History /> },
      { path: "/notifications", element: <Notifications /> },
      { path: "/settings", element: <Settings /> },
      { path: "/login", element: <LoginForm /> },
    ],
  },
]);

const StudentDashboard = () => {
  return (
    <div className="font-titleFont">
      <RouterProvider router={router} />
    </div>
  );
};

export default StudentDashboard;
