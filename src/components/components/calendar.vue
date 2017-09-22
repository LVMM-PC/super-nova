<template>
  <div id="everything">

    <h1>Calendar</h1>

    <h2>引用</h2>

    <div>
      <ul>
        <li>
          <a href="http://pic.lvmama.com/styles/lv/calendar.css" target="_blank">http://pic.lvmama.com/min/index.php?f=/styles/lv/calendar.css</a>
        </li>
        <li>
          <a href="http://pic.lvmama.com/js/lv/calendar.js" target="_blank">http://pic.lvmama.com/min/index.php?f=/js/lv/calendar.js</a>
        </li>
      </ul>
    </div>

    <h2>
      配置
    </h2>
    <div>
      <blockquote>.ui-calendar层级（z-index）需自定义</blockquote>
      <blockquote>自定义.ui-calendar层级后, 如需在级联日历中显示“n晚”信息，需要设置.cal-number-of-days层级大于.ui-calendar</blockquote>
      <h3><a href="/components/calendar/settings" target="_blank">配置文档</a></h3>
      <h3><a href="/components/calendar/api" target="_blank">API文档</a></h3>
      <h3><a href="/components/calendar/birthday" target="_blank">生日日历</a></h3>
      <!--<h3><a href="/components/calendar/four-month" target="_blank">4个月日历</a></h3>-->
    </div>

    <pre>
<code class="js">

    //API实例 详见API文档

    //使用日历对象获取选择的日历值

    var select = lv.calendar.getSelect();
    console.log(select)

    //返回值
    []  //未选中
    ["2016-06-28"]  //单选日历
    ["2016-06-28", "2016-06-29", "2016-06-30"]  //复选日历

    //日期格式化
    lv.calendar.dateFormat(new Date(), "yyyy-MM-dd");  //2016-12-16

    //格式化日期Date化
    lv.calendar.getDateFromFormattedString("2016-12-16", "yyyy-MM-dd")  //new Date(2016, 12-1, 16);
</code></pre>

    <h2>实例</h2>

    <h3>单月小日历</h3>

    <div class="section">
      <span id="mySmallCalendar"></span>
      <button class="btn" id="mySmallBtn">获取</button>
      <p>
        <a href="/components/calendar/small" target="_blank">调用文档</a>
      </p>
    </div>

    <h3>双月小日历</h3>
    <div class="section">
      <span id="mySmallBimonthlyCalendar"></span>
      <p>
        <a href="/components/calendar/small-bimonthly" target="_blank">调用文档</a>
      </p>
    </div>

    <h3>单月大日历</h3>
    <div class="section">
      <span id="myBigCalendar"></span>
      <p>
        <a href="/components/calendar/big" target="_blank">调用文档</a>
        <a href="/static/json/calendar-data.json" target="_blank">JSON数据</a>
      </p>
      <p>
        <span class="btn bigChange">201607</span>
        <span class="btn bigChange">201608</span>
      </p>
    </div>

    <h3>双月大日历</h3>
    <div class="section">
      <div id="myBigBimonthlyCalendar"></div>
      <p>
        <a href="/components/calendar/big-bimonthly" target="_blank">调用文档</a>
        <a href="/static/json/calendar-data.json" target="_blank">JSON数据</a>
      </p>
    </div>

    <h3>小日历控件浮层</h3>
    <div class="section">
      <input type="text" class="floatSmallInput" readonly="readonly" value="2016-07-28">
      <span id="floatSmallText"></span>
      <p>
        <a href="/components/calendar/float-small" target="_blank">调用文档</a>
      </p>
    </div>

    <h3>小日历双月控件浮层</h3>
    <div class="section">
      <input type="text" id="floatSmallBimonthlyInput" readonly="readonly">
      <span id="floatSmallBimonthlyText"></span>
      <p>
        <a href="/components/calendar/float-small-bimonthly" target="_blank">调用文档</a>
      </p>
    </div>

    <!--
        计划外
        <div>
            <input type="text" id="floatBigInput" readonly="readonly">
            <span id="floatBigText"></span>
        </div>
    -->

    <!--TODO-->

    <h3>日历控件浮层</h3>
    <p>［门票订单填写页］</p>
    <div class="section">
      <input type="text" id="floatBigBimonthlyInput" readonly="readonly">
      <span id="floatBigBimonthlyText"></span>
      <p>
        <a href="/components/calendar/float-big-bimonthly" target="_blank">调用文档</a>
        <a href="/static/json/calendar-data.json" target="_blank">JSON数据</a>
      </p>
    </div>

    <h3>区间日历控件浮层</h3>
    <div class="section">
      <input type="text" class="floatBimonthlyCascadingInput" readonly="readonly" value="2016-07-15">
      <span class="floatBimonthlyCascadingText"></span>
      <input type="text" class="floatBimonthlyCascadingInput" readonly="readonly" value="2016-07-20">
      <span class="floatBimonthlyCascadingText"></span>
      <p>
        <a href="/components/calendar/float-bimonthly-cascading" target="_blank">调用文档</a>
      </p>
    </div>

    <div>
      <button class="btn" id="floatBimonthlyCascadingBtn">获取</button>
    </div>

    <h3>区间日历单月控件</h3>
    <div class="section">
      <input type="text" class="floatCascadingInput" readonly="readonly">
      <input type="text" class="floatCascadingInput" readonly="readonly">
      <p>
        <a href="/components/calendar/float-cascading" target="_blank">调用文档</a>
      </p>
    </div>

    <h3>度假酒店日历控件样式</h3>
    <div class="section">
      <input type="text" class="vacationInput" readonly="readonly">
      <input type="text" class="vacationInput" readonly="readonly">
      <p>
        <a href="/components/calendar/vacation" target="_blank">调用文档</a>
      </p>
    </div>

    <h3>分销日历控件</h3>
    <div class="section">
      <input type="text" id="distributionInput" readonly="readonly">
      <a id="distributionClearCache">清缓存</a>
      <span id="distributionText"></span>
      <p>
        <a href="/components/calendar/distribution" target="_blank">调用文档</a>
        <a href="/static/json/calendar-data.json" target="_blank">JSON数据</a>
      </p>
    </div>

    <h3>特卖会线路弹层</h3>
    <div class="section">
      <input type="text" id="GrouponInput" readonly="readonly">
      <span id="GrouponText"></span>
      <p>
        <a href="/components/calendar/groupon" target="_blank">调用文档</a>
        <a href="/static/json/calendar-data.json" target="_blank">JSON数据</a>
      </p>
    </div>

    <div class="section" id="ajaxCalendarBox">

    </div>

    <h3>Offset margin</h3>
    <div class="section">
      <input type="text" id="offsetInput" readonly="readonly">
    </div>

    <h3>大日历级联</h3>
    <div class="section">
      <input type="text" class="bigCascadingInput">
      <input type="text" class="bigCascadingInput">
    </div>

    <h3>今天起几日不可选</h3>
    <div class="section">
      <input type="text" class="dayDisableNextInput">
    </div>
    <div class="section">
      <input type="text" class="dayDisableNextInput">
    </div>

    <h3>区间单日历</h3>
    <div class="section">
      <div class="sectionCalendar"></div>
    </div>

    <h3>星期偏移</h3>
    <div class="section">
      <div class="weekOffsetCalendar"></div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'calendar'
  }

  require('script-loader!../../../static/js/calendar')
  require('script-loader!../../../static/doc/calendar')
</script>

<style lang="scss">

  @import "/static/assert/css/buttons.css";
  @import "/static/assert/css/calendar.css";

  input[type="text"] {
    border: 1px solid #CCC;
    line-height: 20px;
  }

  #offsetInput {
    border: 1px solid #29e;
    margin: 20px 0 20px 200px;
    outline: 20px solid #eee;
  }

  .distribution-loading td .date {
    background: url(http://pic.lvmama.com/img/new_v/ui_scrollLoading/loading.gif) no-repeat center center;

  }

  .distribution-loading td .date.notThisMonth {
    background: none;

  }
</style>
