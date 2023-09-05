import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/store";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Beranda | Toko Buku Mentari",
      component: () => import("../views/homePage.vue"),
    },
    {
      path: "/koleksi",
      name: "Koleksi | Toko Buku Mentari",
      component: () => import("../views/Collection.vue"),
    },
    {
      path: "/login",
      name: "Masuk | Toko Buku Mentari",
      component: () => import("../views/Login.vue"),
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/register",
      name: "Daftar | Toko Buku Mentari",
      component: () => import("../views/Register.vue"),
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/detailBuku/:id",
      name: "Detail Buku | Toko Buku Mentari",
      component: () => import("../views/BookDetail.vue"),
    },
    {
      path: "/profil",
      name: "Profil Akun | Toko Buku Mentari",
      component: () => import("../views/ProfileView.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/ubahsandi",
          name: "Ubah Kata Sandi | Toko Buku Mentari",
          component: () => import("../views/ChangePass.vue"),
        },
        {
          path: "/detailakun",
          name: "Detail Akun | Toko Buku Mentari",
          component: () => import("../views/ProfileCard.vue"),
        },
      ],
    },
    {
      path: "/keranjang",
      name: "Keranjang | Toko Buku Mentari",
      component: () => import("../views/CartPage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "Laman Tidak Ada",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});
router.beforeEach((to) => {
  document.title = to.name;
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.getIsLogin) {
    return { name: "Masuk | Toko Buku Mentari" };
  }
  if (to.meta.requiresGuest && authStore.getIsLogin) {
    return { name: "Beranda | Toko Buku Mentari" };
  }
});
export default router;
