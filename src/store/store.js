import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      carts: [],
      itemsAmount: 0,
      isModalActive: false,
      isAnimationShow: false,
    };
  },
  mutations: {
    addToCarts(state, data) {
      state.isModalActive = true;
      state.itemsAmount++;
      state.carts.push(data);
      console.log(state.carts);
    },
  },
});

export default store;
