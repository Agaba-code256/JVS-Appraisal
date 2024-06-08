import React from "react";
import { Outlet } from "react-router-dom";
import SNavbar from "./supervisorNavbar";
import image2 from "../images/image2.jpg";

const Dashboard = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${image2})` }}
    >
      <SNavbar />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
