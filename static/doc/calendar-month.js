/**
 * author: Sheng JIANG
 * date: 2017-03-13
 */
$(function () {

    var calendarData = {
        monthInfo: null,
        calendarInfo: null
    };
    var calendarTab;
    var monthArray = [];
    var fourMonthCalendar;

    $.ajax({
        url: "/static/json/calendar-data-month.json",
        dataType: "json"
    }).done(function (jsonData) {

        calendarData.monthInfo = jsonData.monthInfo;
        calendarData.calendarInfo = jsonData.calendarInfo;

        var date = new Date();
        date = nova.calendar.dateToDay(date);
        date.setDate(1);

        for (var i = 0; i < 12; i++) {
            var tempDate = lv.calendar.monthOffset(date, i);
            var yeahMonth = lv.calendar.dateFormat(tempDate, "yyyy-MM");
            if (calendarData.monthInfo[yeahMonth] && calendarData.monthInfo[yeahMonth].price) {
                monthArray.push(tempDate);
            }
        }

        if (monthArray.length === 0) {
            monthArray = [date];
        }

        initCalendar();
        initCalendarTab();

    }).fail(function () {
        console.error("接口错误");
    });

    function initCalendar() {

        var tabStr = '<div class="nova-calendar-tab">' +
            '<a>' +
            '<div class="nova-calendar-tab-month"></div>' +
            '<div class="nova-calendar-tab-price"></div>' +
            '</a>' +
            '</div>';
        fourMonthCalendar = lv.calendar({
            autoRender: false,
            trigger: ".fourMonthInput",
            triggerEvent: "click",
            sourceFn: fillData,
            completeCallback: function () {


            },
            bimonthly: false,
            template: {
                wrap: '<div class="ui-calendar ui-calendar-big" {{bimonthly}} {{float}}></div>',
                calWrap: '<div class="nova-calendar-tabs-wrap">' +
                '<div class="nova-calendar-tabs clearfix">' +
                '<div class="nova-calendar-tabs-prev"><i></i></div>' +
                tabStr +
                tabStr +
                tabStr +
                tabStr +
                '<div class="nova-calendar-tabs-next"><i></i></div>' +
                '</div>' +
                '</div>' + '<div class="calwrap clearfix">{{content}}</div>',
                calTitle: '',
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
            }
        });

    }

    function initCalendarTab() {

        calendarTab = {
            init: function () {
                this.size = monthArray.length;
                this.index = 0;
                this.page = 0;
                this.maxPage = Math.ceil(this.size / 4);
            },
            bindEvent: function () {
                var $wrap = fourMonthCalendar.wrap;
                var $tab = $wrap.find(".nova-calendar-tab");
                var self = this;

                function renderCal(dateStr) {
                    fourMonthCalendar.now = nova.calendar.getDateFromFormattedString(dateStr, "yyyy-MM");
                    fourMonthCalendar.render();
                    self.render();
                    self.bindEvent();
                }

                $wrap.find(".nova-calendar-tabs-prev").on("click", function () {
                    var $this = $(this);
                    if ($this.hasClass("disabled")) {
                        return false;
                    }
                    self.switchTab(-1);
                    var dateStr = $tab.first().attr("data-date");
                    renderCal(dateStr);
                    return false;
                });
                $wrap.find(".nova-calendar-tabs-next").on("click", function () {
                    var $this = $(this);
                    if ($this.hasClass("disabled")) {
                        return false;
                    }
                    self.switchTab(1);
                    var dateStr = $tab.first().attr("data-date");
                    renderCal(dateStr);
                    return false;
                });

                $wrap.find(".nova-calendar-tab").on("click", function () {
                    var $this = $(this);
                    if ($this.hasClass("disabled")) {
                        return false;
                    }
                    var dateStr = $this.attr("data-date");
                    renderCal(dateStr);
                    return false;
                })
            },
            switchTab: function (offset) {
                var page = this.page + offset;
                if (page < 0) {
                    page = 0
                }
                if (page > this.maxPage) {
                    page = this.maxPage;
                }
                this.page = page;
                this.render();
                this.bindEvent();
            },
            render: function () {
                var $wrap = fourMonthCalendar.wrap;
                var $tab = $wrap.find(".nova-calendar-tab");
                var calDate = fourMonthCalendar.now;

                var $prev = $wrap.find(".nova-calendar-tabs-prev");
                var $next = $wrap.find(".nova-calendar-tabs-next");

                $prev.removeClass("disabled");
                $next.removeClass("disabled");

                var page = this.page;
                if (page == 0) {
                    //console.log(0)

                    $prev.addClass("disabled");

                }

                if (page == this.maxPage - 1) {
                    //console.log("max")
                    $next.addClass("disabled");
                }

                for (var j = 0; j < 4; j++) {
                    var $thisTab = $tab.eq(j);
                    var $tabMonth = $thisTab.find(".nova-calendar-tab-month");
                    var tabDate = monthArray[this.page * 4 + j];
                    $thisTab.removeClass("active");
                    if (calDate && tabDate && nova.calendar.isSameMonth(calDate, tabDate)) {
                        $thisTab.addClass("active");
                    }
                    if (tabDate) {
                        var tabDateStr = nova.calendar.dateFormat(tabDate, "yyyy-MM");
                        var tabYearMonthStr = nova.calendar.dateFormat(tabDate, "yyyy年MM月");
                        $tabMonth.text(tabYearMonthStr);
                        $thisTab.attr("data-date", tabDateStr);

                        $thisTab.removeClass("disabled");
                    } else {
                        $tabMonth.text("");
                        $thisTab.attr("data-date", "");
                        $thisTab.addClass("disabled");
                    }
                }
            },
            changeTab: function (date) {
                date = nova.calendar.dateToDay(date);
                date.setDate(1);
                var index = 0;
                for (var i = 0; i < this.size; i++) {
                    if (-date === -monthArray[i]) {
                        index = i;
                    }
                }
                this.index = index;
                this.page = ~~(index / 4);
                this.render();
            }
        };
        calendarTab.init();
    }

    function fillData() {
        var self = this;

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

                    if ($this.find(".notThisMonth").length !== 0) {
                        return false;
                    }

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
                            left: ~~left,
                            top: ~~top
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
        setDate(calendarData.calendarInfo);

        calendarTab.changeTab(this.now);
        calendarTab.bindEvent();
    }

});
