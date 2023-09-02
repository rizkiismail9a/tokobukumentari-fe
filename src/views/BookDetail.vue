<template>
  <NavBar />
  <Transition>
    <Modal :modalMsg="succeed ? succeed : fail" v-if="isModalActive" @close="isModalActive = false" />
  </Transition>
  <main class="container my-5 m-auto p-3 card">
    <div class="row">
      <div class="col-lg-8 book-img-wrapper">
        <div class="row g-2 position-sticky top-0">
          <div class="col-6 h-100">
            <img :src="'/images/' + book.file" class="w-100 h-100 object-fit-cover rounded" :alt="book.title" />
          </div>
          <div class="col-6 h-100">
            <div class="row g-2">
              <div class="col-6">
                <img src="/images/Sirkus-Pohon-Belakang-600x890.jpg" alt="sirkuspohon" class="w-100 h-100 object-fit-cover" />
              </div>
              <div class="col-6">
                <img src="/images/badut.webp" alt="sirkuspohon" class="w-100 h-100 object-fit-cover" />
              </div>
              <div class="col-6">
                <img src="/images/daftarisi.webp" alt="sirkuspohon" class="w-100 object-fit-cover" />
              </div>
              <div class="col-6">
                <img :src="'/images/' + book.file" alt="sirkuspohon" class="w-100 h-100 object-fit-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col p-0 book-data-wrapper">
        <div class="p-3 m-auto">
          <div class="price">
            <h2>Rp{{ book.price }}</h2>
            <small class="text-body-secondary">{{ book.writer }}</small>
            <h1 class="fs-5">{{ book.title }}</h1>
            <div class="d-flex justify-content-between w-75 text-body-secondary align-items-center">
              <p class="m-0">Baru</p>
              <i class="fa-solid fa-circle text-body-secondary" style="font-size: 0.5rem"></i>
              <p class="m-0">340gr</p>
              <i class="fa-solid fa-circle text-body-secondary" style="font-size: 0.5rem"></i>
              <p class="m-0">Cianjur</p>
            </div>
          </div>
          <hr />
          <div class="item_desc h-100">
            <p>Deksripsi</p>
            <p>{{ book.about }}</p>
            <table class="w-100">
              <tbody>
                <tr>
                  <td class="fw-bold">Ketagori</td>
                  <td>{{ book.cetagory }}</td>
                </tr>
                <tr>
                  <td class="fw-bold">Penerbit</td>
                  <td>{{ book.publisher }}</td>
                </tr>
                <tr>
                  <td class="fw-bold">Tahun Terbit</td>
                  <td>{{ book.year }}</td>
                </tr>
                <tr>
                  <td class="fw-bold">Jumlah Halaman</td>
                  <td>765 halaman</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />
          <div class="btn-container d-flex flex-column gap-2">
            <a class="btn btn-primary" href="#">Beli Sekarang</a>
            <button class="btn btn-outline-primary" @click="addToCart(book._id)">Masuk Keranjang</button>
          </div>
        </div>
      </div>
    </div>
  </main>
  <div class="container comment-wrapper w-100">
    <h1 class="fs-3">Ulasan</h1>
    <div class="alert container max-width m-auto" v-if="alert">
      <div class="alert alert-danger w-50 text-center m-auto my-0" role="alert">{{ alert }}</div>
    </div>
    <div class="d-flex flex-column comment-input-wrapper">
      <label for="comment-input">Tulis komentar</label>
      <div id="comment-input-wrapper">
        <form @submit.prevent="createComment" class="d-flex gap-1">
          <textarea name="comment" id="comment-input" class="w-75" style="resize: none" v-model="newComment.userComment"></textarea>
          <button v-if="isBtnCommentActive" type="submit" class="btn btn-primary w-25" id="btnSubmit" @click="updateComment">Edit Komentar</button>
          <button v-else type="submit" class="btn btn-primary w-25" id="btnSubmit">Kirim Komentar</button>
        </form>
      </div>
    </div>
    <hr />
    <div class="max-width my-3 w-100" v-for="(comment, i) in comments" :key="comment._id">
      <div class="d-flex align-items-center gap-5">
        <img :src="url + comment.content.user.image" class="rounded-circle object-fit-cover" alt="foto profil" width="70" height="70" />
        <div class="comment-wrapper d-flex flex-column">
          <h5>{{ comment.content.user.full_name }}</h5>
          <p id="comment-user">{{ comment.content.userComment }}</p>
          <small class="text-secondary">{{ createdTime }}</small>
          <!-- <div class="action-wrapper p-0">
            <small class="me-2 text-body-secondary" style="cursor: pointer" @click="editComment(i)">Edit</small>
            <small class="me-2 text-body-secondary" style="cursor: pointer" @click="deleteComment(i)">Hapus</small>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import NavBar from "../components/NavBar.vue";
import { useApi, usePrivateApi } from "../composables/useApi";
import { useAuthStore } from "../store/store";
import { reactive, ref } from "vue";
import Modal from "../components/Modal.vue";
export default {
  data() {
    return {
      comments: "",
      book: "",
      url: import.meta.env.VITE_BASE_URL + "/",
      isBtnCommentActive: false,
      activeCommentIndex: null,
      isModalActive: false,
      succeed: "",
      fail: "",
    };
  },
  components: {
    NavBar,
    Modal,
  },
  mounted() {
    useApi()
      .get(`/api/products/bookDetail/${this.$route.params.id}`)
      .then((res) => {
        this.book = res.data;
        this.comments = res.data.comments;
        this.comments.forEach((item) => {
          const tanggal = new Date(item.createdAt.replace("T", " ")).getTime();
          item.createdAt = tanggal;
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // this.comments = this.$route.query.comments;
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
          this.fail = "Login dulu, yuk";
        });
    },
  },
  computed: {
    createdTime() {
      const day = this.comments.createdAt / (24 * 60 * 60 * 1000);
      if (day > 30) {
        return `${day} bulan yang lalu`;
      } else if (day > 7 && day <= 30) {
        return `${day} hari yang lalu`;
      } else if (day > 1 && day <= 7) {
        return `${day} hari yang lalu`;
      } else {
        return `kurang dari sehari yang lalu`;
      }
    },
  },
  setup() {
    const authStore = useAuthStore();
    const route = useRoute();
    const alert = ref("");
    const newComment = reactive({
      userComment: "",
    });
    const createComment = async () => {
      if (authStore.userDetail.username) {
        usePrivateApi()
          .post(`/api/products/createComment/${route.params.id}`, newComment)
          .then((res) => {
            location.reload();
          })
          .catch((err) => {
            alert.value = err.response.data.message;
          });
      }
    };
    return {
      newComment,
      createComment,
      alert,
    };
  },
};
</script>
<style scoped>
table,
td {
  border: 2px solid rgba(206, 204, 204, 0.552);
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
