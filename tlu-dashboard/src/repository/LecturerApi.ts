import apiClient from "./apiClient";
import { ENDPOINTS } from "./api";
import type { CourseClass } from "../types";

export const LecturerApi = {
  getMyClasses: async (semesterId?: string) => {
    const response = await apiClient.get<{ data: CourseClass[] }>(ENDPOINTS.LECTURERS.MY_CLASSES, {
      params: semesterId ? { semesterId } : undefined
    });
    return response.data.data;
  },
};
