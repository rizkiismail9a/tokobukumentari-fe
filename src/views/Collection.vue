<template>
  <NavBar @cari-buku="searchBook" />
  <div class="container max-width m-auto row p-4">
    <div class="container max-width m-auto noBook" v-if="noBook === true">
      <div class="container text-center d-flex flex-column justify-content-center">
        <h1>Belum punya buku itu 🥲</h1>
        <router-link to="/">&leftarrow; Kembali ke Beranda</router-link>
      </div>
    </div>
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
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import axios from "axios";
export default {
  name: "collection",
  data() {
    return {
      books: [],
      noBook: false,
    };
  },
  components: {
    NavBar,
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
          this.books = results;
          if (results.length === 0) {
            this.noBook = true;
          } else {
            this.noBook = false;
          }
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    if (this.$route.query.keyword) {
      axios
        .get("https://my-json-server.typicode.com/rizkiismail9a/tokobukumentari-fakeAPI/books?q=" + this.$route.query.keyword)
        .then((res) => {
          this.books = res.data;
          // console.log(this.books);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get("https://my-json-server.typicode.com/rizkiismail9a/tokobukumentari-fakeAPI/books")
        .then((res) => {
          this.books = res.data;
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
</style>
