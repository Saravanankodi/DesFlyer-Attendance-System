import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/desflyer.png";
import expand from '../../assets/expand.png'
import avatar from '../../assets/Avatar.png'
import SvgDashboard from "../../assets/icons/Dashboard";
import SvgCalander from "../../assets/icons/Calander";
import SvgLogout from "../../assets/icons/Logout";
import SvgAdd from "../../assets/icons/Add";


export function Sidebar({ onLogout }: { onLogout: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();

  const isAdmin = currentUser?.role === "admin";
  const name = currentUser?.name;

  const employeeItems = [
    { label: "Dashboard", path: "/", icon: <SvgDashboard className="w-6 h-6"/> },
    { label: "Attendance", path: "/attendance", icon: <SvgCalander className="w-6 h-6"/> },
  ];

  const adminItems = [
    { label: "Admin Dashboard", path: "/admin", icon: <SvgDashboard className="w-6 h-6"/> },
    { label: "All Attendance", path: "/admin/all-attendance", icon: <SvgCalander className="w-6 h-6"/> },
    { label: "Add Employee", path: "/admin/add-employee", icon:<SvgAdd className="w-6 h-6"/> },
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
              group sidebar text-sm flex items-center gap-2 px-3 py-3  font-medium transition-all rounded-full
              ${
                isActive(item.path)
                  ? "bg-[#0496ff] text-white shadow-md"
                  : "text-gray-700 hover:bg-[#0496FF1A] hover:text-[#0496ff]"
              }
              ${
                collapsed ? "justify-center gap-0" : "gap-2"
              }
            `}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
        <button
          onClick={onLogout}
          className="
            group flex items-center gap-4 rounded-full px-3 py-3 sidebar text-sm font-medium w-full
            text-gray-700 hover:bg-[#0496FF1A] hover:text-[#0496ff] transition-all
          "
        >
          <SvgLogout className="w-6 h-6" />
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>

      <div className="p-3 border-t border-gray-200 flex items-center justify-evenly">
        <img src={avatar} alt="pofile" className="w-10 h-10" />
        {
          !collapsed && <aside className="text">
                          <p className="sidebar text-xs">Welcome back 👋</p>
                          <p className="sidebar text-xs">
                            {name}
                          </p>
                        </aside>
        }
      </div>
    </aside>
  );
}
export default Sidebar;