<template>
  <div class="px-1 my-5">
    <div class="section-title-reccomended d-flex justify-content-between">
      <h2>Rekomendasi Untukmu</h2>
      <a class="fs-5 font-pink" href="/koleksi">Lihat Semua</a>
    </div>
    <div class="row">
      <div class="col-md-3" v-for="(book, i) in bestSellings" :key="book.title">
        <div class="card card-product rounded p-4 book__card h-100">
          <!-- <a class="position-absolute link-to-detail" href="#"></a> -->
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      bestSellings: [],
    };
  },
  methods: {
    addLikes(index) {
      this.bestSellings[index].likes == 1 ? this.bestSellings[index].likes : this.bestSellings[index].likes++;
    },
  },
  mounted() {
    axios
      .get("https://my-json-server.typicode.com/rizkiismail9a/tokobukumentari-fakeAPI/bestSelling")
      .then((res) => {
        this.bestSellings = res.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>
