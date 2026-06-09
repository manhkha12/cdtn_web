import apiClient from "./apiClient";
import { ENDPOINTS } from "./api";
import type { Semester } from "../types";

export const SemesterApi = {
  getAll: async () => {
    const response = await apiClient.get<{ data: Semester[] }>(ENDPOINTS.SEMESTERS.BASE);
    return response.data.data;
  },
};
