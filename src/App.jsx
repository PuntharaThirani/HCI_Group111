import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Workspace from "./pages/Workspace"; 


const Login = () => <div style={{ padding: "20px" }}><h2>Member 01: Login Page 🔐</h2></div>;
const AdminDashboard = () => <div style={{ padding: "20px" }}><h2>Member 02: Admin Dashboard 📊</h2></div>;

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <div style={{ background: "#333", padding: "10px", color: "white", display: "flex", gap: "15px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Login (M1)</Link>
        <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>Admin (M2)</Link>
        <Link to="/workspace" style={{ color: "white", textDecoration: "none" }}>Workspace (M3 & M4)</Link>
      </div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/workspace" element={<Workspace />} />
      </Routes>
    </Router>
  );
}

export default App;