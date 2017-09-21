<template>

  <div id="everything">

<pre>
<code class="js">
//VST日历
var vstCalendar = lv.calendar({
    cascadingCallback: function (self, $dom) {
        console.log(this);
        console.log(self);
        console.log($dom);
    },
    autoRender: false,
    trigger: ".vstInput",
    triggerEvent: "click",
    isBirthday: true,
    template: "birthday",
    wrapClass: "ui-calendar-blue",
    cascading: true,  //级联日历
    cascadingMin: 0,
    cascadingOffset: 0,
    cascadingMax: -1,  //起始与结束日期最大范围
    showNumberOfDays: false,  //是否显示
    dateFormat: "yyyy-MM-dd",
    hasTime: false,
    dayPrev: -1,
    monthPrev: -1,
    minLimit: "1990-06",
    maxLimit: "2017-06"
});

//VST日历时间
var vstHasTimeCalendar = lv.calendar({
    cascadingCallback: function (self, $dom) {
    },
    autoRender: false,
    trigger: ".vstHasTimeInput",
    triggerEvent: "click",
    isBirthday: true,
    template: "birthday",
    wrapClass: "ui-calendar-blue",
    cascading: true,  //级联日历
    cascadingMin: 0,
    cascadingOffset: 0,
    cascadingMax: -1,  //起始与结束日期最大范围
    showNumberOfDays: false,  //是否显示
    dateFormat: "yyyy-MM-dd HH:mm",
    hasTime: true,
    dayPrev: -1,
    monthPrev: -1,
    minLimit: "1990-06",
    maxLimit: "2017-06"
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
