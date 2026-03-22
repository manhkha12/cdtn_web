import React from "react";
import { Search, Settings } from "lucide-react";
import Card from "../../../components/common/Card";

interface FilterTab {
  id: string;
  label: string;
  count: number;
}

interface AttendanceFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
  filters: FilterTab[];
}

export const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
  searchValue,
  onSearchChange,
  activeFilter,
  onFilterChange,
  filters,
}) => {
  return (
    <Card className="mb-6 border-0 shadow-sm">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name, ID or email..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200">
            <Settings size={18} />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Filter:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span>
                  {filter.label}{" "}
                  <span className="font-semibold">{filter.count}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AttendanceFilters;
