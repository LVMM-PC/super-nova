<template>
  <div id="everything">

    <ih1 :model="{value: 'Font Family'}"></ih1>

    <ih2 :model="{value: '建议'}"></ih2>
    <section>
      <blockquote>
        参考文档：
        <a href="https://github.com/thx/cube/blob/gh-pages/build/neat.css" target="_blank">https://github.com/thx/cube/blob/gh-pages/build/neat.css</a>
        <a href="http://www.uisdc.com/debug-for-smartisan-website" target="_blank">http://www.uisdc.com/debug-for-smartisan-website</a>
      </blockquote>
      <pre><code class="css">/**
 * 非称线字体
 * 中文优先使用苹方(macOS)、微软雅黑(Windows)
    Helvetica Neue
    Arial
    PingFang SC 苹方
    Microsoft Yahei 微软雅黑
    SimSun 宋体
 */
.sans-serif {
    font-family: "Helvetica Neue", "Arial", "PingFang SC", "Microsoft Yahei", "SimSun", sans-serif;
}
</code></pre>
      <pre>
<code class="css">/**
 * 称线字体，无宋体系统使用非称线
 */
.serif {
    font-family: "Arial", "PingFang SC", "SimSun", serif;
    *font-family: "SimSun", serif;
}
</code></pre>
      <pre>
<code class="css">/**
 * 数字字体
 */
.arial {
    font-family: "Arial", sans-serif;
}
</code></pre>
    </section>

  </div>
</template>

<script>
  import ih1 from '@/components/ih1'
  import ih2 from '@/components/ih2'
  import ih3 from '@/components/ih3'

  export default {
    name: 'font-family',
    components: {
      ih1,
      ih2,
      ih3
    }
  }
</script>

<style lang="scss">


</style>
