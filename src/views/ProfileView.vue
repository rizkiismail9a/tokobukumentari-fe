<template>
  <NavBar />
  <!-- main -->
  <div class="row container g-3 justify-content-around my-5 mx-auto max-width">
    <div class="col-sm-6">
      <div class="list-group position-sticky rounded" style="top: 100px">
        <h3>Setting</h3>
        <router-link to="/profil" class="list-group-item list-group-item-action" :class="{ active: isProfile }" aria-current="true" @click="activeSection('profil')"> Detail Profil </router-link>
        <!-- <a href="#" class="list-group-item list-group-item-action">Ubah kata sandi</a> -->
        <router-link :to="{ name: 'Ubah Kata Sandi | Toko Buku Mentari' }" class="list-group-item list-group-item-action" :class="{ active: isFavorite }" @click="activeSection('favorite')">Favorit</router-link>
        <router-link :to="{ name: 'Ubah Kata Sandi | Toko Buku Mentari' }" class="list-group-item list-group-item-action" :class="{ active: isPass }" @click="activeSection('pass')">Ubah Kata Sandi</router-link>
        <button class="btn btn-danger mt-5" @click="logout">Logout</button>
      </div>
    </div>
    <div class="col-sm-6" v-show="isProfile">
      <ProfileCard />
    </div>
    <div class="col-sm-6">
      <router-view v-if="isProfile === false" v-slot="{ Component }" @close="isProfile = true">
        <transition name="route" mode="out-in" appear>
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>

  <!-- main end -->
</template>

<script setup>
import NavBar from "../components/NavBar.vue";
import ProfileCard from "../components/ProfileCard.vue";
import { useAuthStore } from "../store/store";
import { useRouter } from "vue-router";
import { ref } from "vue";
const isProfile = ref(true);
const isFavorite = ref(false);
const isPass = ref(false);
const router = useRouter();
const authStore = useAuthStore();
const logout = async () => {
  authStore.logout().then(() => {
    router.push("/");
  });
};
const activeSection = (sectionClicked) => {
  if (sectionClicked === "favorite") {
    isFavorite.value = true;
    isProfile.value = false;
    isPass.value = false;
  } else if (sectionClicked === "pass") {
    isFavorite.value = false;
    isProfile.value = false;
    isPass.value = true;
  } else {
    isFavorite.value = false;
    isProfile.value = true;
    isPass.value = false;
  }
};
</script>
<style scoped>
.route-enter-from {
  opacity: 0;
}
.route-enter-active,
.route-leave-active {
  transition: all 0.3s;
}
.route-leave-to {
  opacity: 0;
}
</style>
