// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import LoginForm from "./pages/LoginForm";
import SignUpPage from "./pages/SignUpPage";
import AdminDashboard from "./pages/AdminDashboard";
import Details from "./components/Admin/Details";
import Terms from "./components/Terms";

function App() {
  return (
    <Router>
      <div className="font-bodyFont bg-[#F4F6F9]">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/registration" element={<SignUpPage />} />
          <Route path="/dashboard/*" element={<StudentDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/terms&conditions" element={<Terms />} />
          <Route path="/admin/records/:key" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
