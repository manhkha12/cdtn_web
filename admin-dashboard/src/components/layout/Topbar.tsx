import React from "react";
import { Search, Bell } from "lucide-react";
import { cn } from "../../utils/cn";

interface TopbarProps {
  title?: string;
  showSearch?: boolean;
  showNotification?: boolean;
  rightAction?: React.ReactNode;
  className?: string;
}

export const Topbar: React.FC<TopbarProps> = ({
  title,
  showSearch = true,
  showNotification = true,
  rightAction,
  className,
}) => {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <header
      className={cn(
        "fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-30",
        className,
      )}
    >
      {/* Left Section */}
      <div className="flex items-center gap-6 flex-1">
        {title && (
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          </div>
        )}

        {showSearch && !title && (
          <div className="relative w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent bg-white text-sm"
            />
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {rightAction && (
          <div className="flex items-center gap-3">{rightAction}</div>
        )}

        {showNotification && (
          <button className="relative p-1.5 text-gray-600 hover:text-gray-900 transition-colors group">
            <Bell size={18} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        )}

        {/* <button className="w-9 h-9 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-xs hover:shadow-md transition-shadow">
          U
        </button> */}
      </div>
    </header>
  );
};

export default Topbar;
