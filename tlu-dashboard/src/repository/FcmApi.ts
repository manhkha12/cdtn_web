import apiClient from "./apiClient";

export interface RegisterFcmDto {
  token: string;
  device_name?: string;
  platform?: string;
}

export const FcmApi = {
  registerToken: async (data: RegisterFcmDto) => {
    const response = await apiClient.post('/fcm/register', data);
    return response.data;
  },
  unregisterToken: async (token: string) => {
    const response = await apiClient.delete('/fcm/unregister', { data: { token } });
    return response.data;
  },
};
