import apiClient from "./apiClient";
import { ENDPOINTS } from "./api";

export interface AttendanceOverview {
  summary: {
    totalStudents: number;
    goodAttendance: number;
    warningAttendance: number;
    criticalAttendance: number;
    averageAttendanceRate: number;
  };
  attendanceRates: Array<{
    name: string;
    count: number;
    percentage: number;
    color: string;
  }>;
  totalAtRisk: number;
}

export interface AttendanceChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string[];
  }>;
}

export interface AtRiskStudent {
  id: string;
  studentCode: string;
  fullName: string;
  className: string;
  attendanceRate: number;
  absentSessions: number;
  totalSessions: number;
  riskLevel: 'CRITICAL' | 'WARNING';
}

export const StatisticsApi = {
  getOverview: async (params?: any) => {
    const response = await apiClient.get<{ data: AttendanceOverview }>(ENDPOINTS.STATISTICS.OVERVIEW, { params });
    return response.data.data;
  },
  getChartData: async (params?: any) => {
    const response = await apiClient.get<{ data: AttendanceChartData }>(ENDPOINTS.STATISTICS.CHART, { params });
    return response.data.data;
  },
  getStudentsAtRisk: async (params?: any) => {
    const response = await apiClient.get<{ data: { studentsAtRisk: AtRiskStudent[] } }>(ENDPOINTS.STATISTICS.AT_RISK, { params });
    return response.data.data.studentsAtRisk;
  },
};
