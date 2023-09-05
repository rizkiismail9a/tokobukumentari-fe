<template>
  <SimpleHeader />
  <div class="container my-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a class="font-pink" href="/">Beranda</a></li>
        <li class="breadcrumb-item"><a class="font-pink" href="/koleksi">Koleksi</a></li>
        <li class="breadcrumb-item active" aria-current="page">Keranjang</li>
      </ol>
    </nav>
    <!-- <p>{{ cartInStorage }}</p> -->
    <div class="cart-title d-flex justify-content-between">
      <h1 class="fs-4">Keranjang</h1>
      <h3 class="fs-4 item-total" v-if="data.items.length !== 0">Total item: {{ data.items.length }}</h3>
    </div>
    <hr />
    <div class="cart-wrapper m-auto row rounded">
      <div class="col-md-8 bg-white item-desc-wrapper py-4">
        <h2 v-if="data.items.length === 0" class="text-center">Keranjangnya kosong, nih 😢</h2>
        <div v-else class="row p-2" v-for="(item, i) in data.items" :key="item.book._id">
          <div class="col-md-3 text-center">
            <img :src="'/images/' + item.book.file" :alt="item.book.title" class="w-50 object-fit-cover" />
            <p class="fw-bold">
              {{ item.book.title }} <br /><small class="text-body-secondary">{{ item.book.writer }}</small>
            </p>
          </div>
          <div class="col-md-3 text-center">
            <label class="d-block" for="amount">Jumlah</label>
            <div class="d-flex m-auto justify-content-around">
              <i class="fa-solid fa-minus me-2 btn btn-primary" style="cursor: pointer" @click="updateAmount(i, 'kurang')"></i
              ><input class="w-25" type="text" @keyup.up="updateAmount(i, 'tambah')" @keyup.down="updateAmount(i, 'kurang')" v-model="item.amount" /><i
                class="ms-2 fa-solid fa-plus btn btn-primary"
                style="cursor: pointer"
                @click="updateAmount(i, 'tambah')"
              ></i>
            </div>
          </div>
          <div class="col-md-3 text-center">
            <p>
              Subharga:<br />
              <span class="fw-bold font-pink">Rp{{ item.book.price * item.amount }}</span>
            </p>
          </div>
          <div class="col-md-3 text-center">
            <button class="btn btn-primary" @click="removeBook(i)">Hapus</button>
          </div>
        </div>
      </div>
      <div class="col-md-4 p-0">
        <div class="position-sticky checkout-wrapper bg-body-secondary p-4 m-0 rounded" style="top: 100px">
          <p v-if="data.items.length !== 0">Total buku: {{ data.items.length }}</p>
          <!-- <p>Subtotal:</p>
          <h5>Rp90000</h5> -->
          <hr />
          <h5>Total harga:</h5>
          <h2 class="fs-3">Rp{{ price0 }}</h2>
          <a class="btn btn-primary w-100" @click="checkout" target="_blank">Checkout</a>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>
<script setup>
import Footer from "../components/Footer.vue";
import SimpleHeader from "../components/SimpleHeader.vue";
import { usePrivateApi } from "../composables/useApi";
import { reactive, onMounted, ref } from "vue";
let price0 = ref(0);

const data = reactive({
  items: [],
});
onMounted(() => {
  usePrivateApi()
    .get("/api/shop/getCart")
    .then((res) => {
      data.items = res.data;
      data.items.forEach((item) => (price0.value += item.book.price));
    })
    .catch((err) => {
      console.log(err);
    });
});
function checkout() {
  let orders = "";
  let waLink = `https://wa.me/6282317421414?text=Saya%20ingin%20pesan%20buku%20ini%20dong,%20Min!`;
  data.items.forEach((item) => {
    orders += `%0aJudul:%20${item.book.title}%0aPenulis:%20${item.book.writer}%0aJumlah:%20${item.amount}%0a`;
  });
  waLink += orders;
  window.location.href = waLink;
}
function removeBook(index) {
  usePrivateApi()
    .delete(`/api/shop/removeItem/${index}`)
    .then((res) => {
      data.items.splice(index, 1);
      // location.reload();
    })
    .catch((err) => console.log(err));
}
function updateAmount(index, obey) {
  if (obey === "tambah") {
    data.items[index].amount++;
    price0.value += data.items[index].book.price;
  } else {
    if (data.items[index].amount > 1) {
      data.items[index].amount--;
      price0.value -= data.items[index].book.price;
    }
  }
}
</script>
<style scoped>
.item-desc-wrapper,
.checkout-wrapper {
  box-shadow: var(--shadow);
}
</style>
