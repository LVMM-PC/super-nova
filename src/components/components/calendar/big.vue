<template>

  <div id="everything">

    <h1>Calendar</h1>

<pre>
<code class="js">
var myBigCalendar = lv.calendar({
        autoRender: true,  //自动渲染日历
        trigger: "#myBigCalendar",  //触发的位置
        triggerEvent: "click",  //响应的触发事件 自动渲染时此参数无效
        sourceFn: fillData,  //填充时间价格表
        completeCallback: completeCallback,  //日历加载完成后执行的回掉函数

        monthPrev: 2  //日历可以往前翻页2页
    });
</code>
</pre>
    <pre>
<code class="js">


    function fillData() {
        var self = this;
        var url = "json/calendar-data.json";

        /**
         * 获取剩余HTML
         * @param inventory 剩余数量
         * @returns {string} 生成的HTML
         */
        function getStoreHTML(inventory) {
            var html = "";
            if (inventory &lt;= 0) {
                html = "售罄";
            } else if (inventory &lt; 10) {
                html = "余" + inventory
            }
            return html;
        }

        /**
         * 创建浮动框
         * @returns {*|jQuery|HTMLElement}  被创建的浮动框jQuery对象
         */
        function createHover() {
            var $hover = $(".calhover");
            if ($hover.length &lt;= 0) {
                $hover = $(&apos;&lt;div class="calhover"&gt;&lt;div class="triangle"&gt;&lt;/div&gt;&lt;/div&gt;&apos;);
            } else {
                $hover.html(&apos;&lt;div class="triangle"&gt;&lt;/div&gt;&apos;);
            }
            $("body").append($hover);
            $hover.removeClass("calhover-right");
            return $hover;
        }

        /**
         * 设置显示
         * @param data Ajax返回值
         * @returns {boolean}
         */
        function setDate(data) {

            /**
             * 退化的情况，无任何返回值
             */
            if (!data) {
                return false;
            }

            var $allTd = self.wrap.find(&apos;td[data-date-map]&apos;);  //所有的日历单元格
            $allTd.children().addClass("caldisabled");  //先禁用所有的日历日期

            //对json对象进行迭代处理
            data.forEach(function (row) {
                //row 每个json对象中的元素单元，格式如下所示
                // {
                //     "child": 3688,
                //     "date": "2016-06-11",
                //     "detail": "",
                //     "endDate": "201612",
                //     "lineRouteId": 0,
                //     "lineRouteName": "A",
                //     "next": true,
                //     "prev": false,
                //     "price": 3988,
                //     "surplus": 4,
                //     "type": 1,
                //     "inventory": -1,
                //     "oversold": false,
                //     "sale": "下单满3000减200元，成人儿童可享受，不与其他优惠同享；\n下单满2000减150元，成人儿童可享受，不与其他优惠同享；\n下单满1000减100元，成人儿童可享受，不与其他优惠同享；"
                // }

                var jsonDateStr = row.date;  //json单元-日期

                //将json单元日期字符串转化为JS日历对象(new Date())
                var date = lv.calendar.getDateFromFormattedString(jsonDateStr, self.options.dateFormat);

                //将日历对象转换为字符串(只保留参数dateFormat设定的数据，默认值为年月日)
                var dateStr = lv.calendar.dateFormat(date, self.options.dateFormat);

                //json单元-价格
                var price = row.price;

                //价格-浮点数
                var inventory = parseFloat(row.inventory);

                //json单月-是否促销
                var sale = row.sale;

                //json单元-日期对应文档中的td单元格
                var $td = self.wrap.find(&apos;td[data-date-map=&apos; + dateStr + &apos;]&apos;);

                //如果json中的数据有td单元格相对应，则显示数据信息
                if ($td) {

                    //促销等元素的显示位置
                    var $calActive = $td.find(".calactive");

                    //显示价格
                    $td.find(".calprice").html(&apos;&lt;i&gt;&yen;&lt;/i&gt;&lt;em&gt;&apos; + price + &apos;&lt;/em&gt;起&apos;);

                    //显示库存
                    $td.find(".calinfo").html(getStoreHTML(inventory));

                    //是否售罄
                    if (inventory &lt;= 0) {
                        $td.find(".calinfo").addClass("sellout");
                    } else {
                        $td.children().removeClass("caldisabled")
                    }

                    //是否促销
                    if (sale) {
                        var $sale = $(&apos;&lt;div class="calsale"&gt;促&lt;/div&gt;&apos;);
                        $calActive.append($sale);
                    }

                }
            });


            //显示促销/线路/休假浮动框
            (function () {

                var festival;  //节日
                var route;  //线路
                var sale;  //促销

                //鼠标移开，隐藏浮动框
                self.wrap.on("mouseleave", "[data-date-map]", function () {
                    var $hover = $(".calhover");
                    $hover.hide();
                    $hover.css({
                        left: 0,
                        top: 0
                    });
                });

                //鼠标移入，显示浮动框
                self.wrap.on("mouseenter", "[data-date-map]", function () {
                    var hasOnce = false;

                    //td单元格
                    var $this = $(this);

                    //sting 当前单元格日期字符串
                    var date = $this.attr("data-date-map");

                    //创建浮动框jQuery DOM对象
                    var $hover = createHover();

                    //休假
                    var $calfestival = $(&apos;&lt;p class="calfestival"&gt;&lt;i&gt;休&lt;/i&gt;&lt;span&gt;&lt;/span&gt;&lt;/p&gt;&apos;);
                    var $calfestivalContent = $calfestival.find("span");

                    //线路
                    var $calroute = $(&apos;&lt;p class="calroute"&gt;&lt;i&gt;&nbsp;&lt;/i&gt;&lt;span&gt;&lt;/span&gt;&lt;/p&gt;&apos;);
                    var $calrouteTitle = $calroute.find("i");
                    var $calrouteContent = $calroute.find("span");

                    //促销
                    var $calsale = $(&apos;&lt;p class="calsale"&gt;&lt;i&gt;促&lt;/i&gt;&lt;span&gt;&lt;/span&gt;&lt;/p&gt;&apos;);
                    var $calsaleContent = $calsale.find("span");

                    //显示坐标
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

                    //获取json数据填充到页面中
                    data.forEach(function (row) {
                        if (row.date == date) {
                            var route = row.lineRouteName;
                            if (row.sale) {
                                var sale = row.sale.replace(/\n/g, &apos;&lt;br/&gt;&apos;);
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

                    //页面右侧处理，如果屏幕过小，则显示在左侧
                    var width = $hover.outerWidth();

                    var $table = $this.parents(".caltable");
                    var tableLeft = $table.offset().left;
                    var tableWidth = $table.outerWidth();
                    if (width + left - tableLeft &gt; tableWidth) {
                        left = tableLeft + (tableWidth - width);
                        $hover.addClass("calhover-right");
                    }

                    //显示
                    if (hasOnce) {

                        if ($this.children().is(".notThisMonth") && self.options.bimonthly) {
                            //hide
                        }else if (!self.wrap.is(".ui-calendar-mini")) {
                            $hover.show();
                        }

                        $hover.css({
                            left: left,
                            top: top
                        });

                        var triangleLeft = ~~($this.offset().left - left + $this.width() / 2);
                        $hover.find(".triangle").css({
                            left: triangleLeft
                        });

                        if (self.options.zIndex) {
                            $hover.css("zIndex", self.options.zIndex + 1);
                        }
                    }

                });

            })();
        }

        this.loading();

        //Ajax获取时间价格表数据
        $.ajax({
            url: url,
            dataType: "json",
            async: true
        }).done(function (data) {
            //完成
            //TODO 延迟0.5秒模拟Ajax响应延迟时间
            setTimeout(function () {
                setDate(data);
                self.loaded();
            }, 200)
        }).fail(function (error) {
            //TODO 错误处理
        })
    }


</code>
</pre>

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
