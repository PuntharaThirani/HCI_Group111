import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { C } from './constants/styles';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerProfile from './pages/customer/CustomerProfile';

// ─── Placeholder pages for other members ─────────────────────────────────────
const Login = () => <div style={{ padding: "40px" }}><h2>Member 01: Login Page 🔐</h2></div>;
const AdminDashboard = () => <div style={{ padding: "40px" }}><h2>Member 02: Admin Dashboard 📊</h2></div>;
const Workspace = () => (
  <div style={{ padding: "40px" }}>
    <h2>Member 03 & 04: Design Workspace 🛠️</h2>
    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
      <div style={{ flex: 1, border: "2px dashed blue",  padding: "100px", textAlign: "center" }}>2D Area (Member 3)</div>
      <div style={{ flex: 1, border: "2px dashed green", padding: "100px", textAlign: "center" }}>3D Area (Member 4)</div>
    </div>
  </div>
);

// ─── Top Nav ──────────────────────────────────────────────────────────────────
const TopNav = () => (
  <div style={{
    background: "#1A1A1A", padding: "0 1.25rem", color: "white",
    display: "flex", gap: "1.5rem", alignItems: "center",
    position: "sticky", top: 0, zIndex: 1000, height: "42px",
  }}>
    {[
      { label: "Login (M1)",        path: "/" },
      { label: "Admin (M2)",        path: "/admin" },
      { label: "Customer Dash",     path: "/customer/dashboard" },
      { label: "Workspace (M3&M4)", path: "/workspace" },
    ].map(item => (
      <Link key={item.path} to={item.path} style={{
        color: "#ccc", textDecoration: "none", fontSize: "0.82rem", fontWeight: "500",
      }}>
        {item.label}
      </Link>
    ))}
  </div>
);

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  return (
    <Router>
      <TopNav />
      <Routes>
        <Route path="/"                    element={<Login />} />
        <Route path="/admin"               element={<AdminDashboard />} />
        <Route path="/workspace"           element={<Workspace />} />
        <Route path="/customer/dashboard"  element={<CustomerDashboard />} />
        <Route path="/customer/profile"    element={<CustomerProfile />} />
      </Routes>
    </Router>
  );
}

export default App;

