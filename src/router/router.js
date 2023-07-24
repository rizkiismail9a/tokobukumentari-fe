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
    // {
    //   path: "/koleksi/:kategori",
    //   name: "Koleksi | Toko Buku Mentari",
    //   component: () => import("../views/Collection.vue"),
    // },
  ],
});
router.beforeEach((to) => {
  document.title = to.name;
});
export default router;
