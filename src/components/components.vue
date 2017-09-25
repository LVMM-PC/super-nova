<template>
  <section class="super-main">
    <div class="super-detail">
      <components-sidebar></components-sidebar>
      <router-view></router-view>
      <div id="navigation"></div>
    </div>
  </section>
</template>

<script>
  import componentsSidebar from '@/components/components-sidebar'

  export default {
    name: 'components',
    components: {componentsSidebar}
  }
</script>

<style lang="scss">

</style>
