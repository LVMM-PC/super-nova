<template>
  <div id="app">
    <header class="super-header">
      <a href="/" class="super-logo">
        <div class="svg">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="200px" height="200px" viewBox="0 0 200 200" enable-background="new 0 0 200 200" xml:space="preserve">
<g>
	<g>
		<path class="logo-main"
          fill="#3FA9F5"
          d="M186.5,134c0,8.8-5.982,19.604-13.604,24.007l-58.67,33.986c-7.619,4.403-20.021,4.403-27.645,0
			l-59.015-33.986C19.952,153.604,13.5,142.8,13.5,134V66c0-8.8,6.48-19.603,14.104-24.007l58.92-33.985
			c7.619-4.404,20.147-4.404,27.771,0l58.574,33.985C180.484,46.396,186.5,57.2,186.5,66V134z"></path>
	</g>
	<g>
		<path class="logo-triangle"
          fill="#FFFFFF"
          d="M66.5,49.126c0-5.5,3.896-7.75,8.66-5l87.68,50.623c4.764,2.75,4.764,7.25,0,10l-87.68,50.621
			c-4.766,2.75-8.66,0.5-8.66-5V49.126z"></path>
	</g>
</g>
</svg>
        </div>
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
