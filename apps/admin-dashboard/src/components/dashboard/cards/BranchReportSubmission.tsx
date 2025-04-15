import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { FileText, AlertCircle, CheckCircle } from "lucide-react";
import { ServiceReportForm } from "@/components/forms/ServiceReportForm";
import { useAuth } from "@/context/auth-provider";
import { getServiceReports, ServiceReportResponse } from "@/services/serviceReport";
import { format, startOfWeek, endOfWeek, isWithinInterval, parseISO } from "date-fns";

interface BranchReportSubmissionProps {
  className?: string;
}

const BranchReportSubmission: React.FC<BranchReportSubmissionProps> = ({ className }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isReportSubmitted, setIsReportSubmitted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Format date for displaying
  const today = new Date();
  const sunday = startOfWeek(today, { weekStartsOn: 0 });
  const formattedSunday = format(sunday, "MMMM d, yyyy");

  // Check if report has been submitted for this Sunday
  useEffect(() => {
    const checkReportSubmission = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get all service reports
        const reports = await getServiceReports();
        
        // Check if there's a Sunday service report for this week
        const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
        const currentWeekEnd = endOfWeek(new Date(), { weekStartsOn: 0 });
        
        const hasSundayReport = reports.some((report: ServiceReportResponse) => {
          const reportDate = typeof report.date === 'string' 
            ? parseISO(report.date) 
            : new Date(report.date);
            
          return (
            report.service_type === 'Sunday Service' &&
            report.church_id === user?.churchId && // Check if it's from this church
            isWithinInterval(reportDate, {
              start: currentWeekStart,
              end: currentWeekEnd
            })
          );
        });
        
        setIsReportSubmitted(hasSundayReport);
      } catch (err) {
        console.error("Error checking report submission:", err);
        setError("Failed to check if a report has been submitted for this Sunday.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      checkReportSubmission();
    }
  }, [user]);

  // Handle successful submission
  const handleSuccess = () => {
    setShowForm(false);
    setIsReportSubmitted(true);
    navigate("/service-reports");
  };

  // Render loading state
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Sunday Service Report</CardTitle>
          <CardDescription>
            Checking report status for {formattedSunday}...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-6">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-gray-200 rounded-full mb-3"></div>
            <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-36 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render error state
  if (error) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <CardTitle>Sunday Service Report</CardTitle>
          <CardDescription>
            An error occurred while checking report status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-4 text-center">
            <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
            <p className="text-gray-700 mb-2">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render the component when a report has already been submitted
  if (isReportSubmitted) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <CardTitle>Sunday Service Report</CardTitle>
          <CardDescription>
            Report status for {formattedSunday}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-4 text-center">
            <CheckCircle className="h-10 w-10 text-green-500 mb-3" />
            <p className="font-medium text-gray-800 mb-1">Report Already Submitted</p>
            <p className="text-gray-600 text-sm mb-4">
              You have already submitted a service report for this Sunday.
            </p>
            <Button variant="outline" onClick={() => navigate("/service-reports")}>
              View All Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render form if show form is true
  if (showForm) {
    return (
      <div className={className}>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>New Sunday Service Report</CardTitle>
            <CardDescription>
              Submit your report for {formattedSunday}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => setShowForm(false)} className="mb-4">
              Back to Dashboard
            </Button>
            <ServiceReportForm onSuccess={handleSuccess} />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render the default component when no report has been submitted yet
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle>Sunday Service Report</CardTitle>
        <CardDescription>
          Report status for {formattedSunday}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center py-6 text-center">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Report Submitted Yet</h3>
          <p className="text-gray-600 text-sm mb-6">
            You haven't submitted a report for this Sunday's service yet. Please submit your weekly service report with all the necessary details.
          </p>
          <Button onClick={() => setShowForm(true)}>
            Submit Sunday Report
          </Button>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t px-6 py-3">
        <p className="text-xs text-gray-500 w-full text-center">
          Reports should be submitted on the same day as the service or the following day.
        </p>
      </CardFooter>
    </Card>
  );
};

export default BranchReportSubmission; 