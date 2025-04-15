import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth-provider';
import { UserRole } from '@/lib/types';

interface ProtectedRouteProps {
  requiredPermission?: string;
  requiredRole?: UserRole;
}

export function ProtectedRoute({ 
  requiredPermission, 
  requiredRole 
}: ProtectedRouteProps = {}) {
  const { isAuthenticated, isLoading, hasPermission, hasRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show loading state while checking authentication
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check permission if specified
  if (requiredPermission && !hasPermission(requiredPermission)) {
    // Redirect to unauthorized page or dashboard
    return <Navigate to="/unauthorized" replace />;
  }

  // Check role if specified
  if (requiredRole && !hasRole(requiredRole)) {
    // Redirect to unauthorized page or dashboard
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has required permissions/role
  return <Outlet />;
} 