import { defineStore } from "pinia";
import { useApi, usePrivateApi, usePrivateImageApi } from "../composables/useApi";
export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: {},
      isLogin: false,
      userImage: null,
      accessToken: "",
      isModalActive: false,
      books: null,
    };
  },
  getters: {
    userDetail: (state) => state.user,
    getUserImage: (state) => state.userImage,
    getIsLogin: (state) => (state.user?.username ? true : false),
    isImageAvailable: (state) => (state.userImage !== null ? true : false),
    getAllBooks: (state) => state.books,
  },
  actions: {
    async attemp() {
      try {
        await this.refresh();
        await this.getUser();
        await this.getImage();
        await this.getBooks();
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
          await this.getImage();
        }
        return data;
      } catch (error) {
        console.log(error);
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
    async getImage() {
      try {
        const path = await usePrivateApi().get("/auth/getImage");
        // console.log(path);
        this.userImage = path.data;
      } catch (error) {
        // console.log(error);
        throw error.response.message;
      }
    },
    async updateImage(payload) {
      try {
        const { data } = await usePrivateImageApi().post("/auth/uploadImage", payload);
        await this.getUser();
        await this.getImage();
        return data;
      } catch (error) {
        console.log(error);
        throw error.response.data.message;
      }
    },
    async updateProfile(payload) {
      try {
        const { data } = await usePrivateApi().put("/auth/editUser", payload);
        await this.getUser();
        return data;
      } catch (error) {
        console.log(error);
        throw error.response.data.message;
      }
    },
    async changePassword(payload) {
      try {
        const { data } = await usePrivateApi().put("/auth/changePass", payload);
        return data;
      } catch (error) {
        console.log(error);
        throw error.response.data.message;
      }
    },
    async getBooks() {
      try {
        const { data } = await useApi().get("api/products/books");
        this.books = data;
      } catch (error) {
        console.log(error);
        throw error.response;
      }
    },
  },
});
