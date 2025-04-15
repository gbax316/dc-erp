import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-provider";
import { cn } from "@/lib/utils";
import { UserRole } from "@/lib/types";

// Define the navigation items with required permissions
const navItems = [
  { 
    label: "Dashboard", 
    path: "/dashboard", 
    icon: "📊",
    permission: null // Everyone can see dashboard
  },
  { 
    label: "Churches", 
    path: "/churches", 
    icon: "⛪",
    permission: "churches.view"
  },
  { 
    label: "Members", 
    path: "/members", 
    icon: "👥",
    permission: "members.view"
  },
  { 
    label: "Service Reports", 
    path: "/service-reports", 
    icon: "📋",
    permission: "reports.view"
  },
  { 
    label: "Finance", 
    path: "/finance", 
    icon: "💰",
    permission: "finance.view"
  },
  { 
    label: "Events", 
    path: "/events", 
    icon: "📅",
    permission: "events.view"
  },
  { 
    label: "Media", 
    path: "/media", 
    icon: "📝",
    permission: "media.view"
  },
  { 
    label: "Admin Settings", 
    path: "/admin/settings", 
    icon: "⚙️",
    role: "admin" as UserRole // Only admin or higher can see this
  },
  { 
    label: "UI Components", 
    path: "/ui-components", 
    icon: "🧩",
    role: "admin" as UserRole // Only admin or higher can see this
  }
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, hasPermission, hasRole, logout } = useAuth();
  
  // Add this function to handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Filter navigation items based on user permissions
  const authorizedNavItems = navItems.filter(item => {
    // If permission is required, check if user has it
    if (item.permission) {
      return hasPermission(item.permission);
    }
    
    // If role is required, check if user has it
    if (item.role) {
      return hasRole(item.role);
    }
    
    // If no permission or role is required, show the item
    return true;
  });
  
  return (
    <aside className="w-64 bg-slate-800 text-white h-full flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <h1 className="text-xl font-bold">Church Admin</h1>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {authorizedNavItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-2 text-sm rounded-md",
                  location.pathname.startsWith(item.path)
                    ? "bg-slate-700 text-white font-medium"
                    : "text-slate-300 hover:bg-slate-700"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-slate-600 flex items-center justify-center">
            {user?.profileImageUrl ? (
              <img 
                src={user.profileImageUrl} 
                alt={`${user.firstName} ${user.lastName}`}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <span>👤</span>
            )}
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium">
              {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
            </p>
            <p className="text-xs text-slate-400">
              {user?.role ? user.role.replace('_', ' ').charAt(0).toUpperCase() + user.role.slice(1) : 'Not logged in'}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
        >
          <span className="mr-2">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
} 