<template>

  <div id="everything">

    <h1>Calendar</h1>

    <h2>引用</h2>

    <div>
      <ul>
        <li>
          <a href="http://pic.lvmama.com/styles/lv/buttons.css" target="_blank">http://pic.lvmama.com/min/index.php?f=/styles/lv/button.css</a>
        </li>
        <li>
          <a href="http://pic.lvmama.com/styles/lv/calendar.css" target="_blank">http://pic.lvmama.com/min/index.php?f=/styles/lv/calendar.css</a>
        </li>
        <li>
          <a href="http://pic.lvmama.com/js/lv/calendar.js" target="_blank">http://pic.lvmama.com/min/index.php?f=/js/lv/calendar.js</a>
        </li>
      </ul>
    </div>

    <h2>实例</h2>

    <h3>前台日历控件浮层－出生日期</h3>

    <div>
      <input type="text" id="birthdayInput" readonly="readonly">
      <span id="birthdayText"></span>
    </div>
    <p>
      <a href="calendar/birthday-calendar.html" target="_blank">调用文档</a>
    </p>

    <h3>VST后台区间日历控件</h3>
    <div>
      <input type="text" class="vstInput" readonly="readonly">
      <span class="vstText"></span>
      <input type="text" class="vstInput" readonly="readonly">
      <span class="vstText"></span>
    </div>
    <p>
      <a href="calendar/vst-calendar.html" target="_blank">调用文档</a>
    </p>

    <h3>VST后台区间日历时间控件</h3>
    <div>

      <input type="text" class="vstHasTimeInput" readonly="readonly">
      <span class="vstHasTimeText"></span>
      <input type="text" class="vstHasTimeInput" readonly="readonly">
      <span class="vstHasTimeText"></span>
    </div>
    <p>
      <a href="calendar/vst-calendar.html" target="_blank">调用文档</a>
    </p>

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
