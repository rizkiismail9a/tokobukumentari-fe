<template>
  <NavBar />
  <!-- main -->
  <div class="row container g-3 justify-content-around my-5 mx-auto max-width">
    <div class="col-sm-6">
      <div class="list-group position-sticky rounded" style="top: 100px">
        <h3>Setting</h3>
        <a href="#" class="list-group-item list-group-item-action active" aria-current="true"> Detail Profil </a>
        <a href="#" class="list-group-item list-group-item-action">Ubah kata sandi</a>
        <a href="#" class="list-group-item list-group-item-action">Riwayat transaksi</a>
        <button class="btn btn-danger mt-5" @click="logout">Logout</button>
      </div>
    </div>
    <div class="col-sm-6">
      <div class="card p-3">
        <h1 class="fs-6 text-secondary">Edit Profile</h1>
        <img v-if="profileImg" :src="profileImg" alt="" class="rounded-circle border" style="width: 150px" />
        <img v-else src="/images/profile-photo.webp" alt="" class="rounded-circle border" style="width: 150px" />
        <form>
          <div class="mt-4 d-flex gap-2">
            <label for="formFile" class="form-label"></label>
            <input class="form-control" type="file" id="formFile" @change="getFile" />
            <i class="fa-solid fa-trash btn btn-outline-primary d-block fs-5" style="height: 36px"></i>
          </div>
          <hr />
          <div class="mb-3">
            <label for="name" class="form-label">Nama</label>
            <input type="text" class="form-control" id="name" aria-describedby="namelHelp" v-model="user.full_name" />
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" name="username" aria-describedby="namelHelp" v-model="user.username" />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="email" aria-describedby="namelHelp" v-model="user.email" />
          </div>
          <div class="d-flex flex-row-reverse mt-5">
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- main end -->
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { computed, onMounted } from "vue";
import { useAuthStore } from "../store/store";
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      // name: "Laksmi Mentari",
      // username: "mentari1945",
      // email: "laksmimentari@gmail.com",
      profileImg: null,
    };
  },
  methods: {
    getFile(e) {
      this.profileImg = URL.createObjectURL(e.target.files[0]);
      // console.log(link);
    },
  },
  components: {
    NavBar,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    onMounted(async () => {
      await useAuthStore().getUser();
    });
    const user = computed(() => {
      return authStore.userDetail;
    });
    const logout = async () => {
      try {
        await authStore.logout();
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    };
    return {
      user,
      logout,
    };
  },
};
</script>
