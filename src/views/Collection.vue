<template>
  <NavBar @cari-buku="searchBook" />
  <!-- <Transition>
    <Modal modalMsg="Buku berhasil meluncur ke keranjang!" v-if="$store.getters.getModal" />
  </Transition> -->
  <div class="container max-width m-auto row p-4">
    <div class="container max-width m-auto noBook" v-if="noBook === true">
      <div class="container text-center d-flex flex-column justify-content-center">
        <h1>Belum punya buku itu 🥲</h1>
        <router-link to="/">&leftarrow; Kembali ke Beranda</router-link>
      </div>
    </div>
    <img v-if="isAnimationShow" src="/images/loading.gif" class="w-25 m-auto" />
    <div class="col-md-3 mb-2" v-if="noBook === false" v-for="(book, i) in books" :key="book.title">
      <div class="card card-product rounded p-4 book__card h-100">
        <img class="book__card-img object-fit-contain object-fit-cover mb-3 rounded" :src="'/images/' + book.file" :alt="book.title" />
        <small class="book__card-p text-secondary">{{ book.writer }}</small>
        <router-link
          class="text-black"
          :to="{
            name: 'Detail Buku | Toko Buku Mentari',
            query: {
              title: book.title,
              writer: book.writer,
              publisher: book.publisher,
              year: book.year,
              cetagory: book.cetagory,
              price: book.price,
              about: book.about,
              comments: book.comments,
              file: book.file,
            },
          }"
        >
          <h1 class="fs-5 my-2">{{ book.title }}</h1>
        </router-link>
        <p class="book__card-disc font-pink fw-bold m-0">Rp{{ book.price }}</p>
        <p class="text-end m-0" id="like-button">{{ book.likes }} <i @click="addLikes(i)" class="fa-regular fa-heart fs-6 font-pink"></i></p>
        <button class="btn btn-primary mt-3 text-white" @click="$store.commit('addToCarts', book)"><i class="fa-solid fa-cart-shopping"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { useApi } from "../composables/useApi";
// import Modal from "../components/Modal.vue";
import axios from "axios";
export default {
  name: "collection",
  data() {
    return {
      books: [],
      noBook: false,
      isAnimationShow: false,
    };
  },
  components: {
    NavBar,
    // Modal,
  },
  methods: {
    addLikes(index) {
      this.books[index].likes == 1 ? this.books[index].likes : this.books[index].likes++;
    },
    searchBook(setKeyword) {
      axios
        .get("https://my-json-server.typicode.com/rizkiismail9a/tokobukumentari-fakeAPI/books?q=" + setKeyword)
        .then((res) => {
          let results = res.data;
          if (results.length === 0) {
            this.noBook = true;
          } else {
            this.books = results;
            this.noBook = false;
          }
        })
        .catch((err) => console.log(err));
    },
  },
  async mounted() {
    this.isAnimationShow = true;
    if (this.$route.query.keyword) {
      await axios
        .get("https://my-json-server.typicode.com/rizkiismail9a/tokobukumentari-fakeAPI/books?q=" + this.$route.query.keyword)
        .then(async (res) => {
          let results = res.data;
          if (results.length !== 0) {
            this.noBook = false;
            this.books = results;
            this.isAnimationShow = false;
          } else if (results.length === 0) {
            this.noBook = true;
          }
          // console.log(this.books);
        })
        .catch((err) => console.log(err));
    } else {
      await useApi()
        .get("/api/products/books")
        .then(async (res) => {
          this.books = res.data;
          this.isAnimationShow = false;
          // console.log(this.books);
        })
        .catch((err) => console.log(err));
    }
  },
};
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
