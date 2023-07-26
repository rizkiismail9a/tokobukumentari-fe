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
    <div class="cart-title d-flex justify-content-between">
      <h1 class="fs-4">Keranjang</h1>
      <h3 class="fs-4 item-total">Total item: {{ $store.state.carts.length }}</h3>
    </div>
    <hr />
    <div class="cart-wrapper m-auto row rounded">
      <div class="col-md-8 bg-white item-desc-wrapper py-4">
        <div class="row p-2">
          <div class="col-md-3 text-center">
            <img src="/images/sagaras.jpg" alt="" class="w-50 object-fit-cover" />
            <p class="fw-bold">Sagaras <br /><small class="text-body-secondary">Tere Liye</small></p>
          </div>
          <div class="col-md-3 text-center">
            <label class="d-block" for="amount">Jumlah</label>
            <input type="number" id="amount" class="w-100 p-1" v-model="amount" />
          </div>
          <div class="col-md-3 text-center">
            <p>
              Subharga:<br />
              <span class="fw-bold font-pink">Rp90000</span>
            </p>
          </div>
          <div class="col-md-3 text-center">
            <button class="btn btn-primary">Hapus</button>
          </div>
        </div>
      </div>
      <div class="col-md-4 bg-body-secondary checkout-wrapper py-4">
        <div class="position-sticky" style="top: 100px">
          <p>Total buku: 3</p>
          <p>Subtotal:</p>
          <h5>Rp90000</h5>
        </div>
        <hr />
        <div class="position-sticky" style="top: 100px">
          <h5>Total:</h5>
          <h2 class="fs-3">Rp90000</h2>
        </div>
        <a href="#" class="btn btn-primary rounded-pill w-100">Checkout</a>
      </div>
    </div>
  </div>
</template>
<script>
import SimpleHeader from "../components/SimpleHeader.vue";
export default {
  data() {
    return {
      amount: 1,
    };
  },
  components: {
    SimpleHeader,
  },
};
</script>
<style scoped>
.cart-wrapper {
  box-shadow: var(--shadow);
}
</style>
