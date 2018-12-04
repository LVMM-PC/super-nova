/**
 * author: Sheng JIANG
 * date: 2017-09-26
 */

//导航滚动监听组件
(function (window, $, nova) {

    "use strict";

    var defaults = {
        fixedObj: null, //跟随浮动的对象:list的父级
        navList: null, //导航列表对象:list
        navDataName: 'data-id', //导航对应id的属性名称
        activeClassName: 'active', //导航高亮className
        activeIndex: -1, //默认active索引
        deviationNav: 0, //导航上下偏移
        deviationScroll: 50, //滚动触发位置上下偏移
        navStyle: true, //是否开启由组件设置导航跟随位置
        monitoring: true, //是否开启内容模块高度变化监听,如果内容模块高度是死的不会发生变化，改为false节省性能。
        speed: 300, //点击导航页面的滚动速度
        zIndex: 9, //导航浮动层级
        callback: null, //页面滚动回调
        endCallback: null //滚完最后一个模块后的回调
    };

    //创建新的对象
    function Factory(options) {
        //合并参数
        options = $.extend({}, defaults, options);
        //构造新的滚动对象
        return new NavScroll(options);
    }

    //滚动对象
    function NavScroll(options) {
        this.init(options);
    }
    NavScroll.prototype = {
        constructor: NavScroll,
        init: function (options) {
            //共享参数
            this.options = options;

            if (options.navList) {
                //获取导航id对应的内容距离顶部的距离
                this.navTopArr = this.getTopArr();
                //事件
                this.event();
            }
        },
        //获取每个模块的位置、高度等信息
        getTopArr: function () {
            var options = this.options,
                $fixedObj = options.fixedObj,
                $navList = options.navList;
            var navTopArr = [];
            var oldTopAll = 0;
            for (var i = 0; i < $navList.length; i++) {
                var idName = $navList.eq(i).attr(options.navDataName),
                    $thisId = $('#' + idName);
                //检测id是否存在
                if ($thisId.length) {
                    var thisTop = $thisId.offset().top - options.deviationScroll,
                        thisHeight = $thisId.outerHeight();
                    //添加每个内容模块信息
                    navTopArr.push({'idName': idName, 'top': thisTop, 'index': i, 'height': thisHeight});

                    oldTopAll = thisTop + thisHeight;
                } else {
                    //如果没有找到id模块，当前导航高亮状态默认为前一个和后一个之间的位置时高亮
                    navTopArr.push({'idName': '', 'top': oldTopAll + 1, 'index': i, 'height': 0});
                    //$navList.eq(i).remove();
                    console.log('组件navScroll对应的ID：' + idName + '，未找到！');
                }
            }
            return navTopArr;
        },
        event: function () {
            var self = this,
                options = this.options,
                $fixedObj = options.fixedObj,
                $navList = options.navList,
                $fixedParent = $fixedObj.parent(),
                parentW = $fixedParent.width(),
                topInfo = self.navTopArr;

            //设置默认高亮
            if (options.activeIndex >= 0) {
                $navList.eq(options.activeIndex).addClass(options.activeClassName).siblings().removeClass(options.activeClassName);
            }
            //点击导航滚动到对应位置
            $(document).on('click', $navList.selector, function (e) {
                //是否开启监听高度变化，如果开启了，就取最新的位置，没有就用旧的位置
                var topArr = options.monitoring ? self.getTopArr() : self.navTopArr,
                    num = $(this).index($navList.selector),
                    thisInfo = topArr[num];
                //没有当前id不滚动
                if (thisInfo.idName === '') return;
                //移动屏幕位置
                $('body,html').animate({"scrollTop": thisInfo.top}, options.speed, function () {
                    setTimeout(function () {
                        $navList.eq(num).addClass(options.activeClassName).siblings().removeClass(options.activeClassName);
                    }, 120);
                });

            });

            //滚动监听
            var $window = $(window),
                navTimer = null;
            $window.scroll(function (event) {

                var winT = $window.scrollTop() + options.deviationNav, //导航top偏移的时候需要减去当前导航的高度
                    lastInfo = topInfo[topInfo.length - 1];

                //性能优化
                clearTimeout(navTimer);
                navTimer = setTimeout(function () {

                    //窗口当前位置
                    var nowIndex = -1;

                    //是否监听内容变化
                    if (options.monitoring) {
                        topInfo = self.getTopArr();
                    }
                    //选出当前索引
                    for (var i = 0; i < topInfo.length; i++) {
                        var thisT = topInfo[i].top;
                        if (winT > thisT) {
                            nowIndex = topInfo[i].index;
                        }
                    }
                    //判断默认高亮的索引
                    if (nowIndex < 0 && options.activeIndex < 0) { //当前索引和默认索引都是-1的时候，默认不显示高亮
                        $navList.removeClass(options.activeClassName);
                    } else if (nowIndex < 0 && options.activeIndex >= 0) { //小于第一个索引top时恢复默认设置高亮
                        $navList.eq(options.activeIndex).addClass(options.activeClassName).siblings().removeClass(options.activeClassName);
                    } else if (nowIndex >= 0) { //对应导航高亮
                        $navList.eq(nowIndex).addClass(options.activeClassName).siblings().removeClass(options.activeClassName);
                    }
                    //滚动回调
                    if (typeof options.callback === "function" && winT < lastInfo.top + lastInfo.height) {
                        options.callback(nowIndex);
                    }
                }, 100);

                //导航跟随
                if (options.navStyle) {
                    //判断是否触发导航跟随
                    var parentT = $fixedParent.offset().top;
                    if (winT > parentT) {
                        $fixedObj.css({
                            'position': 'fixed',
                            'top': options.deviationNav,
                            'width': parentW,
                            'z-index': options.zIndex
                        });
                    } else { //小于触发点，恢复导航位置
                        $fixedObj.attr('style', '');
                    }
                }
                //结束滚动回调，不能延迟，因为
                if (typeof options.callback === "function" && winT >= lastInfo.top + lastInfo.height + options.deviationScroll) {
                    options.endCallback();
                }
            });

        }

    };

    nova.navScroll = Factory;
    window.nova = nova;

})(window, jQuery, window.nova || {});
