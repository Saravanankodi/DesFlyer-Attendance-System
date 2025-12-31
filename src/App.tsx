// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Pages
import Login from "./pages/auth/Login";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeAttendance from "./pages/employee/EmployeeAttendance";

// Admin pages (placeholders for now)
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllAttendance from "./pages/admin/AllAttendance";
import AddEmployee from "./pages/admin/AddEmployee";
import EmployeeDetails from "./pages/admin/EmployeeDetails";

// Layouts
import Layout from "./components/layout/Layout";

const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element; allowedRoles: string[] }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!currentUser) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(currentUser.role)) return <Navigate to="/unauthorized" replace />;

  return children;
};

const Unauthorized = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Authenticated Layout (Employee + Admin) */}
        <Route
          path="/*"
          element={
            <ProtectedRoute allowedRoles={["employee", "admin"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes inside Layout */}
          <Route index element={<EmployeeDashboard />} />
          <Route path="attendance" element={<EmployeeAttendance />} />

          {/* Admin Routes */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/all-attendance" element={<AllAttendance />} />
          <Route path="admin/add-employee" element={<AddEmployee />} />
          <Route path="admin/employee/:id" element={<EmployeeDetails />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;