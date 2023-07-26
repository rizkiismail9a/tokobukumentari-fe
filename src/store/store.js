import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      carts: new Set(),
      itemsAmount: 0,
      isModalActive: false,
      isAnimationShow: false,
    };
  },
  mutations: {
    addToCarts(state, data) {
      state.isModalActive = true;
      state.itemsAmount++;
      state.carts.add(data);
      console.log("ada");
    },
  },
});

export default store;
