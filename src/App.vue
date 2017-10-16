<template>
  <div id="app">
    <header class="super-header">
      <a href="/" class="super-logo">
        <div class="super-svg"></div>
        <em>NOVA</em>
      </a>
      <ul class="super-menu">
        <li v-bind:class="{active:this.$route && this.$route.path === '/components'}">
          <a href="/components">组件</a>
        </li>
        <li v-bind:class="{active:this.$route && this.$route.path === '/guide/rule'}">
          <a href="/guide/rule">规范</a>
        </li>
      </ul>
    </header>
    <router-view></router-view>
    <footer class="super-footer">
      <p>Copyright © 2017 <a href="http://c.lvmama.com" target="_blank">c.lvmama.com</a></p>
    </footer>
    <ul class="super-toolbar">
      <li class="top">
        <a href="#"><em>顶部</em><i></i></a>
      </li>
      <li class="issue">
        <a href="https://github.com/LVMM-PC/super-nova/issues" target="_blank"><em>反馈</em><i></i></a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
  import { superNova } from '../src/assets/js/super-nova'

  superNova()

  require('script-loader!../static/doc/highlight.pack')
  require('script-loader!../static/doc/navigation')
</script>

<style lang="scss">
  @import "assets/scss/super-nova.scss";
  @import "assets/scss/color-brewer.css";
  @import "assets/scss/doc.scss";

</style>
