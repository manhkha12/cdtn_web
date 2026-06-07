// src/features/attendance/components/AttendanceTable.tsx
import React from "react";
import { Check, X, Clock, Edit2 } from "lucide-react";
import type { AttendanceStudent } from "../../../mock/attendanceData";

interface AttendanceTableProps {
  students: AttendanceStudent[];
  onStatusChange: (
    studentId: string,
    newStatus: "present" | "absent" | "late" | "ai_verified",
  ) => void;
  onEditClick: (student: AttendanceStudent) => void;
  totalStudents: number;
}

const getStatusBadge = (status: AttendanceStudent["status"]) => {
  const statusConfig: Record<string, { bgColor: string; textColor: string; label: string; dotColor: string }> = {
    ai_verified: { bgColor: "bg-blue-50", textColor: "text-blue-700", label: "AI Verified", dotColor: "bg-blue-500" },
    present: { bgColor: "bg-emerald-50", textColor: "text-emerald-700", label: "Present", dotColor: "bg-emerald-500" },
    absent: { bgColor: "bg-red-50", textColor: "text-red-700", label: "Absent", dotColor: "bg-red-500" },
    late: { bgColor: "bg-amber-50", textColor: "text-amber-700", label: "Late (15m)", dotColor: "bg-amber-500" },
  };
  const config = statusConfig[status] || statusConfig.absent;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${config.bgColor} ${config.textColor} ring-1 ring-inset ${config.textColor.replace('text-', 'ring-')}/10`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor} ${status === 'ai_verified' ? 'animate-pulse' : ''}`} />
      {config.label}
    </span>
  );
};

const getAvatarSrc = (student: AttendanceStudent) => {
  if (student.avatar && student.avatar.startsWith('http')) {
    return student.avatar;
  }
  const nameLower = student.name.toLowerCase();
  const isFemale = nameLower.includes("thị") || nameLower.includes("trang") || nameLower.includes("hương") || nameLower.includes("anh");
  return isFemale 
    ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
    : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80";
};

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
  students,
  onStatusChange,
  onEditClick,
  totalStudents,
}) => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden">
      <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Danh sách lớp</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1.5 flex items-center gap-2">
            <span className="w-1 h-1 bg-red-500 rounded-full" />
            Hiển thị {students.length} / {totalStudents} sinh viên
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-slate-200">
          <thead>
            <tr>
              <th className="text-center px-4 py-3 font-bold text-xs text-white bg-[#800000] border border-slate-200 w-16">STT</th>
              <th className="text-left px-6 py-3 font-bold text-xs text-white bg-[#800000] border border-slate-200">Hồ sơ sinh viên</th>
              <th className="text-center px-6 py-3 font-bold text-xs text-white bg-[#800000] border border-slate-200 w-40">Mã sinh viên</th>
              <th className="text-left px-6 py-3 font-bold text-xs text-white bg-[#800000] border border-slate-200 w-44">Trạng thái</th>
              <th className="text-center px-6 py-3 font-bold text-xs text-white bg-[#800000] border border-slate-200 w-56">Thao tác nhanh</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id} className="group hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-center text-sm font-semibold text-slate-600 border border-slate-200">
                  {index + 1}
                </td>
                <td className="px-6 py-3 border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center transition-all overflow-hidden shrink-0">
                      <img src={getAvatarSrc(student)} alt={student.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold text-slate-800 text-sm tracking-tight">{student.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 border border-slate-200 text-center">
                  <span className="font-mono text-xs font-semibold text-slate-600">
                    {student.studentId}
                  </span>
                </td>
                <td className="px-6 py-3 border border-slate-200">{getStatusBadge(student.status)}</td>

                <td className="px-6 py-3 border border-slate-200">
                  <div className="flex items-center justify-center gap-3">
                    <button 
                      onClick={() => onStatusChange(student.id, "present")}
                      className={`p-2 rounded-lg transition-all duration-150 ${student.status === "present" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"}`}
                      title="Present"
                    >
                      <Check size={16} strokeWidth={3} />
                    </button>
                    
                    <button 
                      onClick={() => onStatusChange(student.id, "absent")}
                      className={`p-2 rounded-lg transition-all duration-150 ${student.status === "absent" ? "bg-red-500 text-white shadow-sm" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"}`}
                      title="Absent"
                    >
                      <X size={16} strokeWidth={3} />
                    </button>

                    <button 
                      onClick={() => onStatusChange(student.id, "late")}
                      className={`p-2 rounded-lg transition-all duration-150 ${student.status === "late" ? "bg-amber-500 text-white shadow-sm" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"}`}
                      title="Late"
                    >
                      <Clock size={16} strokeWidth={3} />
                    </button>

                    <button 
                      onClick={() => onEditClick(student)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit with reason"
                    >
                      <Edit2 size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;