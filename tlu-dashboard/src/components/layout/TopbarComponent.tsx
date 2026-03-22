import React, { useState } from "react";
import { Search, Bell } from "lucide-react";

interface TopbarProps {
  notificationCount?: number;
}

export const TopbarComponent: React.FC<TopbarProps> = ({
  notificationCount = 3,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white border-b border-slate-100 shadow-sm">
      <div className="h-16 px-8 flex items-center justify-between gap-6">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search students, classes..."
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-transparent transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Notification */}
          <div className="relative">
            <button className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative hover:text-slate-900">
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center leading-none">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-slate-200" />

          {/* User Avatar */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                JD
              </div>
              <span className="font-medium text-sm text-slate-700">
                John Doe
              </span>
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="font-semibold text-slate-900 text-sm">
                    John Doe
                  </p>
                  <p className="text-xs text-slate-500">Faculty Member</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors text-sm">
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-sm border-t border-slate-100 mt-1 pt-2">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Overlay for dropdown */}
        {showDropdown && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
        )}
      </div>
    </header>
  );
};

export default TopbarComponent;
