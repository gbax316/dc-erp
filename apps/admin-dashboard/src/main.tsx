import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './context/auth-provider';
import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import PublicLanding from "./pages";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SuperAdminDashboard from "./pages/super-admin/dashboard";
import AdminDashboard from "./pages/admin/dashboard";
import BranchDashboard from "./pages/branch/dashboard";
import MemberHomePage from "./pages/member/home";
import NotFound from "./pages/NotFound";
import TestRoles from "./pages/test-roles";

// Simple ErrorBoundary component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('React ErrorBoundary caught an error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <FallbackUI error={this.state.error} />;
    }
    
    return this.props.children;
  }
}

interface FallbackUIProps {
  error: Error | null;
}

function FallbackUI({ error }: FallbackUIProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Application Error</h1>
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800 font-mono whitespace-pre-wrap">
              {error?.toString() || 'Unknown error'}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}

// Add debug logging for render
console.log("main.tsx is executing");

// Find root element
const rootElement = document.getElementById('root');

// Render app
if (rootElement) {
  console.log("Root element found, rendering app");
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<PublicLanding />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/branch/dashboard" element={<BranchDashboard />} />
              <Route path="/member/home" element={<MemberHomePage />} />
              <Route path="/test-roles" element={<TestRoles />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
} 