import { defineStore } from "pinia";
import { useApi, usePrivateApi } from "../composables/useApi";
export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: {},
      isLogin: false,
      accessToken: "",
      isModalActive: false,
    };
  },
  getters: {
    userDetail: (state) => state.user,
    getIsLogin: (state) => (state.user?.username ? true : false),
  },
  actions: {
    async attemp() {
      try {
        await this.refresh();
        await this.getUser();
        return;
      } catch (err) {
        return;
      }
    },
    async register(payload) {
      try {
        const { data } = await useApi().post("/auth/register", payload);
        return data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
    async login(payload) {
      try {
        const { data } = await useApi().post("/auth/login", payload);
        this.accessToken = data?.access_token;
        if (this.accessToken) {
          this.isLogin = true;
          await this.getUser();
        }
        return data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
    async logout() {
      try {
        const { data } = await usePrivateApi().post("/auth/logout");
        this.accessToken = "";
        this.user = {};
        return data;
      } catch (error) {
        throw error.response.message;
      }
    },
    async refresh() {
      try {
        const { data } = await useApi().post("/auth/refresh");
        this.accessToken = data?.access_token;
        return data;
      } catch (error) {
        throw error.response.message;
      }
    },
    async getUser() {
      try {
        const { data } = await usePrivateApi().get("/auth/getUser");
        this.user = data;
      } catch (error) {
        throw error.response.message;
      }
    },
  },
});
