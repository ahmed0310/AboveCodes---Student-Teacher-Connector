import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Landing } from "./src/pages/Landing";
import { SignInRole } from "./src/pages/auth/SignInRole";
import { Login } from "./src/pages/auth/Login";
import { Register } from "./src/pages/auth/Register";
import { StudentDashboard } from "./src/pages/dashboard/StudentDashboard";
import { TeacherDashboard } from "./src/pages/dashboard/TeacherDashboard";
import { AdminDashboard } from "./src/pages/dashboard/AdminDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignInRole />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
