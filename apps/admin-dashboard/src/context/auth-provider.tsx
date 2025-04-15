import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { loginUser, getCurrentUser, logoutUser as serviceLogout } from "@/services/auth";
import { UserRole } from "@/lib/types";

// Define the User type if not imported
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  churchId?: string;
  profileImageUrl?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

// Define role hierarchy
const RoleHierarchy: Record<string, number> = {
  'super_admin': 100,
  'ADMIN': 80, 
  'branch_admin': 60,
  'STAFF': 40,
  'MEMBER': 20,
};

// Define role definitions with permissions
const RoleDefinitions = [
  {
    id: 'super_admin',
    name: 'Super Admin',
    permissions: ['*'], // Wildcard means all permissions
  },
  {
    id: 'ADMIN',
    name: 'Admin',
    permissions: [
      'users.view', 'users.create', 'users.edit', 'users.delete',
      'churches.view', 'churches.create', 'churches.edit', 'churches.delete',
      'members.view', 'members.create', 'members.edit', 'members.delete',
      'events.view', 'events.create', 'events.edit', 'events.delete',
      'finance.view', 'finance.create', 'finance.edit', 'finance.delete',
      'media.view', 'media.create', 'media.edit', 'media.delete',
    ],
  },
  {
    id: 'branch_admin',
    name: 'Church Admin',
    permissions: [
      'users.view',
      'churches.view',
      'members.view', 'members.create', 'members.edit',
      'events.view', 'events.create', 'events.edit',
      'finance.view', 'finance.create',
      'media.view', 'media.create',
    ],
  },
  {
    id: 'STAFF',
    name: 'Staff',
    permissions: [
      'churches.view',
      'members.view',
      'events.view',
      'finance.view',
      'media.view',
    ],
  },
  {
    id: 'MEMBER',
    name: 'User',
    permissions: [
      'churches.view',
      'events.view',
      'media.view',
    ],
  },
];

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  hasPermission: (permission: string) => boolean;
  hasRole: (requiredRole: UserRole) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for token in local storage on initial load
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem("token");
      
      if (storedToken) {
        try {
          setToken(storedToken);
          
          // Get user data
          const userData = await getCurrentUser();
          setUser(userData as User);
        } catch (error) {
          // Invalid token or user not found
          console.error("Error loading user:", error);
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      }
      
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await loginUser(email, password);
      const { accessToken, user } = response;
      
      localStorage.setItem("token", accessToken);
      setToken(accessToken);
      setUser(user as User);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to login. Please check your credentials.";
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    serviceLogout();
    setToken(null);
    setUser(null);
  };

  // Check if user has a specific permission
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // Find role definition
    const role = RoleDefinitions.find(r => r.id === user.role);
    if (!role) return false;
    
    // Super admin has all permissions
    if (role.permissions.includes('*')) return true;
    
    // Check if user has the specific permission
    return role.permissions.includes(permission);
  };

  // Check if user has a required role or higher
  const hasRole = (requiredRole: UserRole): boolean => {
    if (!user) return false;
    
    // Get hierarchy level for user role and required role
    const userRoleLevel = RoleHierarchy[user.role] || 0;
    const requiredRoleLevel = RoleHierarchy[requiredRole] || 0;
    
    // User has access if their role level is >= the required level
    return userRoleLevel >= requiredRoleLevel;
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    error,
    hasPermission,
    hasRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}; 