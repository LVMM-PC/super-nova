<template>

  <div id="everything">
    <ih1 :model="{value: 'Calendar'}"></ih1>

    <pre>
<code class="js">//分销
var distributionCalendar = lv.calendar({
    autoRender: false,
    trigger: "#distributionInput",
    triggerEvent: "click",
    sourceFn: distributionFillData,
    bimonthly: true,
    wrapClass: "ui-calendar-blue"
});
</code></pre>

    <pre>
<code class="js">function distributionFillData() {
    var self = this;

    function getStoreHTML(inventory, oversold) {
        var html = "";
        if (typeof inventory !== "number" || oversold) {
            html = "二次确认";
        } else if (inventory &lt;= 0) {
            html = "售罄";
        } else if (inventory &lt; 10) {
            html = "余" + inventory
        } else {
            html = "充足"
        }
        return html;
    }

    function createHover() {
        var $hover = $(".calhover");
        if ($hover.length &lt;= 0) {
            $hover = $('&lt;div class="calhover"&gt;&lt;div class="triangle"&gt;&lt;/div&gt;&lt;/div&gt;');
        } else {
            $hover.html('&lt;div class="triangle"&gt;&lt;/div&gt;');
        }
        $("body").append($hover);
        $hover.removeClass("calhover-right");
        return $hover;
    }

    function setDate(data, index) {

        if (!data) {
            return false;
        }

        // var $allTd = self.wrap.find('td[data-date-map]');
        // $allTd.children().addClass("caldisabled");

        data.forEach(function (row) {

            var jsonDateStr = row.date;
            var date = lv.calendar.getDateFromFormattedString(jsonDateStr, self.options.dateFormat);

            var dateStr = lv.calendar.dateFormat(date, self.options.dateFormat);
            var price = row.price;
            var inventory = row.inventory;
            var oversold = row.oversold;
            var sale = row.sale;
            var lineRouteName = row.lineRouteName;

            var $td = self.wrap.find('td[data-date-map=' + dateStr + ']');
            if ($td) {

                $td.find(".calinfo").html(getStoreHTML(inventory, oversold));
                var $calActive = $td.find(".calactive");
                if (typeof inventory !== "number" || oversold) {
                    $td.children().removeClass("caldisabled");
                } else if (inventory &lt;= 0) {
                    $td.find(".calinfo").addClass("sellout");
                    $td.children().removeClass("caldate").addClass("nodate");
                    return false;
                } else if (inventory &lt;= 3 && inventory &gt; 0) {
                    $td.children().removeClass("caldisabled");
                    $td.find(".calinfo").addClass("sellouting");
                } else {
                    $td.children().removeClass("caldisabled")
                }
                if (lineRouteName) {
                    var $lineRouteName = $('&lt;div class="calroute"&gt;' + lineRouteName + '&lt;/div&gt;');
                    $calActive.append($lineRouteName);
                }

                $td.find(".calprice").html('&lt;i&gt;&yen;&lt;/i&gt;&lt;em&gt;' + price + '&lt;/em&gt;起');

            }
        });

        (function () {

            var festival;
            var route;
            var sale;

            var $month = self.wrap.find(".calmonth[data-offset=" + index + "]");

            $month.on("mouseleave", "[data-date-map]", function () {
                var $hover = $(".calhover");
                $hover.hide();
                $hover.css({
                    left: 0,
                    top: 0
                });
            });
            $month.on("mouseenter", "[data-date-map]", function () {
                var hasOnce = false;
                var $this = $(this);

                var date = $this.attr("data-date-map");

                var $hover = createHover();

                var $calfestival = $('&lt;p class="calfestival"&gt;&lt;i&gt;休&lt;/i&gt;&lt;span&gt;&lt;/span&gt;&lt;/p&gt;');
                var $calfestivalContent = $calfestival.find("span");
                var $calroute = $('&lt;p class="calroute"&gt;&lt;i&gt;&nbsp;&lt;/i&gt;&lt;span&gt;&lt;/span&gt;&lt;/p&gt;');
                var $calrouteTitle = $calroute.find("i");
                var $calrouteContent = $calroute.find("span");
                var $calsale = $('&lt;p class="calsale"&gt;&lt;i&gt;促&lt;/i&gt;&lt;span&gt;&lt;/span&gt;&lt;/p&gt;');
                var $calsaleContent = $calsale.find("span");

                var left = $this.offset().left;
                var top = $this.offset().top + $this.outerHeight();

                //节日
                var thatFestival = self.options.festival[date];
                festival = thatFestival;
                if (thatFestival) {
                    hasOnce = true;
                    $calfestivalContent.html(thatFestival.vacationName);
                    $hover.append($calfestival);
                }

                data.forEach(function (row) {
                    if (row.date == date) {
                        var route = row.lineRouteName;
                        if (row.sale) {
                            var sale = row.sale.replace(/\n/g, '&lt;br/&gt;');
                        }

                        if (route) {
                            hasOnce = true;
                            $calrouteTitle.html(route);
                            $calrouteContent.html("线路");
                            $hover.append($calroute);
                        }
                        if (sale) {
                            hasOnce = true;
                            $calsaleContent.html(sale);
                            $hover.append($calsale);
                        }
                    }
                });

                var width = $hover.outerWidth();

                var $table = $this.parents(".caltable");
                var tableLeft = $table.offset().left;
                var tableWidth = $table.outerWidth();
                if (width + left - tableLeft &gt; tableWidth) {
                    left = tableLeft + (tableWidth - width);
                    $hover.addClass("calhover-right");
                }

                if (hasOnce) {

                    if ($this.children().is(".notThisMonth") && self.options.bimonthly) {
                        //hide
                    } else if (!self.wrap.is(".ui-calendar-mini")) {
                        $hover.show();
                    }

                    $hover.css({
                        left: left,
                        top: top
                    });

                    var triangleLeft = ~~($this.offset().left - left + $this.width() / 2);
                    $hover.find(".triangle").css({
                        left: triangleLeft
                    })
                }

            });

        })();
    }

    //分销加载
    var yearAndMonthStr = lv.calendar.dateFormat(self.now, "yyyy-MM");
    var yearAndMonthNext = lv.calendar.monthOffset(self.now, 1);
    yearAndMonthNextStr = lv.calendar.dateFormat(yearAndMonthNext, "yyyy-MM");


    //加载当前月份与下一个月的数据
    loadSingleMonthDataRoute(yearAndMonthStr, 0);
    loadSingleMonthDataRoute(yearAndMonthNextStr, 1);

    //加载路由
    function loadSingleMonthDataRoute(yearAndMonthStr, index) {

        var $month = self.wrap.find(".calmonth[data-offset=" + index + "]");
        var $allTd = $month.find('td[data-date-map]');
        $allTd.children().addClass("caldisabled");

        var yearAndMonthData = distributionCaches[yearAndMonthStr];
        if (yearAndMonthData) {
            //如果数据已经缓存

            //15分钟
            var fifteenMinute = 15 * 60 * 1000;
            if (fifteenMinute &lt;= new Date() - yearAndMonthData.addDateTime) {
                //如果数据已经过期
                loadSingleMonthData(yearAndMonthStr, index)
            } else {
                setDate(yearAndMonthData.data, index);

            }
        } else {
            //如果数据未缓存
            loadSingleMonthData(yearAndMonthStr, index)
        }
    }


    /**
     * 加载单月数据
     * @param yearAndMonth
     */
    function loadSingleMonthData(yearAndMonth, index) {

        var $month = self.wrap.find(".calmonth[data-offset=" + index + "]");
        $month.addClass("distribution-loading");

        $.ajax({
            url: "json/calendar-data" + "-" + yearAndMonth + ".json",
            dataType: "json",
            async: true
        }).done(function (data) {
            //模拟ajax延迟
            setTimeRandom = ~~(Math.random() * 2000)+500;
            setTimeout(function () {
                setDate(data, index);
                $month.removeClass("distribution-loading");

                //缓存数据
                distributionCaches[yearAndMonth] = new Cache(data, new Date());
            }, setTimeRandom);
        }).fail(function (error) {
            //TODO 错误处理
            //无数据
            $month.removeClass("distribution-loading")
        })
    }

}
</code></pre>

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
