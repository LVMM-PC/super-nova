<template>

  <div id="everything">

    <h1>Calendar</h1>
    <pre>
<code class="js">
//度假酒店
var vacationCalendar = lv.calendar({
    autoRender: false,
    trigger: ".vacationInput",
    triggerEvent: "click",
    bimonthly: true,
    template: "small",
    wrapClass: "ui-calendar-orange",
    cascading: true,
    showNumberOfDays: true
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
