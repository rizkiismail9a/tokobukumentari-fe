import { createStore } from "vuex";
// import createPersistedState from "vuex-plugin-persistedstate";

const store = createStore({
  state() {
    return {
      carts: [],
      // itemsAmount: 0,
      isModalActive: false,
    };
  },
  mutations: {
    addToCarts(state, data) {
      state.isModalActive = true;
      // state.itemsAmount++;
      state.carts.push(data);
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    closeModal(state) {
      state.isModalActive = false;
    },
  },
  getters: {
    getItemsAmount(state) {
      return state.itemsAmount;
    },
    getModal(state) {
      return state.isModalActive;
    },
  },
});

export default store;
