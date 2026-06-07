import React, { useState } from "react";
import { Bell, LogOut, User, Mail, Phone, Book, GraduationCap, X, Award } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface TopbarProps {
  notificationCount?: number;
}

export const TopbarComponent: React.FC<TopbarProps> = ({
  notificationCount = 0,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user, logout } = useAuth();

  const lecturer = user?.lecturer;
  const fullName = lecturer?.full_name || user?.username || "Giảng viên";
  const avatarUrl = user?.avatar_url;

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      logout();
    }
  };

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <header className="bg-[#800000] shadow-sm relative z-30">
      <div className="h-14 px-6 flex items-center justify-between gap-6">
        {/* University Title */}
        <div className="flex items-center">
          <h1 className="text-white font-bold text-sm md:text-base tracking-wider uppercase">
            TRƯỜNG ĐẠI HỌC THĂNG LONG
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Vietnam Flag Badge */}
          <div className="flex items-center justify-center w-6 h-4 rounded overflow-hidden border border-white/20 shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
            <svg viewBox="0 0 3 2" className="w-full h-full object-cover">
              <rect width="3" height="2" fill="#da251d" />
              <polygon points="1.5,0.4 1.8,1.2 1,0.7 2,0.7 1.2,1.2" fill="#ffff00" />
            </svg>
          </div>

          <button className="p-2 text-white/90 hover:bg-white/10 rounded-lg relative transition-colors">
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-[#800000]">
                {notificationCount}
              </span>
            )}
          </button>

          <div className="w-px h-5 bg-white/20" />

          {/* User Avatar & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-center p-1 rounded-full hover:bg-white/10 transition-colors text-white"
            >
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt={fullName} 
                  className="w-8 h-8 rounded-full object-cover border border-white/20 shadow-sm"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-xs shadow-sm border border-white/20">
                  <User size={16} />
                </div>
              )}
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="font-bold text-slate-900 text-sm">{fullName}</p>
                  <p className="text-xs text-slate-500 truncate">{lecturer?.email || `${user?.username}@tlu.edu.vn`}</p>
                </div>
                
                <div className="p-1">
                  <button 
                    onClick={() => {
                      setShowProfileModal(true);
                      setShowDropdown(false);
                    }}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-md transition-colors text-sm"
                  >
                    <User size={16} className="text-blue-600" />
                    Thông tin tài khoản
                  </button>
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors text-sm font-medium mt-1"
                  >
                    <LogOut size={16} />
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Detail Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowProfileModal(false)} />
          
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-200">
            {/* Header / Cover */}
            <div className="h-32 bg-gradient-to-r from-blue-700 via-blue-600 to-red-600 relative">
              <button 
                onClick={() => setShowProfileModal(false)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>
            </div>

            {/* Profile Info */}
            <div className="px-8 pb-8 pt-0 -mt-12 text-center relative z-10">
              <div className="inline-block relative">
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt={fullName} 
                    className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-xl mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-3xl bg-blue-600 border-4 border-white shadow-xl mb-4 flex items-center justify-center text-white text-4xl font-bold">
                    {getInitials(fullName)}
                  </div>
                )}
                <div className="absolute bottom-6 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900">{fullName}</h2>
              <div className="inline-block px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-black mt-1 mb-6 border border-red-100">
                Mã GV: {lecturer?.lecturer_code || user?.username}
              </div>

              <div className="grid grid-cols-1 gap-3 text-left">
                {/* Email Item */}
                <div className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors group">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email</p>
                    <p className="text-sm font-semibold text-slate-700">{lecturer?.email || "Chưa cập nhật"}</p>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors group">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Số điện thoại</p>
                    <p className="text-sm font-semibold text-slate-700">{lecturer?.phone_number || "Chưa cập nhật"}</p>
                  </div>
                </div>

                {/* Dept Item */}
                <div className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors group">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Book size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Khoa / Bộ môn</p>
                    <p className="text-sm font-semibold text-slate-700">{lecturer?.department || "Chưa cập nhật"}</p>
                  </div>
                </div>

                {/* Degree Item */}
                <div className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors group">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Award size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Học vị</p>
                    <p className="text-sm font-black text-slate-800">{lecturer?.degree || "Giảng viên"}</p>
                  </div>
                </div>

                {/* Major Item */}
                <div className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors group">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Chuyên ngành</p>
                    <p className="text-sm font-semibold text-slate-700">{lecturer?.major_name || "Chưa cập nhật"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay click-out for dropdown */}
      {showDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
      )}
    </header>
  );
};

export default TopbarComponent;