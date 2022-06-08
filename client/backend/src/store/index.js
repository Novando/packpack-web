import { createStore } from 'vuex'

export default createStore({
  // For production, TURN OFF STRICT MODE!!!!!!
  strict: true,
  state: {
    apiUrl    : `${process.env.VUE_APP_API}/storage`,
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
