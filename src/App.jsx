import React from "react";
import Dashboard2 from "./components/HR/HRDashboard";
import Adduser from "./components/admin/addUser";
import Layout from "./components/admin/layout";
import Login from "./components/auth/login";
import ENavbar from "./components/employee/employeeNavbar";
import ImageStore from "./components/employee/imageUpload";
import Technical from "./components/employee/technical";
import Contactcard from "./components/supervisor/contactCard";
import Dashboard from "./components/supervisor/dashboard";
import SupeTable from "./components/supervisor/table";
import TestTable from "./components/supervisor/testTable";
import Register from "./components/employee/register";
import Users from "./components/admin/Users";

function App() {
  return (
    <div>
      <Layout />;
    </div>
  );
}

export default App;
