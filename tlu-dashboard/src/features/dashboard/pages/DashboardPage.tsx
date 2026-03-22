import React, { useState } from "react";
import WelcomeSection from "../components/WelcomeSection";
import StatCardComponent from "../components/StatCardComponent";
import AttendanceTableComponent from "../components/AttendanceTableComponent";
import {
  getStatsMockData,
  studentsMockData,
} from "../../../mock/dashboardData";

export const DashboardPage: React.FC = () => {
  const [students] = useState(studentsMockData);
  const [stats] = useState(getStatsMockData());

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Section */}
      <WelcomeSection userName="Dr. John Doe" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <StatCardComponent
            key={index}
            icon={stat.icon}
            iconSize={stat.iconSize}
            label={stat.label}
            value={stat.value}
            description={stat.description}
            color={stat.color}
          />
        ))}
      </div>

      {/* Attendance Table */}
      <AttendanceTableComponent students={students} />
    </div>
  );
};

export default DashboardPage;
