<template>
  <NavBar />
  <div class="container max-width m-auto row p-4">
    <div class="col-md-3 mb-2" v-for="(book, i) in books" :key="book.title">
      <div class="card card-product rounded p-4 book__card h-100">
        <a class="position-absolute link-to-detail" href="#"></a>
        <img class="book__card-img object-fit-contain object-fit-cover mb-3 rounded" :src="'/images/' + book.file" :alt="book.title" />
        <small class="book__card-p text-secondary">{{ book.writer }}</small>
        <h1 class="fs-5 my-2">{{ book.title }}</h1>
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
    };
  },
  components: {
    NavBar,
  },
  methods: {
    addLikes(index) {
      this.books[index].likes == 1 ? this.books[index].likes : this.books[index].likes++;
    },
  },
  mounted() {
    axios
      .get("https://my-json-server.typicode.com/rizkiismail9a/tokobukumentari-fakeAPI/books")
      .then((res) => {
        this.books = res.data;
        console.log(this.books);
      })
      .catch((err) => console.log(err));
  },
};
</script>
