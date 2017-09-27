<template>

  <div id="everything">

    <ih1 :model="{value: 'Calendar'}"></ih1>

    <ih2 :model="{value: '引用'}"></ih2>

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

    <ih2 :model="{value: '实例'}"></ih2>

    <ih3 :model="{value: '前台日历控件浮层－出生日期'}"></ih3>

    <div>
      <input type="text" id="birthdayInput" readonly="readonly">
      <span id="birthdayText"></span>
    </div>
    <p>
      <a href="/components/calendar/birthday/home" target="_blank">调用文档</a>
    </p>

    <ih3 :model="{value: 'VST后台区间日历控件'}"></ih3>
    <div>
      <input type="text" class="vstInput" readonly="readonly">
      <span class="vstText"></span>
      <input type="text" class="vstInput" readonly="readonly">
      <span class="vstText"></span>
    </div>
    <p>
      <a href="/components/calendar/birthday/vst" target="_blank">调用文档</a>
    </p>

    <ih3 :model="{value: 'VST后台区间日历时间控件'}"></ih3>
    <div>

      <input type="text" class="vstHasTimeInput" readonly="readonly">
      <span class="vstHasTimeText"></span>
      <input type="text" class="vstHasTimeInput" readonly="readonly">
      <span class="vstHasTimeText"></span>
    </div>
    <p>
      <a href="/components/calendar/birthday/vst" target="_blank">调用文档</a>
    </p>

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
