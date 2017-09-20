<template>
  <div id="app">
    <header class="super-header">
      <h1><a href="/">NOVA</a></h1>
      <ul class="super-menu">
        <li v-bind:class="{active:this.$route.matched[0].path === '/components'}"><a href="/components">组件</a></li>
        <li v-bind:class="{active:this.$route.matched[0].path === '/guide'}"><a href="/guide">指南</a></li>
      </ul>
    </header>
    <router-view></router-view>
    <footer class="super-footer">
      <p>Copyright © 2017 <a href="http://c.lvmama.com" target="_blank">c.lvmama.com</a></p>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
  import { superNova } from '../src/assets/js/super-nova'

  superNova()

  require('script-loader!../static/doc/navigation')
</script>

<style lang="scss">
  @import "assets/scss/super-nova.scss";
  @import "assets/scss/doc.scss";

</style>
