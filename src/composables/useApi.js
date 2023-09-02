import { watchEffect } from "vue";
import { axiosInstace, axiosPrivateInstance, axiosPrivateImageInstance } from "../axios/axios";
import { useAuthStore } from "../store/store";

export const useApi = () => {
  watchEffect(() => {
    axiosInstace.interceptors.request.use(
      (config) => config,
      (err) => {
        throw err;
      }
    );
    axiosInstace.interceptors.response.use(
      (response) => response,
      (err) => {
        throw err;
      }
    );
  });
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
      (err) => {
        throw err;
      }
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
        // Promise.reject(err);
        throw err;
      }
    );
  });
  return axiosPrivateInstance;
};
export const usePrivateImageApi = () => {
  const authStore = useAuthStore();
  watchEffect(() => {
    axiosPrivateImageInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${authStore.accessToken}`;
        }
        return config;
      },
      (err) => {
        throw err;
      }
    );
    axiosPrivateImageInstance.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;
        if ((err?.response?.status === 401 || err?.response?.status === 403) && !prevRequest.sent) {
          prevRequest.sent = true;
          await authStore.refresh();
          prevRequest.headers.Authorization = authStore.accessToken;
          return axiosPrivateImageInstance;
        }
        // Promise.reject(err);
        throw err;
      }
    );
  });
  return axiosPrivateImageInstance;
};
