import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/DashboardPage.jsx";
import ProjectsPage from "./pages/admin/ProjectsPage.jsx"; 
import ProjectDetails from "./pages/admin/ProjectDetails.jsx";
import SettingsPage from "./pages/admin/SettingsPage.jsx";
import ClientsPage from "./pages/admin/ClientsPage.jsx";

// පසුව මේවා අදාළ සාමාජිකයන්ගේ pages වලින් import කරන්න පුළුවන්
const Login = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold">Member 01: Login Page 🔐</h2>
  </div>
);

const Workspace = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-6">Member 03 & 04: Design Workspace 🛠️</h2>
    <div className="flex gap-6">
      <div className="flex-1 border-4 border-dashed border-blue-500 p-12 text-center rounded-xl bg-blue-50">
        <p className="text-lg font-medium text-blue-700">2D Area (Member 3)</p>
      </div>
      <div className="flex-1 border-4 border-dashed border-green-500 p-12 text-center rounded-xl bg-green-50">
        <p className="text-lg font-medium text-green-700">3D Area (Member 4)</p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* සාමාන්‍ය Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/workspace" element={<Workspace />} />

        {/* 🏢 Member 02: Admin & Management Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/projects" element={<ProjectsPage />} />
        <Route path="/admin/projects/:id" element={<ProjectDetails />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="/admin/clients" element={<ClientsPage />} />
      </Routes>
    </Router>
  );
}

export default App;