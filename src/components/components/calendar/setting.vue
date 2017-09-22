<template>

  <div id="everything">
    <h1>Calendar</h1>
    <h2>配置文档</h2>

    <h3>默认值</h3>
    <pre>
<code class="js">
{{js1}}
</code></pre>

    <h3>节假日</h3>
    <pre>
<code class="js">
{{js2}}
</code></pre>

    <h3>日历模板</h3>
    <pre>
<code>
{{js3}}
</code></pre>

  </div>

</template>

<script>
  export default {
    name: 'setting',
    data () {
      return {
        js1: `//默认值
Factory.defaults = {
    priceTipText: "因最低价实时变化，请以实际价格为准",
    showPriceTip: true,  //是否显示提示
    allowMutiSelected: false,  //是否支持多选
    triggerEvent: "click",  //默认点击触发
    date: "",  //初始化定位
    target: "body",  //日历控件加载DOM区域
    //定位偏移
    offsetAmount: {
        top: 0,
        left: 0
    },
    //星期短标题
    weekShortTitle: {
        0: "日",
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六"
    },
    //星期标题
    wrapClass: "",
    weekTitle: {
        0: "星期日",
        1: "星期一",
        2: "星期二",
        3: "星期三",
        4: "星期四",
        5: "星期五",
        6: "星期六"
    },
    titleTip: "{{year}}年{{month}}月",
    template: "big",  //模板
    bimonthly: false,  //是否双月显示
    dateFormat: "yyyy-MM-dd",  //日历格式
    monthChangeOffset: 1,  //月份每次翻页页数
    sourceFn: null,
    selectDateCallback: null,  //点击选择日期后的回调函数
    cancelDateCallback: null,  //取消选择日期的回调函数
    completeCallback: null,  //数据加载完成并显示出日历后的回调函数
    clearCallback: null,  //清空回调函数
    okCallback: null,  //确认回调函数
    renderReadonly: true,  //只读触发者是否加载日历控件
    cascading: false,  //是否级联
    cascadingMin: 1,  //级联自动下一个限制
    cascadingOffset: 1,  //级联自动下一个偏移
    cascadingMax: -1,  //级联后续可选天数，-1为不限制
    cascadingNextAuto: true,  //是否自动显示级联下一个日历
    minLimit: null,  //最小限制
    maxLimit: null,  //最大限制
    monthNext: 6,  //可翻页后续月份，-1为不限制
    monthPrev: 0,  //可翻页之前月份，-1为不限制
    dayNext: -1,  //可选后续天数，-1为不限制
    dayPrev: 0,  //可选之前天数，-1为不限制
    isTodayClick: true,  //当天是否可点击
    numberOfDays: "{{num}}晚",
    division: false,  //上下分月
    showNumberOfDays: false,  //是否显示级联间隔日期
    isBirthday: false,  //是否是生日日历
    hasTime: false,  //是否含时间
};`,
        js2: `festival: {
    '2016-01-01': {
        name: '元旦',
        vacationName: '元旦'
    },
    '2016-02-07': {
        name: '除夕',
        vacationName: '除夕'
    },
    '2016-02-08': {
        name: '春节',
        vacationName: '春节'
    },
    '2016-02-09': {
        vacationName: '春节假期'
    },
    '2016-02-10': {
        vacationName: '春节假期'
    },
    '2016-02-11': {
        vacationName: '春节假期'
    },
    '2016-02-12': {
        vacationName: '春节假期'
    },
    '2016-02-13': {
        vacationName: '春节假期'
    },
    '2016-04-02': {
        vacationName: '清明节假期'
    },
    '2016-04-03': {
        vacationName: '清明节假期'
    },
    '2016-04-04': {
        name: '清明',
        vacationName: '清明节'
    },
    '2016-04-30': {
        vacationName: '劳动节假期'
    },
    '2016-05-01': {
        name: '劳动',
        vacationName: '劳动节'
    },
    '2016-05-02': {
        vacationName: '劳动节假期'
    },
    '2016-06-09': {
        name: '端午',
        vacationName: '端午节'
    },
    '2016-06-10': {
        vacationName: '端午节假期'
    },
    '2016-06-11': {
        vacationName: '端午节假期'
    },
    '2016-09-15': {
        name: '中秋',
        vacationName: '中秋节假期'
    },
    '2016-09-16': {
        vacationName: '中秋节假期'
    },
    '2016-09-17': {
        vacationName: '中秋节'
    },
    '2016-10-01': {
        name: '国庆',
        vacationName: '国庆节'
    },
    '2016-10-02': {
        vacationName: '国庆节假期'
    },
    '2016-10-03': {
        vacationName: '国庆节假期'
    },
    '2016-10-04': {
        vacationName: '国庆节假期'
    },
    '2016-10-05': {
        vacationName: '国庆节假期'
    },
    '2016-10-06': {
        vacationName: '国庆节假期'
    },
    '2016-10-07': {
        vacationName: '国庆节假期'
    }
}`,
        js3: `//公用模板
var calControl = '<span class="month-prev" title="上一月">‹</span><span class="month-next" title="下一月">›</span>';
var calWrap = '<div class="calwrap clearfix">{{content}}</div>';
var calMonth = '<div class="calmonth" {{offset}}>{{content}}</div>';
var calTitle = '<div class="caltitle"><span class="mtitle">{{month}}</span></div>';
var calTable = '<table class="caltable">' +
    '    <thead>' +
    '        <tr>' +
    '            <th class="sun">日</th>' +
    '            <th class="mon">一</th>' +
    '            <th class="tue">二</th>' +
    '            <th class="wed">三</th>' +
    '            <th class="thu">四</th>' +
    '            <th class="fri">五</th>' +
    '            <th class="sat">六</th>' +
    '        </tr>' +
    '    </thead>' +
    '    <tbody>' +
    '        {{date}}' +
    '    </tbody>' +
    '    </table>';
var calBody = '' +
    '<div class="calbox">' +
    calTable +
    '    <div class="month-loading"></div>' +
    '</div>';
var weekWrap = '<tr>{{week}}</tr>';

//小日历模板
var smallTemplate = {
    wrap: '<div class="ui-calendar ui-calendar-mini" {{bimonthly}} {{float}}></div>',
    calControl: calControl,
    calWrap: calWrap,
    calMonth: calMonth,
    calTitle: calTitle,
    calBody: calBody,
    weekWrap: weekWrap,
    day: '' +
    '<td data-week="{{week}}" {{dateMap}}>' +
    '    <div class="{{className}}">{{day}}</div>' +
    '</td>'
};

//大日历模板
var bigTemplate = {
    wrap: '<div class="ui-calendar ui-calendar-big" {{bimonthly}} {{float}}></div>',
    calControl: calControl,
    calWrap: calWrap,
    calMonth: calMonth,
    calTitle: calTitle,
    calBody: calBody,
    weekWrap: weekWrap,
    day: '' +
    '<td data-week="{{week}}" {{dateMap}}>' +
    '    <div class="{{className}}">' +
    '        <div class="calday">{{day}}</div>' +
    '        <div class="calinfo"></div>' +
    '        <div class="calprice"></div>' +
    '        <div class="calactive"></div>' +
    '        <div class="calselected"></div>' +
    '    </div>' +
    '</td>'
};

//生日日历模板
var birthdayTemplate = {
    wrap: '<div class="ui-calendar ui-calendar-mini ui-calendar-birthday" {{bimonthly}} {{float}}></div>',
    calControl: calControl,
    calWrap: calWrap,
    calMonth: calMonth,
    calTitle: calTitle,
    calBody: '' +
    '<div class="calbox">' +
    calTable +
    '<div class="cal-pane">' +
    '<span class="cal-time-text">时间</span>' +
    '<span class="cal-time-input">' +
    '<span class="cal-hour">00</span><span class="cal-time-to">:</span><span class="cal-minute">00</span>' +
    '</span>' +
    '<span class="btn btn-xs cal-birthday-clear">清空</span>' +
    '<span class="btn btn-xs cal-birthday-ok">确定</span>' +
    '</div>' +
    '<div class="month-loading"></div>' +
    '</div>',
    weekWrap: weekWrap,
    day: '' +
    '<td data-week="{{week}}" {{dateMap}}>' +
    '    <div class="{{className}}">{{day}}</div>' +
    '</td>'
};`
      }
    }
  }
</script>

<style lang="scss">
  @import "/static/assert/css/buttons.css";
  @import "/static/assert/css/calendar.css";

</style>
