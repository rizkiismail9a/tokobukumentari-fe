<template>
  <SimpleHeader />
  <div class="container max-width my-5">
    <div class="row">
      <img class="col-md-6 object-fit-contain" src="/images/login.png" alt="orang masuk ke pintu" />
      <div class="col-md-6 card p-3 m-auto my-3" style="width: 24rem">
        <h1 class="fs-3">Masuk</h1>
        <p class="m-0">Belum punya akun? Yuk, <a href="/register">daftar</a></p>
        <hr />
        <div class="google text-center font-pink border rounded p-2">
          <i class="fa-brands fa-google fs-3"></i>
        </div>
        <hr />
        <p class="text-center m-auto d-inline px-2 bg-white position-relative" style="bottom: 30px">atau</p>
        <form>
          <div class="mb-3">
            <label for="email" class="form-label">Email atau Username <span class="font-pink">*</span></label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Masukkan Email" />
          </div>
          <div class="mb-3 position-relative">
            <label for="password" class="form-label">Password <span class="font-pink">*</span></label>
            <input type="password" class="form-control pe-5" id="password" placeholder="Masukkan Kata Sandi" />
            <i class="fa-solid fa-eye position-absolute" style="right: 15px; top: 42px"></i>
          </div>
          <button type="submit" class="btn btn-primary w-100 mt-4">Masuk</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import SimpleHeader from "../components/SimpleHeader.vue";
export default {
  name: "login-page",
  components: {
    SimpleHeader,
  },
};
</script>
