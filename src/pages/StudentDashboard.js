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
      { path: "/stdentdashboard/home", element: <Home /> },
      { path: "/stdentdashboard/upload", element: <Upload /> },
      { path: "/stdentdashboard/history", element: <History /> },
      { path: "/stdentdashboard/notifications", element: <Notifications /> },
      { path: "/stdentdashboard/settings", element: <Settings /> },
      { path: "/stdentdashboard/login", element: <LoginForm /> },
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
