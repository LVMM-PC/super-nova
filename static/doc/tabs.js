/**
 * author: Sheng JIANG
 * date: 2017-01-16
 */

$(function () {

    var $document = $(document);

    var myBigCalendar = lv.calendar({
        autoRender: true,  //自动渲染日历
        trigger: "#myBigCalendar",  //触发的位置
        triggerEvent: "click",  //响应的触发事件 自动渲染时此参数无效
        sourceFn: fillData,  //填充时间价格表
        completeCallback: function () {

        },  //日历加载完成后执行的回掉函数

        monthPrev: 2  //日历可以往前翻页2页
    });

    function fillData() {
        var self = this;
        var url = "../json/calendar-data.json";

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

    var newDate = lv.calendar.getDateFromFormattedString(lv.calendar.dateFormat(myBigCalendar.date, "yyyy-MM-dd"), "yyyy-MM-dd");

    newDate.setDate(1);
    var minDate = lv.calendar.monthOffset(newDate, -myBigCalendar.options.monthPrev);
    var maxDate = lv.calendar.monthOffset(newDate, myBigCalendar.options.monthNext);

    // console.log(lv.calendar.dateFormat(newDate, "yyyy-MM"));
    // console.log(lv.calendar.dateFormat(minDate, "yyyy-MM"));
    // console.log(lv.calendar.dateFormat(maxDate, "yyyy-MM"));

    var $tab = $(".calendar-tab");

    var tabs = [];
    changeTabs(newDate);
    //console.log(newDate);

    function changeTabs(date) {
        for (var i = 0; i < 4; i++) {
            var datePoint = new Date(date);
            datePoint = lv.calendar.monthOffset(date, i);
            tabs[i] = datePoint;
            $tab.eq(i).html(lv.calendar.dateFormat(datePoint, "yyyy-MM"));
            $tab.eq(i).attr("data-date", lv.calendar.dateFormat(datePoint, "yyyy-MM"));
            if(datePoint < minDate){

            }
        }
        $tab.eq(0).click();
    }

    $document.on("click", ".calendar-tabs-prev", function () {
        var tempDate = lv.calendar.monthOffset(newDate, -4);

        console.log(tempDate);
        console.log(minDate);

        if(tempDate<minDate){
            console.log("<<<")
        }

        newDate = tempDate;
        changeTabs(newDate);
    });
    $document.on("click", ".calendar-tabs-next", function () {
        newDate = lv.calendar.monthOffset(newDate, 4);
        changeTabs(newDate);
    });

    $document.on("click", ".calendar-tab", function () {
        var $this = $(this);
        $this.addClass("active").siblings().removeClass("active");
        var dateStr = $this.attr("data-date");
        var date = lv.calendar.getDateFromFormattedString(dateStr, "yyyy-MM");
        //console.log(date)
        myBigCalendar.now = date;
        myBigCalendar.render();
    });

});
