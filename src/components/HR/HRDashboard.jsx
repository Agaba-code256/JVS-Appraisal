import React from "react";
import { Outlet } from "react-router-dom";
import HNavbar from "./HrNavbar";

const Dashboard2 = () => {
  return (
    <div className="bg-white">
      <HNavbar />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard2;
