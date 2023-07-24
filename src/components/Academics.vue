<template>
  <div class="px-1 my-5">
    <div class="section-title-reccomended d-flex justify-content-between">
      <h2>Akademik Pilihan</h2>
      <a class="fs-5 font-pink" href="/koleksi">Lihat Semua</a>
    </div>
    <div class="row">
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-4" v-for="(book, i) in academics" :key="book.title">
            <div class="card card-product rounded p-4 book__card h-100">
              <!-- <a class="position-absolute link-to-detail" href="#"></a> -->
              <img class="book__card-img object-fit-contain object-fit-cover mb-3 rounded" :src="'/images/' + book.file" :alt="book.title" />
              <small class="book__card-p text-secondary">{{ book.writer }}</small>
              <h1 class="fs-5 my-2">{{ book.title }}</h1>
              <p class="book__card-disc font-pink fw-bold m-0">Rp{{ book.price }}</p>
              <p class="text-end m-0" id="like-button">{{ book.likes }} <i @click="addLikes(i)" class="fa-regular fa-heart fs-6 font-pink"></i></p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 row">
        <div class="card card-product rounded p-4 book__card h-100 col">
          <img src="/images/math.png" class="w-100 object-fit-contain" alt="" />
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
      academics: [],
    };
  },
  methods: {
    addLikes(index) {
      this.academics[index].likes == 1 ? this.academics[index].likes : this.academics[index].likes++;
    },
  },
  mounted() {
    axios
      .get("https://my-json-server.typicode.com/rizkiismail9a/tokobukumentari-fakeAPI/books?q=akademik")
      .then((res) => {
        this.academics = res.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>
