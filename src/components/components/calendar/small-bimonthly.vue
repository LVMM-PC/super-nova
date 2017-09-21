<template>

  <div id="everything">

    <h1>Calendar</h1>
<pre>
<code class="js">
var mySmallBimonthlyCalendar = lv.calendar({
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
</code>
</pre>

  </div>

</template>

<script>
  export default {
    name: 'setting'
  }
</script>

<style lang="scss">
  @import "/static/assert/css/buttons.css";
  @import "/static/assert/css/calendar.css";

</style>
