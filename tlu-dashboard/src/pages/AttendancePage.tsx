import React, { useState, useMemo } from "react";
import type { Student } from "../types";
import { attendanceStudentsMockData } from "../mock/attendanceData";
import AttendanceHeader from "../features/attendance/components/AttendanceHeader";
import AttendanceFilters from "../features/attendance/components/AttendanceFilters";
import AttendanceTable from "../features/attendance/components/AttendanceTable";
import AttendanceSummaryWidget from "../features/attendance/components/AttendanceSummaryWidget";

interface FilterTab {
  id: string;
  label: string;
  count: number;
}

export const AttendancePage: React.FC = () => {
  const [searchStudent, setSearchStudent] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [studentData, setStudentData] = useState<Student[]>(
    attendanceStudentsMockData as Student[],
  );

  // Build filter tabs with counts
  const filterTabs: FilterTab[] = useMemo(() => {
    return [
      { id: "all", label: "All Students", count: studentData.length },
      {
        id: "ai_verified",
        label: "AI Verified",
        count: studentData.filter((s) => s.status === "ai_verified").length,
      },
      {
        id: "present",
        label: "Present",
        count: studentData.filter((s) => s.status === "present").length,
      },
      {
        id: "late",
        label: "Late",
        count: studentData.filter((s) => s.status === "late").length,
      },
      {
        id: "absent",
        label: "Absent",
        count: studentData.filter((s) => s.status === "absent").length,
      },
    ];
  }, [studentData]);

  // Filter students based on search and status filter
  const filteredStudents = useMemo(() => {
    let filtered = studentData.filter(
      (student) =>
        student.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
        student.email.toLowerCase().includes(searchStudent.toLowerCase()) ||
        student.studentId?.toLowerCase().includes(searchStudent.toLowerCase()),
    );

    if (activeFilter !== "all") {
      filtered = filtered.filter((s) => s.status === activeFilter);
    }

    return filtered;
  }, [studentData, searchStudent, activeFilter]);

  // Handle status change
  const handleStatusChange = (
    studentId: string,
    newStatus: "present" | "absent" | "late" | "ai_verified",
  ) => {
    setStudentData(
      studentData.map((student) =>
        student.id === studentId ? { ...student, status: newStatus } : student,
      ),
    );
  };

  return (
    <div className="pb-32 container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
      {/* Header */}
      <AttendanceHeader
        courseTitle="Mobile App Development"
        courseCode="CS-102"
        section="01"
        room="A101"
        date="March 18, 2026"
        time="08:00 - 09:30"
      />

      {/* Filters */}
      <AttendanceFilters
        searchValue={searchStudent}
        onSearchChange={setSearchStudent}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        filters={filterTabs}
      />

      {/* Table */}
      <AttendanceTable
        students={filteredStudents}
        onStatusChange={handleStatusChange}
        totalStudents={studentData.length}
      />

      {/* Summary Widget */}
      <AttendanceSummaryWidget students={studentData} />
    </div>
  );
};

export default AttendancePage;
