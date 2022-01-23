<template>
  <NavigatorComponent />
  <router-view/>
  <FooterComponent />
</template>

<script>
  import NavigatorComponent from '@/components/Navigator.vue'
  import FooterComponent from '@/components/Footer.vue'
  // import UserController from '@/controllers/UserController.js'

  export default{
    components: {
      NavigatorComponent,
      FooterComponent,
    },

    // async mounted(){
    //   const response = await UserController.refresh({
    //     token: localStorage.getItem('token')
    //   })

    //   this.$store.state.isLogin  = response.data.authorized
    //   this.$store.state.user     = response.data.user
    // }

  };
</script>

<style>

</style>
