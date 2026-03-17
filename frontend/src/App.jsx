import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Landing from "./pages/Landing";
import AuthPage from "./pages/AuthPage";
import Workspace from "./pages/Workspace";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>

      <nav className="bg-slate-900 p-4 flex gap-6 text-white text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-800">
        <Link to="/">Home</Link>
        <Link to="/login">Customer Login</Link>
        <Link to="/admin-login">Admin Login</Link>
        <Link to="/workspace">Workspace</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthPage isAdmin={false} />} />
        <Route path="/admin-login" element={<AuthPage isAdmin={true} />} />
        <Route path="/signup" element={<SignUp />} />

        <Route 
          path="/workspace" 
          element={
            <ProtectedRoute>
              <Workspace />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <div>Admin Dashboard</div>
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<div>404 | Page Not Found</div>} />
      </Routes>

    </Router>
  );
}

export default App;