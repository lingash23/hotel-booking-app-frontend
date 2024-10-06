import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UserDetails from "./UserDetails";
import Bookings from "./Bookings";

const ProfilePage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar component */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<UserDetails />} />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
