import React, { useState, useEffect, useCallback } from "react";
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
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for service reports
const generateMockData = () => {
  const churches = [
    { name: "Dominion City Wuye", state: "FCT" },
    { name: "Dominion City Abuja", state: "FCT" },
    { name: "Dominion City Enugu", state: "Enugu" },
    { name: "Dominion City Lagos", state: "Lagos" },
    { name: "Dominion City Ikeja", state: "Lagos" }
  ];

  const submitters = [
    "John Doe", "Jane Smith", "Michael Johnson", 
    "Sarah Williams", "David Brown", "Elizabeth Davies"
  ];

  return Array.from({ length: 100 }, (_, i) => {
    const church = churches[Math.floor(Math.random() * churches.length)];
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    const attendance = Math.floor(Math.random() * 500) + 100;
    const earnings = Math.floor(Math.random() * 500000) + 50000;
    const remittanceDue = Math.floor(earnings * 0.1);

    return {
      id: `SR-${1000 + i}`,
      date: date.toISOString().split('T')[0],
      church: church.name,
      state: church.state,
      attendance,
      earnings,
      remittanceDue,
      submittedBy: submitters[Math.floor(Math.random() * submitters.length)]
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

interface ServiceReportsTableProps {
  className?: string;
}

const ServiceReportsTable: React.FC<ServiceReportsTableProps> = ({ className }) => {
  const [allReports] = useState(generateMockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Filter reports based on search query
  const filteredReports = allReports.filter(report => {
    if (!debouncedSearchQuery) return true;
    
    const searchLower = debouncedSearchQuery.toLowerCase();
    return (
      report.church.toLowerCase().includes(searchLower) ||
      report.state.toLowerCase().includes(searchLower) ||
      report.submittedBy.toLowerCase().includes(searchLower) ||
      report.id.toLowerCase().includes(searchLower)
    );
  });

  // Paginate reports
  const totalPages = Math.ceil(filteredReports.length / pageSize);
  const paginatedReports = filteredReports.slice(
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

  // Handle export to Excel
  const handleExportToExcel = () => {
    // In a real app, we would use xlsx or react-csv library here
    // For this demo, we'll just show an alert
    alert("Exporting to Excel... (This would download an Excel file in a real implementation)");
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-8 w-full"
          />
        </div>

        {/* Excel Export Button */}
        <Button
          variant="outline"
          onClick={handleExportToExcel}
          className="w-full sm:w-auto flex items-center gap-2"
        >
          <Download size={16} />
          <span>Export to Excel</span>
        </Button>
      </div>

      {/* Table with horizontal scroll for mobile */}
      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Church</TableHead>
              <TableHead>State</TableHead>
              <TableHead className="text-right">Attendance</TableHead>
              <TableHead className="text-right">Earnings (₦)</TableHead>
              <TableHead className="text-right">Remittance Due (₦)</TableHead>
              <TableHead>Submitted By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedReports.length > 0 ? (
              paginatedReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                  <TableCell>{report.church}</TableCell>
                  <TableCell>{report.state}</TableCell>
                  <TableCell className="text-right">{report.attendance.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{formatCurrency(report.earnings)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(report.remittanceDue)}</TableCell>
                  <TableCell>{report.submittedBy}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
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
              <span className="sr-only">Previous Page</span>
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = currentPage - 3 + i;
                  if (pageNum > totalPages) {
                    pageNum = totalPages - (4 - i);
                  }
                }

                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className="h-8 w-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="mx-1">...</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(totalPages)}
                    className="h-8 w-8 p-0"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next Page</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceReportsTable; 