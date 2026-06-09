import React, { useState, useEffect, useMemo } from "react";
import TodayClassCard from "../components/TodayClassCard";
import { CalendarDays, ChevronLeft, ChevronRight, LayoutGrid, List } from "lucide-react";
import { LecturerApi } from "../../../repository/LecturerApi";
import { useSemester } from "../../../components/context/SemesterContext";
import { AttendanceApi } from "../../../repository/AttendanceApi";
import type { CourseClass } from "../../../types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import StudentListModal from "../components/StudentListModal";
import { WeeklyScheduleGrid } from "../components/WeeklyScheduleGrid";
import PageTitle from "../../../components/common/PageTitle";

export const SchedulePage: React.FC = () => {
  const { selectedSemesterId } = useSemester();
  const [classes, setClasses] = useState<CourseClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<{ id: string; name: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedSemesterId) return;

    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const data = await LecturerApi.getMyClasses(selectedSemesterId);
        console.log("[SchedulePage] Fetched classes:", data);
        setClasses(data);
      } catch (error: any) {
        console.error("Failed to fetch schedule:", error);
        const errorMsg = error.response?.data?.message || error.message || "Không thể tải lịch dạy";
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [selectedSemesterId]);

  const handleClassClick = async (classId: string) => {
    try {
      const sessions = await AttendanceApi.getSessionsByClass(classId);
      if (sessions && sessions.length > 0) {
        // Tìm buổi học của ngày hôm nay
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];
        const todaySession = sessions.find(s => s.date && s.date.startsWith(todayStr));
        
        if (todaySession) {
          navigate(`/attendance/${todaySession.id}`);
        } else {
          // Nếu không có buổi hôm nay, lấy buổi mới nhất (đầu danh sách)
          navigate(`/attendance/${sessions[0].id}`);
        }
      } else {
        toast.error("Không có buổi học nào cho lớp này");
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
      toast.error("Không thể truy cập buổi học");
    }
  };

  const handleViewStudents = (item: CourseClass) => {
    setSelectedClass({ id: item.id, name: item.subject.subject_name });
    setIsModalOpen(true);
  };

  // Get current day of week (1-7 in JS, where 1 is Monday, 0 is Sunday)
  // Our backend uses 2-8 where 2 is Monday.
  const todayValue = useMemo(() => {
    const jsDay = new Date().getDay(); // 0: Sunday, 1: Monday, ...
    return jsDay === 0 ? 8 : jsDay + 1;
  }, []);

  const todayClasses = useMemo(() => 
    Array.isArray(classes) ? classes.filter(c => c.day_of_week === todayValue) : [],
  [classes, todayValue]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#f4f6f9] min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <PageTitle title="Lịch giảng dạy" className="mb-1" />
          <p className="text-slate-500 font-medium text-sm">Quản lý lịch học và các buổi dạy hàng ngày của bạn</p>
        </div>
        <div className="flex bg-white border rounded-xl p-1 shadow-sm">
          <button className="p-2 bg-slate-100 rounded-lg text-slate-900"><LayoutGrid size={18}/></button>
          <button className="p-2 text-slate-400"><List size={18}/></button>
        </div>
      </div>

      {/* 1. Today's Classes Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
              <CalendarDays size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Today's Sessions</h2>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors"><ChevronLeft size={18} /></button>
            <button className="p-2 border rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors"><ChevronRight size={18} /></button>
          </div>
        </div>

        {todayClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todayClasses.map((item) => (
              <TodayClassCard 
                key={item.id} 
                data={item} 
                onClick={() => handleClassClick(item.id)} 
                onViewStudents={() => handleViewStudents(item)}
              />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">Hôm nay bạn không có lịch dạy</p>
          </div>
        )}
      </section>

      <hr className="border-slate-200" />

      {/* 2. Weekly Calendar Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
           <span className="p-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm">📅</span>
           Weekly Overview
        </h2>
        
        <WeeklyScheduleGrid 
          classes={classes} 
          onClassClick={handleClassClick} 
        />
      </section>

      {/* Student List Modal */}
      {selectedClass && (
        <StudentListModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          classId={selectedClass.id}
          className={selectedClass.name}
        />
      )}
    </div>
  );
};

export default SchedulePage;