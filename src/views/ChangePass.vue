<template>
  <div class="card p-3">
    <form @submit.prevent="submit">
      <!-- <hr /> -->
      <div class="alert alert-danger" role="alert" v-if="alert">{{ alert }}</div>
      <div class="alert alert-primary" role="alert" v-if="succeed">{{ succeed }}</div>
      <div class="mb-3">
        <label for="oldPass" class="form-label">Kata sandi lama</label>
        <input type="password" class="form-control" id="oldPass" aria-describedby="namelHelp" v-model="payload.oldPass" />
      </div>
      <div class="mb-3">
        <label for="newPass" class="form-label">Kata sandi baru</label>
        <input type="password" class="form-control" id="newPass" name="newPass" aria-describedby="namelHelp" v-model="payload.newPass" />
      </div>
      <div class="mb-3">
        <label for="oldPassConfirm" class="form-label">Konfirmasi kata sandi baru</label>
        <input type="password" class="form-control" id="oldPassConfirm" name="oldPassConfirm" aria-describedby="namelHelp" v-model="payload.newPass_confirm" />
      </div>
      <div class="d-flex justify-content-between mt-5">
        <button type="submit" class="btn btn-primary">Simpan</button>
        <button class="btn btn-primary" @click="closeCard">Batal</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "../store/store";
const emits = defineEmits(["close"]);
const authStore = useAuthStore();
function closeCard() {
  emits("close");
}
const alert = ref("");
const succeed = ref("");
const payload = reactive({
  oldPass: "",
  newPass: "",
  newPass_confirm: "",
});
const submit = () => {
  // console.log(payload.newPass);
  if (payload.newPass !== payload.newPass_confirm) {
    return (alert.value = "Konfirmasi kata sandi baru berbeda");
  }
  authStore
    .changePassword(payload)
    .then((res) => {
      succeed.value = res.message;
      payload.oldPass = "";
      payload.newPass = "";
      payload.newPass_confirm = "";
      return setTimeout(() => {
        succeed.value = "";
      }, 3000);
    })
    .catch((error) => {
      alert.value = error;
      return setTimeout(() => {
        alert.value = "";
      }, 3000);
    });
  // authStore.changePassword();
};
</script>
