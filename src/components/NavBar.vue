<template>
  <div class="bg-body-secondary">
    <div class="max-width row navbar m-auto">
      <img class="col-md-4 m-auto navbar__logo object-fit-contain" src="/images/logo.webp" style="width: 300px" />
      <i class="fa-solid fa-bars d-block d-sm-none fs-1 text-center font-pink mb-3" @click="isHamburgerActive === false ? (isHamburgerActive = true) : (isHamburgerActive = false)" style="cursor: pointer"></i>
      <div class="col-md-8 navbar__list d-flex align-items-center flex-column flex-md-row hamburger-menu" :class="{ toggle: isHamburgerActive }">
        <a href="/"><i class="fa-solid fa-house font-pink mx-2 navbar__list-link"></i></a>
        <form @submit.prevent="goToCollection" class="input-group navbar__list-form navbar__list-link mx-2">
          <span class="input-group-text rounded-start-pill" id="basic-addon1"> <i class="fa-solid fa-magnifying-glass" style="color: #555555"></i> </span>
          <input type="text" class="form-control rounded-end-pill" placeholder="cari judul, penulis, atau genre" aria-label="Username" aria-describedby="basic-addon1" v-model="setKeyword.keyword" @keyup="sendEmit" />
        </form>
        <a href="/keranjang" v-if="isLogin" class="cart mx-2 d-flex align-items-center">
          <p v-if="getuser.cart.length > 0" class="rounded-pill d-inline m-0 p-1 text-white bg-pink">{{ getuser.cart.length }}</p>
          <i class="fa-solid fa-cart-shopping navbar__list-link font-pink"></i>
        </a>
        <!-- <a href="/login" class="btn btn-primary mx-2">Masuk</a> -->
        <a href="/detailakun" v-if="isLogin" class="font-pink">
          <i v-if="!imgAvb" class="fa-solid fa-user"></i>
          <img :src="getImage" alt="foto profil" width="30" height="30" class="rounded-circle object-fit-cover" />
        </a>
        <div v-else class="d-flex gap-1">
          <router-link to="/login" class="btn btn-primary">Masuk</router-link>
          <router-link to="/register" class="btn btn-outline-primary">Daftar</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, reactive } from "vue";
import { useAuthStore } from "../store/store";
import { useRoute, useRouter } from "vue-router";
// const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const setKeyword = reactive({
  keyword: "",
});
const isHamburgerActive = ref(false);
const imgAvb = computed(() => {
  return authStore.isImageAvailable;
});
const getuser = computed(() => {
  return authStore.userDetail;
});
const getImage = computed(() => {
  return authStore.getUserImage;
});
const isLogin = computed(() => {
  return authStore.getIsLogin;
});
const goToCollection = () => {
  router.push({ path: "/koleksi", query: { keyword: setKeyword.keyword } });
};
const emits = defineEmits(["search"]);
function sendEmit() {
  emits("search", setKeyword);
}
// export default {
//   name: "nav-bar",
//   emits: ["cariBuku"],
//   data() {
//     return {
//       // active: false,
//       setKeyword: "",
//       // itemAmount: null,
//     };
//   },
//   methods: {
//     hamburgerBtn() {
//       document.querySelector(".hamburger-menu").classList.toggle("toggle");
//     },
//     searchBook() {
//       this.$router.push({ name: "Koleksi | Toko Buku Mentari", query: { keyword: this.setKeyword } });
//     },
//   },
//   setup() {
//     const authStore = useAuthStore();
//     const imgAvb = computed(() => {
//       return authStore.isImageAvailable;
//     });
//     const getUser = computed(() => {
//       return authStore.userDetail;
//     });
//     const getImage = computed(() => {
//       return authStore.getUserImage;
//     });
//     const isLogin = computed(() => {
//       return authStore.getIsLogin;
//     });
//     return { isLogin, getUser, imgAvb, getImage };
//   },
// };
</script>
<style scoped>
@media screen and (max-width: 480px) {
  .navbar {
    height: 180px;
  }
  .navbar__logo {
    margin-bottom: 24px !important;
  }
  .navbar__list-form {
    width: 100% !important;
  }
  .navbar__list-link {
    margin-bottom: 12px !important;
  }
  .hamburger-menu {
    position: absolute;
    background-color: #e9ecef;
    display: none;
    right: -1000px;
    height: 100vh;
    transition: all 0.3s ease-in-out;
  }
  .toggle {
    display: block;
    top: 180px;
    right: 0;
    z-index: 999;
  }
}
</style>
