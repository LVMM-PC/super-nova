<template>
  <section class="super-main">
    <div class="super-detail">
      <div id="everything">
        <div class="section">

          <p>
            <span class="btn JS_loading_it">loading状态，遮盖当前页面</span>
          </p>
          <p>
            <span class="btn JS_loading_top">loading状态，遮盖完整浏览器窗口</span>
          </p>
          <p>
            iframe中的内容
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import ih1 from '@/components/ih1'
  import ih2 from '@/components/ih2'
  import ih3 from '@/components/ih3'

  export default {
    name: 'iframe',
    components: {
      ih1,
      ih2,
      ih3
    }
  }
  require('script-loader!../../../../static/js/dialog')
  require('script-loader!../../../../static/doc/dialog')
</script>

<style lang="scss">

  @import "/static/assert/css/buttons.css";
  @import "/static/assert/css/dialog.css";

</style>
