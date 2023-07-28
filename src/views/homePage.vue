<template>
  <NavBar></NavBar>
  <Transition>
    <Modal modalMsg="Buku berhasil meluncur ke keranjang!" v-if="$store.getters.getModal" />
  </Transition>
  <div class="container max-width">
    <div class="banner">
      <Carousel />
    </div>
    <div class="cetagories">
      <Cetagories />
    </div>
    <div class="best-selling">
      <BestSelling />
    </div>
    <!-- <div class="pop-writer"></div> -->
    <div class="academic">
      <Academics />
    </div>
    <div class="fiction">
      <Fictions />
    </div>
    <p class="text-center">Gak ada buku yang kamu cari? Yuk, lihat <a class="font-pink" href="/koleksi">koleksi kami!</a></p>
  </div>
</template>
<script>
import NavBar from "../components/NavBar.vue";
import Carousel from "../components/Carousel.vue";
import Cetagories from "../components/Cetagories.vue";
import BestSelling from "../components/BestSelling.vue";
import Modal from "../components/Modal.vue";
import Academics from "../components/Academics.vue";
import Fictions from "../components/Fictions.vue";
export default {
  name: "home-page",
  components: {
    NavBar,
    Carousel,
    Cetagories,
    BestSelling,
    Academics,
    Fictions,
    Modal,
  },
};
</script>
