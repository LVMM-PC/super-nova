<template>

  <div id="everything">

    <ih1 :model="{value: 'Calendar'}"></ih1>
    <pre>
<code class="js">var mySmallBimonthlyCalendar = lv.calendar({
    autoRender: true,
    trigger: "#mySmallBimonthlyCalendar",
    triggerEvent: "click",
    bimonthly: true,

    //点击选择日期后的回调函数 默认返回值: calendar对象
    selectDateCallback: function () {
        //console.log("selectDateCallback")
    },
    template: "small"
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
