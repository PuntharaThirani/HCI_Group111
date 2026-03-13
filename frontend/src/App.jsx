import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
<<<<<<< HEAD

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
=======
import Workspace from "./pages/Workspace"; // 👈 ඔයා හදපු අලුත් Workspace එක මෙතනින් ගන්නවා

// Login සහ Admin දැනට මෙහෙම තිබුණට ප්‍රශ්නයක් නැහැ
const Login = () => <div style={{ padding: "20px" }}><h2>Member 01: Login Page 🔐</h2></div>;
const AdminDashboard = () => <div style={{ padding: "20px" }}><h2>Member 02: Admin Dashboard 📊</h2></div>;
>>>>>>> Punthara-2D

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <div style={{ background: "#333", padding: "10px", color: "white", display: "flex", gap: "15px" }}>
        <Link to="/" style={{ color: "white" }}>Login (M1)</Link>
        <Link to="/admin" style={{ color: "white" }}>Admin (M2)</Link>
        <Link to="/workspace" style={{ color: "white" }}>Workspace (M3 & M4)</Link>
=======
      {/* Navigation Bar */}
      <div style={{ background: "#333", padding: "10px", color: "white", display: "flex", gap: "15px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Login (M1)</Link>
        <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>Admin (M2)</Link>
        <Link to="/workspace" style={{ color: "white", textDecoration: "none" }}>Workspace (M3 & M4)</Link>
>>>>>>> Punthara-2D
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