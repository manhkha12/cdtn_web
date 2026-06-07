import React from "react";
import { Users, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { AttendanceOverview } from "../../../repository/StatisticsApi";
import { motion } from "framer-motion";

interface Props {
  data: AttendanceOverview | null;
  loading: boolean;
}

const AttendanceStatsWidget: React.FC<Props> = ({ data, loading }) => {
  if (loading || !data || !data.summary) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-white rounded-3xl animate-pulse border border-slate-100" />
        ))}
      </div>
    );
  }

  const { summary } = data;

  const stats = [
    {
      label: "Tổng sinh viên",
      value: summary.totalStudents || 0,
      icon: Users,
      color: "blue",
      desc: "Đang theo học các lớp"
    },
    {
      label: "Tỷ lệ chuyên cần",
      value: `${summary.averageAttendanceRate || 0}%`,
      icon: TrendingUp,
      color: "emerald",
      desc: "Trung bình toàn khóa"
    },
    {
      label: "Sinh viên nguy cơ",
      value: (summary.criticalAttendance || 0) + (summary.warningAttendance || 0),
      icon: AlertTriangle,
      color: "amber",
      desc: "Cần chú ý đặc biệt"
    },
    {
      label: "Chuyên cần tốt",
      value: summary.goodAttendance || 0,
      icon: CheckCircle2,
      color: "purple",
      desc: "Đi học đầy đủ"
    }
  ];

  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          key={stat.label}
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl border ${colors[stat.color]}`}>
              <stat.icon size={24} />
            </div>
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-slate-400 transition-colors">
              Stats
            </div>
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-900 tracking-tight mb-1">
              {stat.value}
            </h4>
            <p className="text-sm font-bold text-slate-500 mb-0.5">{stat.label}</p>
            <p className="text-[10px] font-medium text-slate-400">{stat.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AttendanceStatsWidget;
