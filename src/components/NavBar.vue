<template>
  <div class="bg-body-secondary">
    <div class="max-width row navbar m-auto position-sticky top-0">
      <img class="col-md-4 m-auto navbar__logo object-fit-contain" src="/images/logo.png" style="width: 300px" />
      <i class="fa-solid fa-bars d-block d-sm-none fs-1 text-center font-pink mb-3" @click="hamburgerBtn()" style="cursor: pointer"></i>
      <div class="col-md-8 navbar__list d-flex align-items-center flex-column flex-md-row hamburger-menu">
        <i class="fa-solid fa-house font-pink mx-2 navbar__list-link"></i>
        <div class="input-group navbar__list-form navbar__list-link mx-2">
          <span class="input-group-text rounded-start-pill" id="basic-addon1"> <i class="fa-solid fa-magnifying-glass" style="color: #555555"></i> </span>
          <input type="text" class="form-control rounded-end-pill" placeholder="cari judul, penulis, atau genre" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        <div class="dropdown text-center mx-2 navbar__list-link">
          <p class="dropdown-toggle mb-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">Ketagori</p>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Fiksi</a></li>
            <li><a class="dropdown-item" href="#">Akademik</a></li>
            <li><a class="dropdown-item" href="#">Sejarah</a></li>
          </ul>
        </div>
        <i class="fa-solid fa-cart-shopping navbar__list-link font-pink mx-2"></i>
        <a href="#" class="btn btn-primary mx-2">Masuk</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-bar",
  data() {
    return {
      active: false,
    };
  },
  methods: {
    hamburgerBtn() {
      document.querySelector(".hamburger-menu").classList.toggle("toggle");
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 480px) {
  .navbar {
    height: 180px;
  }
  .navbar__logo {
    margin-bottom: 24px !important;
  }
  .navbar__list-form {
    width: 100% !important;
  }
  .navbar__list-link {
    margin-bottom: 12px !important;
  }
  .hamburger-menu {
    position: absolute;
    background-color: #e9ecef;
    display: none;
    right: -1000px;
    height: 100vh;
    transition: all 0.3s;
  }
  .toggle {
    display: block;
    top: 180px;
    right: 0;
  }
}
</style>
