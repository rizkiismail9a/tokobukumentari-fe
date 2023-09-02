<template>
  <Transition>
    <Modal :modalMsg="succeed ? succeed : fail" v-if="isModalActive" @close="isModalActive = false" />
  </Transition>
  <div class="px-1 my-5">
    <div class="section-title-reccomended d-flex justify-content-between">
      <h2>Rekomendasi Untukmu</h2>
      <a class="fs-5 font-pink" href="/koleksi">Lihat Semua</a>
    </div>
    <div class="row">
      <!-- <img v-if="isAnimationShow" src="/images/loading.gif" class="w-25 m-auto" /> -->
      <div class="col-md-3" v-for="(book, i) in bestSellings" :key="book.title">
        <div class="card card-product rounded p-4 book__card h-100">
          <!-- <a class="position-absolute link-to-detail" href="#"></a> -->
          <img class="book__card-img object-fit-contain object-fit-cover mb-3 rounded" :src="'/images/' + book.file" :alt="book.title" />
          <small class="book__card-p text-secondary">{{ book.writer }}</small>
          <router-link
            class="text-black"
            :to="{
              name: 'Detail Buku | Toko Buku Mentari',
              params: { id: book._id },
            }"
          >
            <h1 class="fs-5 my-2">{{ book.title }}</h1>
          </router-link>
          <p class="book__card-disc font-pink fw-bold m-0">Rp{{ book.price }}</p>
          <p class="text-end m-0" id="like-button">{{ book.likes }} <i class="fa-regular fa-heart fs-6 font-pink"></i></p>
          <button class="btn btn-primary mt-3 text-white" @click="addToCart(book._id)"><i class="fa-solid fa-cart-shopping"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useApi, usePrivateApi } from "../composables/useApi";
import Modal from "./Modal.vue";
export default {
  data() {
    return {
      bestSellings: [],
      isModalActive: false,
      succeed: "",
      fail: "",
    };
  },
  components: {
    Modal,
  },
  methods: {
    addToCart(id) {
      usePrivateApi()
        .put(`/api/shop/addToCart/${id}`)
        .then((res) => {
          this.isModalActive = true;
          this.succeed = res.data.message;
        })
        .catch((err) => {
          this.isModalActive = true;
          this.fail = err.response.data.message;
        });
    },
  },
  async mounted() {
    const { data } = await useApi().get("/api/products/bestSelling");
    try {
      this.bestSellings = data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
