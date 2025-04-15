import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import AdminStats from "../../components/dashboard/cards/AdminStats";
import StateChurchesTable from "../../components/dashboard/tables/StateChurchesTable";
import StateServiceReports from "../../components/dashboard/tables/StateServiceReports";

const AdminDashboard = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        
        <section>
          <AdminStats />
        </section>
        
        <section>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Churches in Your State</h2>
            <StateChurchesTable />
          </div>
        </section>
        
        <section>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Service Reports</h2>
            <StateServiceReports />
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard; 