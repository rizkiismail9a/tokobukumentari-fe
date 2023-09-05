<template>
  <NavBar @search="findBook" />
  <Transition>
    <Modal :modalMsg="succeed ? succeed : fail" v-if="isModalActive" @close="isModalActive = false" />
  </Transition>
  <div class="container max-width m-auto row p-4">
    <div class="container max-width m-auto noBook" v-if="noBook">
      <div class="container text-center d-flex flex-column justify-content-center">
        <h1>Belum Punya Buku Itu 😭</h1>
        <router-link to="/">&leftarrow; Kembali ke Beranda</router-link>
      </div>
    </div>
    <!-- <img v-if="isAnimationShow" src="/images/loading.gif" class="w-25 m-auto" /> -->
    <div class="col-md-3 mb-2" v-else v-for="(book, i) in booksCollection.books" :key="book._id">
      <div class="card card-product rounded p-4 book__card h-100">
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
        <p class="text-end m-0" id="like-button">{{ book.likes }} <i @click="addLikes(i)" class="fa-regular fa-heart fs-6 font-pink"></i></p>
        <button class="btn btn-primary mt-3 text-white" @click="addToCarts(book._id)"><i class="fa-solid fa-cart-shopping"></i></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Modal from "../components/Modal.vue";
import { onMounted, ref, reactive } from "vue";
import NavBar from "../components/NavBar.vue";
import { useApi, usePrivateApi } from "../composables/useApi";
import { useRoute } from "vue-router";
import { useAuthStore } from "../store/store";
const route = useRoute();
const authStore = useAuthStore();
const isModalActive = ref(false);
const succeed = ref("");
const fail = ref("");
const booksCollection = reactive({
  books: [],
});
const noBook = ref(false);
onMounted(async () => {
  if (!route.query.keyword) {
    noBook.value = false;
    const { data } = await useApi().get("/api/products/books");
    booksCollection.books = data;
  } else {
    useApi()
      .post("/api/products/search", { keyword: route.query.keyword })
      .then((res) => {
        noBook.value = false;
        booksCollection.books = res.data;
      })
      .catch((error) => {
        console.log(error);
        noBook.value = true;
        booksCollection.books = null;
      });
  }
});

function findBook(payload) {
  useApi()
    .post("/api/products/search", payload)
    .then((res) => {
      noBook.value = false;
      booksCollection.books = res.data;
    })
    .catch((error) => {
      noBook.value = true;
      booksCollection.books = null;
    });
}

async function addToCarts(id) {
  if (!authStore.getIsLogin) {
    isModalActive.value = true;
    return (fail.value = "Login dulu, yuk 🐱");
  }
  const { data } = await usePrivateApi().put(`/api/shop/addToCart/${id}`);
  try {
    isModalActive.value = true;
    succeed.value = data.response.message;
  } catch (error) {
    console.log(error);
  }
}
</script>
<style scoped>
.noBook {
  min-height: 90vh;
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
