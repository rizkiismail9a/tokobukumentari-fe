<template>
  <Transition>
    <Modal :modalMsg="succeed ? succeed : fail" v-if="isModalActive" @close="isModalActive = false" />
  </Transition>
  <div class="px-1 my-5">
    <div class="section-title-reccomended d-flex justify-content-between">
      <h2>Rekomendasi Untukmu</h2>
      <router-link class="fs-5 font-pink" to="/koleksi">Lihat Semua</router-link>
    </div>
    <div class="row">
      <!-- <img v-if="isAnimationShow" src="/images/loading.gif" class="w-25 m-auto" /> -->
      <div class="col-md-3" v-for="(book, i) in bestSellings" :key="book.title">
        <div class="card card-product rounded p-4 book__card h-100">
          <img class="book__card-img object-fit-contain object-fit-cover mb-3 rounded" :src="'/images/' + book.file" :alt="book.title" />
          <small class="book__card-small text-secondary">{{ book.writer }}</small>
          <router-link
            class="text-black"
            :to="{
              name: 'Detail Buku | Toko Buku Mentari',
              params: { id: book._id },
            }"
          >
            <h1 class="fs-5 my-2 book__card-title">{{ book.title }}</h1>
          </router-link>
          <div style="height: 100px" class="d-flex flex-column justify-content-end">
            <p class="book__card-disc font-pink fw-bold m-0">Rp{{ book.price }}</p>
            <button class="btn btn-primary mt-3 text-white book__card-btn w-100" @click="addToCart(book._id)"><i class="fa-solid fa-cart-shopping"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useApi, usePrivateApi } from "../composables/useApi";
import { ref } from "vue";
import Modal from "./Modal.vue";
import { useAuthStore } from "../store/store";
export default {
  data() {
    return {
      bestSellings: [],
    };
  },
  components: {
    Modal,
  },

  async mounted() {
    const { data } = await useApi().get("/api/products/bestSelling");
    try {
      this.bestSellings = data;
    } catch (error) {
      console.log(error);
    }
  },
  setup() {
    const fail = ref("");
    const succeed = ref("");
    const isModalActive = ref(false);
    const authStore = useAuthStore();
    async function addToCart(id) {
      if (!authStore.getIsLogin) {
        isModalActive.value = true;
        return (fail.value = "Login dulu, yuk 🐱");
      }
      try {
        const { data } = await usePrivateApi().put(`/api/shop/addToCart/${id}`);
        isModalActive.value = true;
        succeed.value = data.message;
      } catch (error) {
        isModalActive.value = true;
        return (fail.value = error.response.data.message);
      }
    }
    return {
      addToCart,
      fail,
      isModalActive,
      succeed,
    };
  },
};
</script>
<style scoped>
.book__card-img {
  height: 250px;
}
.book__card-small {
  height: fit-content;
  margin: 0;
  padding: 0;
}
.book__card-title {
  height: 100px;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.2s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
