import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth-provider';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import Dashboard from '@/pages/Dashboard';
import { ChurchesPage } from '@/pages/ChurchesPage';
import { MembersPage } from '@/pages/MembersPage';
import { MediaPage } from '@/pages/MediaPage';
import { EventsPage } from '@/pages/EventsPage';
import { FinancePage } from '@/pages/FinancePage';
import { AdminSettingsPage } from '@/pages/AdminSettingsPage';
import { UnauthorizedPage } from '@/pages/UnauthorizedPage';
import { EditMemberPage } from '@/pages/EditMemberPage';
import { MemberDetailPage } from '@/pages/MemberDetailPage';
import { AddMemberPage } from '@/pages/AddMemberPage';
import { ChurchMembersPage } from '@/pages/ChurchMembersPage';
import { EditChurchPage } from '@/pages/EditChurchPage';
import { AddChurchPage } from '@/pages/AddChurchPage';
import { ChurchDetailPage } from '@/pages/ChurchDetailPage';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TestPage } from '@/pages/TestPage';
import ServiceReportsPage from '@/pages/ServiceReports';
import NewServiceReportPage from '@/pages/NewServiceReport';
import SuperAdminDashboard from '@/pages/super-admin/dashboard';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
// Import admin and branch dashboards
import AdminDashboard from '@/pages/admin/dashboard';
import BranchDashboard from '@/pages/branch/dashboard';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/test" element={<TestPage />} />

        {/* Super Admin routes */}
        <Route 
          path="/super-admin" 
          element={<SuperAdminLayout />}
        >
          <Route index element={<SuperAdminDashboard />} />
          <Route path="dashboard" element={<SuperAdminDashboard />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Branch Admin routes */}
        <Route path="/branch-admin/dashboard" element={<BranchDashboard />} />

        {/* Temporarily make dashboard layout not require authentication */}
        <Route 
          path="/" 
          element={<DashboardLayout />}
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="churches" element={<ChurchesPage />} />
          <Route path="churches/add" element={<AddChurchPage />} />
          <Route path="churches/:id" element={<ChurchDetailPage />} />
          <Route path="churches/:id/edit" element={<EditChurchPage />} />
          <Route path="churches/:id/members" element={<ChurchMembersPage />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="members/add" element={<AddMemberPage />} />
          <Route path="members/:id" element={<MemberDetailPage />} />
          <Route path="members/:id/edit" element={<EditMemberPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="finance" element={<FinancePage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          {/* Service Reports Routes */}
          <Route path="service-reports" element={<ServiceReportsPage />} />
          <Route path="service-reports/new" element={<NewServiceReportPage />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App; 