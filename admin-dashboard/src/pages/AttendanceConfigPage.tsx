import React from "react";
import { ChevronRight, AlertTriangle, Activity, Bell } from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { StatusBadge } from "../components/common/Badge";
import ToggleSwitch from "../components/common/ToggleSwitch";
import Input from "../components/common/Input";
import {
  alertLevels,
  atRiskStudents,
  systemStatus,
  currentAlerts,
} from "../mocks/attendance.mock";

const AlertThresholdBox: React.FC<{
  level: {
    level: number;
    name: string;
    color: string;
    percentage: number;
  };
}> = ({ level }) => {
  const colorClasses = {
    blue: "border-blue-200 bg-blue-50",
    yellow: "border-yellow-200 bg-yellow-50",
    red: "border-red-200 bg-red-50",
  };

  const iconClasses = {
    blue: "text-blue-600",
    yellow: "text-yellow-600",
    red: "text-red-600",
  };

  return (
    <div
      className={`p-4 rounded-lg border-2 ${colorClasses[level.color as keyof typeof colorClasses]}`}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-gray-900">
          Level {level.level} - {level.name}
        </p>
        <AlertTriangle
          size={18}
          className={iconClasses[level.color as keyof typeof iconClasses]}
        />
      </div>
      <p className="text-xs text-gray-600 mb-3">Absence if above</p>
      <div className="flex items-center gap-2">
        <input
          type="number"
          defaultValue={level.percentage}
          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm font-semibold"
        />
        <span className="text-sm font-semibold text-gray-700">%</span>
      </div>
    </div>
  );
};

const StudentRiskRow: React.FC<{
  student: (typeof atRiskStudents)[number];
}> = ({ student }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4">
      <div>
        <p className="font-medium text-gray-900">{student.name}</p>
        <p className="text-xs text-gray-500">{student.studentId}</p>
      </div>
    </td>
    <td className="px-6 py-4 text-sm text-gray-700">{student.department}</td>
    <td className="px-6 py-4 text-sm">
      <span className="font-semibold text-gray-900">
        {student.absencePercentage}%
      </span>
    </td>
    <td className="px-6 py-4">
      <StatusBadge status={student.riskLevel} />
    </td>
    <td className="px-6 py-4 text-right">
      <button className="text-red-600 hover:text-red-700 font-medium text-sm">
        Action
      </button>
    </td>
  </tr>
);

export default function AttendanceConfigPage() {
  const [dailyScanEnabled, setDailyScanEnabled] = React.useState(true);

  return (
    <AdminLayout topbarTitle="Attendance Configuration">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <span className="text-gray-600">Settings</span>
        <ChevronRight size={16} className="text-gray-400" />
        <span className="text-gray-900 font-medium">
          Attendance Warning & Cronjob
        </span>
      </div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Attendance Warning & Cronjob Configuration
        </h1>
        <p className="text-sm text-gray-600">
          Manage attendance alert thresholds and automatic scan settings
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Left Column - Thresholds */}
        <div className="col-span-2">
          {/* Warning Thresholds Card */}
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Warning Thresholds
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {alertLevels.map((level) => (
                <AlertThresholdBox key={level.level} level={level} />
              ))}
            </div>
          </Card>

          {/* Cronjob Automation Card */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Cronjob Automation
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Enable Daily Scan</p>
                  <p className="text-sm text-gray-600">
                    Automatically scan attendance data daily
                  </p>
                </div>
                <ToggleSwitch
                  checked={dailyScanEnabled}
                  onChange={setDailyScanEnabled}
                />
              </div>

              {dailyScanEnabled && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity size={18} className="text-green-600" />
                    <p className="font-medium text-green-900">
                      Active monitoring system
                    </p>
                  </div>
                  <p className="text-sm text-green-700">
                    Daily scan will run at 6:00 PM and monitor all student
                    attendance records
                  </p>
                </div>
              )}

              <Button variant="secondary" size="md" className="w-full">
                Run Manual Scan Now
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column - Status Cards */}
        <div className="space-y-6">
          {/* System Status */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              System Status
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">
                  Status
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p className="text-sm font-semibold text-gray-900">
                    {systemStatus.status}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">
                  Uptime
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {systemStatus.uptime}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">
                  Last Sync
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {systemStatus.lastSync}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">
                  Next Scheduled Scan
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {systemStatus.nextScheduledScan}
                </p>
              </div>
            </div>
          </Card>

          {/* Current Alerts */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Current Alerts
            </h3>
            <div className="space-y-3">
              {currentAlerts.map((alert) => (
                <div key={alert.id} className="flex gap-3">
                  <Bell
                    size={16}
                    className="text-gray-400 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* At-Risk Students Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">At-Risk Students</h2>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search by name or ID..."
            className="flex-1"
          />
          <Button variant="secondary">Filter</Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Absence %
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {atRiskStudents.map((student) => (
                <StudentRiskRow key={student.id} student={student} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing 1 to {atRiskStudents.length} of {atRiskStudents.length}{" "}
            results
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              Previous
            </Button>
            <Button variant="secondary" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </AdminLayout>
  );
}
