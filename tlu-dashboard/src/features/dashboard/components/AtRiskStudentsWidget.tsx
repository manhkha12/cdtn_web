import React from "react";
import { User, AlertCircle, ChevronRight } from "lucide-react";
import type { AtRiskStudent } from "../../../repository/StatisticsApi";
import { motion } from "framer-motion";

interface Props {
  students: AtRiskStudent[];
  loading: boolean;
}

const AtRiskStudentsWidget: React.FC<Props> = ({ students, loading }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[400px]">
      <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-50 text-red-600 rounded-xl">
            <AlertCircle size={20} />
          </div>
          <h3 className="font-black text-slate-900 tracking-tight text-lg">Cảnh báo cấm thi</h3>
        </div>
        <span className="px-3 py-1 bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-lg">
          {students?.length || 0} Mục
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-slate-50 rounded-2xl animate-pulse" />
          ))
        ) : (students && students.length > 0) ? (
          students.map((student, index) => (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              key={`${student.id}-${index}`}
              className="group p-4 bg-white border border-slate-50 rounded-2xl hover:border-red-100 hover:shadow-lg hover:shadow-red-500/5 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                  {/* Avatar fallback logic */}
                  <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                    <User size={18} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-extrabold text-slate-800 truncate group-hover:text-red-600 transition-colors">
                    {student.fullName}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                    {student.studentCode} • {student.className}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-black ${student.riskLevel === 'CRITICAL' ? 'text-red-600' : 'text-amber-600'}`}>
                    {student.attendanceRate}%
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase">Vắng {student.absentSessions} buổi</div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-300 py-10">
            <AlertCircle size={40} className="mb-2 opacity-20" />
            <p className="font-bold text-sm">Không có cảnh báo</p>
          </div>
        )}
      </div>

      <button className="p-4 text-center text-xs font-black text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition-all border-t border-slate-50 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
        Xem tất cả <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default AtRiskStudentsWidget;
