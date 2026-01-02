// src/components/layout/Layout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
// import Banner from "./Banner";
import { useAuth } from "../../context/AuthContext";

const Layout = () => {
  const {logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - only needs onLogout */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Banner - only needs employeeName and role */}
        {/* <Banner
          employeeName={currentUser?.name || "Employee"}
          role={currentUser?.role || "employee"}
        /> */}

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;