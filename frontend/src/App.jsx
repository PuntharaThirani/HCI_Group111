import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/admin/DashboardPage';
import ProjectsPage from './pages/admin/ProjectsPage';
import ProjectDetails from './pages/admin/ProjectDetails';
import EditProjectPage from './pages/admin/EditProjectPage';
import ClientsPage from './pages/admin/ClientsPage';
import SettingsPage from './pages/admin/SettingsPage';
import Workspace from './pages/Workspace';
import ProtectedRoute from './components/ProtectedRoute';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerProfile from './pages/customer/CustomerProfile';
import PaymentPage from './pages/payment/PaymentPage';
import PaymentSuccess from './pages/payment/PaymentSuccess';

function App() {
  return (
    <Router>
      <Routes>

        {/* ── Public Routes ── */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthPage isAdmin={false} />} />
        <Route path="/designer-login" element={<AuthPage isAdmin={true} />} />

        {/* ── Admin / Designer Routes (Protected) ── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute requiredRole="admin">
              <ProjectsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <ProjectDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects/:id/edit"
          element={
            <ProtectedRoute requiredRole="admin">
              <EditProjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/clients"
          element={
            <ProtectedRoute requiredRole="admin">
              <ClientsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute requiredRole="admin">
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* ── Customer Routes (Protected) ── */}
        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/profile"
          element={
            <ProtectedRoute>
              <CustomerProfile />
            </ProtectedRoute>
          }
        />

        {/* ── Shared Workspace Route ── */}
        <Route
          path="/workspace"
          element={
            <ProtectedRoute>
              <Workspace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workspace/:id"
          element={
            <ProtectedRoute>
              <Workspace />
            </ProtectedRoute>
          }
        />

        {/* ── Payment Routes ── */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-success"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;