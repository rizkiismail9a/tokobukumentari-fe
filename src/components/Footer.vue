<template>
  <div class="footer__wrapper bg-secondary p-3">
    <div class="container max-width row footer-menu m-auto flex-column flex-md-row mt-3">
      <div class="col-md-3 mx-auto footer-menu-jargon">
        <h1 class="fs-5 text-light">Kedai Buku <span class="font-pink">Gajah</span><br />Kedai Buku Serba Ada</h1>
        <p class="text-light">Kami menyediakan buku dengan berbagai genre dari berbagai zaman!</p>
      </div>
      <div class="col-md-3 mx-auto footer-menu-contact">
        <h2 class="fs-5 text-light">Hubungi Kami</h2>
        <p class="text-light">
          mentaribookstore@mail.com <br />
          (021)-1234-XXXX <br />
          Jl. Hanjawar No. 52, Cianjur, Jawa Barat
        </p>
      </div>
      <div class="col-md-3 mx-auto footer-menu-other">
        <h2 class="fs-5 text-light">Lainnya</h2>
        <p>
          <a class="d-block text-light" href="#">Bantuan</a>
          <a class="d-block text-light" href="#">Pembayaran</a>
          <a class="d-block text-light" href="#">Kebijakan Privasi</a>
        </p>
      </div>
      <div class="col-md-3 mx-auto footer-menu-download">
        <h2 class="fs-5 text-light">Unduh Aplikasi Kami</h2>
        <div class="d-flex">
          <a href="#">
            <img src="/images/googleplay.webp" alt="link ke google play" width="120" />
          </a>
          <a href="#">
            <img src="/images/appStore.webp" alt="link ke appstore" width="120" />
          </a>
        </div>
      </div>
    </div>
    <hr />
    <p class="text-light text-center">&copy; 2023 senimentari group</p>
  </div>
</template>
<script>
export default {
  name: "footer",
};
</script>
<style scoped>
p {
  font-size: 12px;
}
</style>
