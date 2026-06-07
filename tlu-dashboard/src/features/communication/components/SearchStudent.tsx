// src/features/communication/components/SearchStudent.tsx
import React, { useState, useEffect, useRef } from "react";
import { Search, User as UserIcon, X } from "lucide-react";
import { MessagingApi } from "../../../repository/MessagingApi";
import type { SearchUserResult } from "../types";

interface Props {
  onSelectUser: (user: SearchUserResult) => void;
}

export const SearchStudent: React.FC<Props> = ({ onSelectUser }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchUserResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setIsSearching(true);
        try {
          const data = await MessagingApi.searchUsers(query);
          setResults(data);
          setShowDropdown(true);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (user: SearchUserResult) => {
    onSelectUser(user);
    setQuery("");
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full mb-4" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search student by name or code..."
          className="w-full pl-10 pr-10 py-2.5 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowDropdown(true)}
        />
        {query && (
          <button 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            onClick={() => setQuery("")}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto overflow-x-hidden">
          {isSearching ? (
            <div className="p-4 text-center text-slate-500 text-sm">Searching...</div>
          ) : results.length > 0 ? (
            results.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                onClick={() => handleSelect(user)}
              >
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon size={20} className="text-slate-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-800 text-sm truncate">{user.fullName}</p>
                  <p className="text-xs text-slate-500 font-medium">
                    {user.code} {user.subtitle && `• ${user.subtitle}`}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-slate-500 text-sm">No students found</div>
          )}
        </div>
      )}
    </div>
  );
};
