<template>
  <NavBar />
  <!-- main -->
  <div class="row container g-3 justify-content-around my-5 mx-auto max-width">
    <div class="col-sm-6">
      <div class="list-group position-sticky rounded" style="top: 100px">
        <h3>Setting</h3>
        <a href="#" class="list-group-item list-group-item-action active" aria-current="true"> Detail Profil </a>
        <a href="#" class="list-group-item list-group-item-action">Ubah kata sandi</a>
        <a href="#" class="list-group-item list-group-item-action">Riwayat transaksi</a>
        <button class="btn btn-danger mt-5" @click="logout">Logout</button>
      </div>
    </div>
    <div class="col-sm-6">
      <ProfileCard />
    </div>
  </div>

  <!-- main end -->
</template>

<script setup>
import NavBar from "../components/NavBar.vue";
import ProfileCard from "../components/ProfileCard.vue";
import { useAuthStore } from "../store/store";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const logout = async () => {
  authStore.logout().then(() => {
    router.push("/");
  });
};
</script>
