import React, { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronDown,
} from "lucide-react";

interface SidebarProps {
  activeMenu?: string;
  onMenuChange?: (menuId: string) => void;
}

export const SidebarComponent: React.FC<SidebarProps> = ({
  activeMenu = "dashboard",
  onMenuChange,
}) => {
  const [expandedUser, setExpandedUser] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { id: "attendance", label: "Attendance", icon: <Calendar size={20} /> },
    // {
    //   id: "communication",
    //   label: "Communication",
    //   icon: <MessageSquare size={20} />,
    // },
    // { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
    // { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const handleMenuClick = (menuId: string) => {
    onMenuChange?.(menuId);
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl">
      {/* Logo */}
      <div className="p-8 pb-6 border-b border-slate-700/50">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">TLU</h1>
        </div>
        <p className="text-slate-400 text-xs font-medium">Faculty Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 overflow-y-auto">
        <ul className="space-y-1.5">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  activeMenu === item.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-700/50 mt-auto">
        <button
          onClick={() => setExpandedUser(!expandedUser)}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center font-bold text-xs text-white flex-shrink-0">
            JD
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-sm font-semibold truncate">John Doe</p>
            <p className="text-xs text-slate-400 truncate">Faculty</p>
          </div>
          <ChevronDown
            size={16}
            className={`text-slate-400 transition-transform flex-shrink-0 ${expandedUser ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </aside>
  );
};

export default SidebarComponent;
