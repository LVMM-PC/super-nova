<template>

  <div id="everything">

    <ih1 :model="{value: 'Calendar'}"></ih1>

    <pre>
<code class="js">var floatSmallBimonthlyCalendar = lv.calendar({
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
