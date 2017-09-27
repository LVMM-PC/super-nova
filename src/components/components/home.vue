<template>
  <div id="everything">

    <ih1 :model="{value: '组件'}"></ih1>
    <div>
      <bigLogo></bigLogo>
      <p>点击左侧导航开始探索吧</p>
    </div>

    <ih2 :model="{value: '一个简单的例子'}"></ih2>
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

    <ih3 :model="{value: '开始使用'}"></ih3>
    <section>
      引用
      <a target="_blank" href="http://pic.lvmama.com/styles/lv/buttons.css">http://pic.lvmama.com/min/index.php?f=/styles/lv/buttons.css</a>
      即可使用按钮组件
    </section>

  </div>
</template>

<script>
  import ih1 from '@/components/ih1'
  import ih2 from '@/components/ih2'
  import ih3 from '@/components/ih3'
  import bigLogo from '@/components/big-logo'

  export default {
    name: 'home',
    components: {
      ih1,
      ih2,
      ih3,
      bigLogo
    },
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
    > div {
      display: flex;
    }
    p {
      margin: 0;
    }
    em {
      margin-right: 5px;
      font-style: normal;
      color: #2299ee;
      font-size: 16px;
      font-weight: bold;
    }
  }

</style>
