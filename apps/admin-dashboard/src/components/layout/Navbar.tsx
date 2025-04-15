import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import Logo from "../ui/Logo";

// You can replace this with your auth context/store implementation
const useLogout = () => {
  return () => {
    // Implement your logout logic here
    console.log("Logout clicked");
  };
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const logout = useLogout();

  // Add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check if a link is active
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  // Create Bootstrap-compatible class names while preserving our theme
  const getLinkClasses = (path: string) => {
    const baseClasses = "nav-link px-3 py-2 text-sm font-medium transition-colors";
    const activeClasses = isActive(path) 
      ? "text-primary font-medium" 
      : "text-gray-600 hover:text-primary";
    
    return `${baseClasses} ${activeClasses}`;
  };
  
  const getMobileLinkClasses = (path: string) => {
    const baseClasses = "nav-link d-block px-3 py-2 rounded-xl text-base font-medium transition-colors";
    const activeClasses = isActive(path)
      ? "bg-primary-50 text-primary"
      : "text-gray-600 hover:bg-primary-50 hover:text-primary";
      
    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <nav 
      className={`navbar navbar-expand-md fixed-top shadow-${
        scrolled ? "soft-md" : "soft-sm"
      } bg-background-paper transition-all duration-300`}
    >
      <div className="container-fluid px-4">
        {/* Logo */}
        <Logo className="navbar-brand" />
        
        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent" 
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navbar Content (Collapsible) */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link
                to="/dashboard"
                className={getLinkClasses("/dashboard")}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/members"
                className={getLinkClasses("/members")}
              >
                Members
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/churches"
                className={getLinkClasses("/churches")}
              >
                Churches
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/events"
                className={getLinkClasses("/events")}
              >
                Events
              </Link>
            </li>

            {/* Logout Button */}
            <li className="nav-item">
              <button
                onClick={logout}
                className={`${getLinkClasses("")} d-flex align-items-center`}
              >
                <LogOut className="h-4 w-4 me-1" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 