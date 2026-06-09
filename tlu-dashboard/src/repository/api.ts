export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH:'/auth/refresh',
  },
  ATTENDANCE: {
    SESSIONS: '/attendance/sessions',
    RECORDS: '/attendance/records',
    STATS: '/attendance/stats',
  },
  LECTURERS: {
    MY_CLASSES: '/lecturers/my-classes',
  },
  MESSAGING: {
    CONVERSATIONS: '/messaging/conversations',
    MESSAGES: '/messaging/messages',
    SEARCH_USERS: '/messaging/users/search',
  },
  COURSE_CLASSES: {
    STUDENTS: (id: string) => `/course-classes/${id}/students`,
  },
  STATISTICS: {
    OVERVIEW: '/api/statistics/attendance-overview',
    CHART: '/api/statistics/attendance-chart',
    AT_RISK: '/api/statistics/students-at-risk',
  },
  POSTS: {
    BASE: '/posts',
    BY_ID: (id: string) => `/posts/${id}`,
    MY_POSTS: '/posts/me/all',
  },
  USERS: {
    ME: '/users/me',
  },
  SEMESTERS: {
    BASE: '/semesters',
  }
};