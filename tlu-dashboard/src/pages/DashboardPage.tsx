import React, { useState } from "react";
import WelcomeSection from "../features/dashboard/components/WelcomeSection";
import QuickAnnouncement from "../features/dashboard/components/QuickAnnouncement";
import AttendancePage from "./AttendancePage";
import { ArrowLeft, BookOpen, Users, LayoutGrid, Clock, Calendar } from "lucide-react";
import Card from "../components/common/Card";
import { AttendanceApi } from "../repository/AttendanceApi";
import { StatisticsApi } from "../repository/StatisticsApi";
import { LecturerApi } from "../repository/LecturerApi";

import AttendanceStatsWidget from "../features/dashboard/components/AttendanceStatsWidget";
import AttendanceChartWidget from "../features/dashboard/components/AttendanceChartWidget";
import AtRiskStudentsWidget from "../features/dashboard/components/AtRiskStudentsWidget";
import { useAuth } from "../components/context/AuthContext";
import { useSemester } from "../components/context/SemesterContext";
import PageTitle from "../components/common/PageTitle";
import { useQuery } from "@tanstack/react-query";

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { selectedSemesterId } = useSemester();
  const [viewMode, setViewMode] = useState<"overview" | "courses" | "students">(
    "overview",
  );
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  // 1. Tải Overview stats qua React Query
  const { data: overview = null, isLoading: loadingOverview } = useQuery({
    queryKey: ["attendanceOverview", selectedSemesterId],
    queryFn: () => StatisticsApi.getOverview({ semesterId: selectedSemesterId }),
    enabled: viewMode === "overview" && !!selectedSemesterId,
  });

  // 2. Tải Chart data qua React Query
  const { data: chartData = null, isLoading: loadingChart } = useQuery({
    queryKey: ["attendanceChart", selectedSemesterId],
    queryFn: () => StatisticsApi.getChartData({ semesterId: selectedSemesterId }),
    enabled: viewMode === "overview" && !!selectedSemesterId,
  });

  // 3. Tải sinh viên có nguy cơ cấm thi
  const { data: atRiskStudents = [], isLoading: loadingRisk } = useQuery({
    queryKey: ["studentsAtRisk", selectedSemesterId],
    queryFn: () => StatisticsApi.getStudentsAtRisk({ semesterId: selectedSemesterId }),
    enabled: viewMode === "overview" && !!selectedSemesterId,
  });

  // 4. Tải các lớp của giảng viên
  const { data: myClasses = [], isLoading: loadingClasses } = useQuery({
    queryKey: ["lecturerClasses", selectedSemesterId],
    queryFn: () => LecturerApi.getMyClasses(selectedSemesterId!),
    enabled: (viewMode === "overview" || viewMode === "courses") && !!selectedSemesterId,
  });

  // 5. Tải danh sách buổi học
  const { data: sessions = [], isLoading: loadingSessions } = useQuery({
    queryKey: ["attendanceSessions"],
    queryFn: AttendanceApi.getSessions,
    enabled: viewMode === "courses",
  });

  const loadingStats = loadingOverview || loadingChart || loadingRisk || loadingClasses;

  // --- VIEW 1: OVERVIEW (DASHBOARD CHÍNH) ---
  if (viewMode === "overview") {
    const lecturer = user?.lecturer;
    const fullName = lecturer?.full_name || user?.username || "Giảng viên";

    return (
      <div className="p-6 space-y-6 bg-[#f4f6f9] min-h-screen animate-in fade-in duration-500">
        <PageTitle title="Trang chủ" />
        <WelcomeSection userName={fullName} />

        {/* 1. Stats Row */}
        <AttendanceStatsWidget data={overview} loading={loadingStats} />

        {/* 2. Charts & At Risk Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AttendanceChartWidget data={chartData} loading={loadingStats} />
          </div>
          <div className="lg:col-span-1">
            <AtRiskStudentsWidget students={atRiskStudents} loading={loadingStats} />
          </div>
        </div>

        {/* 3. Secondary Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-4">
             <QuickAnnouncement classes={myClasses} />
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: COURSES LIST (UC14 - DANH SÁCH LỚP DẠY) ---
  if (viewMode === "courses") {
    return (
      <div className="p-6 space-y-6 bg-[#f4f6f9] min-h-screen animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setViewMode("overview")}
            className="flex items-center gap-2 text-slate-400 hover:text-[#800000] font-black text-[10px] uppercase tracking-[0.2em] transition-all"
          >
            <ArrowLeft size={16} /> Quay lại trang chủ
          </button>
          <div className="flex justify-between items-end">
            <div>
              <PageTitle title="Danh sách lớp học" className="mb-1" />
              <p className="text-slate-500 font-medium text-sm">
                Chọn một lớp để quản lý điểm danh và sinh viên
              </p>
            </div>
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
              <LayoutGrid className="text-slate-400" size={20} />
            </div>
          </div>
        </div>

        {loadingSessions ? (
          <div className="flex justify-center items-center py-20 text-slate-400">Loading sessions...</div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-20 text-slate-400">No sessions available</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {sessions.map((session) => (
              <Card
                key={session.id}
                onClick={() => {
                  setSelectedSessionId(session.id);
                  setViewMode("students");
                }}
                className="p-8 border-0 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group relative overflow-hidden bg-white"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <BookOpen size={28} />
                  </div>
                  <span className="text-[10px] font-black bg-slate-50 text-slate-400 px-3 py-1.5 rounded-full border border-slate-100 uppercase tracking-widest">
                    {session.course_class?.subject?.subject_code || 'N/A'}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-800 leading-[1.1] mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {session.course_class?.subject?.subject_name || 'Khóa học không xác định'}
                </h3>
                
                <div className="flex items-center gap-4 mb-6 text-sm text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5"><Calendar size={14} className="text-blue-400"/> {session.date ? new Date(session.date).toLocaleDateString() : 'N/A'}</div>
                  <div className="flex items-center gap-1.5"><Clock size={14} className="text-blue-400"/> {session.check_in_time ? new Date(session.check_in_time).toISOString().substring(11, 16) : 'N/A'}</div>
                </div>

                <div className="flex items-center gap-6 pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-tighter">
                    <Users size={16} className="text-blue-500" />
                    <span>{session._count?.records || 0} Records</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // --- VIEW 3: STUDENTS LIST ---
  return (
    <AttendancePage
      sessionId={selectedSessionId}
      onBack={() => setViewMode("courses")}
    />
  );
};

export default DashboardPage;
