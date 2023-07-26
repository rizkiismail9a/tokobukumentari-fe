<template>
  <div class="text-center container max-width row g-1 justify-content-around">
    <div class="col-md-2 col-6">
      <router-link
        :to="{
          name: 'Koleksi | Toko Buku Mentari',
          query: {
            keyword: 'isNew',
          },
        }"
        class="text-center d-block cetagories-card rounded text-white my-2 py-2"
      >
        <img class="w-75 object-fit-cover m-auto rounded" src="/images/baru.webp" alt="link ke buku baru" />
        <p class="m-0">Buku Baru</p>
      </router-link>
    </div>
    <div class="col-md-2 col-6">
      <router-link
        :to="{
          name: 'Koleksi | Toko Buku Mentari',
          query: {
            keyword: 'saintek',
          },
        }"
        class="text-center d-block cetagories-card rounded text-white my-2 py-2"
      >
        <img class="w-75 object-fit-cover m-auto rounded" src="/images/science.webp" alt="link ke buku sainter" />
        <p class="m-0">Saintek</p>
      </router-link>
    </div>
    <div class="col-md-2 col-6">
      <router-link
        :to="{
          name: 'Koleksi | Toko Buku Mentari',
          query: {
            keyword: 'soshum',
          },
        }"
        class="text-center d-block cetagories-card rounded text-white my-2 py-2"
      >
        <img class="w-75 object-fit-cover m-auto rounded" src="/images/social.webp" alt="link ke buku soshum" />
        <p class="m-0">Soshum</p>
      </router-link>
    </div>
    <div class="col-md-2 col-6">
      <router-link
        :to="{
          name: 'Koleksi | Toko Buku Mentari',
          query: {
            keyword: 'fiksi',
          },
        }"
        class="text-center d-block cetagories-card rounded text-white my-2 py-2"
      >
        <img class="w-75 object-fit-cover m-auto rounded" src="/images/fiksi.webp" alt="link ke buku fiksi" />
        <p class="m-0">Fiksi</p>
      </router-link>
    </div>
    <div class="col-md-2 col-6">
      <router-link
        :to="{
          name: 'Koleksi | Toko Buku Mentari',
          query: {
            keyword: 'internasional',
          },
        }"
        class="text-center d-block cetagories-card rounded text-white my-2 py-2"
      >
        <img class="w-75 object-fit-cover m-auto rounded" src="/images/international.webp" alt="link ke buku internasional" />
        <p class="m-0">Internasional</p>
      </router-link>
    </div>
  </div>
</template>
<style scoped>
.cetagories-card {
  background: linear-gradient(white, rgb(249, 210, 210), var(--main-color));
  box-shadow: var(--shadow);
}
</style>
