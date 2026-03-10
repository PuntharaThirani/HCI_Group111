import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// තාවකාලික පිටු (මේවා පස්සේ Pages ෆෝල්ඩරයෙන් Import කරගන්න පුළුවන්)
const Login = () => <div style={{ padding: "20px" }}><h2>Member 01: Login Page 🔐</h2></div>;
const AdminDashboard = () => <div style={{ padding: "20px" }}><h2>Member 02: Admin Dashboard 📊</h2></div>;
const Workspace = () => (
  <div style={{ padding: "20px" }}>
    <h2>Member 03 & 04: Design Workspace 🛠️</h2>
    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
      <div style={{ flex: 1, border: "2px dashed blue", padding: "100px", textAlign: "center" }}>2D Area (Member 3)</div>
      <div style={{ flex: 1, border: "2px dashed green", padding: "100px", textAlign: "center" }}>3D Area (Member 4)</div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div style={{ background: "#333", padding: "10px", color: "white", display: "flex", gap: "15px" }}>
        <Link to="/" style={{ color: "white" }}>Login (M1)</Link>
        <Link to="/admin" style={{ color: "white" }}>Admin (M2)</Link>
        <Link to="/workspace" style={{ color: "white" }}>Workspace (M3 & M4)</Link>
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