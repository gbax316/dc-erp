import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "../../../components/ui/table";
import { Search, Download, Eye, FileDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { useAuth } from "@/context/auth-provider";
import { getServiceReports, ServiceReportResponse } from "@/services/serviceReport";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

interface BranchHistoryProps {
  className?: string;
  limit?: number;
}

const BranchHistory: React.FC<BranchHistoryProps> = ({ className, limit }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState<ServiceReportResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Format currency as Naira
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Load service reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get all service reports
        const allReports = await getServiceReports();
        
        // Filter to only this church's reports if church ID is available
        let filteredReports = allReports;
        if (user?.churchId) {
          filteredReports = allReports.filter(
            (report: ServiceReportResponse) => report.church_id === user.churchId
          );
        }
        
        // Sort by date, newest first
        filteredReports.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });
        
        setReports(filteredReports);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Failed to load service reports.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchReports();
    }
  }, [user]);

  // Filter reports based on search query
  const filteredReports = reports.filter(report => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    const dateStr = format(new Date(report.date), "MMMM d, yyyy");
    
    return (
      dateStr.toLowerCase().includes(searchLower) ||
      report.service_type.toLowerCase().includes(searchLower) ||
      String(report.attendance_total).includes(searchLower)
    );
  });

  // Apply pagination
  const totalPages = Math.ceil(filteredReports.length / pageSize);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Apply limit if specified
  const displayedReports = limit ? paginatedReports.slice(0, limit) : paginatedReports;

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle view report details
  const handleViewDetails = (id: string) => {
    navigate(`/service-reports/${id}`);
  };

  // Handle download report as CSV
  const handleDownloadReport = (report: ServiceReportResponse) => {
    // Create CSV content
    const reportDate = format(new Date(report.date), "yyyy-MM-dd");
    const reportName = `service-report-${reportDate}.csv`;
    
    // Build CSV header row and data row
    const headers = [
      "Date", "Service Type", "Total Attendance", "Male", "Female", 
      "Children", "First Timers", "New Converts", "Total Earnings", "Remittance Due"
    ];
    
    const data = [
      format(new Date(report.date), "yyyy-MM-dd"),
      report.service_type,
      report.attendance_total,
      report.male,
      report.female,
      report.children,
      report.first_timers,
      report.new_converts,
      report.total_earnings,
      report.remittance_due
    ];
    
    // Combine into CSV content
    const csvContent = [
      headers.join(","),
      data.join(",")
    ].join("\n");
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", reportName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle export all reports
  const handleExportAll = () => {
    // Create CSV content for all reports
    const headers = [
      "Date", "Service Type", "Total Attendance", "Male", "Female", 
      "Children", "First Timers", "New Converts", "Total Earnings", "Remittance Due"
    ];
    
    const rows = filteredReports.map(report => [
      format(new Date(report.date), "yyyy-MM-dd"),
      report.service_type,
      report.attendance_total,
      report.male,
      report.female,
      report.children,
      report.first_timers,
      report.new_converts,
      report.total_earnings,
      report.remittance_due
    ].join(","));
    
    // Combine into CSV content
    const csvContent = [
      headers.join(","),
      ...rows
    ].join("\n");
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const fileName = `service-reports-${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render loading state
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Service History</CardTitle>
          <CardDescription>Loading your church's service reports...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
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
        <CardHeader>
          <CardTitle>Service History</CardTitle>
          <CardDescription>An error occurred while loading your reports.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <p className="text-red-500 mb-4">{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  // If no reports are available
  if (reports.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Service History</CardTitle>
          <CardDescription>Past service reports from your church</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <p className="text-gray-500 mb-4">No service reports have been submitted yet.</p>
          <Button onClick={() => navigate("/service-reports/new")}>
            Submit Your First Report
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <CardTitle>Service History</CardTitle>
          <CardDescription>Past service reports from your church</CardDescription>
        </div>
        <div className="flex space-x-2">
          {!limit && (
            <div className="relative w-[180px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-8 w-full"
              />
            </div>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportAll}
            className="whitespace-nowrap"
          >
            <Download className="h-4 w-4 mr-1" />
            Export All
          </Button>
          {limit && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/service-reports")}
            >
              View All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead className="text-right">Attendance</TableHead>
                <TableHead className="text-right">Earnings</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedReports.length > 0 ? (
                displayedReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      {format(new Date(report.date), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>{report.service_type}</TableCell>
                    <TableCell className="text-right">
                      {report.attendance_total.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(report.total_earnings || 0)}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewDetails(report.id)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDownloadReport(report)}
                          title="Download CSV"
                        >
                          <FileDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No matching reports found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination (only if not limited and has multiple pages) */}
        {!limit && totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BranchHistory; 