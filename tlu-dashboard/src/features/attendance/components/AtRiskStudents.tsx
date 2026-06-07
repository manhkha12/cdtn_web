// src/features/attendance/components/AtRiskStudents.tsx
import React from "react";
import { AlertCircle, TrendingDown, User } from "lucide-react";
import type { AttendanceStudent } from "../../../mock/attendanceData";

export const AtRiskStudents: React.FC<{ students: AttendanceStudent[] }> = ({ students }) => {
  // Luồng UC16 - 5.1: Lọc sinh viên vắng quá 15% (Cảnh báo nguy cơ)
  const atRisk = students.filter(s => s.absenceRate > 15);

  return (
    <div className="bg-white rounded-[2rem] border border-red-100 p-8 shadow-2xl shadow-red-500/5 relative overflow-hidden h-full">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl opacity-60" />

      <div className="relative space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600 text-white rounded-xl shadow-lg shadow-red-200">
              <AlertCircle size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm tracking-tight leading-none">Cảnh báo nghỉ</h3>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Nghỉ quá 15%</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black rounded-lg ring-1 ring-red-500/10">
            {atRisk.length} SV
          </span>
        </div>

        <div className="space-y-3">
          {atRisk.length > 0 ? (
            atRisk.map((student, index) => (
              <div 
                key={`${student.id}-${index}`} 
                className="group flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-red-100 hover:bg-white hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm overflow-hidden group-hover:scale-110 transition-transform shrink-0">
                    {student.avatar && student.avatar.startsWith('http') ? (
                      <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} className="text-slate-400" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-800 group-hover:text-red-600 transition-colors">{student.name}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Attendance Low</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`flex items-center gap-1 text-xs font-black ${student.absenceRate >= 20 ? 'text-red-600' : 'text-amber-600'}`}>
                    <TrendingDown size={12} />
                    {student.absenceRate}%
                  </div>
                  <p className="text-[8px] font-black text-slate-400 uppercase mt-0.5">Danger Zone</p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-slate-300 space-y-3">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center">
                <AlertCircle size={24} className="opacity-20" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest">Không có cảnh báo</p>
            </div>
          )}
        </div>

        {atRisk.length > 0 && (
          <button className="w-full py-4 mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl border-2 border-dashed border-slate-100 transition-all">
            Gửi thông báo nhắc nhở
          </button>
        )}
      </div>
    </div>
  );
};