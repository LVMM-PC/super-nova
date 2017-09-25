<template>

  <div id="everything">

<pre>
<code class="js">//生日日历
var birthdayCalendar = lv.calendar({
    date: "1980-01-01",
    autoRender: false,
    trigger: "#birthdayInput",
    triggerEvent: "click",
    isBirthday: true,
    template: "birthday",
    minLimit: "1900-01",
    maxLimit: lv.calendar.dateFormat(new Date(), "yyyy-MM"),
    monthPrev: -1,
    monthNext: 0,
    dayPrev: -1,
    dayNext: 0
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
