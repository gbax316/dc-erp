import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Select } from "../../../components/ui/select";
import { Search, Download, ChevronLeft, ChevronRight, Calendar, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for service reports
const generateMockReports = () => {
  const churches = [
    "Dominion City Lagos",
    "Dominion City Ikeja",
    "Dominion City Victoria Island",
    "Dominion City Lekki",
    "Dominion City Yaba",
    "Dominion City Surulere"
  ];
  
  const serviceTypes = [
    "Sunday Service",
    "Midweek Service",
    "Prayer Meeting",
    "Youth Service",
    "Special Program"
  ];
  
  return Array.from({ length: 50 }, (_, i) => {
    const church = churches[Math.floor(Math.random() * churches.length)];
    const serviceType = serviceTypes[Math.floor(Math.random() * serviceTypes.length)];
    
    // Generate random attendance between 50 and 500
    const attendance = Math.floor(Math.random() * 450) + 50;
    
    // Generate random offerings between ₦50,000 and ₦2,000,000
    const offerings = Math.floor(Math.random() * 1950000) + 50000;
    
    // Calculate remittance due (10% of offerings)
    const remittanceDue = Math.floor(offerings * 0.1);
    
    // Generate a random date in the last 90 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90));
    
    return {
      id: `SR-${1000 + i}`,
      date: date.toISOString().split('T')[0],
      church,
      serviceType,
      attendance,
      offerings,
      remittanceDue
    };
  });
};

// Custom hook for useDebounce
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Format currency to Naira
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(amount);
};

interface StateServiceReportsProps {
  className?: string;
}

const StateServiceReports: React.FC<StateServiceReportsProps> = ({ className }) => {
  const [reports] = useState(generateMockReports);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [churchFilter, setChurchFilter] = useState("");
  const [dateRange, setDateRange] = useState("30"); // days
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Extract unique churches for filter
  const churches = Array.from(new Set(reports.map(report => report.church)));

  // Filter reports based on search query, church filter, and date range
  const filteredReports = reports.filter(report => {
    // Search filter
    const matchesSearch = !debouncedSearchQuery || 
      report.church.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      report.serviceType.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    
    // Church filter
    const matchesChurch = !churchFilter || report.church === churchFilter;
    
    // Date range filter
    const reportDate = new Date(report.date);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(dateRange));
    const isWithinDateRange = reportDate >= cutoffDate;
    
    return matchesSearch && matchesChurch && isWithinDateRange;
  });

  // Sort reports by date (newest first)
  const sortedReports = [...filteredReports].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Paginate reports
  const totalPages = Math.ceil(sortedReports.length / pageSize);
  const paginatedReports = sortedReports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle church filter change
  const handleChurchFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChurchFilter(e.target.value);
    setCurrentPage(1);
  };

  // Handle date range filter change
  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(e.target.value);
    setCurrentPage(1);
  };

  // Handle export to CSV
  const handleExport = () => {
    // This would implement actual export functionality in a real app
    // For now, we'll just show an alert
    alert(`Exporting ${filteredReports.length} service reports to CSV...`);
  };

  // Calculate totals for summary
  const totalAttendance = filteredReports.reduce((sum, report) => sum + report.attendance, 0);
  const totalOfferings = filteredReports.reduce((sum, report) => sum + report.offerings, 0);
  const totalRemittance = filteredReports.reduce((sum, report) => sum + report.remittanceDue, 0);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Search Bar */}
          <div className="relative min-w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-8 w-full"
            />
          </div>
          
          {/* Church Filter */}
          <Select
            options={[
              { value: "", label: "All Churches" },
              ...churches.map(church => ({ value: church, label: church }))
            ]}
            value={churchFilter}
            onChange={handleChurchFilterChange}
            className="w-[180px]"
          />
          
          {/* Date Range Filter */}
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select
              options={[
                { value: "7", label: "Last 7 days" },
                { value: "30", label: "Last 30 days" },
                { value: "90", label: "Last 90 days" },
                { value: "365", label: "Last 12 months" }
              ]}
              value={dateRange}
              onChange={handleDateRangeChange}
              className="w-[140px]"
            />
          </div>
        </div>

        {/* Export Button */}
        <Button
          variant="outline"
          onClick={handleExport}
          className="shrink-0"
        >
          <Download className="h-4 w-4 mr-2" />
          Export to CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border rounded-md p-4">
          <div className="text-sm text-muted-foreground">Total Attendance</div>
          <div className="text-2xl font-bold mt-1">{totalAttendance.toLocaleString()}</div>
        </div>
        <div className="bg-white border rounded-md p-4">
          <div className="text-sm text-muted-foreground">Total Offerings</div>
          <div className="text-2xl font-bold mt-1">{formatCurrency(totalOfferings)}</div>
        </div>
        <div className="bg-white border rounded-md p-4">
          <div className="text-sm text-muted-foreground">Total Remittance Due</div>
          <div className="text-2xl font-bold mt-1">{formatCurrency(totalRemittance)}</div>
        </div>
      </div>

      {/* Table with horizontal scroll for mobile */}
      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Church</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead className="text-right">Attendance</TableHead>
              <TableHead className="text-right">Offerings</TableHead>
              <TableHead className="text-right">Remittance Due</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedReports.length > 0 ? (
              paginatedReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{report.church}</TableCell>
                  <TableCell>{report.serviceType}</TableCell>
                  <TableCell className="text-right">{report.attendance.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{formatCurrency(report.offerings)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(report.remittanceDue)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No service reports found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredReports.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(currentPage * pageSize, filteredReports.length)}
            </span>{" "}
            of <span className="font-medium">{filteredReports.length}</span> reports
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const pageNumber = i + 1;
              return (
                <Button
                  key={pageNumber}
                  variant={pageNumber === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNumber)}
                  className="h-8 w-8 p-0"
                >
                  {pageNumber}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StateServiceReports; 