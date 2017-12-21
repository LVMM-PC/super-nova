<template>
  <div id="everything">

    <ih1 :model="{value: 'Pinyin'}"></ih1>

    <ih2 :model="{value: '引用'}"></ih2>
    <div>
      <ul>
        <li>
          <a href="http://pic.lvmama.com/js/lv/pinyin.js" target="_blank">http://pic.lvmama.com/min/index.php?f=/js/lv/chart.js</a>
        </li>
      </ul>
    </div>


    <ih2 :model="{value: '预览'}"></ih2>

    <div class="chart-box"></div>

    <pre class="mt10"><code class="css">.chart-box {position: relative;}
.chart-hover { position: absolute; width: 100px; height: 45px; padding-top: 5px; background: #fff; border-radius: 6px; box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.16); text-align: center;}
.chart-price { color: #f60; font-size: 14px;}</code></pre>

    <pre class="mt10"><code class="html">&lt;div class="chart-box">&lt;/div></code></pre>

    <pre class="mt10"><code class="js">var testData = {
      {
        xAxis: {
          value: "07-11",
          text: "07-11/周二"
        },
        yAxis: {
          value: "350",
          text: "<em>￥</em>350<small>起</small>"
        }
      },
      ...
      {
        xAxis: {
          value: "07-23",
          text: "07-23/周日"
        },
        yAxis: {
          value: "410",
          text: "<em>￥</em>410<small>起</small>"
        }
      }
    };

    nova.chart({
        chartBoxSelector: '.chart-box',//图表外层div属性选择器
        width: 800,
        height: 400,
        data: testData,//数据
        //鼠标hover回调函数
        mousemoveCallback: function (point) {
            var index = point.index;
            var thisPoint = testData[index];
            console.log();
            $(".chart-hover").remove();
            $chartBox.append("&lt;div class='chart-hover'>&lt;span class='chart-price'>"+thisPoint.yAxis.text+"&lt;/span>&lt;br>&lt;span class='chart-date'>"+thisPoint.xAxis.text+"&lt;/span>&lt;/div>");
            var top = point.position.y-$(".chart-hover").outerHeight()-10+"px";
            var left = point.position.x-$(".chart-hover").outerWidth()/2+"px";
            $(".chart-hover").css({
              left: left,
              top: top
            });

        },
        mouseleaveCallback: function () {
            $(".chart-hover").remove();
        }
    });</code></pre>
    <ih2 :model="{value: '配置项'}"></ih2>
    <pre class="mt10"><code class="js">var defaults = {
    chartID: null,
    // 图标类型
    chartType: 'line',
    width: 400,
    height: 200,
    data: [
      {
        xAxis: {
          value: "07-11",
          text: "07-11/周二"
        },
        yAxis: {
          value: "100",
          text: "<em>￥</em>100<small>起</small>"
        }
      }
    ],
    // mousemoveCallback和mouseleave必须成对出现
    mousemoveCallback: null,
    mouseleaveCallback: null,
    //折线图下方填充
    fillBottom: true,
    // 最大最小值
    minMax: {
      shown: true,
      temp: "￥{<i></i>{value}<i></i>}"
    },
    // 主题颜色
    theme: {
      // 边框线（包括中间横线）
      borderLineStyle: {
        width: 1,
        color: "rgb(221,221,221)"
      },
      // 折线图点之间连线
      dataLineStyle: {
        width: 2,
        color: "rgb(255,136,0)"
      },
      // 折线图圆点
      circleStyle: {
        radius: 4,
        color: "rgb(255,136,0)"
      },
      // 折线图底部填充
      fillBottomStyle: {
        color: "rgba(255,136,0,0.15)"
      },
      // 坐标轴标识
      axisStyle: {
        font: "12px 'Helvetica Neue',Helvetica,Arial,sans-serif",
        color: "rgb(51,51,51)"
      },
      // 最大、最小值
      minMax: {
        font: "12px 'Helvetica Neue',Helvetica,Arial,sans-serif",
        color: "rgb(255,102,0)"
      }
    }
  };
    </code></pre>

    <ih2 :model="{value: '自定义主题调用'}"></ih2>
    <div class="theme-chart-box"></div>


  </div>
</template>

<script>
  import ih1 from '@/components/ih1'
  import ih2 from '@/components/ih2'
  import ih3 from '@/components/ih3'

  export default {
    name: 'chart',
    components: {
      ih1,
      ih2,
      ih3
    }
  }

  require('script-loader!../../../static/js/chart')
  require('script-loader!../../../static/doc/chart')
</script>

<style lang="scss">
  .mt10 {
    margin-top: 10px;
  }
  .chart-box {
    position: relative;
  }
  .chart-hover {
    position: absolute;
    width: 100px;
    height: 45px;
    padding-top: 5px;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.16);
    text-align: center;
  }
  .chart-price {
    color: #f60;
    font-size: 14px;
  }
</style>
