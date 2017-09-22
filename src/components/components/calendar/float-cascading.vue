<template>

  <div id="everything">

    <h1>Calendar</h1>
    <pre>
<code class="js">
var floatCascadingCalendar = lv.calendar({
    autoRender: false,
    trigger: ".floatCascadingInput",
    triggerEvent: "click",
    bimonthly: false,
    template: "small",
    cascading: true
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
