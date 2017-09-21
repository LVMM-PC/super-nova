<template>

  <div id="everything">

    <h1>Calendar</h1>
<pre>
<code class="js">
var mySmallCalendar = lv.calendar({

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
