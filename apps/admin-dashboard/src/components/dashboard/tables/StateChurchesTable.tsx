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
import { Search, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for churches
const generateMockChurches = () => {
  const cities = ["Lagos", "Ikeja", "Victoria Island", "Lekki", "Yaba", "Surulere"];
  const lgas = ["Eti-Osa", "Ikeja", "Lagos Island", "Kosofe", "Surulere", "Alimosho"];
  
  return Array.from({ length: 30 }, (_, i) => {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const lga = lgas[Math.floor(Math.random() * lgas.length)];
    const memberCount = Math.floor(Math.random() * 800) + 100;
    const earnings = Math.floor(Math.random() * 5000000) + 500000;
    const remittanceDue = Math.floor(earnings * 0.1);
    
    // Generate a random date in the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    return {
      id: `CH-${1000 + i}`,
      name: `Dominion City ${city}`,
      address: `${Math.floor(Math.random() * 200) + 1} ${city} Road, ${lga}`,
      city,
      lga,
      membershipCount: memberCount,
      lastReportDate: date.toISOString().split('T')[0],
      totalEarnings: earnings,
      remittanceDue: remittanceDue
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

interface StateChurchesTableProps {
  className?: string;
}

const StateChurchesTable: React.FC<StateChurchesTableProps> = ({ className }) => {
  const [churches] = useState(generateMockChurches);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [lgaFilter, setLgaFilter] = useState("");
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Extract unique cities and LGAs for filters
  const cities = Array.from(new Set(churches.map(church => church.city)));
  const lgas = Array.from(new Set(churches.map(church => church.lga)));

  // Filter churches based on search query and filters
  const filteredChurches = churches.filter(church => {
    const matchesSearch = !debouncedSearchQuery || 
      church.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      church.address.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    
    const matchesCity = !cityFilter || church.city === cityFilter;
    const matchesLga = !lgaFilter || church.lga === lgaFilter;
    
    return matchesSearch && matchesCity && matchesLga;
  });

  // Paginate churches
  const totalPages = Math.ceil(filteredChurches.length / pageSize);
  const paginatedChurches = filteredChurches.slice(
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

  // Handle filter changes
  const handleCityFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCityFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleLgaFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLgaFilter(e.target.value);
    setCurrentPage(1);
  };

  // Handle view church details
  const handleViewChurch = (churchId: string) => {
    // In a real application, this would navigate to the church detail page
    console.log(`View church details for ${churchId}`);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search churches by name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-8 w-full"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Select
            options={[
              { value: "", label: "All Cities" },
              ...cities.map(city => ({ value: city, label: city }))
            ]}
            value={cityFilter}
            onChange={handleCityFilterChange}
            className="w-[140px]"
          />
          
          <Select
            options={[
              { value: "", label: "All LGAs" },
              ...lgas.map(lga => ({ value: lga, label: lga }))
            ]}
            value={lgaFilter}
            onChange={handleLgaFilterChange}
            className="w-[140px]"
          />
        </div>
      </div>

      {/* Table with horizontal scroll for mobile */}
      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Church Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Membership Count</TableHead>
              <TableHead>Last Report Date</TableHead>
              <TableHead className="text-right">Total Earnings</TableHead>
              <TableHead className="text-right">Remittance Due</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedChurches.length > 0 ? (
              paginatedChurches.map((church) => (
                <TableRow key={church.id}>
                  <TableCell className="font-medium">{church.name}</TableCell>
                  <TableCell>{church.address}</TableCell>
                  <TableCell className="text-right">{church.membershipCount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(church.lastReportDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">{formatCurrency(church.totalEarnings)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(church.remittanceDue)}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewChurch(church.id)}
                      className="h-8 w-8 p-0"
                      title="View Church Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No churches found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredChurches.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(currentPage * pageSize, filteredChurches.length)}
            </span>{" "}
            of <span className="font-medium">{filteredChurches.length}</span> churches
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

export default StateChurchesTable; 