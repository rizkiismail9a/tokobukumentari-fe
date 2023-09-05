<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
  <!-- <Footer></Footer> -->
</template>
