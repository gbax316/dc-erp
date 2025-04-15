import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

export function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 