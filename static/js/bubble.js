/*!
 * bubble.js
 * 2016-11-14
 * Sheng Jiang
 * 1.0.0.0
 */

(function (window, $, nova) {

    "use strict";

    if (nova.bubble) {
        return false;
    }

    var $document = $(document);
    var $body = $("body");

    //弹窗计数
    var count = 0;

    $document.off("click", autoHideHandler);
    $document.on("click", autoHideHandler);

    /**
     * 自动隐藏
     * @param e
     */
    function autoHideHandler(e) {
        for (var id in Bubble.list) {
            var bubble = Bubble.list[id];
            tryClose(bubble)
        }

        function tryClose(self) {

            var autoHide = self.options.autoHide;
            if (!autoHide) {
                return false;
            }

            var $target = $(e.target);

            var $trigger = self.options.$trigger;

            var $btn = $target.parents("[data-nova-bubble-active]");
            var $bubble = $target.parents(".nova-bubble");
            var $wrap = self.wrap;

            if ($btn.is($trigger) || $target.is($trigger)) {

            } else if ($bubble.is($wrap) || $target.is($wrap)) {

            } else {
                self.close();
            }
        }

    }

    //静态时间戳
    var timeStamp = +(new Date());

    //模板
    var template = '' +
        '<div class="nova-bubble d-animation">' +
        '<div class="nova-bubble-arrow"></div>' +
        '<div class="nova-bubble-arrow-inner"></div>' +
        '    <div class="nova-bubble-close"><i>&times;</i></div>' +
        '    <div class="nova-bubble-header"></div>' +
        '    <div class="nova-bubble-body"></div>' +
        '    <div class="nova-bubble-footer"></div>' +
        '</div>';

    /**
     * 工厂方法类
     * @param options 参数
     * @returns {bubble} 弹窗对象
     * @constructor
     */
    function Factory(options) {

        if (!options.$trigger) {
            throw new Error("气泡必须提供一个$trigger参数");
        }

        if (options.$trigger.attr("data-nova-bubble-active") === "active") {
            return false;
        }

        //-1
        options.$trigger.attr("data-nova-bubble-active", "active");

        //0. 组合参数与默认值
        options = $.extend({}, Factory.defaults, options);

        //1. 为弹窗设置单独id
        var bubbleId = timeStamp + count;
        count++;

        //2. 创建新弹窗
        var bubble = new Bubble(options, bubbleId);
        bubble.id = bubbleId;

        //3. 将弹窗添加到列表中
        Bubble.list[bubbleId] = bubble;

        //4. 返回弹窗对象，方便外部使用内部方法
        return bubble;
    }

    //默认值
    Factory.defaults = {

        $trigger: null,

        template: template,
        cloneEvent: true,

        showClose: true,  //是否显示关闭按钮
        buttons: null,  //按钮组

        initCallback: null,  //初始化完成后执行方法
        beforeClosingCallback: null,  //窗口关闭前执行方法

        okCallback: null,  //确定按钮
        cancelCallback: null,  //取消按钮

        okText: "确定",  //确定按钮文本
        cancelText: "取消",  //取消按钮文本

        okClassName: "btn-sm btn-orange",  //确定按钮class
        cancelClassName: "btn-sm btn-default",  //取消按钮class

        content: "",  //内容
        contentClone: false,
        title: null,  //标题

        width: "",  //宽度
        height: "auto",  //高度

        wrapClass: "",  //弹窗class

        zIndex: 3,  //z-index

        autoHide: true,

        //阻止冒泡
        stopPropagation: false,

        offset: {
            left: 0,
            top: 0
        }

    };

    /**
     * 弹窗类
     * @param options 参数
     * @constructor
     */
    function Bubble(options, bubbleId) {
        this.init(options, bubbleId);
    }

    //Bubble list
    Bubble.list = {};

    //原型方法
    Bubble.prototype = {

        //版本号
        version: "1.0.0.0",

        //构造函数
        construction: Bubble,

        /**
         * 初始化
         * @param options
         */
        init: function (options, bubbleId) {

            //将参数绑定到弹窗对象
            this.options = options;
            //备份默认值
            this.defaults = Factory.defaults;

            this.bubbleId = bubbleId;

            //备份this
            var self = this;

            //按钮初始化
            self.setButton(options);

            //创建弹窗dom对象
            var template = this.options.template;
            self.wrap = $(template);

            var wrap = self.wrap;

            //设置class
            wrap.addClass(options.wrapClass);

            //设置按钮
            self.buttons();

            //设置宽高
            self.size(options.width, options.height);

            //设置标题
            self.title(options.title);

            //设置内容
            self.content(options.content);

            //设置z-index
            if (options.zIndex === null) {
                options.zIndex = "auto";
            }
            self.zIndex(options.zIndex);

            //事件绑定
            setTimeout(function () {
                self.bindEvent(options);
            }, 0);

            //设置关闭按钮
            self.showClose(options.showClose);

            self.wrap.hide();

            //将弹窗添加到页面中
            $body.append(self.wrap);

            self.offsets();

            //显示
            self.wrap.show();
            self.wrap.addClass("d-animation-show");

            //执行初始化完成方法
            if (typeof options.initCallback === "function") {
                options.initCallback.call(this);
            }

        },

        /**
         * 加载
         */
        loading: function () {
            this.content('<div class="nova-bubble-body-loading"><i></i><br>正在加载中...</div>');
        },

        /**
         * 是否显示右上角关闭按钮
         * @param showClose:bool true==显示
         */
        showClose: function (showClose) {
            if (showClose) {
                this.wrap.find(".nova-bubble-close").show();
            } else {
                this.wrap.find(".nova-bubble-close").hide();
            }
        },

        /**
         * z-index
         * @param index z轴数值
         */
        zIndex: function (index) {
            this.wrap.css("zIndex", index);
        },

        /**
         * 按钮初始化
         */
        setButton: function () {
            var options = this.options;
            if (options.buttons && options.buttons.push) {

            } else {
                options.buttons = [];
            }

            if (options.okCallback) {
                var okButton = {
                    className: options.okClassName,
                    text: options.okText,
                    callback: options.okCallback
                };
                options.buttons.push(okButton)
            }
            if (options.cancelCallback) {
                var cancelButton = {
                    className: options.cancelClassName,
                    text: options.cancelText,
                    callback: options.cancelCallback
                };
                options.buttons.push(cancelButton)
            }
        },

        /**
         * 设置按钮
         */
        buttons: function () {
            var buttons = this.options.buttons;
            var size = buttons.length;
            var className;
            var $footer = this.wrap.find(".nova-bubble-footer");

            if (size === 0) {
                $footer.hide();
            }

            for (var i = 0; i < size; i++) {
                var button = buttons[i];
                var $button = $("<span class='btn'></span>");

                if ($.isArray(button.className)) {
                    for (var j = 0; j < button.className.length; j++) {
                        className += button.className[j] + " ";
                    }
                } else {
                    if (button.className === undefined) {
                        className = ""
                    } else {
                        className = button.className

                    }
                }

                $button.attr({
                    "class": "btn " + className
                }).html(button.text);

                $footer.append($button);

            }

        },

        /**
         * 绑定事件
         */
        bindEvent: function () {
            var self = this;
            self.wrap.on("click", ".nova-bubble-close", {self: self}, self.closeBubbleHandler);
            self.wrap.on("click", ".nova-bubble-footer>*", {self: self}, self.buttonHandler);

            self.wrap.off("click", self.stopPropagationHandler);
            self.wrap.on("click", {self: self}, self.stopPropagationHandler)
        },

        stopPropagationHandler: function (e) {
            var self = e.data.self;
            if (self.options.stopPropagation) {
                e.stopPropagation();
            }
        },

        /**
         * 解除事件
         */
        unBindEvent: function () {
            var self = this;
        },


        /**
         * 按钮事件
         * @param e
         */
        buttonHandler: function (e) {
            var self = e.data.self;
            var $this = $(this);
            var index = $this.index();
            var button = self.options.buttons[index];
            var callback = button.callback;
            if (callback && $.isFunction(callback)) {
                var ret = callback.call(self);
                if (ret === false) {

                } else {
                    self.close();
                }
            } else {
                self.close();
            }
        },

        /**
         * 关闭事件
         * @param e
         */
        closeBubbleHandler: function (e) {
            var self = e.data.self;
            self.close();
        },

        /**
         * 关闭弹窗并执行beforeunload方法
         * @param force 不执行beforeunload直接关闭
         */
        close: function (force) {
            var self = this;
            var contentClone = this.options.contentClone;
            var beforeunload = this.options.beforeClosingCallback;
            if (!force && beforeunload && $.isFunction(beforeunload)) {
                var ret = beforeunload.call(this);
                if (ret === false) {
                    return;
                }
            }
            if (!contentClone) {
                //var content = this.options.content;
                if (this._elemBack) {
                    this._elemBack();
                }
            }

            this.wrap.addClass("d-animation-hide");
            setTimeout(function () {
                self.wrap.remove();
            }, 300);

            this.options.$trigger.attr("data-nova-bubble-active", "");
            this.unBindEvent();

            delete Bubble.list[this.id];
        },

        /**
         * 设置标题
         */
        title: function (title) {
            var $header = this.wrap.find(".nova-bubble-header");
            if (title === null) {
                $header.hide();
                this.wrap.addClass("nova-bubble-no-title");
            } else {
                $header.html(title);
            }

        },

        /**
         * 设置内容
         */
        content: function ($content) {

            var self = this;

            if (this._elemBack) {
                this._elemBack();
            }

            var $body = this.wrap.find(".nova-bubble-body");
            var contentClone = this.options.contentClone;

            if (this.options.url) {
                this.wrap.addClass("nova-bubble-custom");
                var $iframe = $('<iframe src="' + $content + '" frameborder="0"></iframe>');
                $body.html($iframe);
                var bubbleHeight = this.wrap.height();
                var $header = this.wrap.find(".nova-bubble-header:visible");
                var $footer = this.wrap.find(".nova-bubble-footer:visible");
                var headerHeight = $header.outerHeight(true);
                var footerHeight = $footer.outerHeight(true);
                var bodyHeight = bubbleHeight - (headerHeight ? headerHeight : 0) - (footerHeight ? footerHeight : 0);

                var initialHeight = this.options.initHeight;
                if (initialHeight) {
                    $body.height(parseInt(initialHeight))
                } else {

                    $body.height(bodyHeight);
                }

                return;
            }

            if (typeof $content === "string") {
                $body.html($content);
            } else if ($($content).get(0) && $($content).get(0).nodeType === 1) {
                if (contentClone) {
                    var cloneEvent = this.options.cloneEvent;
                    var contentCloned = $content.clone(cloneEvent);
                    contentCloned.show();
                    $body.html(contentCloned);
                } else {

                    var content = $($content).get(0);
                    var display = content.style.display;
                    var prev = content.previousSibling;
                    var next = content.nextSibling;
                    var parent = content.parentNode;
                    this._elemBack = function () {

                        if (prev && prev.parentNode) {
                            prev.parentNode.insertBefore(content, prev.nextSibling);
                        } else if (next && next.parentNode) {
                            next.parentNode.insertBefore(content, next);
                        } else if (parent) {
                            parent.appendChild(content);
                        }

                        content.style.display = display;
                        self._elemBack = null;
                    };

                    $body.html($content);
                    $content.show();

                }
            }
        },

        /**
         * 设置宽高
         * @param width 宽度
         * @param height 高度
         */
        size: function (width, height) {
            if (typeof width === "number") {
                width += "px";
            }
            if (typeof height === "number") {
                height += "px";
            }

            this.wrap.css({
                width: width,
                height: height
            });
        },

        /**
         * 定位
         */
        offsets: function () {

            var offset = this.options.offset;

            var $trigger = this.options.$trigger.eq(0);
            var windowWidth = $(window).width();
            var windowHeight = $(window).height();

            var newLeft = null;

            var bubbleWidth = this.wrap.outerWidth();
            var bubbleHeight = this.wrap.outerHeight();

            var offsetArrowLeft = 0;

            var triggerWidth = $trigger.outerWidth();
            var triggerHeight = $trigger.outerHeight();
            var triggerLeft = $trigger.offset().left;
            var triggerTop = $trigger.offset().top;

            var windowLeft = $(window).scrollLeft();

            var left = triggerLeft + triggerWidth / 2 - bubbleWidth / 2;
            if (bubbleWidth + left > windowWidth) {
                newLeft = windowWidth + windowLeft - bubbleWidth;
                offsetArrowLeft = left - newLeft;
            }

            if (left - windowLeft < 0) {
                newLeft = windowLeft;
                offsetArrowLeft = left - newLeft
            }

            if (newLeft) {
                left = newLeft
            }

            var top = triggerTop + triggerHeight;

            this.wrap.css({
                top: top + offset.top,
                left: left + offset.left
            });

            this.wrap.find(".nova-bubble-arrow").css({
                "margin-left": -6 + offsetArrowLeft
            });
            this.wrap.find(".nova-bubble-arrow-inner").css({
                "margin-left": -6 + offsetArrowLeft
            });

        }

    };

    nova.bubble = Factory;
    window.nova = nova;

    //将内部方法导出为外部
    for (var c in Bubble) {
        if (Bubble.hasOwnProperty(c)) {
            if (typeof Bubble[c] === "function") {
                Factory[c] = Bubble[c]
            }
        }
    }

})(window, jQuery, window.nova || {});
