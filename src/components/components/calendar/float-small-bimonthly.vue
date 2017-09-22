<template>

  <div id="everything">

    <h1>Calendar</h1>

    <pre>
<code class="js">
var floatSmallBimonthlyCalendar = lv.calendar({
    date: "2016-02-13",
    autoRender: false,
    trigger: "#floatSmallBimonthlyInput",
    triggerEvent: "click",
    bimonthly: true,
    template: "small",
    monthNext: 10,
    monthPrev: 10,
    dayPrev: -1
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
