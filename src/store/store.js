import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      carts: [],
    };
  },
  mutations: {
    addToCarts(state, data) {
      state.carts.push(data);
    },
  },
});

export default store;
