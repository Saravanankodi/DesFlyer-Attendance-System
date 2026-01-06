import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/desflyer.png";
import logoutIcon from "../../assets/logout.png";
import dashboardIcon from "../../assets/dashbord.png";
import calendarIcon from "../../assets/celander.png";
import expand from '../../assets/expand.png'
import avatar from '../../assets/Avatar.png'


export function Sidebar({ onLogout }: { onLogout: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();

  const isAdmin = currentUser?.role === "admin";
  const name = currentUser?.name;

  const employeeItems = [
    { label: "Dashboard", path: "/", icon: dashboardIcon },
    { label: "Attendance", path: "/attendance", icon: calendarIcon },
  ];

  const adminItems = [
    { label: "Admin Dashboard", path: "/admin", icon: dashboardIcon },
    { label: "All Attendance", path: "/admin/all-attendance", icon: calendarIcon },
    { label: "Add Employee", path: "/admin/add-employee", icon: "/src/assets/add_user.png" },
    // Add more admin items here when you implement them
  ];

  const navItems = isAdmin ? adminItems : employeeItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`h-screen max-md:hidden bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col ${
        collapsed ? "w-20 max-md:w-16" : "w-64 max-sm:w-40"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
        {!collapsed && (
          <img src={logo} alt="Desflyer" className="h-10" />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
          aria-label="Toggle sidebar"
        >
          <img src={expand} alt="expand icon" className={`w-6 h-6 ${collapsed?"rotate-180":""}`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`
              group flex items-center gap-4 rounded-lg px-3 py-3 text-sm font-medium transition-all
              ${
                isActive(item.path)
                  ? "bg-[#0496ff] text-white shadow-md"
                  : "text-gray-700 hover:bg-[#0496FF1A] hover:text-[#0496ff]"
              }
            `}
          >
            <img src={item.icon} alt="" className="w-6 h-6" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
        <button
          onClick={onLogout}
          className="
            group flex items-center gap-4 rounded-lg px-3 py-3 text-sm font-medium w-full
            hover:text-white hover:bg-[#0496ff] transition-all
          "
        >
          <img src={logoutIcon} alt="Logout" className="w-6 h-6" />
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-200 flex items-center justify-evenly">
        <img src={avatar} alt="pofile" className="w-10 h-10" />
        {
          !collapsed && <aside className="text">
                          <p className="text text-sm">Welcome back 👋</p>
                          <p className="text text-base">
                            {name}
                          </p>
                        </aside>
        }
      </div>
    </aside>
  );
}
export default Sidebar;