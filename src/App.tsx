import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { SignInRole } from './pages/auth/SignInRole';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { StudentDashboard } from './pages/dashboard/StudentDashboard';
import { TeacherDashboard } from './pages/dashboard/TeacherDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { ReportsPage } from './pages/dashboard/Reports';
import { Phase4Features } from './pages/Phase4Features';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignInRole />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/register" element={<Navigate to="/signup" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/phase4" element={<Phase4Features />} />
      </Routes>
    </Router>
  );
}
