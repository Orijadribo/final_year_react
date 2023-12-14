// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import LoginForm from "./pages/LoginForm";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <Router>
      <div className="font-bodyFont bg-[#F4F6F9]">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/registration" element={<SignUpPage />} />
          <Route path="/dashboard/*" element={<StudentDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
