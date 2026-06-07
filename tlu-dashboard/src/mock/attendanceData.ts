import type { Student } from "../types";

// Bổ sung thêm trường dữ liệu để phục vụ UC16 (Thống kê)
export interface AttendanceStudent extends Student {
  dbStudentId?: string;      // ID sinh viên thực tế trong database
  absenceRate: number;      // Tỷ lệ vắng mặt (%)
  totalAbsences: number;   // Tổng số tiết/buổi đã nghỉ
  attendanceHistory: {     // Lịch sử các buổi trước (để phục vụ UC16 kịch bản 6)
    date: string;
    status: "present" | "absent" | "late" | "ai_verified";
  }[];
}

export const attendanceStudentsMockData: AttendanceStudent[] = [
  {
    id: "1",
    studentId: "STU-2024-001",
    name: "Alice Johnson",
    email: "alice.johnson@university.edu",
    avatar: "AJ",
    status: "ai_verified",
    absenceRate: 5,
    totalAbsences: 1,
    attendanceHistory: [{ date: "2026-03-10", status: "present" }]
  },
  {
    id: "2",
    studentId: "STU-2024-002",
    name: "Bob Smith",
    email: "bob.smith@university.edu",
    avatar: "BS",
    status: "present",
    absenceRate: 18.5, // UC16: Sẽ bị cảnh báo đỏ (>15%)
    totalAbsences: 4,
    attendanceHistory: [{ date: "2026-03-10", status: "absent" }]
  },
  {
    id: "3",
    studentId: "STU-2024-003",
    name: "Charlie Brown",
    email: "charlie.brown@university.edu",
    avatar: "CB",
    status: "absent",
    absenceRate: 22, // UC16: Cảnh báo nguy cơ cấm thi (>20%)
    totalAbsences: 5,
    attendanceHistory: [{ date: "2026-03-10", status: "absent" }]
  },
  {
    id: "4",
    studentId: "STU-2024-004",
    name: "Diana Prince",
    email: "diana.prince@university.edu",
    avatar: "DP",
    status: "late",
    absenceRate: 12,
    totalAbsences: 2,
    attendanceHistory: [{ date: "2026-03-10", status: "late" }]
  },
  {
    id: "12",
    studentId: "STU-2024-012",
    name: "Lucy Martinez",
    email: "lucy.martinez@university.edu",
    avatar: "LM",
    status: "ai_verified",
    absenceRate: 2,
    totalAbsences: 0,
    attendanceHistory: [{ date: "2026-03-10", status: "present" }]
  },
  // Các sinh viên khác bạn có thể thêm tương tự...
];