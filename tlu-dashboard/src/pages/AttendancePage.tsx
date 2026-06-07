import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { API_BASE_URL } from "../repository/api";
import { AttendanceApi } from "../repository/AttendanceApi";
import type { AttendanceStudent } from "../mock/attendanceData";
import AttendanceHeader from "../features/attendance/components/AttendanceHeader";
import AttendanceTable from "../features/attendance/components/AttendanceTable";
import { EditStatusModal } from "../features/attendance/components/EditStatusModal";
import { LecturerApi } from "../repository/LecturerApi";
import { CourseClassApi } from "../repository/CourseClassApi";
import type { ClassStudent } from "../types";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PageTitle from "../components/common/PageTitle";

interface AttendancePageProps {
  sessionId?: string | null;
  onBack?: () => void;
}

// Helper to check if a lesson slot is current or upcoming
const isRelevantSlot = (slot: string) => {
  try {
    const [start] = slot.split("-");
    const [startHour, startMin] = start.split(":").map(Number);
    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    
    const startTimeInMinutes = startHour * 60 + startMin;
    const nowInMinutes = currentHour * 60 + currentMin;

    // Lấy các lớp đang diễn ra hoặc sắp bắt đầu trong 30p tới
    return nowInMinutes >= startTimeInMinutes - 30 && nowInMinutes <= startTimeInMinutes + 120;
  } catch {
    return false;
  }
};

export const AttendancePage: React.FC<AttendancePageProps> = ({ sessionId: propSessionId, onBack }) => {
  const { sessionId: paramSessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const sessionId = propSessionId || paramSessionId;

  const [studentData, setStudentData] = useState<AttendanceStudent[]>([]);
  const [sessionDetails, setSessionDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<AttendanceStudent | null>(null);

  const mapStatusToFrontend = (status: number, method: string): "present" | "absent" | "late" | "ai_verified" => {
    if (status === 1) {
      if (method === 'FACE_ID') return 'ai_verified';
      return 'present';
    }
    if (status === 2) return 'late';
    return 'absent';
  };

  const mapFrontendToStatus = (status: string) => {
    if (status === 'present' || status === 'ai_verified') return 1;
    if (status === 'late') return 2;
    return 0; // absent
  };

  // 1. Smart Auto-select session if none provided
  useEffect(() => {
    if (!sessionId) {
      const autoSelect = async () => {
        setLoading(true);
        try {
          const now = new Date();
          const todayValue = now.getDay() === 0 ? 8 : now.getDay() + 1;
          
          // 1.1 Tìm các lớp được phân công hôm nay
          const myClasses = await LecturerApi.getMyClasses();
          const todayClasses = myClasses.filter(c => c.day_of_week === todayValue);
          
          // 1.2 Tìm lớp đang dạy hoặc sắp dạy
          const activeClass = todayClasses.find(c => isRelevantSlot(c.lesson_slot));
          
          if (activeClass) {
            const sessions = await AttendanceApi.getSessionsByClass(activeClass.id);
            const todayStr = now.toISOString().split('T')[0];
            const todaySession = sessions.find(s => s.date && s.date.startsWith(todayStr));
            
            if (todaySession) {
              navigate(`/attendance/${todaySession.id}`, { replace: true });
              return;
            }
          }

          // 1.3 Fallback: No general 'get all sessions' endpoint in backend, 
          // so we don't do anything here. The user will need to select from schedule.
          console.log("No active class session found to auto-select.");
        } catch (error) {
          console.error("Auto-select session failed:", error);
        } finally {
          setLoading(false);
        }
      };
      autoSelect();
    }
  }, [sessionId, navigate]);

  // 2. Load session data and setup socket
  useEffect(() => {
    if (!sessionId) return;

    let socket: Socket | null = null;

    const loadData = async () => {
      setLoading(true);
      try {
        // 1. Load session details first
        const details = await AttendanceApi.getSessionDetails(sessionId);
        setSessionDetails(details);
        
        const classId = details.course_class_id;

        // 2. Extract records from details and fetch class students
        const records = details.records || [];
        const [classStudents] = await Promise.all([
          CourseClassApi.getStudentsByClass(classId)
        ]);
        
        // 3. Map students, merging status from records
        const mapped = classStudents.map((cs: ClassStudent): AttendanceStudent => {
          const record = records.find((r: any) => 
            r.student_id?.toString() === cs.id.toString() || r.student?.student_code === cs.student_code
          );
          
          return {
            id: record?.id || `temp-${cs.id}`, // Use record id or temp id
            name: cs.full_name,
            studentId: cs.student_code,
            email: cs.email || `${cs.student_code}@student.tlu.edu.vn`,
            avatar: cs.avatar_url || "",
            status: record ? mapStatusToFrontend(record.status, record.attendance_method) : 'absent',
            // Store original student id for record creation
            dbStudentId: cs.id,
            absenceRate: 0,
            totalAbsences: 0,
            attendanceHistory: []
          };
        });
        setStudentData(mapped);

        // Setup socket
        socket = io(API_BASE_URL + '/attendance', { 
          transports: ['websocket', 'polling'] 
        });
        socket.on('connect', () => {
          socket?.emit('joinSession', { sessionId });
        });

        socket.on('attendanceUpdated', (data) => {
          const record = data.record;
          setStudentData(prev => prev.map(s => 
            (s.id === record.id || s.dbStudentId?.toString() === record.student_id?.toString())
              ? { ...s, id: record.id, status: mapStatusToFrontend(record.status, record.attendance_method) }
              : s
          ));
        });

        socket.on('attendanceBulkUpdated', (data) => {
          const bulkRecords = data.records;
          setStudentData(prev => prev.map(s => {
            const updated = bulkRecords.find((r: any) => 
              r.id === s.id || r.student_id?.toString() === s.dbStudentId?.toString()
            );
            if (updated) {
              return { ...s, id: updated.id, status: mapStatusToFrontend(updated.status, updated.attendance_method) };
            }
            return s;
          }));
        });

      } catch (err) {
        console.error("Error loading attendance data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    return () => {
      if (socket) {
        socket.emit('leaveSession', { sessionId });
        socket.disconnect();
      }
    };
  }, [sessionId]);



  const handleEditClick = (student: AttendanceStudent) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const saveEdit = async (newStatus: "present" | "absent" | "late" | "ai_verified", reason: string) => {
    if (!editingStudent || !sessionId) return;
    try {
      const statusValue = mapFrontendToStatus(newStatus);
      const method = newStatus === 'ai_verified' ? 'FACE_ID' : 'MANUAL';

      if (editingStudent.id.startsWith('temp-')) {
        await AttendanceApi.bulkUpdateRecords(sessionId, [{
          student_id: editingStudent.dbStudentId!,
          status: statusValue,
          attendance_method: method,
          note: reason
        }]);
      } else {
        await AttendanceApi.updateRecord(editingStudent.id, {
          status: statusValue,
          note: reason,
          attendance_method: method,
          is_manual_override: true
        });
      }
      
      // Optimistic update
      setStudentData(prev => prev.map((s): AttendanceStudent => 
        s.id === editingStudent.id ? { ...s, status: newStatus } : s
      ));
    } catch (err) {
      console.error(err);
      toast.error("Failed to update attendance");
    } finally {
      setIsModalOpen(false);
      setEditingStudent(null);
    }
  };

  const handleStatusChange = async (recordId: string, newStatus: any) => {
    const student = studentData.find(s => s.id === recordId);
    if (!student || !sessionId) return;

    try {
      const statusValue = mapFrontendToStatus(newStatus);
      const method = newStatus === 'ai_verified' ? 'FACE_ID' : 'MANUAL';

      if (recordId.startsWith('temp-')) {
        await AttendanceApi.bulkUpdateRecords(sessionId, [{
          student_id: student.dbStudentId!,
          status: statusValue,
          attendance_method: method,
          note: ""
        }]);
      } else {
        await AttendanceApi.updateRecord(recordId, {
          status: statusValue,
          attendance_method: method,
          is_manual_override: true
        });
      }

      // Optimistic update
      setStudentData(prev => prev.map((s): AttendanceStudent => 
        s.id === recordId ? { ...s, status: newStatus } : s
      ));
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const handleExport = async () => {
    if (!sessionId) return;
    setIsExporting(true);
    try {
      const blob = await AttendanceApi.exportExcel(sessionId);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      
      const subjectCode = sessionDetails?.course_class?.subject?.subject_code || "";
      const dateStr = sessionDetails?.date ? new Date(sessionDetails.date).toLocaleDateString('en-GB').replace(/\//g, '-') : "";
      const filename = `diem_danh_${subjectCode || 'buoi'}_${dateStr || sessionId}.xlsx`;
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success("Xuất file Excel thành công!");
    } catch (err) {
      console.error("Export Excel error:", err);
      toast.error("Không thể xuất file Excel");
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-slate-500 flex items-center justify-center min-h-screen">Loading attendance data...</div>;
  }

  if (!loading && studentData.length === 0 && !sessionDetails) {
    return (
      <div className="p-10 text-center text-slate-500 flex items-center justify-center min-h-screen">
        Không có buổi học nào. Vui lòng chọn từ Schedule.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f9] pb-32">
      <div className="container mx-auto px-6 py-6 max-w-7xl space-y-6 animate-in fade-in duration-700">
        <PageTitle title="Chi tiết điểm danh" className="mb-4" />
        
        {/* UC15 - Luồng 7.1: Quay lại danh sách lớp */}
        {onBack && (
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-all font-black text-[10px] uppercase tracking-[0.2em] bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md"
          >
            <ArrowLeft size={14} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" /> 
            Trở lại danh sách lớp
          </button>
        )}

      <AttendanceHeader
        courseTitle={sessionDetails?.course_class?.subject?.subject_name || "Student Enrollment List"}
        courseCode={sessionDetails?.course_class?.subject?.subject_code || "N/A"}
        section="01"
        room="A101"
        date={sessionDetails?.date ? new Date(sessionDetails.date).toLocaleDateString() : "N/A"}
        time={sessionDetails?.check_in_time ? new Date(sessionDetails.check_in_time).toISOString().substring(11, 16) : "N/A"}
        onExport={handleExport}
        isExporting={isExporting}
      />

      <div className="space-y-6">
        <AttendanceTable
          students={studentData}
          onStatusChange={handleStatusChange}
          onEditClick={handleEditClick}
          totalStudents={studentData.length}
        />
      </div>

      {isModalOpen && editingStudent && (
        <EditStatusModal 
          student={editingStudent}
          currentStatus={editingStudent.status}
          onSave={saveEdit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      </div>
    </div>
  );
};

export default AttendancePage;