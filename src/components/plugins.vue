<template>
  <section class="super-main">
    <h1>组件</h1>

    <ul>
      <li><a href="/plugins/button">button</a></li>
    </ul>
    <div>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
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
