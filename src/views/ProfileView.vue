<template>
  <NavBar />
  <!-- main -->
  <div class="row container g-3 justify-content-around my-5 mx-auto max-width">
    <div class="col-sm-6">
      <div class="list-group position-sticky rounded" style="top: 100px">
        <h3>Setting</h3>
        <router-link to="/profil" class="list-group-item list-group-item-action" :class="{ active: isProfileCardActive }" aria-current="true" @click="isProfileCardActive = true"> Detail Profil </router-link>
        <!-- <a href="#" class="list-group-item list-group-item-action">Ubah kata sandi</a> -->
        <router-link :to="{ name: 'Ubah Kata Sandi | Toko Buku Mentari' }" class="list-group-item list-group-item-action" :class="{ active: !isProfileCardActive }" @click="isProfileCardActive = false">Ubah Kata Sandi</router-link>
        <button class="btn btn-danger mt-5" @click="logout">Logout</button>
      </div>
    </div>
    <div class="col-sm-6" v-show="isProfileCardActive">
      <ProfileCard />
    </div>
    <div class="col-sm-6">
      <router-view v-if="isProfileCardActive === false" v-slot="{ Component }" @close="isProfileCardActive = true">
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
const isProfileCardActive = ref(true);
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
}
.route-enter-active,
.route-leave-active {
  transition: all 0.3s;
}
.route-leave-to {
  opacity: 0;
}
</style>
