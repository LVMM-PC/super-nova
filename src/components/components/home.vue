<template>
  <div id="everything">

    <h1>组件</h1>
    <div>
      <p>点击左侧导航开始探索吧</p>
    </div>

    <h2>一个简单的例子</h2>
    <section>
      <p>实现一个现代风格的蓝色大按钮，仅仅使用预设样式组合即可：</p>
      <div class="demo-box">
        <div class="btn btn-blue btn-lg">蓝色按钮</div>
      </div>

      <pre>
<code class="html">
&lt;div class="btn btn-orange btn-lg"&gt;蓝色按钮&lt;/div&gt;
</code>
</pre>
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
    name: 'home'
  }
</script>

<style lang="scss">
  @import "/static/assert/css/buttons.css";

  .demo-box {
    border: 1px solid #eee;
    box-sizing: border-box;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
