<template>
  <NavigatorComponent />
  <router-view/>
  <FooterComponent />
</template>

<script>
  import NavigatorComponent from '@/components/Navigator.vue'
  import FooterComponent from '@/components/Footer.vue'
  import vueCookies from 'vue-cookies'

  export default{
    components: {
      NavigatorComponent,
      FooterComponent,
    },

    async mounted(){
      if (vueCookies.get('token')){
        this.$store.dispatch('checkLogin', vueCookies.get('token'))
      }
    }

  }
</script>

<style>

</style>
