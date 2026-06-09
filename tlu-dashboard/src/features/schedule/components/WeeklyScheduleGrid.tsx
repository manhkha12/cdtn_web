import React from "react";
import type { CourseClass } from "../../../types";
import Card from "../../../components/common/Card";
import { isClassPassed } from "../utils/scheduleUtils";

interface WeeklyScheduleGridProps {
  classes: CourseClass[];
  onClassClick: (id: string) => void;
}

export const WeeklyScheduleGrid: React.FC<WeeklyScheduleGridProps> = ({ classes, onClassClick }) => {
  // Helper to get dates for the current week (Mon-Sun)
  const getCurrentWeekDates = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
    const monday = new Date(now.setDate(diff));
    
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return {
        label: i === 6 ? "Chủ nhật" : `Thứ ${i + 2}`,
        date: d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }),
        value: i === 6 ? 8 : i + 2, // Map to backend day_of_week (2-8)
        dateObj: d,
      };
    });
  };

  const weekDays = getCurrentWeekDates();
  
  // Buổi sáng: 7h -> 12h (Tiết 1-6)
  // Buổi chiều: 13h -> 17h (Tiết 7-12)
  // Buổi tối: 18h -> 23h (Tiết 13-15)
  const timeBlocks = [
    { label: "Sáng", time: "7h - 12h", periods: [1, 2, 3, 4, 5, 6] },
    { label: "Chiều", time: "13h - 17h", periods: [7, 8, 9, 10, 11, 12] },
    { label: "Tối", time: "18h - 23h", periods: [13, 14, 15] },
  ];

  const getClassesForSlot = (dayValue: number, periods: number[]) => {
    if (!Array.isArray(classes)) return [];
    
    return classes.filter((c) => {
      if (c.day_of_week !== dayValue) return false;
      if (!c.lesson_slot || typeof c.lesson_slot !== 'string') return false;
      
      const parts = c.lesson_slot.match(/\d+/g)?.map(Number);
      if (!parts || parts.length === 0) return false;
      
      const start = parts[0];
      const isHourBased = c.lesson_slot.includes(':');
      
      const isMorningBlock = periods.includes(1);
      const isAfternoonBlock = periods.includes(7);
      const isEveningBlock = periods.includes(13);

      let belongsToMorning = false;
      let belongsToAfternoon = false;
      let belongsToEvening = false;

      if (isHourBased) {
        // Hour based: 7-12 morning, 13-17 afternoon, 18-23 evening
        belongsToMorning = start >= 7 && start <= 12;
        belongsToAfternoon = start >= 13 && start <= 17;
        belongsToEvening = start >= 18 && start <= 23;
      } else {
        // Period based: 1-6 morning, 7-12 afternoon, 13-15 evening
        belongsToMorning = start >= 1 && start <= 6;
        belongsToAfternoon = start >= 7 && start <= 12;
        belongsToEvening = start >= 13 && start <= 15;
      }

      if (isMorningBlock) return belongsToMorning;
      if (isAfternoonBlock) return belongsToAfternoon;
      if (isEveningBlock) return belongsToEvening;
      
      return false;
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
      <table className="w-full border-collapse min-w-[1000px]">
        <thead>
          <tr className="bg-slate-50">
            <th className="border-r border-b border-slate-200 p-4 w-28 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Buổi</th>
            {weekDays.map((day, idx) => (
              <th key={idx} className={`border-r border-b border-slate-200 p-4 min-w-[150px] ${idx === 0 ? 'bg-indigo-50/50' : ''}`}>
                <div className="flex flex-col items-center gap-0.5">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${idx === 0 ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {day.label}
                  </span>
                  <span className={`text-xs font-bold ${idx === 0 ? 'text-indigo-900' : 'text-slate-600'}`}>
                    {day.date}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeBlocks.map((block, bIdx) => (
            <tr key={bIdx} className="group">
              <td className="border-r border-b border-slate-100 p-4 text-center bg-slate-50/30">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {block.label}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap">
                    {block.time}
                  </span>
                </div>
              </td>
              {weekDays.map((day) => {
                const dayClasses = getClassesForSlot(day.value, block.periods);
                return (
                  <td key={`${day.value}-${bIdx}`} className="border-r border-b border-slate-100 p-2 align-top bg-white transition-colors group-hover:bg-slate-50/5">
                    <div className="flex flex-col gap-2">
                      {dayClasses.map((cls) => {
                        const isFinished = isClassPassed(cls, day.dateObj);
                        return (
                          <Card 
                            key={cls.id}
                            onClick={isFinished ? undefined : () => onClassClick(cls.id)}
                            className={`p-3 border transition-all shadow-none ${
                              isFinished 
                                ? "border-slate-200 bg-slate-50/50 text-slate-400 cursor-not-allowed opacity-60 pointer-events-none" 
                                : "border-yellow-100 bg-yellow-50/40 hover:bg-yellow-50 cursor-pointer hover:shadow-md"
                            }`}
                          >
                            <div className={`space-y-0.5 text-[10px] ${isFinished ? "text-slate-400" : "text-slate-700"}`}>
                              <p className="font-medium leading-tight">
                                -Môn: <span className={isFinished ? "font-medium" : "font-bold"}>{cls.subject.subject_name}</span> ({cls.subject.subject_code})
                              </p>
                              <p className="font-medium">-Mã LHP: <span className={isFinished ? "font-medium" : "font-bold"}>{cls.id}</span></p>
                              <p className="font-medium">-Lớp: <span className={isFinished ? "font-medium" : "font-bold"}>{cls.id}</span></p>
                              <p className="font-medium">-Giờ: <span className={isFinished ? "font-medium" : "font-bold"}>{cls.lesson_slot.replace('-', ' -> ')}</span></p>
                              <p className="font-medium">-Phòng: <span className={isFinished ? "font-medium" : "font-bold"}>{cls.room}</span></p>
                              {isFinished && (
                                <p className="font-bold text-[9px] text-slate-400 mt-1 uppercase tracking-wide">
                                  Đã kết thúc
                                </p>
                              )}
                            </div>
                          </Card>
                        );
                      })}
                      {dayClasses.length === 0 && (
                        <div className="h-10"></div>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
