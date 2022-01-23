import { createStore } from 'vuex'

export default createStore({
  // For production, TURN OFF STRICT MODE!!!!!!
  strict: true,
  state: {
    apiUrl    : 'http://localhost:3000/storage/',
    // token: null,
    // isLogin: false
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
