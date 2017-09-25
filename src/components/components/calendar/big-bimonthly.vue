<template>

  <div id="everything">

    <h1>Calendar</h1>

    <pre>
<code class="js">var myBigBimonthlyCalendar = lv.calendar({
    autoRender: true,
    trigger: "#myBigBimonthlyCalendar",
    triggerEvent: "click",
    sourceFn: fillData,  //见日历3文档
    bimonthly: true
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
