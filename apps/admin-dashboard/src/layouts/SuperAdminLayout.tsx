import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import {
  Menu,
  X,
  Home,
  Building2,
  Users,
  FileCheck,
  Receipt,
  Settings,
  BarChart4,
  Layout,
  LogOut,
  GraduationCap,
  LineChart,
  Grid3X3,
} from "lucide-react";

// Define the navigation items for super admin
const navItems = [
  {
    label: "Dashboard",
    path: "/super-admin/dashboard",
    icon: <Home size={20} />,
  },
  {
    label: "Churches",
    path: "/churches",
    icon: <Building2 size={20} />,
  },
  {
    label: "Members",
    path: "/members",
    icon: <Users size={20} />,
  },
  {
    label: "Vows",
    path: "/vows",
    icon: <FileCheck size={20} />,
  },
  {
    label: "Trainings",
    path: "/trainings",
    icon: <GraduationCap size={20} />,
    disabled: true,
  },
  {
    label: "Financial Reports",
    path: "/financial-reports",
    icon: <LineChart size={20} />,
    disabled: true,
  },
  {
    label: "Remittance",
    path: "/remittance",
    icon: <Receipt size={20} />,
  },
  {
    label: "Attendance Insights",
    path: "/attendance",
    icon: <BarChart4 size={20} />,
    disabled: true,
  },
  {
    label: "Unit Management",
    path: "/units",
    icon: <Grid3X3 size={20} />,
    disabled: true,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <Settings size={20} />,
  },
];

export default function SuperAdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar when route changes (for mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const logout = () => {
    console.log("Logout clicked");
    // Implement your logout logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 flex-shrink-0 bg-primary-800 text-white transition-transform duration-300 lg:relative lg:z-auto lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-primary-700 px-4">
          <Link to="/super-admin/dashboard" className="flex items-center space-x-2">
            <Layout className="h-6 w-6" />
            <span className="text-lg font-bold">Super Admin</span>
          </Link>
          <button
            className="p-1 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.disabled ? "#" : item.path}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                    isActive(item.path)
                      ? "bg-primary-700 text-white font-medium"
                      : "text-primary-100 hover:bg-primary-700",
                    item.disabled && "opacity-50 pointer-events-none"
                  )}
                  onClick={(e) => {
                    if (item.disabled) {
                      e.preventDefault();
                    }
                  }}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="mt-auto border-t border-primary-700 p-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
              <span>👤</span>
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">Super Admin</p>
              <p className="text-xs text-primary-300">admin@example.com</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="mt-4 w-full flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300 ease-in-out",
          "lg:ml-64"
        )}
      >
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center px-4">
          <button
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="ml-4 lg:ml-0">
            <h1 className="text-lg font-semibold text-gray-800">
              {navItems.find((item) => isActive(item.path))?.label || "Dashboard"}
            </h1>
          </div>

          <div className="ml-auto flex items-center space-x-2">
            <div className="relative">
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
              <button className="p-2 rounded-full hover:bg-gray-100">
                <span className="text-lg">🔔</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 