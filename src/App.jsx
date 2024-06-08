import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard2 from "./components/HR/HRDashboard";
import Layout from "./components/admin/layout";
import Login from "./components/auth/login";
import Dashboard from "./components/supervisor/dashboard";
import Edashboard from "./components/employee/employeeDashboard";
import { AuthProvider } from "./contexts/authContext";
import EmployeeDetail from "./components/HR/employeeDetail";
import ProtectedRoutes from "./utils/protectedRoutes";
import EmailForm from "./components/admin/email";

function App() {
  return (
    // <div>
    //   <EmailForm />
    // </div>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin/*" element={<Layout />} />
          <Route path="/employee/*" element={<Edashboard />} />
          <Route path="/supervisor/*" element={<Dashboard />} />
          <Route path="/HR/*" element={<Dashboard2 />} />
          <Route path="/appraisal/:email" element={<EmployeeDetail />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
