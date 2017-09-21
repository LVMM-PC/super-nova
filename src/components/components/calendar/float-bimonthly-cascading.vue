<template>

  <div id="everything">

    <h1>Calendar</h1>
    <pre>
<code class="js">
var floatBimonthlyCascadingCalendar = lv.calendar({
    autoRender: false,  //弹出后渲染
    trigger: ".floatBimonthlyCascadingInput",  //目标元素选择器
    triggerEvent: "click",  //触发事件
    bimonthly: true,  //是否双月显示
    template: "small",  //使用小日历模板
    cascading: true,  //级联日历
    cascadingMax: 10,  //起始与结束日期最大范围
    showNumberOfDays: true,  //是否显示
    cascadingOffset: 1,  //结束日期自动跳转天数
    dayNext: 200,  //日历今天往后选择范围

    /**
     * 选择日期回调函数
     * @param self 日历对象本身
     * @param $this 触发事件的JQuery元素
     */
    selectDateCallback: function (self, $this) {
        self.$trigger.change();  //手动触发输入框的change事件
        var dayOfWeek = self.getDayOfWeek();  //获取选中日期的星期（如果是节日或当天，则显示相应的信息）
    }
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
