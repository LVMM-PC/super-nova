$(window).on("load", function() {
  var testData = [
    {
      xAxis: {
        value: "07-11",
        text: "07-11/周二"
      },
      yAxis: {
        value: "350",
        text: "<em>￥</em>350<small>起</small>"
      }
    }, {
      xAxis: {
        value: "07-12",
        text: "07-12/周三"
      },
      yAxis: {
        value: "400",
        text: "<em>￥</em>400<small>起</small>"
      }
    }, {
      xAxis: {
        value: "07-13",
        text: "07-14/周四"
      },
      yAxis: {
        value: "360",
        text: "<em>￥</em>360<small>起</small>"
      }
    }, {
      xAxis: {
        value: "07-14",
        text: "07-14/周五"
      },
      yAxis: {
        value: "600",
        text: "<em>￥</em>600<small>起</small>"
      }
    }, {
      xAxis: {
        value: "07-15",
        text: "07-15/周六"
      },
      yAxis: {
        value: "440",
        text: "<em>￥</em>440<small>起</small>"
      }
    }, {
      xAxis: {
        value: "07-16",
        text: "07-16/周日"
      },
      yAxis: {
        value: "320",
        text: "<em>￥</em>320<small>起</small>"
      }
    }, {
      xAxis: {
        value: "07-17",
        text: "07-17/周一"
      },
      yAxis: {
        value: "470",
        text: "<em>￥</em>470<small>起</small>"
      }
    }, {
      xAxis: {
        value: "07-18",
        text: "07-18/周二"
      },
      yAxis: {
        value: "350",
        text: "<em>￥</em>350<small>起</small>"
      }
    }, {
      xAxis: {
        value: "07-19",
        text: "07-19/周三"
      },
      yAxis: {
        value: "560",
        text: "<em>￥</em>560<small>起</small>"
      }
    }, {
      xAxis: {
        value: "07-20",
        text: "07-20/周四"
      },
      yAxis: {
        value: "480",
        text: "<em>￥</em>480<small>起</small>"
      }
    }, {
      xAxis: {
        value: "07-21",
        text: "07-21/周五"
      },
      yAxis: {
        value: "640",
        text: "<em>￥</em>640<small>起</small>"
      }
    }, {
      xAxis: {
        value: "07-22",
        text: "07-22/周六"
      },
      yAxis: {
        value: "420",
        text: "<em>￥</em>420<small>起</small>"
      }
    }, {
      xAxis: {
        value: "07-23",
        text: "07-23/周日"
      },
      yAxis: {
        value: "410",
        text: "<em>￥</em>410<small>起</small>"
      }
    }
  ];
  var $chartBox = $(".chart-box");
  nova.chart({
    chartBoxSelector: '.chart-box',
    width: 800,
    height: 400,
    data: testData,
    mousemoveCallback: function (point) {
      var index = point.index;
      var thisPoint = testData[index];
      console.log();
      $(".chart-hover").remove();
      $chartBox.append("<div class='chart-hover'><span class='chart-price'>"+thisPoint.yAxis.text+"</span><br><span class='chart-date'>"+thisPoint.xAxis.text+"</span></div>");
      var top = point.position.y-$(".chart-hover").outerHeight()-10+"px";
      var left = point.position.x-$(".chart-hover").outerWidth()/2+"px";
      $(".chart-hover").css({
        left: left,
        top: top
      });

    },
    mouseleaveCallback: function () {
      $(".chart-hover").remove();
      console.log("leave")
    }
  });

  nova.chart({
    chartBoxSelector: '.theme-chart-box',
    width: 1000,
    height: 500,
    data: testData,
    theme: {
      // 边框线（包括中间横线）
      borderLineStyle: {
        width: 1,
        color: "rgb(221,221,221)"
      },
      // 折线图点之间连线
      dataLineStyle: {
        width: 2,
        color: "rgb(100,196,254)"
      },
      // 折线图圆点
      circleStyle: {
        radius: 4,
        color: "rgb(100,196,254)"
      },
      // 折线图底部填充
      fillBottomStyle: {
        color: "rgba(225,244,255,0.5)"
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
  });

});

