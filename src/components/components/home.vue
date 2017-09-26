<template>
  <div id="everything">

    <h1>组件</h1>
    <div>
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
        <em>NOVA</em>
      </div>
      <p>点击左侧导航开始探索吧</p>
    </div>

    <h2>一个简单的例子</h2>
    <section>
      <p>实现一个现代风格的蓝色大按钮，仅仅使用预设样式组合即可：</p>
      <div class="demo-box">
        <div class="btn btn-blue btn-lg" v-on:click="popTipClick">蓝色按钮</div>
        <div class="demo-pop-tip" v-if="clickTimes>9">
          <div><em>{{clickTimes}}</em>Click</div>
          <div>{{clickText}}</div>
        </div>
      </div>

      <pre>
<code class="html">&lt;div class="btn btn-blue btn-lg"&gt;蓝色按钮&lt;/div&gt;
</code></pre>
    </section>

    <h3>开始使用</h3>
    <section>
      引用
      <a target="_blank" href="http://pic.lvmama.com/styles/lv/buttons.css">http://pic.lvmama.com/min/index.php?f=/styles/lv/buttons.css</a>
      即可使用按钮组件
    </section>

  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        clickTimes: 0,
        clickText: '点击'
      }
    },
    methods: {
      popTipClick: function () {
        if (this.clickTimes > 1024 * 1024) {
          this.clickTimes = 0
        }
        this.clickTimes++

        switch (this.clickTimes) {
          case 1:
            this.clickText = '1+; 第一次点击'
            break
          case 10:
            this.clickText = '10+; 鼠标大师'
            break
          case 50:
            this.clickText = '50+; 别点了'
            break
          case 100:
            this.clickText = '100+; 鼠标坏了吗'
            break
          case 1000:
            this.clickText = '1000+; 真闲'
            break
          case 10000:
            this.clickText = '10000+; 你赢了'
            break
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "/static/assert/css/buttons.css";

  .demo-box {
    position: relative;
    user-select: none;
    border: 1px solid #eee;
    box-sizing: border-box;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .demo-pop-tip {
    position: absolute;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 5px 14.25px 0.75px rgba(6, 0, 1, 0.15);
    top: -40px;
    padding: 10px;
    p {
      margin: 0;
    }
    em {
      font-style: normal;
      color: #2299ee;
      font-size: 16px;
      font-weight: bold;
    }
  }

</style>
