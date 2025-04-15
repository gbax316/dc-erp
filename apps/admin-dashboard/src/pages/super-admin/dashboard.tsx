import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { cn } from "../../lib/utils";
import FeatureCardsGrid from "../../components/dashboard/cards/FeatureCardsGrid";
import DashboardStats from "../../components/dashboard/cards/DashboardStats";
import ReportFilterBar from "../../components/dashboard/filters/ReportFilterBar";
import ServiceReportsTable from "../../components/dashboard/tables/ServiceReportsTable";

// Components required by specification
const SuperAdminDashboard = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
      
      <section>
        <DashboardStats />
      </section>
      
      <section>
        <ReportFilterBar />
      </section>
      
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Service Reports</CardTitle>
            <CardDescription>
              Recent service reports from all churches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ServiceReportsTable />
          </CardContent>
        </Card>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Admin Features</h2>
        <FeatureCardsGrid />
      </section>
    </div>
  );
};

export default SuperAdminDashboard; 