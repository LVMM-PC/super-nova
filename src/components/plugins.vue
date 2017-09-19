<template>
  <section class="super-main">
    <h1>组件</h1>
    <ul>
      <li><a href="/plugins/button">button</a></li>
      <li><a href="/plugins/dialog">dialog</a></li>
    </ul>
    <router-view></router-view>
  </section>
</template>

<script>
  import componentsSidebar from '@/components/guide'
  export default {
    name: '',
    data () {
      return {
        msg: 'a nova page'
      }
    }
  }
</script>

<style lang="scss">

</style>
