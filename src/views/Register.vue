<template>
  <SimpleHeader />
  <div class="container max-width my-5">
    <div class="row">
      <div class="reg_jargon col-md-6">
        <img class="object-fit-contain w-100" src="/images/daftar.png" alt="orang masuk ke pintu" />
        <h2 style="text-align: justify">
          Tak kenal, maka tak sayang <br />
          Yuk, daftar! <br />
          Supaya <span class="font-pink">Mentari</span> bisa jagain belanjaan kamu
        </h2>
      </div>
      <div class="col-md-6 card p-3 m-auto my-3" style="width: 24rem">
        <h1 class="fs-3">Daftar</h1>
        <p class="m-0">Udah punya akun? <a href="/login">Masuk aja</a></p>
        <hr />
        <div class="google text-center font-pink border rounded p-2">
          <i class="fa-brands fa-google fs-3"></i>
        </div>
        <hr />
        <p class="text-center m-auto d-inline px-2 bg-white position-relative" style="bottom: 30px">atau</p>
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Nama <span class="font-pink">*</span></label>
            <input type="text" class="form-control" id="name" aria-describedby="nameHelp" name="email" placeholder="Masukkan nama" />
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">Username <span class="font-pink">*</span></label>
            <input type="text" class="form-control" id="username" aria-describedby="usernameHelp" name="email" placeholder="Bikin username" />
            <small class="d-none mb-2"><p>Hanya angka dan huruf. Jangan pakai spasi, ya</p></small>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email atau No. Hp <span class="font-pink">*</span></label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Masukkan email atau no. hp" />
          </div>
          <div class="mb-3 position-relative">
            <label for="password" class="form-label">Kata Sandi <span class="font-pink">*</span></label>
            <input type="password" class="form-control pe-5" id="password" placeholder="Buat kata sandi baru" />
            <i class="fa-solid fa-eye position-absolute" style="right: 15px; top: 42px"></i>
            <small class="d-none mb-2"><p>Minimal 8 karakter, huruf besar, huruf kecil, angka, dan karakter unik</p></small>
          </div>
          <div class="mb-3 position-relative">
            <label for="password" class="form-label">Konfirmasi Kata Sandi <span class="font-pink">*</span></label>
            <input type="password" class="form-control pe-5" id="password" placeholder="Konfirmasi kata sandi" />
            <i class="fa-solid fa-eye position-absolute" style="right: 15px; top: 42px"></i>
          </div>
          <div class="mb-3 position-relative" style="text-align: justify">
            <label for="agreement" class="form-label"
              ><input type="checkbox" class="pe-5" id="agreement" placeholder="Konfirmasi kata sandi" /> Dengan menekan daftar, saya dengan sadar menyetujui dan memahami segala <a href="#">syarat dan ketentuan</a> dan telah membaca
              <a href="#">kebijakan privasi</a> yang ditetapkan oleh Senimentari Group <span class="font-pink">*</span></label
            >
          </div>
          <button type="submit" class="btn btn-primary w-100 mt-4">Daftar</button>
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
