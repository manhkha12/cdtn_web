import React from "react";
import { Printer, Save } from "lucide-react";

interface AttendanceHeaderProps {
  courseTitle: string;
  courseCode: string;
  section: string;
  room: string;
  date: string;
  time: string;
  onExport?: () => void;
  isExporting?: boolean;
}

export const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({
  courseTitle,
  courseCode,
  section,
  room,
  date,
  time,
  onExport,
  isExporting = false,
}) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 mb-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50" />

      <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-red-200">
              Session Active
            </span>
            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {courseCode}
            </span>
          </div>
          
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight max-w-2xl">
            {courseTitle}
          </h1>

          <div className="flex items-center gap-4 flex-wrap text-slate-500">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Room</span>
              <span className="text-sm font-extrabold text-slate-700">{room}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Section</span>
              <span className="text-sm font-extrabold text-slate-700">{section}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Schedule</span>
              <span className="text-sm font-extrabold text-slate-700">{date} • {time}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExport}
            disabled={isExporting}
            className="px-6 py-4 bg-white text-slate-700 font-black text-xs uppercase tracking-widest rounded-2xl border-2 border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Printer size={16} strokeWidth={2.5} />
            {isExporting ? "Exporting..." : "Export List"}
          </button>
          <button className="px-8 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-red-600 hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 flex items-center gap-3 group">
            <Save size={16} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
            Finalize Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceHeader;
