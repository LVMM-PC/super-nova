//demo

$(function () {

    var mySmallCalendar = lv.calendar({

        autoRender: true,
        trigger: "#mySmallCalendar",
        triggerEvent: "click",

        //点击选择日期后的回调函数 默认返回值: calendar对象
        selectDateCallback: function () {
            //console.log("selectDateCallback")
        },
        //取消选择日期的回调函数 当allowMutiSelected为true时生效
        cancelDateCallback: function () {
            //console.log("cancelDateCallback")
        },
        //数据加载完成并显示出日历后的回调函数
        completeCallback: function () {
            //console.log("completeCallback")
        },

        template: "small",
        allowMutiSelected: true,

        monthNext: 24,
        monthPrev: 24,

        dayNext: 1000,
        dayPrev: 1000

    });

    $("#mySmallBtn").on("click", function () {
        var select = mySmallCalendar.getSelect();
        console.log(select);
    });

    var mySmallBimonthlyCalendar = lv.calendar({
        autoRender: true,
        trigger: "#mySmallBimonthlyCalendar",
        triggerEvent: "click",
        bimonthly: true,

        //点击选择日期后的回调函数 默认返回值: calendar对象
        selectDateCallback: function () {
            //console.log("selectDateCallback")
        },
        template: "small"
    });

    function fillData() {
        var self = this;
        var url = "/static/json/calendar-data.json";

        /**
         * 获取剩余HTML
         * @param inventory 剩余数量
         * @returns {string} 生成的HTML
         */
        function getStoreHTML(inventory) {
            var html = "";
            if (isNaN(inventory) || inventory <= 0) {
                html = "售罄";
            } else if (inventory < 10) {
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
            if ($hover.length <= 0) {
                $hover = $('<div class="calhover"><div class="triangle"></div></div>');
            } else {
                $hover.html('<div class="triangle"></div>');
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

            var $allTd = self.wrap.find('td[data-date-map]');  //所有的日历单元格
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
                var $td = self.wrap.find('td[data-date-map=' + dateStr + ']');

                var lineRouteName = row.lineRouteName;

                //如果json中的数据有td单元格相对应，则显示数据信息
                if ($td) {

                    //促销等元素的显示位置
                    var $calActive = $td.find(".calactive");

                    //显示价格
                    $td.find(".calprice").html('<i>&yen;</i><em>' + price + '</em>起');

                    //显示库存
                    $td.find(".calinfo").html(getStoreHTML(inventory));

                    //是否售罄
                    if (isNaN(inventory) || inventory <= 0) {
                        $td.find(".calinfo").addClass("sellout");
                        $td.children().removeClass("caldate").addClass("nodate");
                    } else {
                        $td.children().removeClass("caldisabled")
                    }

                    //是否促销
                    if (sale) {
                        var $sale = $('<div class="calsale">促</div>');
                        $calActive.find(".calsale").remove();
                        $calActive.append($sale);
                    }

                    // if (lineRouteName) {
                    //     var $lineRouteName = $('<div class="calroute">' + lineRouteName + '</div>');
                    //     $calActive.find(".calroute").remove();
                    //     $calActive.append($lineRouteName);
                    // }

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
                    var $calfestival = $('<p class="calfestival"><i>休</i><span></span></p>');
                    var $calfestivalContent = $calfestival.find("span");

                    //线路
                    var $calroute = $('<p class="calroute"><i>&nbsp;</i><span></span></p>');
                    var $calrouteTitle = $calroute.find("i");
                    var $calrouteContent = $calroute.find("span");

                    //促销
                    var $calsale = $('<p class="calsale"><i>促</i><span></span></p>');
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
                                var sale = row.sale.replace(/\n/g, '<br/>');
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
                    if (width + left - tableLeft > tableWidth) {
                        left = tableLeft + (tableWidth - width);
                        $hover.addClass("calhover-right");
                    }

                    //显示
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

    function completeCallback() {
        var self = this;
    }

    var now = new Date();
    var date = now.getDate();
    var year = now.getFullYear();
    var month = now.getMonth();
    var firstDate = new Date(year, month, 1);
    var firstDateDay = firstDate.getDay();
    var index = -firstDateDay;

    var myBigCalendar = lv.calendar({
        autoRender: true,
        //date: "2016-08-01",
        trigger: "#myBigCalendar",
        triggerEvent: "click",
        sourceFn: fillData,
        completeCallback: function () {
            var newNow = this.now;
            if (now.getFullYear() === newNow.getFullYear() && now.getMonth() === newNow.getMonth()) {
                // console.log("yes");
                this.options.dayOffset = date - 1 - index;
                this.render(true)
            } else {
                // console.log("no");
                this.options.dayOffset = 0;
                this.render(true)
            }
        },

        selectDateCallback: function (self, $ele) {
            console.log(self.getSelect()[0])
        },

        monthPrev: 24,
        monthNext: 24,
        dayPrev: 0,

        dayOffset: 0
    });

    var myBigBimonthlyCalendar = lv.calendar({
        autoRender: true,
        trigger: "#myBigBimonthlyCalendar",
        triggerEvent: "click",

        sourceFn: fillData,
        bimonthly: true

    });

    var floatSmallCalendar = lv.calendar({
        autoRender: false,
        trigger: ".floatSmallInput",
        triggerEvent: "click",
        template: "small",

        selectDateCallback: function (self, $this) {
            self.$trigger.change();
        }

    });

    var floatSmallBimonthlyCalendar = lv.calendar({
        date: "2016-02-13",
        autoRender: false,
        trigger: "#floatSmallBimonthlyInput",
        triggerEvent: "click",
        bimonthly: true,
        template: "small",
        monthNext: 10,
        monthPrev: 10,
        dayPrev: -1
    });

    var floatBigCalendar = lv.calendar({
        autoRender: false,
        trigger: "#floatBigInput",
        sourceFn: fillData,
        triggerEvent: "click"
    });

    var floatBigBimonthlyCalendar = lv.calendar({
        autoRender: false,
        trigger: "#floatBigBimonthlyInput",
        triggerEvent: "click",
        sourceFn: fillData,
        bimonthly: true,
        zIndex: 2
    });

    var floatBimonthlyCascadingCalendar = lv.calendar({
        autoRender: false,  //弹出后渲染
        trigger: ".floatBimonthlyCascadingInput",  //目标元素选择器
        triggerEvent: "click",  //触发事件
        bimonthly: true,  //是否双月显示
        template: "small",  //使用小日历模板
        cascading: true,  //级联日历
        cascadingMax: 10,  //起始与结束日期最大范围
        showNumberOfDays: true,  //是否显示
        cascadingOffset: 1,  //结束日期自动跳转天数
        dayNext: 200,  //日历今天往后选择范围

        /**
         * 选择日期回调函数
         * @param self 日历对象本身
         * @param $this 触发事件的JQuery元素
         */
        selectDateCallback: function (self, $this) {
            self.$trigger.change();  //手动触发输入框的change事件
            var dayOfWeek = self.getDayOfWeek();  //获取选中日期的星期（如果是节日或当天，则显示相应的信息）

            console.log(dayOfWeek)
            console.log(this.options.trigger)

        },
        zIndex: 2
    });

    $("#floatBimonthlyCascadingBtn").on("click", function () {
        var select = floatBimonthlyCascadingCalendar.getSelect();
        console.log(select);
    });

    var floatCascadingCalendar = lv.calendar({
        autoRender: false,
        trigger: ".floatCascadingInput",
        triggerEvent: "click",
        bimonthly: false,
        template: "small",
        cascading: true
    });

    $(".floatSmallInput").on("change", function () {
        $("#floatSmallText").html($(this).val());
    });

    $("#floatSmallBimonthlyInput").on("change", function () {
        $("#floatSmallBimonthlyText").html($(this).val());
    });

    var $floatBimonthlyCascadingInput = $(".floatBimonthlyCascadingInput");
    $floatBimonthlyCascadingInput.on("change", function () {
        var $this = $(this);
        var index = $floatBimonthlyCascadingInput.index($this);
        var value = $this.val();
        var $floatBimonthlyCascadingText = $(".floatBimonthlyCascadingText");
        $floatBimonthlyCascadingText.eq(index).html(value);
    });

    //度假酒店
    var vacationCalendar = lv.calendar({
        autoRender: false,
        trigger: ".vacationInput",
        triggerEvent: "click",
        bimonthly: true,
        template: "small",
        wrapClass: "ui-calendar-orange",
        cascading: true,
        showNumberOfDays: true,
        zIndex: 2
    });

    //分销
    var distributionCalendar = lv.calendar({
        autoRender: false,
        trigger: "#distributionInput",
        triggerEvent: "click",
        sourceFn: distributionFillData,
        bimonthly: true,
        wrapClass: "ui-calendar-blue",
        zIndex: 2
    });

    //缓存
    var distributionCaches = {};

    //清缓存
    $(document).on("click", "#distributionClearCache", function () {
        distributionCaches = {};
        console.log("缓存已经清空");
    });

    /**
     * 缓存类
     * @param data 价格数据
     * @param addDateTime 缓存数据的时间
     * @constructor
     */
    function Cache(data, addDateTime) {
        this.data = data;
        this.addDateTime = addDateTime;
    }

    function distributionFillData() {
        var self = this;

        function getStoreHTML(inventory, oversold) {
            var html = "";
            if (typeof inventory !== "number" || oversold) {
                html = "二次确认";
            } else if (inventory <= 0) {
                html = "售罄";
            } else if (inventory < 10) {
                html = "余" + inventory
            } else {
                html = "充足"
            }
            return html;
        }

        function createHover() {
            var $hover = $(".calhover");
            if ($hover.length <= 0) {
                $hover = $('<div class="calhover"><div class="triangle"></div></div>');
            } else {
                $hover.html('<div class="triangle"></div>');
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
                    } else if (inventory <= 0) {
                        $td.find(".calinfo").addClass("sellout");
                        $td.children().removeClass("caldate").addClass("nodate");
                        return false;
                    } else if (inventory <= 3 && inventory > 0) {
                        $td.children().removeClass("caldisabled");
                        $td.find(".calinfo").addClass("sellouting");
                    } else {
                        $td.children().removeClass("caldisabled")
                    }
                    if (lineRouteName) {
                        var $lineRouteName = $('<div class="calroute">' + lineRouteName + '</div>');
                        $calActive.find(".calroute").remove();
                        $calActive.append($lineRouteName);
                    }

                    $td.find(".calprice").html('<i>&yen;</i><em>' + price + '</em>起');

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

                    var $calfestival = $('<p class="calfestival"><i>休</i><span></span></p>');
                    var $calfestivalContent = $calfestival.find("span");
                    var $calroute = $('<p class="calroute"><i>&nbsp;</i><span></span></p>');
                    var $calrouteTitle = $calroute.find("i");
                    var $calrouteContent = $calroute.find("span");
                    var $calsale = $('<p class="calsale"><i>促</i><span></span></p>');
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
                                var sale = row.sale.replace(/\n/g, '<br/>');
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
                    if (width + left - tableLeft > tableWidth) {
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
                if (fifteenMinute <= new Date() - yearAndMonthData.addDateTime) {
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
                url: "/static/json/calendar-data" + "-" + yearAndMonth + ".json",
                dataType: "json",
                async: true
            }).done(function (data) {
                //模拟ajax延迟
                setTimeRandom = ~~(Math.random() * 2000) + 500;
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

    //特卖会
    var grouponCalendar = lv.calendar({
        autoRender: false,
        trigger: "#GrouponInput",
        triggerEvent: "click",
        sourceFn: fillData,
        bimonthly: true,
        wrapClass: "ui-calendar-groupon",
        zIndex: 2
    });

    //生日日历
    var birthdayCalendar = lv.calendar({
        date: "1980-01-01 00:00",
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

    //VST日历
    var vstCalendar = lv.calendar({
        cascadingCallback: function (self, $dom) {
            console.log(this);
            console.log(self);
            console.log($dom);
        },
        autoRender: false,
        trigger: ".vstInput",
        triggerEvent: "click",
        isBirthday: true,
        template: "birthday",
        wrapClass: "ui-calendar-blue",
        cascading: true,  //级联日历
        cascadingMin: 0,
        cascadingOffset: 0,
        cascadingMax: -1,  //起始与结束日期最大范围
        showNumberOfDays: false,  //是否显示
        dateFormat: "yyyy-MM-dd",
        hasTime: false,
        dayPrev: -1,
        monthPrev: -1,
        minLimit: "1990-06",
        maxLimit: "2017-06"
    });

    //VST日历时间
    var vstHasTimeCalendar = lv.calendar({
        cascadingCallback: function (self, $dom) {
        },
        autoRender: false,
        trigger: ".vstHasTimeInput",
        triggerEvent: "click",
        isBirthday: true,
        template: "birthday",
        wrapClass: "ui-calendar-blue",
        cascading: true,  //级联日历
        cascadingMin: 0,
        cascadingOffset: 0,
        cascadingMax: -1,  //起始与结束日期最大范围
        showNumberOfDays: false,  //是否显示
        dateFormat: "yyyy-MM-dd HH:mm",
        hasTime: true,
        dayPrev: -1,
        monthPrev: -1,
        dayNext: -1,
        monthNext: -1,
        // minLimit: "1990-06",
        // maxLimit: "2050-06"
    });

    $(".bigChange").on("click", function () {
        var $this = $(this);
        var dateStr = $this.html();
        var date = lv.calendar.getDateFromFormattedString(dateStr, "yyyy-MM");
        myBigCalendar.now.setTime(+date);
        myBigCalendar.render();
        myBigCalendar.bindEvent();
    });

    //14 offset
    nova.calendar({
        trigger: "#offsetInput",
        autoRender: false,
        triggerEvent: "click",
        offsetAmount: {
            top: 0,
            left: -413
        }
    });

    //15 大级联日历
    nova.calendar({
        trigger: ".bigCascadingInput",
        cascading: true,  //级联日历
        autoRender: false,
        triggerEvent: "click",
        cascadingEndNotShowStart: true,
        zIndex: 2
    });

    //16 今天起几日不可选
    nova.calendar({
        trigger: ".dayDisableNextInput",
        dayDisableNext: 5,
        autoRender: false
    });

    nova.calendar({
        trigger: ".sectionCalendar",
        autoRender: true,
        sectionSelect: true,
        template: "big",
        triggerEvent: "click",
        bimonthly: true,
        selectDateCallback: function () {

            // var sectionSelectStartStr = nova.calendar.dateFormat(this.sectionSelectStart, this.options.dateFormat)
            // var sectionSelectEndStr = nova.calendar.dateFormat(this.sectionSelectEnd, this.options.dateFormat)
            //
            //
            // console.log(sectionSelectStartStr, sectionSelectEndStr)

        },
        cancelDateCallback: function () {
            //console.log("未")
        },
        sourceFn: fillDataSection  //填充时间价格表
    });

    nova.calendar({
        trigger: ".weekOffsetCalendar",
        autoRender: true,
        sectionSelect: true,
        template: "big",
        triggerEvent: "click",
        bimonthly: true,
        weekOffset: 1,
        selectDateCallback: function () {

            // var sectionSelectStartStr = nova.calendar.dateFormat(this.sectionSelectStart, this.options.dateFormat)
            // var sectionSelectEndStr = nova.calendar.dateFormat(this.sectionSelectEnd, this.options.dateFormat)
            //
            //
            // console.log(sectionSelectStartStr, sectionSelectEndStr)

        },
        cancelDateCallback: function () {
            //console.log("未")
        },
        sourceFn: fillDataSection  //填充时间价格表
    });

    function fillDataSection() {
        var self = this;
        var url = "/static/json/calendar-section-data.json";

        /**
         * 获取剩余HTML
         * @param inventory 剩余数量
         * @returns {string} 生成的HTML
         */
        function getStoreHTML(inventory) {
            var html = "充足";
            if (inventory <= 0) {
                html = "售罄";
            } else if (inventory < 10) {
                html = "紧张"
            }
            return html;
        }

        /**
         * 创建浮动框
         * @returns {*|jQuery|HTMLElement}  被创建的浮动框jQuery对象
         */
        function createHover() {
            var $hover = $(".calhover");
            if ($hover.length <= 0) {
                $hover = $('<div class="calhover"><div class="triangle"></div></div>');
            } else {
                $hover.html('<div class="triangle"></div>');
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

            var $allTd = self.wrap.find('td[data-date-map]');  //所有的日历单元格
            //$allTd.children().addClass("caldisabled");  //先禁用所有的日历日期

            $allTd.each(function (index, ele) {
                var $ele = $(ele)
                $ele.attr("data-has-product", false);  //默认无货
            })

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
                var $td = self.wrap.find('td[data-date-map=' + dateStr + ']');

                //如果json中的数据有td单元格相对应，则显示数据信息
                if ($td) {

                    //促销等元素的显示位置
                    var $calActive = $td.find(".calactive");

                    //显示库存
                    $td.find(".calinfo").html(getStoreHTML(inventory));

                    //是否售罄
                    if (inventory <= 0) {
                        $td.find(".calinfo").addClass("sellout");

                    } else if (inventory <= 10) {
                        //紧张
                        $td.find(".calinfo").addClass("nervous");
                        $td.children().removeClass("caldisabled")
                        $td.attr("data-has-product", true);
                        //显示价格
                        $td.find(".calprice").html('<i>¥</i><em>' + price + '</em>起');
                    } else {
                        $td.children().removeClass("caldisabled")
                        $td.attr("data-has-product", true);
                        //显示价格
                        $td.find(".calprice").html('<i>¥</i><em>' + price + '</em>起');
                    }

                    //是否促销
                    if (sale) {
                        var $sale = $('<div class="calsale">促</div>');
                        $calActive.find(".calsale").remove();
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

                    var hasProductStr = $this.attr("data-has-product");
                    var hasProduct = false;
                    if (hasProductStr == "true") {
                        hasProduct = true;
                    }

                    //创建浮动框jQuery DOM对象
                    var $hover = createHover();

                    if ($this.find(".notThisMonth").length > 0 || $this.find(".nodate").length > 0) {

                    } else {

                        if (self.sectionSelectFlag) {
                            //已经选择开始

                            var dateObj = lv.calendar.getDateFromFormattedString(date, self.options.dateFormat);
                            var canSectionSelect = self.canSectionSelect($this, self, dateObj)

                            if (canSectionSelect == 2) {
                                var $canNotSectionSelect = $('<p>该日期区间不可预订</p>')
                                $hover.append($canNotSectionSelect)
                                hasOnce = true;
                            } else if (canSectionSelect == 3) {
                                var $canNotSelect = $('<p>该日期不可预订</p>')
                                $hover.append($canNotSelect)
                                hasOnce = true;
                            } else if (canSectionSelect == 4) {

                            } else {
                                var night = lv.calendar.getDaysBetween(self.sectionSelectStart, dateObj)
                                if (night > 0) {

                                    var $night = $('<p>' + night + '晚</p>');
                                    $hover.append($night)
                                    hasOnce = true;
                                }


                            }

                        } else {
                            //还未选中开始

                            if (!hasProduct) {
                                var $calHasNotProduct = $('<p class="calHasNotProduct">该日期不可预订</p>');
                                $hover.append($calHasNotProduct)
                                hasOnce = true;
                            }


                        }
                    }


                    //休假
                    var $calfestival = $('<p class="calfestival"><i>休</i><span></span></p>');
                    var $calfestivalContent = $calfestival.find("span");

                    //线路
                    var $calroute = $('<p class="calroute"><i> </i><span></span></p>');
                    var $calrouteTitle = $calroute.find("i");
                    var $calrouteContent = $calroute.find("span");

                    //促销
                    var $calsale = $('<p class="calsale"><i>促</i><span></span></p>');
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
                                var sale = row.sale.replace(/\n/g, '<br/>');
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
                    if (width + left - tableLeft > tableWidth) {
                        left = tableLeft + (tableWidth - width);
                        $hover.addClass("calhover-right");
                    }


                    //console.log("width"+width)
                    //console.log($this.width())

                    if (width < $this.width()) {
                        //console.log("<")
                        left += ~~(($this.width() - width) / 2)
                    }

                    //显示
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


});
