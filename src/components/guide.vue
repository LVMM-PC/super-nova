<template>
  <section class="super-main">
    <div class="super-detail">
      <guide-sidebar></guide-sidebar>
      <router-view></router-view>
      <div id="navigation"></div>
    </div>
  </section>
</template>

<script>
  import guideSidebar from '@/components/guide-sidebar'
  export default {
    components: {guideSidebar},
    name: ''
  }
</script>

<style lang="scss">

</style>
