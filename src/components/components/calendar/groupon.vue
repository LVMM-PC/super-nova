<template>

  <div id="everything">
    <ih1 :model="{value: 'Calendar'}"></ih1>

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
