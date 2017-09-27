<template>
  <div id="everything">

    <ih1 :model="{value: 'Buttons'}">Buttons</ih1>

    <ih2 :model="{value: '引用'}"></ih2>
    <div>
      <ul>
        <li>
          <a href="http://pic.lvmama.com/styles/lv/buttons.css" target="_blank">http://pic.lvmama.com/min/index.php?f=/styles/lv/buttons.css</a>
        </li>
      </ul>
    </div>

    <ih2 :model="{value: '预览'}"></ih2>

    <ih3 :model="{value: '超大按钮 height: 42px;'}"></ih3>
    <section>
      <div class="btn-group">
        <a class="btn btn-xl btn-pink">超大按钮</a>
        <code>a.btn.btn-xl.btn-pink</code>
      </div>
      <div class="btn-group">
        <a class="btn btn-xl btn-orange">超大按钮</a>
        <code>a.btn.btn-xl.btn-orange</code>
      </div>
      <div class="btn-group">
        <a class="btn btn-xl btn-blue">超大按钮</a>
        <code>a.btn.btn-xl.btn-blue</code>
      </div>
      <div class="btn-group">
        <a class="btn btn-xl">超大按钮</a>
        <code>a.btn.btn-xl</code>
      </div>
      <div class="btn-group">
        <a class="btn btn-xl btn-pink btn-disabled">超大按钮</a>
        <a class="btn btn-xl btn-orange btn-disabled">超大按钮</a>
        <a class="btn btn-xl btn-blue btn-disabled">超大按钮</a>
        <a class="btn btn-xl btn-disabled">超大按钮</a>
        <code>a.btn.btn-xl.btn-disabled</code>
      </div>
      <div class="btn-group">
        <a class="btn btn-xl btn-pink"><span class="icon"></span>超大按钮</a>
        <a class="btn btn-xl btn-orange"><span class="icon"></span>超大按钮</a>
        <a class="btn btn-xl btn-blue"><span class="icon"></span>超大按钮</a>
        <a class="btn btn-xl"><span class="icon"></span>超大按钮</a>
        <code>a.btn.btn-xl&gt;span.icon</code>
      </div>
      <blockquote>用 &lt;i&gt; 元素做图标在语义上是不正确的（虽然看起来像 icon 的缩写）</blockquote>
      <div class="btn-group">
        <a class="btn btn-xl btn-forbidden">禁用按钮</a>
        <code>a.btn.btn-xl.btn-forbidden</code>
      </div>
    </section>

    <ih3 :model="{value: '大型按钮 height: 36px;'}"></ih3>
    <section>
      <div class="btn-group">
        <a class="btn btn-lg btn-pink">大型按钮</a>
        <a class="btn btn-lg btn-orange">大型按钮</a>
        <a class="btn btn-lg btn-blue">大型按钮</a>
        <a class="btn btn-lg">大型按钮</a>
        <code>a.btn.btn-lg</code>
      </div>
      <div class="btn-group">
        <a class="btn btn-lg btn-pink btn-disabled">大型按钮</a>
        <a class="btn btn-lg btn-orange btn-disabled">大型按钮</a>
        <a class="btn btn-lg btn-blue btn-disabled">大型按钮</a>
        <a class="btn btn-lg btn-disabled">大型按钮</a>
        <code>a.btn.btn-lg.btn-disabled</code>
      </div>
      <div class="btn-group">
        <a class="btn btn-lg btn-pink"><span class="icon"></span>大型按钮</a>
        <a class="btn btn-lg btn-orange"><span class="icon"></span>大型按钮</a>
        <a class="btn btn-lg btn-blue"><span class="icon"></span>大型按钮</a>
        <a class="btn btn-lg"><span class="icon"></span>大型按钮</a>
        <code>a.btn.btn-lg&gt;span.icon</code>
      </div>
      <div class="btn-group">
        <a class="btn btn-lg btn-forbidden">禁用按钮</a>
        <code>a.btn.btn-lg.btn-forbidden</code>
      </div>
    </section>

    <ih3 :model="{value: '中型按钮 height: 30px;'}"></ih3>
    <section>
      <div class="btn-group">
        <a class="btn btn-pink">中型按钮</a>
        <a class="btn btn-orange">中型按钮</a>
        <a class="btn btn-blue">中型按钮</a>
        <a class="btn">中型按钮</a>
        <code>a.btn</code>
      </div>
      <div class="btn-group">
        <a class="btn btn-pink btn-disabled">中型按钮</a>
        <a class="btn btn-orange btn-disabled">中型按钮</a>
        <a class="btn btn-blue btn-disabled">中型按钮</a>
        <a class="btn btn-disabled">中型按钮</a>
        <code>a.btn.btn-disabled</code>
      </div>
      <div class="btn-group">
        <a class="btn btn-forbidden">禁用按钮</a>
        <code>a.btn.btn-forbidden</code>
      </div>
    </section>

    <ih3 :model="{value: '小按钮 height: 26px;'}"></ih3>
    <section>
      <div class="btn-group">
        <a class="btn btn-sm btn-pink">小按钮</a>
        <a class="btn btn-sm btn-orange">小按钮</a>
        <a class="btn btn-sm btn-blue">小按钮</a>
        <a class="btn btn-sm">小按钮</a>
        <code>a.btn.btn-sm</code>
      </div>
      <div class="btn-group">
        <a class="btn btn-sm btn-pink btn-disabled">小按钮</a>
        <a class="btn btn-sm btn-orange btn-disabled">小按钮</a>
        <a class="btn btn-sm btn-blue btn-disabled">小按钮</a>
        <a class="btn btn-sm btn-disabled">小按钮</a>
        <code>a.btn.btn-sm.btn-disabled</code>
      </div>
      <div class="btn-group">
        <button class="btn btn-sm btn-forbidden">禁用钮</button>
        <code>a.btn.btn-sm.btn-forbidden</code>
      </div>
    </section>

    <ih3 :model="{value: '超小按钮 height: 22px;'}"></ih3>
    <section>
      <div class="btn-group">
        <a class="btn btn-xs btn-pink">超小按钮</a>
        <a class="btn btn-xs btn-orange">超小按钮</a>
        <a class="btn btn-xs btn-blue">超小按钮</a>
        <a class="btn btn-xs">超小按钮</a>
        <code>a.btn.btn-xs</code>
      </div>
      <div class="btn-group">
        <a class="btn btn-xs btn-pink btn-disabled">超小按钮</a>
        <a class="btn btn-xs btn-orange btn-disabled">超小按钮</a>
        <a class="btn btn-xs btn-blue btn-disabled">超小按钮</a>
        <a class="btn btn-xs btn-disabled">超小按钮</a>
        <code>a.btn.btn-xs.btn-disabled</code>
      </div>
      <div class="btn-group">
        <button class="btn btn-xs btn-forbidden">禁用钮</button>
        <code>a.btn.btn-xs.btn-forbidden</code>
      </div>
    </section>

    <ih3 :model="{value: '按钮'}"></ih3>
    <section>
      <div class="btn-group">
        <button class="btn btn-pink">中型按钮</button>
        <button class="btn btn-orange">中型按钮</button>
        <button class="btn btn-blue">中型按钮</button>
        <button class="btn">中型按钮</button>
        <code>button.btn</code>
      </div>
    </section>

    <ih3 :model="{value: '链接'}"></ih3>
    <section>
      <div class="btn-group">
        <a class="btn btn-pink">中型按钮</a>
        <a class="btn btn-orange">中型按钮</a>
        <a class="btn btn-blue">中型按钮</a>
        <a class="btn">中型按钮</a>
        <code>a.btn</code>
      </div>
    </section>

    <ih3 :model="{value: '行内'}"></ih3>
    <section>
      <div class="btn-group">
        <span class="btn btn-pink">中型按钮</span>
        <span class="btn btn-orange">中型按钮</span>
        <span class="btn btn-blue">中型按钮</span>
        <span class="btn">中型按钮</span>
        <code>span.btn</code>
      </div>
    </section>

    <ih3 :model="{value: '输入按钮'}"></ih3>
    <section>
      <div class="btn-group">
        <input class="btn btn-pink" type="button" value="中型按钮">
        <input class="btn btn-orange" type="button" value="中型按钮">
        <input class="btn btn-blue" type="button" value="中型按钮">
        <input class="btn" type="button" value="中型按钮">
        <code>input.btn[type=button]</code>
      </div>
      <div class="btn-group">
        <input class="btn btn-pink" type="button" value="中型按钮" disabled="disabled">
        <input class="btn btn-orange" type="button" value="中型按钮" disabled="disabled">
        <input class="btn btn-blue" type="button" value="中型按钮" disabled="disabled">
        <input class="btn" type="button" value="中型按钮" disabled="disabled">
        <code>input.btn[type=button][disabled]</code>
      </div>
    </section>

    <ih3 :model="{value: '块级按钮'}"></ih3>
    <section>
      <div class="btn-group" style="width: 200px;">
        <a class="btn btn-block btn-pink">中型按钮</a>
      </div>
      <div class="btn-group" style="width: 300px;">
        <a class="btn btn-block btn-orange">中型按钮</a>
      </div>
      <div class="btn-group" style="width: 400px;">
        <a class="btn btn-block btn-blue">中型按钮</a>
      </div>
      <div class="btn-group" style="width: 500px;">
        <a class="btn btn-block">中型按钮</a>
      </div>
      <div class="btn-group">
        <code>a.btn.btn-block</code>
      </div>
    </section>

  </div>
</template>

<script>
  import ih1 from '@/components/ih1'
  import ih2 from '@/components/ih2'
  import ih3 from '@/components/ih3'

  export default {
    name: 'button',
    components: {
      ih1,
      ih2,
      ih3
    }
  }
</script>

<style lang="scss">

  @import "/static/assert/css/buttons.css";

  .btn .icon {
    background-color: #666666;
  }

  .btn {
    margin: 5px 0;
  }

  .btn-pink .icon,
  .btn-orange .icon,
  .btn-blue .icon {
    background-color: #FFFFFF;
  }

  .btn-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 0;
  }

  .btn {
    margin-right: 10px;
  }

</style>
