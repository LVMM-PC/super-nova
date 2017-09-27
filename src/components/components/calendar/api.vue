<template>

  <div id="everything">


    <ih1 :model="{value: 'Calendar'}"></ih1>
    <ih2 :model="{value: 'API文档'}"></ih2>
    <ih3 :model="{value: '静态方法'}"></ih3>

    <div class="section">
<pre>
<code class="js">//调用方法
lv.calendar.pad(1)

/**
 * 数字补零
 * @param number 一位数
 * @returns {string} 补零后的字符串
 */
Calendar.pad = function (number) {};

/**
 * 是否是同一天
 * @param dateA
 * @param dateB
 * @returns {boolean}
 */
Calendar.isSameDay = function (dateA, dateB) {};

/**
 * 是否是同一月
 * @param dateA
 * @param dateB
 * @returns {boolean}
 */
Calendar.isSameMonth = function (dateA, dateB) {};

/**
 * 判断闰年
 * 目前使用的格里历闰年规则如下：
 * 1. 公历年份除以400可整除，为闰年。
 * 2. 公历年份除以4可整除但除以100不可整除，为闰年。
 * 3. 公历年份除以4不可整除，为平年。
 * 4. 公历年份除以100可整除但除以400不可整除，为平年
 * @param fullYear 四位数年份
 * @returns {boolean} 是否
 */
Calendar.isLeapYear = function (fullYear) {};

/**
 * 日期格式化
 * https://github.com/RubyLouvre/mass-Framework/blob/1.41/avalon.js#L2147
 * E    星期
 * yyyy-MM-dd hh-mm-ss
 * yyyy 四位年      yy 两位年
 * MM   两位月      M  月
 * dd   两位日      d  日
 * HH   两位时(24)  H  时(24)
 * hh   两位时(12)  h  时(12)
 * mm   两位分      m  分
 * ss   两位秒      s  秒
 * @param date
 * @param format 日期格式
 * @returns {string}
 */
Calendar.dateFormat = function (date, format) {};

/**
 * 从格式化字符串获取日期时间
 * @param str 已经被格式化的字符串
 * @param format 格式
 * @returns {Date} 日期对象
 */
Calendar.getDateFromFormattedString = function (str, format) {};

/**
 * 日期间隔天数
 * @param start 开始日期
 * @param end 结束日期
 * @returns {number} 间隔天数
 */
Calendar.getDaysBetween = function (start, end) {};

/**
 * 月份的第一天
 * @param date 日期
 * @returns {Date} 第一天日期
 */
Calendar.getFirstDateInMonth = function (date) {};

/**
 * 月份的最后一天
 * @param date 日期
 * @returns {Date} 最后一天日期
 */
Calendar.getLastDateInMonth = function (date) {};

/**
 * 获取每月天数
 * @param month 月份，一月为0
 * @param fullYear [option] 四位数年份，可选
 * @returns number 天数
 */
Calendar.getDaysInMonth = function (month, fullYear) {};

/**
 * 月偏移
 * @param date 原始日期
 * @param monthOffset 偏移月数，正数向后，负数向前
 * @returns {Date} 新日期
 * @constructor
 */
Calendar.monthOffset = function (date, monthOffset) {};

/**
 * 年偏移
 * @param date 原始日期
 * @param yearOffset 偏移年数，正数向后，负数向前
 * @returns {Date} 新日期
 * @constructor
 */
Calendar.yearOffset = function (date, yearOffset) {};

/**
 * 日偏移
 * @param date
 * @param dayOffset
 * @returns {Date}
 */
Calendar.dateOffset = function (date, dayOffset) {};

/**
 * 日历取整
 * @param date
 * @returns {Date}
 */
Calendar.dateToDay = function (date) {};

/**
 * 天数转毫秒
 * @param days
 * @returns {number}
 */
Calendar.dayToMS = function (days) {};
</code></pre>
    </div>

    <ih3 :model="{value: '实例方法'}"></ih3>
    <div class="section">
<pre><code>/**
 * 获取单日class
 * @param cal 单日
 * @param date 月
 * @returns {string}
 */
getClass: function (cal, date) {}

//获取选择
getSelect: function () {}

//获取星期或者节假日(一般日期显示星期x，特殊日期显示如今天、中秋)信息
getDayOfWeek: function (date) {}

//显示加载动画
loading: function () {}

//结束加载动画
loaded: function () {}
</code></pre>
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
</script>

<style lang="scss">
  @import "/static/assert/css/buttons.css";
  @import "/static/assert/css/calendar.css";

</style>
