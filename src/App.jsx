import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard2 from "./components/HR/HRDashboard";
import Layout from "./components/admin/layout";
import Login from "./components/auth/login";
import Dashboard from "./components/supervisor/dashboard";
import Edashboard from "./components/employee/employeeDashboard";
import AppraisalList from "./components/HR/appraisalList";
import AppraisalDisplay from "./components/HR/supervisorAppraisal";
import AppraisalPage from "./components/HR/appraisePage";
import UploadPdf from "./components/employee/pdfUpload";
import Pdf from "./components/employee/pdfComponent";
import Technical from "./components/employee/technical";
import { AuthProvider } from "./contexts/authContext";

function App() {
  return (
    // <div>
    //   <Technical />
    // </div>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Layout />} />
        <Route path="/employee/*" element={<Edashboard />} />
        <Route path="/supervisor" element={<Dashboard />} />
        <Route path="/HR" element={<Dashboard2 />} />
        <Route path="/appraisal/:email" element={<AppraisalPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
