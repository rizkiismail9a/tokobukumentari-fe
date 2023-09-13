<template>
  <NavBar></NavBar>

  <div class="container max-width">
    <div class="banner">
      <Carousel />
    </div>
    <div class="cetagories">
      <Cetagories />
    </div>
    <div class="best-selling">
      <Suspense>
        <BestSelling />
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
    <!-- <div class="pop-writer"></div> -->
    <div class="academic">
      <Suspense>
        <Academics />
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
    <div class="fiction">
      <Fictions />
    </div>
    <p class="text-center">Gak ada buku yang kamu cari? Yuk, lihat <router-link class="font-pink" to="/koleksi">koleksi kami!</router-link></p>
  </div>
  <Footer></Footer>
</template>
<script setup>
import NavBar from "../components/NavBar.vue";
import Carousel from "../components/Carousel.vue";
import Cetagories from "../components/Cetagories.vue";
import BestSelling from "../components/BestSelling.vue";
// import Modal from "../components/Modal.vue";
import Academics from "../components/Academics.vue";
import Fictions from "../components/Fictions.vue";
import Footer from "../components/Footer.vue";
// import { useAuthStore } from "../store/store";
// import { computed } from "vue";
</script>
