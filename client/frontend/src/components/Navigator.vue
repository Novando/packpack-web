<template>
  <!-- LOGIN MODAL -->
  <input v-if="!($store.state.token)" type="checkbox" id="login-modal" class="modal-toggle"> 
  <div v-if="!($store.state.token)" class="modal">
    <div class="modal-box">
      <h3 class="jakarta-bold text-4xl mb-4">Login</h3>
      <div class="form-control">
        <label for="email" class="label">
          <span class="label-text">Email / Password :</span>
        </label> 
        <input id="email" placeholder="Email or Password" class="input input-bordered" type="text" v-model="credential">
        <label for="password" class="label">
          <span class="label-text">Password :</span>
        </label> 
        <input id="password" placeholder="Password" class="input input-bordered" type="password" v-model="passLogin">
      </div>
      <p>Belum punya akun? <a href="#signup-modal" class="link">Klik untuk mendaftar</a></p>
      <div class="modal-action">
        <button @click="login" type="submit" class="btn btn-primary">Login</button> 
        <label for="login-modal" class="btn">Close</label>
      </div>
      <p v-if="!($store.state.token)">{{ msgLogin }}</p>
      <p v-else>Welcome back {{ credential }}</p>
    </div>
  </div>


  <!-- SIGNUP MODAL -->
  <div id="signup-modal" class="modal">
    <div class="modal-box">
      <h3 class="jakarta-bold text-4xl mb-4">Signup</h3>
      <div class="form-control">
        <label for="email" class="label">
          <span class="label-text">Email :</span>
        </label> 
        <input id="email" placeholder="Email" class="input input-bordered" type="text" v-model="email">
        <label for="username" class="label">
          <span class="label-text">Username :</span>
        </label> 
        <input id="username" placeholder="Username" class="input input-bordered" type="text" v-model="user">
        <label for="password" class="label">
          <span class="label-text">Password :</span>
        </label>
        <input id="password" placeholder="Password" class="input input-bordered" type="password" v-model="passSignup">
        <label for="conf-pass" class="label">
          <span class="label-text">Konfirmasi Password :</span>
        </label>
        <input id="conf-pass" placeholder="Konfirmasi Password" class="input input-bordered" type="password" v-model="confPass">
      </div>
      <p>Sudah mempunyai akun? <a href="#login-modal" class="link">Silahkan Login</a></p>
      <div class="modal-action">
        <button @click="signup" class="btn btn-primary">Signup</button> 
        <a href="#" class="btn ">Close</a>
      </div>
      <p v-if="!statusSignup">{{ msgSignup }}</p>
      <p v-else>
        Selamat {{ user }}, akun kamu sudah terdaftar.<br>
        <a href="#login-modal" class="link">Silahkan Login</a>
      </p>
    </div>
  </div>
  
  <div class="bg-white fixed w-screen navbar mb-2 shadow-lg z-10">
    <div class="flex-1 px-2 mx-2">
      <span class="text-lg font-bold">
        PackPack
      </span>
    </div> 
    <div class="flex-none hidden px-2 mx-2 lg:flex">
      <div class="flex items-stretch">
        <label v-if="!($store.state.token)" for="login-modal" class="btn btn-ghost rounded-btn">
          <i class="fas fa-sign-in-alt"></i>&#160;Masuk
        </label>
        <button v-if="$store.state.token" class="btn btn-ghost rounded-btn">
          <i class="fas fa-user-circle"></i>&#160;Dashboard
        </button>
        <button v-if="$store.state.token" class="btn btn-ghost rounded-btn">
          <i class="fas fa-bell"></i>&#160;Notifikasi
        </button>
        <button v-if="$store.state.token" @click="logout" class="btn btn-ghost rounded-btn">
          <i class="fas fa-sign-out-alt"></i>&#160;Keluar
        </button>
        <router-link :to="{ name: 'Cart' }" class="btn btn-ghost rounded-btn">
          <i class="fas fa-shopping-cart"></i>
        </router-link>
      </div>
    </div> 
    <div class="flex-none flex lg:hidden">
      <button class="btn btn-square btn-ghost">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </div>
</template>

<script>
  import UserController from '@/controllers/UserController.js'
  import vueCookies from 'vue-cookies'

	export default{
		name: 'NavigatorComponent',

    data(){
      return{
        credential  : '',
        email       : '',
        user        : '',
        passLogin   : '',
        passSignup  : '',
        confPass    : '',
        msgLogin    : null,
        msgSignup   : null
      }
    },

    methods: {
      async signup() {
        try{
          await UserController.register({
            email: this.email,
            username: this.user,
            password: this.passSignup,
            confirm: this.confPass
          })
          this.statusSignup = true
        } catch(err) {
          this.msgSignup = err.response.data.msg
        }
      },

      async login() {
        try{
          const response = await UserController.login({
            credential: this.credential,
            password: this.passLogin,
          });
          if (response.data.success) {
            await vueCookies.set('token', response.data.token)
            console.log('success')
            this.$store.dispatch('checkLogin', response.data.token)
          }
          this.statusLogin = true
        } catch(err) {
          console.log(err)
          this.msgLogin = err.response.data.msg
        }
      },

      async logout(){
        this.$store.dispatch('logout')
        await vueCookies.remove('token')
      },

      // async refresh(){
      //   await UserController.refresh()
      // },
    }
  }
</script>