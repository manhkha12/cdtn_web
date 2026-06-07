// src/features/schedule/components/TodayClassCard.tsx
import React, { useMemo } from "react";
import { Clock, MapPin, Users } from "lucide-react";
import type { CourseClass } from "../../../types";

interface Props {
  data: CourseClass;
  onClick?: () => void;
  onViewStudents?: (e: React.MouseEvent) => void;
}

const TodayClassCard: React.FC<Props> = ({ data, onClick, onViewStudents }) => {
  // Logic tính toán trạng thái thực tế dựa trên thời gian
  const calculatedStatus = useMemo(() => {
    try {
      const parts = data.lesson_slot.match(/\d+/g)?.map(Number);
      if (!parts || parts.length === 0) return 'UP NEXT';
      
      const startHour = parts[0];
      const now = new Date();
      const currentHour = now.getHours();

      if (currentHour >= startHour && currentHour < startHour + 2) {
        return 'ONGOING';
      }
      if (currentHour >= startHour - 1 && currentHour < startHour) {
        return 'UP NEXT';
      }
      return data.status || 'UP NEXT';
    } catch {
      return data.status || 'UP NEXT';
    }
  }, [data.lesson_slot, data.status]);

  // Logic đổ màu theo trạng thái
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'ONGOING':
        return "text-red-600 bg-red-50 border-red-100";
      case 'UP NEXT':
        return "text-blue-600 bg-blue-50 border-blue-100";
      default: // AFTERNOON hoặc khác
        return "text-slate-400 bg-slate-50 border-slate-100";
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`relative bg-white p-6 rounded-2xl border-2 transition-all cursor-pointer hover:shadow-md ${
      calculatedStatus === 'ONGOING' ? 'border-red-400 shadow-lg ring-2 ring-red-50' : 
      calculatedStatus === 'UP NEXT' ? 'border-blue-400 shadow-lg' : 'border-transparent shadow-sm'
    }`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider border ${getStatusStyles(calculatedStatus)}`}>
          {calculatedStatus}
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onViewStudents?.(e);
            }}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Danh sách sinh viên"
          >
            <Users size={18} />
          </button>
          {/* <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
            <MoreVertical size={18} />
          </button> */}
        </div>
      </div>

      <div className="space-y-1 mb-6">
        <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">
          {data.subject.subject_name}
        </h3>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">
          {data.subject.subject_code} • Lớp {data.id}
        </p>
      </div>

      <div className="flex items-center gap-6 text-sm font-bold text-slate-600">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-slate-400" />
          <span>{data.lesson_slot}</span>
        </div>
        <div className="flex items-center gap-2 text-blue-800">
          <MapPin size={16} className="text-blue-500" />
          <span>Phòng {data.room}</span>
        </div>
      </div>
    </div>
  );
};

export default TodayClassCard;