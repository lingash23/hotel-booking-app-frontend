// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import Bookings from "./pages/Bookings";
import AccommodationsPage from "./pages/AccommodationsPage";

import Activate from "./pages/Activate";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="font-poppins">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AccommodationsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/activate/:token" element={<Activate />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/accommodations" element={<AccommodationsPage />} />
            <Route path="/profile/*" element={<ProfilePage />} />
            <Route path="/booking/:id" element={<Bookings />} />
          </Routes>
          <ToastContainer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
