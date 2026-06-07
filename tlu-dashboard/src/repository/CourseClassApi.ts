import apiClient from "./apiClient";
import { ENDPOINTS } from "./api";
import type { ClassStudent } from "../types";

export const CourseClassApi = {
  getStudentsByClass: async (classId: string) => {
    const response = await apiClient.get<{ data: ClassStudent[] }>(ENDPOINTS.COURSE_CLASSES.STUDENTS(classId));
    return response.data.data;
  },
};
