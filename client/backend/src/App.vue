<template class="hold-transition dark-mode sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
  <div id="nav">
    <Navigator />
    <router-view/>
  </div>
</template>

<script>
  import Navigator from '@/components/Navigator.vue';

  export default{
    components:{
      Navigator
    }
  }  
</script>

<style>

</style>
