import apiClient from "./apiClient";
import { ENDPOINTS } from "./api";
import type { AttendanceSession, AttendanceRecord } from "../types";

export const AttendanceApi = {
  // Lấy tất cả session
  getSessions: async () => {
    const response = await apiClient.get<{ data: AttendanceSession[] }>(ENDPOINTS.ATTENDANCE.SESSIONS);
    return response.data.data;
  },

  // Lấy chi tiết buổi học (kèm list record)
  getSessionDetails: async (sessionId: string) => {
    const response = await apiClient.get<{ data: any }>(`${ENDPOINTS.ATTENDANCE.SESSIONS}/${sessionId}`);
    return response.data.data;
  },

  // Lấy các record điểm danh của 1 buổi
  getRecordsBySession: async (sessionId: string) => {
    const response = await apiClient.get<{ data: AttendanceRecord[] }>(`${ENDPOINTS.ATTENDANCE.RECORDS}/session/${sessionId}`);
    return response.data.data;
  },

  // Cập nhật record điểm danh (1 sinh viên)
  updateRecord: async (recordId: string, payload: Partial<AttendanceRecord>) => {
    const response = await apiClient.patch<{ data: any }>(`${ENDPOINTS.ATTENDANCE.RECORDS}/${recordId}`, payload);
    return response.data.data;
  },

  // Điểm danh hàng loạt
  bulkUpdateRecords: async (sessionId: string, records: any[]) => {
    const response = await apiClient.post<{ data: any }>(`${ENDPOINTS.ATTENDANCE.RECORDS}/bulk`, {
      session_id: sessionId,
      records
    });
    return response.data.data;
  },

  // Lấy thống kê của buổi điểm danh
  getStatsBySession: async (sessionId: string) => {
    const response = await apiClient.get<{ data: any }>(`${ENDPOINTS.ATTENDANCE.STATS}/session/${sessionId}`);
    return response.data.data;
  },

  // Lấy danh sách buổi điểm danh theo lớp học phần
  getSessionsByClass: async (courseClassId: string) => {
    const response = await apiClient.get<{ data: AttendanceSession[] }>(`${ENDPOINTS.ATTENDANCE.SESSIONS}/course-class/${courseClassId}`);
    return response.data.data;
  },

  // Xuất báo cáo điểm danh ra file Excel
  exportExcel: async (sessionId: string) => {
    const response = await apiClient.get<Blob>(`${ENDPOINTS.ATTENDANCE.SESSIONS}/${sessionId}/export-excel`, {
      responseType: 'blob',
    });
    return response.data;
  }
};
