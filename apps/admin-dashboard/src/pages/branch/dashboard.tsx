import React, { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import BranchStats from "../../components/dashboard/cards/BranchStats";
import BranchReportSubmission from "../../components/dashboard/cards/BranchReportSubmission";
import BranchHistory from "../../components/dashboard/cards/BranchHistory";

const BranchDashboard: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  try {
    return (
      <MainLayout>
        <div className="mb-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
            <h1 className="fs-2 fw-bold text-primary mb-3 mb-md-0">My Church Dashboard</h1>
            <div className="d-flex align-items-center gap-2">
              <select className="form-select form-select-sm rounded-lg border border-gray-300 py-1.5 px-3">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last quarter</option>
                <option>This year</option>
              </select>
              <button className="btn btn-primary btn-sm">Refresh</button>
            </div>
          </div>
          
          {/* Stats Component */}
          {hasError ? (
            <div className="alert alert-danger">
              <h4>Error rendering dashboard</h4>
              <p>{errorMessage || "There was a problem displaying the dashboard. Please refresh the page or contact support."}</p>
            </div>
          ) : (
            <React.Suspense fallback={<div>Loading stats...</div>}>
              <BranchStats className="mb-4" />
            </React.Suspense>
          )}
          
          {/* Report Submission Component */}
          <BranchReportSubmission className="mb-4" />
          
          {/* Service History Component */}
          <BranchHistory limit={3} />
        </div>
      </MainLayout>
    );
  } catch (error) {
    console.error("Error rendering Branch Dashboard:", error);
    setHasError(true);
    setErrorMessage(error instanceof Error ? error.message : "Unknown error");
    
    return (
      <MainLayout>
        <div className="alert alert-danger mt-4">
          <h4>Dashboard Error</h4>
          <p>There was a problem loading the branch dashboard. Please try refreshing the page.</p>
          <p>Error details: {error instanceof Error ? error.message : "Unknown error"}</p>
        </div>
      </MainLayout>
    );
  }
};

export default BranchDashboard; 