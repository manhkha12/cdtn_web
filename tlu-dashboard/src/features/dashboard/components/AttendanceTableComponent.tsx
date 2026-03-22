import React from "react";
import Card from "../../../components/common/Card";
import StatusBadge from "../../../components/common/StatusBadge";
import type { Student } from "../../../types";

interface AttendanceTableComponentProps {
  students: Student[];
}

export const AttendanceTableComponent: React.FC<
  AttendanceTableComponentProps
> = ({ students }) => {
  return (
    <Card className="border-0 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-950 mb-1">
          Recent Attendance
        </h2>
        <p className="text-sm text-slate-500">
          Latest student attendance records
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left px-6 py-3 font-semibold text-xs text-slate-500 uppercase tracking-wider bg-slate-50/50">
                Name
              </th>
              <th className="text-left px-6 py-3 font-semibold text-xs text-slate-500 uppercase tracking-wider bg-slate-50/50">
                Email
              </th>
              <th className="text-left px-6 py-3 font-semibold text-xs text-slate-500 uppercase tracking-wider bg-slate-50/50">
                Status
              </th>
              <th className="text-center px-6 py-3 font-semibold text-xs text-slate-500 uppercase tracking-wider bg-slate-50/50">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.id}
                className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                  index === students.length - 1 ? "" : ""
                }`}
              >
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-900 text-sm">
                    {student.name}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-slate-600 text-sm">{student.email}</p>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge variant={student.status}>
                    {student.status === "present"
                      ? "Present"
                      : student.status === "late"
                        ? "Late"
                        : "Absent"}
                  </StatusBadge>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline transition-colors">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default AttendanceTableComponent;
