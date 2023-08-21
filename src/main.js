import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import { attempStore } from "./plugins/attemp";
import { createPinia } from "pinia";
// import store from "./store/store";
// const pinia = ;
const app = createApp(App);
// app.use(store);
app.use(createPinia());
attempStore.install().then(() => {
  app.use(router);
  app.mount("#app");
});
