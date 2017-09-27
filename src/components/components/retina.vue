<template>
  <div id="everything">

    <ih1 :model="{value: 'Retina'}"></ih1>

    <ih2 :model="{value: '建议'}"></ih2>
    <blockquote>
      Ctrl + = 放大屏幕显示比例到200%或使用高分屏显示器以查看效果
    </blockquote>
    <ih3 :model="{value: '普通图片'}"></ih3>
    <section>
      <div class="lvmama-logo"></div>
    </section>
    <ih3 :model="{value: '高分屏适配图片'}"></ih3>
    <section>
      <div class="lvmama-logo lvmama-logo-retina"></div>
    </section>
    <pre><code>
.lvmama-logo {
    background-image: url(../img/logo-61.png);
    width: 330px;
    height: 70px;
}

@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
only screen and (min--moz-device-pixel-ratio: 1.5),
only screen and (min-device-pixel-ratio: 1.5) {
    /* 当设备像素比不小于1.5的时候... */
    .lvmama-logo-retina {
        background-image: url(../img/logo-61@2x.png);
        background-size: 100%;
    }

}
</code></pre>

  </div>
</template>

<script>
  import ih1 from '@/components/ih1'
  import ih2 from '@/components/ih2'
  import ih3 from '@/components/ih3'

  export default {
    name: 'retina',
    components: {
      ih1,
      ih2,
      ih3
    }
  }

</script>

<style lang="scss">

  @import "../../assets/scss/retina.css";

</style>
