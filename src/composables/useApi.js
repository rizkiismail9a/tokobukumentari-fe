import { watchEffect } from "vue";
import { axiosInstace, axiosPrivateInstance } from "../axios/axios";
import { useAuthStore } from "../store/store";

export const useApi = () => {
  return axiosInstace;
};
export const usePrivateApi = () => {
  const authStore = useAuthStore();
  watchEffect(() => {
    axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${authStore.accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );
    axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;
        if ((err?.response?.status === 401 || err?.response?.status === 403) && !prevRequest.sent) {
          prevRequest.sent = true;
          await authStore.refresh();
          prevRequest.headers.Authorization = authStore.accessToken;
          return axiosPrivateInstance;
        }
        Promise.reject(err);
      }
    );
  });
  return axiosPrivateInstance;
};
