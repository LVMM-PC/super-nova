<template>

  <div id="everything">
    <h1>Calendar</h1>

    <pre>
<code class="js">//特卖会
var grouponCalendar = lv.calendar({
    autoRender: false,
    trigger: "#GrouponInput",
    triggerEvent: "click",
    sourceFn: fillData,
    bimonthly: true,
    wrapClass: "ui-calendar-groupon"
});
</code></pre>

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
