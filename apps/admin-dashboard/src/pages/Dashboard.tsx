import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import StatCards from "../components/dashboard/StatCards";
import { Calendar, Users, TrendingUp, DollarSign } from "lucide-react";

const Dashboard = () => {
  console.log("Dashboard component rendering");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log("Dashboard component mounted");
    return () => {
      console.log("Dashboard component unmounted");
    };
  }, []);

  try {
    return (
      <MainLayout>
        <div className="mb-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
            <h1 className="fs-2 fw-bold text-primary mb-3 mb-md-0">Dashboard</h1>
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
          
          {/* Stats Cards */}
          {hasError ? (
            <div className="alert alert-danger">
              <h4>Error rendering dashboard</h4>
              <p>{errorMessage || "There was a problem displaying the dashboard. Please refresh the page or contact support."}</p>
            </div>
          ) : (
            <React.Suspense fallback={<div>Loading stats...</div>}>
              <StatCards />
            </React.Suspense>
          )}
          
          {/* Recent Activity Section */}
          <div className="card mt-4">
            <div className="card-header px-3 px-md-4 py-3 border-bottom">
              <h2 className="fs-5 fw-bold mb-0">Recent Activity</h2>
            </div>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex flex-column gap-4">
                {activityItems.map((item, index) => (
                  <div key={index} className="d-flex align-items-start">
                    <div className={`rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 ${item.iconBg}`} style={{width: '40px', height: '40px'}}>
                      {item.icon}
                    </div>
                    <div className="ms-3">
                      <p className="fw-medium mb-1">{item.title}</p>
                      <p className="text-sm text-muted mb-1">
                        {item.description}
                      </p>
                      <p className="text-xs text-muted mb-0">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Dashboard Content */}
          <div className="row mt-4 g-4">
            <div className="col-12 col-lg-8">
              <div className="card h-100">
                <div className="card-header px-3 px-md-4 py-3 border-bottom">
                  <h2 className="fs-5 fw-bold mb-0">Revenue Overview</h2>
                </div>
                <div className="card-body p-3 p-md-4">
                  <div className="bg-light rounded-3 d-flex align-items-center justify-content-center" style={{height: '250px'}}>
                    <p className="text-muted">Revenue chart will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-12 col-lg-4">
              <div className="card h-100">
                <div className="card-header px-3 px-md-4 py-3 border-bottom">
                  <h2 className="fs-5 fw-bold mb-0">Upcoming Events</h2>
                </div>
                <div className="card-body p-3 p-md-4">
                  <div className="d-flex flex-column gap-3">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="d-flex align-items-center">
                        <div className="bg-primary-50 rounded-lg d-flex flex-column align-items-center justify-content-center text-primary flex-shrink-0" style={{width: '48px', height: '48px'}}>
                          <span className="text-xs fw-medium">{event.month}</span>
                          <span className="fs-5 fw-bold">{event.day}</span>
                        </div>
                        <div className="ms-3">
                          <p className="fw-medium mb-1">{event.title}</p>
                          <p className="text-xs text-muted mb-0">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  } catch (error) {
    console.error("Error rendering Dashboard:", error);
    setHasError(true);
    setErrorMessage(error instanceof Error ? error.message : "Unknown error");
    
    return (
      <MainLayout>
        <div className="alert alert-danger mt-4">
          <h4>Dashboard Error</h4>
          <p>There was a problem loading the dashboard. Please try refreshing the page.</p>
          <p>Error details: {error instanceof Error ? error.message : "Unknown error"}</p>
        </div>
      </MainLayout>
    );
  }
};

// Sample activity data
const activityItems = [
  {
    icon: <Users size={18} />,
    iconBg: "bg-primary",
    title: "New member joined",
    description: "Alice Johnson has registered as a new member",
    time: "2 hours ago"
  },
  {
    icon: <DollarSign size={18} />,
    iconBg: "bg-success",
    title: "Donation received",
    description: "A donation of $500 was received from Anonymous",
    time: "Yesterday"
  },
  {
    icon: <Calendar size={18} />,
    iconBg: "bg-info",
    title: "New event created",
    description: "Prayer meeting has been scheduled for next Friday",
    time: "3 days ago"
  },
  {
    icon: <TrendingUp size={18} />,
    iconBg: "bg-warning",
    title: "Attendance report",
    description: "Sunday service attendance increased by 15%",
    time: "1 week ago"
  }
];

// Sample upcoming events
const upcomingEvents = [
  {
    month: "MAY",
    day: "12",
    title: "Sunday Service",
    time: "9:00 AM - 11:00 AM"
  },
  {
    month: "MAY",
    day: "15",
    title: "Prayer Meeting",
    time: "6:30 PM - 7:30 PM"
  },
  {
    month: "MAY",
    day: "18",
    title: "Youth Fellowship",
    time: "4:00 PM - 6:00 PM"
  }
];

export default Dashboard; 