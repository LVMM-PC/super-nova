<template>
  <section class="super-main">
    <div class="super-detail">
      <reference-sidebar></reference-sidebar>
      <router-view></router-view>
      <div id="navigation"></div>
    </div>
  </section>
</template>

<script>
  import referenceSidebar from '@/components/reference-sidebar'
  export default {
    components: {referenceSidebar},
    name: ''
  }
</script>

<style lang="scss">

</style>
