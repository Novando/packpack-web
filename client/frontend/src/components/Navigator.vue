<template>
  <!-- LOGIN MODAL -->
  <div id="login-modal" class="modal">
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
        <a href="#" class="btn ">Close</a>
      </div>
      <p v-if="!statusLogin">{{ msgLogin }}</p>
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

	<section id="info" class="container flex grid grid-cols-3 m-auto px-40 py-5 items-center border-neutral-800 border-b">
    <figure>
      <img class="h-10" src="assets/img/logo.svg">
    </figure>
    <div class="text-center">
      <a href="#">
        <i class="fas fa-phone-alt"></i> +6281 1281 8111
      </a>
      &#xA0;&#xA0;&#xA0;&#xA0;&#xA0;
      <a href="#">
        <i class="far fa-envelope-open"></i> info@kitalabel.com
      </a>
    </div>
    <div class="text-right text-4xl">
      <a v-if="!$store.state.userId" href="#login-modal">
        <i class="far fa-user"></i> &#xA0;
      </a>
      <a v-else @click="logout" href="/">
        <i class="fas fa-sign-out-alt"></i> &#xA0;
      </a>
      <router-link :to="{name : 'Cart'}">
        <i class="fas fa-shopping-bag"></i>
      </router-link>
    </div>
  </section>

<!--   <nav id="main-nav" class="container grid px-40 py-3 text-lg">
    <ul class="flex gap-10">
      <li>
        <router-link :to="{name : 'Home'}">HOME</router-link>
      </li>
      <li>
        <router-link :to="{name : 'Catalogue'}">KATALOG</router-link>
      </li>
      <li>
        <router-link :to="{name : 'Home'}">BANTUAN</router-link>
      </li>
      <li>
        <router-link :to="{name : 'Home'}">TENTANG KITA</router-link>
      </li>
    </ul>
  </nav> -->

  <!-- <nav id="alt-nav" class="fixed top-0 container grid px-40 py-3 text-lg">
    <ul class="flex gap-10 items-center">
      <li>
        <figure>
          <img class="h-8" src="assets/img/logo.svg">
        </figure>
      </li>
      <li>
        <router-link :to="{name : 'Home'}">HOME</router-link>
      </li>
      <li>
        <router-link :to="{name : 'About'}">KATALOG</router-link>
      </li>
      <li>
        <router-link :to="{name : 'Home'}">BANTUAN</router-link>
      </li>
      <li>
        <router-link :to="{name : 'Home'}">TENTANG KITA</router-link>
      </li>
    </ul>
  </nav> -->

</template>

<script>
  import UserController from '@/controllers/UserController.js'
  // import axios from 'axios'

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
        statusSignup: false,
        statusLogin : false,
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
            await localStorage.setItem('userId', response.data.id)
            console.log('success')
            this.$store.dispatch('userId', response.data.id)
            // this.$store.dispatch('setUser', response.data.user)
            // axios.defaults.headers.common['Authorization'] = response.data.token;
          }
          this.statusLogin = true
        } catch(err) {
          this.msgLogin = err.response.data.msg
        }
      },

      async logout(){
        await localStorage.removeItem('userId')
      },

      // async refresh(){
      //   await UserController.refresh()
      // },
    }
  }
</script>