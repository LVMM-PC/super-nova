<template>
  <div id="everything">

    <h1>Selectors Level 3</h1>

    <blockquote>
      参考文档：
      <a href="https://www.w3.org/TR/selectors/#specificity" target="_blank">https://www.w3.org/TR/selectors/#specificity</a>
      <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity" target="_blank">https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity</a>
    </blockquote>

    <h2 id="specificity">
      <span class="secno">9. </span>
      计算选择器的优先级
    </h2>
    <section class="reference">
      <p>选择器的优先级计算规则如下：</p>
      <ul>
        <li>A = 计算选择器中所有ID选择器（例如：#example）的总和</li>
        <li>B = 计算选择器中所有类选择器（class selectors）（例如：.example）、属性选择器（attributes
          selectors）（例如：[type="radio"]）、伪类选择器（pseudo-classes）（例如：:hover）的总和
        </li>
        <li>C = 计算元素选择器（type selectors）（例如：h1）与伪元素选择器（pseudo-elements）（例如：:before）的总和</li>
        <li>忽略通用选择器（universal selector）（*）, 选择器中的任意连接符（combinators）如（+, >, ~, ' '）</li>
      </ul>
      <p>否定伪类（negation pseudo-class）（:not()）中的选择器计算规则与以上规则一致，但是否定伪类本身不会影响优先级。</p>
      <p>比较2个选择器的A的大小，如果相同，则比较B的大小，如果A与B均相同，则比较C的大小。例子如下所示。</p>
      <pre><code>Examples:

*               /* a=0 b=0 c=0 -> specificity =   0 */
LI              /* a=0 b=0 c=1 -> specificity =   1 */
UL LI           /* a=0 b=0 c=2 -> specificity =   2 */
UL OL+LI        /* a=0 b=0 c=3 -> specificity =   3 */
H1 + *[REL=up]  /* a=0 b=1 c=1 -> specificity =  11 */
UL OL LI.red    /* a=0 b=1 c=3 -> specificity =  13 */
LI.red.level    /* a=0 b=2 c=1 -> specificity =  21 */
#x34y           /* a=1 b=0 c=0 -> specificity = 100 */
#s12:not(FOO)   /* a=1 b=0 c=1 -> specificity = 101 */
</code></pre>
    </section>

  </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>

<style lang="scss">

</style>
