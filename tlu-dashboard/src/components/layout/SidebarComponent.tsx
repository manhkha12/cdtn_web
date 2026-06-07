import React from "react";
import {
  LayoutDashboard,
  Clock,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { useMessaging } from "../context/MessagingContext";
import { useAuth } from "../context/AuthContext";
import logoImage from "../../image/logo.svg";

interface SidebarProps {
  activeMenu?: string;
  onMenuChange?: (menuId: string) => void;
}

export const SidebarComponent: React.FC<SidebarProps> = ({
  activeMenu = "dashboard",
  onMenuChange,
}) => {
  const { totalUnreadCount } = useMessaging();
  const { user } = useAuth();

  const lecturer = user?.lecturer;
  const fullName = lecturer?.full_name || user?.username || "Giảng viên";
  const avatarUrl = user?.avatar_url;
  const userCode = lecturer?.lecturer_code || user?.username || "A44657";
  const roleName = user?.role === "ADMIN" ? "Quản trị viên" : "Giảng viên";

  const menuGroups = [
    {
      title: "TRANG CHỦ",
      items: [
        {
          id: "dashboard",
          label: "Trang chủ",
          icon: <LayoutDashboard size={18} />,
        },
      ],
    },
    {
      title: "TRA CỨU / QUẢN LÝ",
      items: [
        {
          id: "schedule",
          label: "Lịch dạy",
          icon: <Clock size={18} />,
        },
        {
          id: "attendance",
          label: "Điểm danh",
          icon: <BookOpen size={18} />,
        },
        {
          id: "communication",
          label: "Tin nhắn",
          icon: <MessageSquare size={18} />,
        },
      ],
    },
  ];

  const handleMenuClick = (menuId: string) => {
    onMenuChange?.(menuId);
  };

  return (
    <aside className="w-64 bg-white text-slate-800 flex flex-col border-r border-gray-200 shadow-sm z-20">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-center bg-white">
        <img
          src={logoImage}
          alt="Thang Long University Logo"
          className="h-10 w-auto object-contain"
        />
      </div>

      {/* User Profile Info */}
      <div className="p-6 border-b border-gray-100 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm">
          {avatarUrl ? (
            <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-slate-300 text-slate-600 font-extrabold flex items-center justify-center text-xl uppercase">
              {fullName.charAt(0)}
            </div>
          )}
        </div>
        <h2 className="text-[#002f6c] font-black text-sm text-center tracking-wide uppercase mt-3 px-2 line-clamp-1">
          {fullName}
        </h2>
        <p className="text-[11px] text-slate-500 font-bold text-center mt-1 uppercase">
          {userCode}
        </p>
        <p className="text-xs text-slate-400 text-center mt-0.5 font-medium">
          {roleName}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto bg-white">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="mb-6">
            <h3 className="px-6 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {group.title}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = activeMenu === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleMenuClick(item.id)}
                      className={`w-full flex items-center gap-3 py-2.5 transition-all duration-150 ${
                        isActive
                          ? "bg-slate-50 text-[#800000] font-bold border-l-4 border-[#800000] pl-5 pr-6"
                          : "text-slate-600 hover:text-[#800000] hover:bg-slate-50 pl-6 pr-6"
                      }`}
                    >
                      <span className={`transition-colors ${isActive ? "text-[#800000]" : "text-slate-400 group-hover:text-slate-600"}`}>
                        {item.icon}
                      </span>
                      <span className="text-xs font-semibold flex-1 text-left">{item.label}</span>
                      {item.id === "communication" && totalUnreadCount > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                          {totalUnreadCount}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarComponent;
