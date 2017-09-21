<template>
  <div id="app">
    <header class="super-header">
      <div class="super-logo">
        <div class="super-svg"></div>
        <a href="/">NOVA</a></div>
      <ul class="super-menu">
        <li v-bind:class="{active:this.$route.path === '/components'}">
          <router-link to="/components">组件</router-link>
        </li>
        <li v-bind:class="{active:this.$route.path === '/guide'}">
          <router-link to="/guide">指南</router-link>
        </li>
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
