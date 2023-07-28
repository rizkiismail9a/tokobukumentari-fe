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
      <h3 class="fs-4 item-total" v-if="cartInStorage !== null">Total item: {{ cartInStorage.length }}</h3>
    </div>
    <hr />
    <div class="cart-wrapper m-auto row rounded">
      <div class="col-md-8 bg-white item-desc-wrapper py-4">
        <div class="row p-2" v-for="(item, i) in cartInStorage" :key="i">
          <div class="col-md-3 text-center">
            <img :src="'/images/' + item.file" :alt="item.title" class="w-50 object-fit-cover" />
            <p class="fw-bold">
              {{ item.title }} <br /><small class="text-body-secondary">{{ item.writer }}</small>
            </p>
          </div>
          <div class="col-md-3 text-center">
            <label class="d-block" for="amount">Jumlah</label>
            <input type="number" id="amount" class="w-100 p-1" v-model="amount" min="1" />
          </div>
          <div class="col-md-3 text-center">
            <p>
              Subharga:<br />
              <span class="fw-bold font-pink">Rp{{ item.price * amount }}</span>
            </p>
          </div>
          <div class="col-md-3 text-center">
            <button class="btn btn-primary" @click="removeItem(i)">Hapus</button>
          </div>
        </div>
      </div>
      <div class="col-md-4 p-0">
        <div class="position-sticky checkout-wrapper bg-body-secondary p-4 m-0 rounded" style="top: 100px">
          <p v-if="cartInStorage !== null">Total buku: {{ cartInStorage.length }}</p>
          <p>Subtotal:</p>
          <h5>Rp90000</h5>
          <hr />
          <h5>Total:</h5>
          <h2 class="fs-3">Rp90000</h2>
          <button @click="clearStorage" href="#" class="btn btn-primary rounded-pill w-100">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SimpleHeader from "../components/SimpleHeader.vue";
export default {
  data() {
    return {
      cartInStorage: null,
      amount: 1,
    };
  },
  components: {
    SimpleHeader,
  },
  methods: {
    clearStorage() {
      localStorage.clear();
      this.$router.push("/");
    },
    removeItem(index) {
      this.cartInStorage.splice(index, 1);
    },
  },
  mounted() {
    if (localStorage.getItem("carts")) {
      this.cartInStorage = JSON.parse(localStorage.getItem("carts"));
    } else {
      console.log("keranjangnya kosong, nih");
    }
  },
};
</script>
<style scoped>
.item-desc-wrapper,
.checkout-wrapper {
  box-shadow: var(--shadow);
}
</style>
