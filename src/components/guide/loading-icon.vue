<template>
  <div id="everything">

    <ih1 :model="{value: 'loading 图标'}"></ih1>
    <p>延迟加载的图片或内容使用的 loading 图标：
      <small>两种尺寸</small>
    </p>
    <p><b>28px：</b> <img src="http://pic.lvmama.com/img/new_v/ui_scrollLoading/loading.gif" alt=""/> <a target="_blank"
                                                                                                        href="http://pic.lvmama.com/img/new_v/ui_scrollLoading/loading.gif">http://pic.lvmama.com/img/new_v/ui_scrollLoading/loading.gif</a>
    </p>
    <p><b>46px：</b> <img src="http://pic.lvmama.com/img/new_v/ui_scrollLoading/loadingGIF46px.gif" alt=""/> <a
      target="_blank" href="http://pic.lvmama.com/img/new_v/ui_scrollLoading/loadingGIF46px.gif">http://pic.lvmama.com/img/new_v/ui_scrollLoading/loadingGIF46px.gif</a>
    </p>


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

</style>
