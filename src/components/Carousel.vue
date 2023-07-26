<template>
  <div class="container max-width m-auto">
    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="d-flex">
            <div class="banner-jargon w-50 align-self-center">
              <h1 class="">Kedai Buku <span class="font-pink">Gajah</span><br />Kedai Buku Serba Ada</h1>
              <p>Kami menyediakan buku dengan berbagai genre dari berbagai zaman!</p>
            </div>
            <img src="/images/mentarireading.webp" class="d-block w-50 object-fit-contain" alt="..." />
          </div>
        </div>
        <div class="carousel-item">
          <h2 class="d-block w-100 mt-5 text-center">PROMO!!</h2>
        </div>
        <div class="carousel-item">
          <h2 class="d-block w-100 mt-5 text-center">PROMO!!</h2>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "carousel",
};
</script>
<style scoped>
.carousel-item,
.carousel-control-prev,
.carousel-control-next {
  z-index: 1 !important;
}
</style>
