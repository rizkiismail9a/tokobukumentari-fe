<template>
  <SimpleHeader />
  <!-- main -->
  <div class="row container g-3 justify-content-around my-3 mx-auto max-width">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link class="font-pink" to="/">Beranda</router-link></li>
        <li class="breadcrumb-item"><router-link class="font-pink" to="/koleksi">Koleksi</router-link></li>
      </ol>
    </nav>
    <div class="col-sm-6">
      <div class="list-group position-sticky rounded" style="top: 80px">
        <h3>Setting</h3>
        <router-link :to="{ name: 'Detail Akun | Toko Buku Mentari' }" class="list-group-item list-group-item-action" aria-current="true" @click="isProfile = true"> Detail Profil </router-link>
        <router-link :to="{ name: 'Ubah Kata Sandi | Toko Buku Mentari' }" class="list-group-item list-group-item-action" @click="isProfile = false">Ubah Kata Sandi</router-link>
        <button class="btn btn-danger mt-5" @click="logout">Logout</button>
      </div>
    </div>
    <!-- <div class="col-sm-6" v-show="isProfile">
      
    </div> -->
    <div class="col-sm-6">
      <router-view v-slot="{ Component }" @close="isProfile = true">
        <transition name="route" mode="out-in" appear>
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "../store/store";
import { useRouter } from "vue-router";
import { ref } from "vue";
import SimpleHeader from "../components/SimpleHeader.vue";
const isProfile = ref(true);
const router = useRouter();
const authStore = useAuthStore();
const logout = async () => {
  authStore.logout().then(() => {
    router.push("/");
  });
};
</script>
<style scoped>
.route-enter-from {
  opacity: 0;
  transform: translateY(100px);
}
.route-enter-active,
.route-leave-active {
  transition: all 0.5s;
}
.route-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>
