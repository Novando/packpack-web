import { createStore } from 'vuex'

export default createStore({
  // For production, TURN OFF STRICT MODE!!!!!!
  strict: true,
  state: {
    apiUrl    : 'http://localhost:3000/storage/',
    user      : null,
    userId    : localStorage.getItem('userId') || null,
    token     : localStorage.getItem('token') || '',
    status    : null,
    isLogin   : false
  },
  getters: {
    // isLoggedIn : function(state){
    //  if (state.token != ''){
    //    return true
    //  } else {
    //    return false
    //  }
    // }
    isLogin     : state => !!state.token,
    authState   : state => state.status,
    user        : state => state.user
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token == '') {
        state.isLogin = false
      } else {
        state.isLogin = true
      }
      localStorage.setItem('token', token)
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  },
  modules: {
  }
})
