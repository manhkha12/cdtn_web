import React from "react";
import { MoreVertical, Check, X } from "lucide-react";
import Card from "../../../components/common/Card";
import type { Student } from "../../../types";

interface AttendanceTableProps {
  students: Student[];
  onStatusChange: (
    studentId: string,
    newStatus: "present" | "absent" | "late" | "ai_verified",
  ) => void;
  totalStudents: number;
}

const getStatusBadge = (status: Student["status"]) => {
  const statusConfig: Record<
    string,
    { bgColor: string; textColor: string; label: string }
  > = {
    ai_verified: {
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
      label: "AI VERIFIED",
    },
    present: {
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-700",
      label: "PRESENT",
    },
    absent: {
      bgColor: "bg-red-100",
      textColor: "text-red-700",
      label: "ABSENT",
    },
    late: {
      bgColor: "bg-amber-100",
      textColor: "text-amber-700",
      label: "LATE (15M)",
    },
  };

  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.textColor}`}
    >
      {config.label}
    </span>
  );
};

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
  students,
  onStatusChange,
  totalStudents,
}) => {
  return (
    <Card className="border-0 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-950">Student Records</h2>
        <p className="text-sm text-slate-500 mt-1">
          Showing {students.length} of {totalStudents} students
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50">
              <th className="text-left px-6 py-3 font-semibold text-xs text-slate-600 uppercase tracking-wider">
                Student Profile
              </th>
              <th className="text-left px-6 py-3 font-semibold text-xs text-slate-600 uppercase tracking-wider">
                Student ID
              </th>
              <th className="text-left px-6 py-3 font-semibold text-xs text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="text-right px-6 py-3 font-semibold text-xs text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors duration-150"
              >
                {/* Student Profile */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm flex-shrink-0">
                      {student.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 text-sm">
                        {student.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {student.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Student ID */}
                <td className="px-6 py-4">
                  <span className="inline-flex px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-mono font-medium rounded-md">
                    {student.studentId}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">{getStatusBadge(student.status)}</td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onStatusChange(student.id, "present")}
                      className={`p-1.5 rounded-lg transition-all duration-200 ${
                        student.status === "present"
                          ? "bg-emerald-100 text-emerald-600 shadow-sm"
                          : "bg-slate-100 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
                      }`}
                      title="Mark as Present"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => onStatusChange(student.id, "absent")}
                      className={`p-1.5 rounded-lg transition-all duration-200 ${
                        student.status === "absent"
                          ? "bg-red-100 text-red-600 shadow-sm"
                          : "bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-600"
                      }`}
                      title="Mark as Absent"
                    >
                      <X size={16} />
                    </button>
                    <button
                      className="p-1.5 rounded-lg bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-all duration-200"
                      title="More options"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Showing <span className="font-semibold">{students.length}</span> of{" "}
          <span className="font-semibold">{totalStudents}</span> students
        </p>
        <div className="flex items-center gap-2">
          <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default AttendanceTable;
