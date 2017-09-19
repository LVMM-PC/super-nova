<template>
  <section class="super-main">
    <div class="super-detail">
      <components-sidebar></components-sidebar>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
  import componentsSidebar from '@/components/components-sidebar'

  export default {
    name: '',
    components: {componentsSidebar},
    data () {
      return {
        msg: 'a nova page'
      }
    }
  }
</script>

<style lang="scss">

</style>
