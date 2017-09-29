<template>
  <section class="super-main super-main-404">
    <div class="super-detail">
      <div id="everything">
        <h1>错误</h1>
        <div class="super-nova-logo-big">
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
          <em>404</em>
        </div>
        <div id="page-404">
          <span>页面未找到</span>
        </div>
      </div>
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
  .super-main-404 {
    .super-nova-logo-big {
      em {
        font-size: 200px;
        line-height: 1em;
      }
      .logo-main {
        animation: none;
      }
    }
  }

  #page-404 {
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    color: #999;
    > em {
      font-style: normal;
      line-height: 1em;
      font-size: 200px;
    }
    > span {
      line-height: 1em;
      font-size: 50px;
    }
  }
</style>
