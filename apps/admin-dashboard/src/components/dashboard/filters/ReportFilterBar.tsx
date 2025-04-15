import React, { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Select } from "../../../components/ui/select";
import { Calendar } from "../../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { Search, X, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Nigerian states list
const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

// Mock churches data organized by state
const mockChurchesByState: Record<string, { value: string; label: string }[]> = {
  "FCT": [
    { value: "1", label: "Dominion City Wuye" },
    { value: "2", label: "Dominion City Abuja" }
  ],
  "Enugu": [
    { value: "3", label: "Dominion City Enugu" }
  ],
  "Lagos": [
    { value: "4", label: "Dominion City Ikeja" },
    { value: "5", label: "Dominion City Lekki" }
  ]
};

interface ReportFilterBarProps {
  onFilter?: (filters: FilterValues) => void;
}

interface FilterValues {
  state: string;
  church: string;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  searchQuery: string;
}

const ReportFilterBar: React.FC<ReportFilterBarProps> = ({ onFilter }) => {
  const [state, setState] = useState<string>("");
  const [church, setChurch] = useState<string>("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [availableChurches, setAvailableChurches] = useState<{ value: string; label: string }[]>([]);

  // Update churches when state changes
  useEffect(() => {
    if (state && mockChurchesByState[state]) {
      setAvailableChurches(mockChurchesByState[state]);
    } else {
      setAvailableChurches([]);
      setChurch("");
    }
  }, [state]);

  // Handle reset filters
  const handleReset = () => {
    setState("");
    setChurch("");
    setDateRange({ from: undefined, to: undefined });
    setSearchQuery("");

    if (onFilter) {
      onFilter({
        state: "",
        church: "",
        dateRange: { from: undefined, to: undefined },
        searchQuery: "",
      });
    }
  };

  // Handle filter submission
  const handleApplyFilters = () => {
    if (onFilter) {
      onFilter({
        state,
        church,
        dateRange,
        searchQuery,
      });
    }
  };

  return (
    <div className="bg-muted/50 p-4 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {/* State dropdown */}
          <Select
            label="State"
            options={[
              { value: "", label: "All States" },
              ...nigerianStates.map(state => ({ value: state, label: state }))
            ]}
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full sm:w-auto"
          />

          {/* Church dropdown */}
          <Select
            label="Church"
            options={[
              { value: "", label: "All Churches" },
              ...availableChurches
            ]}
            value={church}
            onChange={(e) => setChurch(e.target.value)}
            className="w-full sm:w-auto"
            disabled={!state}
          />

          {/* Date range picker */}
          <div className="w-full sm:w-auto">
            <label className="text-sm font-medium block mb-1">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Select date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to,
                  }}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search input */}
          <div className="relative w-full">
            <label className="text-sm font-medium block mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-2.5"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 self-end mt-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="h-10"
            >
              Reset
            </Button>
            <Button
              size="sm"
              onClick={handleApplyFilters}
              className="h-10"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFilterBar; 