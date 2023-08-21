import { useAuthStore } from "../store/store";

export const attempStore = {
  async install() {
    const authStore = useAuthStore();
    try {
      await authStore.attemp();
      return;
    } catch (error) {
      return;
    }
  },
};
