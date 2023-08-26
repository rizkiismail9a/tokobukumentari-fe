<template>
  <div class="card p-3">
    <img v-if="imgAvb" :src="userImage" alt="" class="rounded-circle border object-fit-cover mx-auto my-3" style="width: 150px; height: 150px" />
    <img v-else src="/images/default.png" alt="" class="rounded-circle border mx-auto my-3" style="width: 150px" />
    <h1 v-if="formUpdate" class="fs-6 text-secondary">Edit Profile</h1>
    <div class="alert alert-danger" role="alert" v-if="alert">{{ alert }}</div>
    <div class="alert alert-primary" role="alert" v-if="succeed">{{ succeed }}</div>
    <!-- upload/change profile picture -->
    <form v-if="formUpdate" class="mt-4 d-flex gap-2" @submit.prevent="uploadImage">
      <label for="formFile" class="form-label"></label>
      <input class="form-control" type="file" id="formFile" @change="setLink" />
      <button type="submit" class="btn btn-primary">Upload</button>
      <!-- <i class="fa-solid fa-trash btn btn-outline-primary d-block fs-5" style="height: 36px"></i> -->
    </form>
    <form v-if="formUpdate" @submit.prevent="updateData" enctype="multipart/form-data">
      <hr />
      <div class="mb-3">
        <label for="name" class="form-label">Nama</label>
        <input type="text" class="form-control" id="name" aria-describedby="namelHelp" v-model="newData.full_name" />
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" name="username" aria-describedby="namelHelp" v-model="newData.username" />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" name="email" aria-describedby="namelHelp" v-model="newData.email" />
      </div>
      <div class="d-flex justify-content-between mt-5">
        <button type="submit" class="btn btn-primary">Simpan</button>
        <button @click="formUpdate = false" class="btn btn-primary">Batal</button>
      </div>
    </form>
    <div v-else class="text-center">
      <h1 class="fs-3">{{ user.full_name }}</h1>
      <hr />
      <p>Username: <br />{{ user.username }}</p>
      <p>Email: <br />{{ user.email }}</p>
      <div class="m-auto">
        <button @click="formUpdate = true" class="btn btn-primary">Edit Profil</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useAuthStore } from "../store/store";
// import { useRouter } from "vue-router";
// const router = useRouter();
const formUpdate = ref(false);
const authStore = useAuthStore();
const alert = ref("");
const succeed = ref("");
const newData = reactive({
  username: authStore.userDetail.username,
  full_name: authStore.userDetail.full_name,
  email: authStore.userDetail.email,
});
onMounted(async () => {
  await authStore.getUser();
  await authStore.getImage();
});
const user = computed(() => {
  return authStore.userDetail;
});
const userImage = computed(() => {
  return authStore.getUserImage;
});
const imgAvb = computed(() => {
  return authStore.isImageAvailable;
});

const updateData = async () => {
  if (newData.username === authStore.userDetail.username && newData.email === authStore.userDetail.email && newData.full_name === authStore.userDetail.full_name) {
    alert.value = "Kamu tidak mengubah data apapun";
    return setTimeout(() => {
      alert.value = "";
    }, 3000);
  }
  try {
    await authStore.updateProfile(newData);
    succeed.value = "Data berhasil disimpan";
    return setTimeout(() => {
      succeed.value = "";
    }, 3000);
  } catch (error) {
    alert.value = error;
    return setTimeout(() => {
      alert.value = "";
    }, 3000);
  }
};

let imageValue = ref("");
const setLink = (e) => {
  imageValue = e.target.files[0];
};
const uploadImage = async () => {
  console.log(imageValue);
  const payload = new FormData();
  payload.append("image", imageValue);
  try {
    const result = await authStore.updateImage(payload);
    succeed.value = result.message;
    formUpdate.value = false;
    return setTimeout(() => {
      succeed.value = "";
    }, 3000);
  } catch (error) {
    console.log(error);
    alert.value = error;
    return setTimeout(() => {
      alert.value = "";
    }, 3000);
  }
};
</script>
