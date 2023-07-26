<template>
  <NavBar />
  <Transition>
    <Modal modalMsg="Buku berhasil meluncur ke keranjang!" v-if="$store.state.isModalActive" />
  </Transition>
  <main class="container my-5 m-auto p-3 card">
    <div class="row">
      <div class="col-lg-8 book-img-wrapper">
        <div class="row g-2 position-sticky top-0">
          <div class="col-6 h-100">
            <img :src="'/images/' + $route.query.file" class="w-100 h-100 object-fit-cover rounded" :alt="$route.query.title" />
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
                <img :src="'/images/' + $route.query.file" alt="sirkuspohon" class="w-100 h-100 object-fit-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col p-0 book-data-wrapper">
        <div class="p-3 m-auto">
          <div class="price">
            <h2>Rp{{ $route.query.price }}</h2>
            <small class="text-body-secondary">{{ $route.query.writer }}</small>
            <h1 class="fs-5">{{ $route.query.title }}</h1>
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
            <p>{{ $route.query.about }}</p>
            <table class="w-100">
              <tbody>
                <tr>
                  <td class="fw-bold">Ketagori</td>
                  <td>{{ $route.query.cetagory }}</td>
                </tr>
                <tr>
                  <td class="fw-bold">Penerbit</td>
                  <td>{{ $route.query.publisher }}</td>
                </tr>
                <tr>
                  <td class="fw-bold">Tahun Terbit</td>
                  <td>{{ $route.query.year }}</td>
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
            <a class="btn btn-outline-primary" href="#" @click="$store.commit('addToCarts', bookOnDetail)">Masuk Keranjang</a>
          </div>
        </div>
      </div>
    </div>
  </main>
  <div class="container comment-wrapper w-100">
    <h1 class="fs-3">Ulasan</h1>
    <div class="alert container max-width m-auto" v-if="alert === true">
      <div class="alert alert-danger w-50 text-center m-auto my-0" role="alert">Komentar tidak boleh kosong</div>
    </div>
    <div class="d-flex flex-column comment-input-wrapper">
      <label for="comment-input">Tulis komentar</label>
      <div class="d-flex gap-1" id="comment-input-wrapper">
        <textarea name="comment" id="comment-input" class="w-75" style="resize: none" v-model="commentValue"></textarea>
        <button v-if="isBtnCommentActive" type="submit" class="btn btn-primary w-25" id="btnSubmit" @click="updateComment">Edit Komentar</button>
        <button v-else type="submit" class="btn btn-primary w-25" id="btnSubmit" @click="addComment">Kirim Komentar</button>
      </div>
    </div>
    <hr />
    <div class="max-width my-3 w-100" v-for="(comment, i) in comments" :key="i">
      <div class="d-flex align-items-center gap-5">
        <img src="/images/profile-photo.webp" class="rounded-circle" alt="foto profil" width="70" />
        <div class="comment-wrapper d-flex flex-column">
          <p id="comment-user">{{ comment }}</p>
          <div class="action-wrapper p-0">
            <small class="me-2 text-body-secondary" style="cursor: pointer" @click="editComment(i)">Edit</small>
            <small class="me-2 text-body-secondary" style="cursor: pointer" @click="deleteComment(i)">Hapus</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "../components/NavBar.vue";
import Modal from "../components/Modal.vue";
export default {
  data() {
    return {
      comments: [],
      commentValue: "",
      bookOnDetail: this.$route.query,
      alert: false,
      isBtnCommentActive: false,
      activeCommentIndex: null,
    };
  },
  components: {
    NavBar,
    Modal,
  },
  mounted() {
    this.comments = this.$route.query.comments;
  },
  methods: {
    addComment() {
      if (this.commentValue) {
        this.alert = false;
        this.comments.push(this.commentValue);
        this.commentValue = "";
      } else {
        this.alert = true;
      }
    },
    deleteComment(index) {
      this.comments.splice(index, 1);
    },
    editComment(index) {
      this.activeCommentIndex = index;
      this.isBtnCommentActive = true;
      this.commentValue = this.comments[index];
    },
    updateComment() {
      this.isBtnCommentActive = false;
      this.comments.splice(this.activeCommentIndex, 1, this.commentValue);
      this.commentValue = "";
    },
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
