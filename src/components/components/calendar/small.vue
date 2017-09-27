<template>

  <div id="everything">

    <ih1 :model="{value: 'Calendar'}"></ih1>
    <pre>
<code class="js">var mySmallCalendar = lv.calendar({

    autoRender: true,
    trigger: "#mySmallCalendar",
    triggerEvent: "click",

    //点击选择日期后的回调函数 默认返回值: calendar对象
    selectDateCallback: function () {
        //console.log("selectDateCallback")
    },
    //取消选择日期的回调函数 当allowMutiSelected为true时生效
    cancelDateCallback: function () {
        //console.log("cancelDateCallback")
    },
    //数据加载完成并显示出日历后的回调函数
    completeCallback: function () {
        //console.log("completeCallback")
    },

    template: "small",
    allowMutiSelected: true,

    monthNext: 2,
    monthPrev: 2,

    dayNext: 10,
    dayPrev: 10

});
</code></pre>

  </div>

</template>

<script>
  import ih1 from '@/components/ih1'
  import ih2 from '@/components/ih2'
  import ih3 from '@/components/ih3'

  export default {
    name: 'setting',
    components: {
      ih1,
      ih2,
      ih3
    }
  }
</script>

<style lang="scss">
  @import "/static/assert/css/buttons.css";
  @import "/static/assert/css/calendar.css";

</style>
