import apiClient from "./apiClient";
import { ENDPOINTS } from "./api";
import type { CourseClass } from "../types";

export const LecturerApi = {
  getMyClasses: async () => {
    const response = await apiClient.get<{ data: CourseClass[] }>(ENDPOINTS.LECTURERS.MY_CLASSES);
    return response.data.data;
  },
};
