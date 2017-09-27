<template>

  <div id="everything">

    <ih1 :model="{value: 'Calendar'}"></ih1>
    <ih2 :model="{value: '4个月日历'}"></ih2>

    <div class="section">
      <div>
        <input type="text" class="fourMonthInput">
        <input type="text" class="fourMonthInput">
        <input type="text" class="fourMonthInput">

      </div>

    </div>

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
  // require('script-loader!../../../../static/doc/calendar-month.js')
</script>

<style lang="scss">
  @import "/static/assert/css/buttons.css";
  @import "/static/assert/css/calendar.css";
  // @import "/static/assert/css/calendar-month.css";

</style>
