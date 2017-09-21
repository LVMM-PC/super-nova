<template>

  <div id="everything">

    <h1>Calendar</h1>
    <h2>4个月日历</h2>

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
  export default {
    name: 'setting'
  }
  // require('script-loader!../../../../static/doc/calendar-month.js')
</script>

<style lang="scss">
  @import "/static/assert/css/buttons.css";
  @import "/static/assert/css/calendar.css";
  // @import "/static/assert/css/calendar-month.css";

</style>
