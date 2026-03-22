import React from "react";
import { Printer, Save } from "lucide-react";
import Card from "../../../components/common/Card";

interface AttendanceHeaderProps {
  courseTitle: string;
  courseCode: string;
  section: string;
  room: string;
  date: string;
  time: string;
}

export const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({
  courseTitle,
  courseCode,
  section,
  room,
  date,
  time,
}) => {
  return (
    <Card className="mb-6 border-0 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-950 mb-3">
            {courseTitle}
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
              {courseCode}
            </span>
            <span className="text-sm text-slate-500">•</span>
            <span className="text-sm font-medium text-slate-600">
              Section {section}
            </span>
            <span className="text-sm text-slate-500">•</span>
            <span className="text-sm font-medium text-slate-600">
              Room {room}
            </span>
            <span className="text-sm text-slate-500">•</span>
            <span className="text-sm font-medium text-slate-600">{date}</span>
            <span className="text-sm text-slate-500">•</span>
            <span className="text-sm font-medium text-slate-600">{time}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-6">
          <button className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium text-sm rounded-lg hover:bg-slate-50 transition-colors duration-200 flex items-center gap-2">
            <Printer size={18} />
            Print List
          </button>
          <button className="px-4 py-2 bg-red-600 text-white font-semibold text-sm rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-2 shadow-sm">
            <Save size={18} />
            Save Attendance
          </button>
        </div>
      </div>
    </Card>
  );
};

export default AttendanceHeader;
