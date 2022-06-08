import { createStore } from 'vuex'
import jwt from 'jwt-decode'

export default createStore({
  // For production, TURN OFF STRICT MODE!!!!!!
  strict: true,
  state: {
    apiUrl    : `${process.env.VUE_APP_API}/storage`,
    user      : null,
    userId    : null,
    role      : 'guest',
    token     : null
  },
  getters: {
    // isLoggedIn : function(state){
    //  if (state.token != ''){
    //    return true
    //  } else {
    //    return false
    //  }
    // }
    // isLogin     : state => !!state.token,
    // authState   : state => state.status,
    // user        : state => state.user
  },
  mutations: {
    checkLogin (state, token) {
      state.token = token
      if (token == '' || token == null) {
        state.user    = null
        state.role    = null
        state.userId  = null
      } else {
        state.user    = jwt(token).getUsername
        state.role    = jwt(token).getRole
        state.userId  = jwt(token).getId
      }
      console.log(state.user)
    },

    logout (state) {
      state.user    = null
      state.role    = null
      state.userId  = null
      state.token   = null
    }
  },
  actions: {
    checkLogin ({commit}, token) {
      commit('checkLogin', token)
    },

    logout ({commit}) {
      commit('logout')
    }
  },
  modules: {
  }
})
