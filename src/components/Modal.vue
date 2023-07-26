<template>
  <div class="modal-wrapper m-auto">
    <div class="container position-sticky" style="top: 200px">
      <div class="modal-content w-50 position-relative card m-auto rounded p-5">
        <h1 class="position-absolute" style="right: 20px; top: 0; cursor: pointer" @click="$store.state.isModalActive = false">&times;</h1>
        <img src="/images/welldone.png" alt="berhasil" class="rounded w-50 m-auto" />
        <h3 class="fs-3 m-auto">{{ modalMsg }}</h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    modalMsg: {
      type: String,
      require: false,
    },
  },
};
</script>
<style scoped>
.modal-wrapper {
  position: absolute;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(128, 128, 128, 0.346);
  z-index: 900;
}
.modal-content {
  background-color: white;
  /* top: 50%; */
  opacity: 1;
}
@media screen and (max-width: 480px) {
  .modal-content {
    width: 100% !important;
  }
}
</style>
