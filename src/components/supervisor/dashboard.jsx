import React from "react";
import { Outlet } from "react-router-dom";
import SNavbar from "./supervisorNavbar";

const Dashboard = () => {
  return (
    <div className="bg-white">
      <SNavbar />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
