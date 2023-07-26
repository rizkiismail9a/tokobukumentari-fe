import { createRouter, createWebHistory } from "vue-router";

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
    },
    {
      path: "/register",
      name: "Daftar | Toko Buku Mentari",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/detailBuku",
      name: "Detail Buku | Toko Buku Mentari",
      component: () => import("../views/BookDetail.vue"),
    },
    {
      path: "/profil",
      name: "Profil Akun | Toko Buku Mentari",
      component: () => import("../views/Profile.vue"),
    },
    {
      path: "/keranjang",
      name: "Keranjang | Toko Buku Mentari",
      component: () => import("../views/CartPage.vue"),
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
});
export default router;
