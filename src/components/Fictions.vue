<template>
  <Transition>
    <Modal :modalMsg="succeed ? succeed : fail" v-if="isModalActive" @close="isModalActive = false" />
  </Transition>
  <div class="px-1 my-5">
    <div class="section-title-reccomended d-flex justify-content-between">
      <h2>Fiksi Pilihan</h2>
      <a class="fs-5 font-pink" href="/koleksi">Lihat Semua</a>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="card card-product rounded p-4 book__card h-100 col">
          <img src="/images/dream.webp" class="w-100 object-fit-contain" alt="" />
        </div>
      </div>
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-4" v-for="(book, i) in fictions" :key="book.title">
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
    </div>
  </div>
</template>

<script>
import { useApi, usePrivateApi } from "../composables/useApi";
import Modal from "./Modal.vue";
export default {
  data() {
    return {
      fictions: [],
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
    const { data } = await useApi().post("/api/products/search", { keyword: "fiksi" });
    try {
      this.fictions = data.slice(0, 3);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
