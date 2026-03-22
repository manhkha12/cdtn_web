import React, { useMemo } from "react";
import type { Student } from "../../../types";

interface AttendanceSummaryWidgetProps {
  students: Student[];
}

export const AttendanceSummaryWidget: React.FC<
  AttendanceSummaryWidgetProps
> = ({ students }) => {
  const summary = useMemo(() => {
    const present = students.filter((s) => s.status === "present").length;
    const absent = students.filter((s) => s.status === "absent").length;
    const late = students.filter((s) => s.status === "late").length;
    const aiVerified = students.filter(
      (s) => s.status === "ai_verified",
    ).length;
    const presentAndLate = present + late + aiVerified;
    const total = students.length;
    const rate = total > 0 ? Math.round((presentAndLate / total) * 100) : 0;

    return { present, absent, late, aiVerified, presentAndLate, total, rate };
  }, [students]);

  return (
    <div className="fixed bottom-6 right-6 w-80 z-40">
      <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Red accent strip */}
        <div className="h-1 bg-red-600 w-full" />

        <div className="p-6 text-white">
          <div className="grid grid-cols-3 gap-4">
            {/* Present */}
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                Present
              </p>
              <p className="text-3xl font-bold text-white">{summary.present}</p>
            </div>

            {/* Absent */}
            <div className="text-center border-l border-r border-slate-700">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                Absent
              </p>
              <p className="text-3xl font-bold text-white">{summary.absent}</p>
            </div>

            {/* Rate */}
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                Rate
              </p>
              <p className="text-3xl font-bold text-white">{summary.rate}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummaryWidget;
