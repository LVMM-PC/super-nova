/*!
 * dialog.js
 * 2016-11-14
 * Sheng Jiang
 * 1.0.0.0
 */

(function (window, $, nova) {

    "use strict";

    if (nova.dialog) {
        return false;
    }

    var $document = $(document);
    var $body = $("body");

    //弹窗计数
    var count = 0;

    //静态时间戳
    var timeStamp = +(new Date());

    //模板
    var template = '' +
        '<div class="nova-dialog">' +
        '    <div class="nova-dialog-close"><i></i></div>' +
        '    <div class="nova-dialog-header"></div>' +
        '    <div class="nova-dialog-body"></div>' +
        '    <div class="nova-dialog-footer"></div>' +
        '</div>';

    /**
     * 工厂方法类
     * @param options 参数
     * @returns {Dialog} 弹窗对象
     * @constructor
     */
    function Factory(options) {

        //0. 组合参数与默认值
        options = $.extend({}, Factory.defaults, options);

        //1. 为弹窗设置单独id
        var dialogId = timeStamp + count;
        count++;

        //2. 创建新弹窗
        var dialog = new Dialog(options, dialogId);
        dialog.id = dialogId;

        //3. 将弹窗添加到列表中
        Dialog.list[dialogId] = dialog;

        //4. 返回弹窗对象，方便外部使用内部方法
        return dialog;
    }

    //默认值
    Factory.defaults = {

        template: template,
        cloneEvent: true,

        showClose: true,  //是否显示关闭按钮
        buttons: null,  //按钮组
        fixed: true,  //是否position:fixed
        masked: true,  //是否有遮罩层
        draggable: false,  //是否可以拖拽

        topFixed: false,  //是否弹窗顶部与窗口顶部保持固定尺寸
        topOffset: 60,  //弹窗顶部与窗口顶部的距离

        initHeight: "300px",  //iframe高度

        initCallback: null,  //初始化完成后执行方法
        beforeClosingCallback: null,  //窗口关闭前执行方法

        okCallback: null,  //确定按钮
        cancelCallback: null,  //取消按钮

        okText: "确定",  //确定按钮文本
        cancelText: "取消",  //取消按钮文本

        okClassName: "btn-orange",  //确定按钮class
        cancelClassName: "",  //取消按钮class

        content: "",  //内容
        contentClone: true,
        title: "消息提醒",  //标题

        time: null,  //定时关闭 单位毫秒(ms)

        width: "",  //宽度
        height: "",  //高度

        wrapClass: "",  //弹窗class
        maskClass: "nova-overlay",  //遮罩层class

        zIndex: 1  //z-index

    };

    /**
     * 弹窗类
     * @param options 参数
     * @param dialogId ID
     * @constructor
     */
    function Dialog(options, dialogId) {
        this.init(options, dialogId);
    }

    //Dialog list
    Dialog.list = {};

    //窗口尺寸变更后，重置所有弹窗位置
    $(window).on("resize", function () {
        for (var id in Dialog.list) {
            var dialog = Dialog.list[id];
            dialog.resize();
        }
    });

    //原型方法
    Dialog.prototype = {

        //版本号
        version: "1.0.0.0",

        //构造函数
        construction: Dialog,

        /**
         * 初始化
         * @param options
         * @param dialogId ID
         */
        init: function (options, dialogId) {

            //将参数绑定到弹窗对象
            this.options = options;
            //备份默认值
            this.defaults = Factory.defaults;

            //备份this
            var self = this;

            //按钮初始化
            self.setButton(options);

            //创建弹窗dom对象
            var template = this.options.template;
            self.wrap = $(template);

            //设置id
            self.wrap.attr("data-id", dialogId);

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

            //设置定时器
            self.time(options.time);

            //设置遮罩层
            if (options.masked === true) {
                setTimeout(function () {
                    self.mask(options);
                }, 0);
            }

            //事件绑定
            self.bindEvent(options);

            //设置拖拽
            if (options.draggable === true) {
                self.drag();
            }

            //设置关闭按钮
            self.showClose(options.showClose);

            self.wrap.hide();

            //将弹窗添加到页面中
            $body.append(self.wrap);

            //重置定位
            setTimeout(function () {
                self.resize();
                //显示弹窗
                self.wrap.show();
            }, 0);

            //执行初始化完成方法
            if (typeof options.initCallback === "function") {
                options.initCallback.call(this);
            }

        },

        /**
         * 加载
         */
        loading: function () {
            this.content('<div class="nova-dialog-body-loading"><i></i><br>正在加载中...</div>');
        },

        /**
         * 是否显示右上角关闭按钮
         * @param showClose:bool true==显示
         */
        showClose: function (showClose) {
            if (showClose) {
                this.wrap.find(".nova-dialog-close").show();
            } else {
                this.wrap.find(".nova-dialog-close").hide();
            }
        },

        /**
         * 拖动
         */
        drag: function () {
            var wrap = this.wrap;
            var dialogTop;
            var dialogLeft;
            var $header = wrap.find(".nova-dialog-header");

            var pageX;
            var pageY;

            $header.on("mousedown", function (e) {

                wrap.addClass("nova-dialog-moving");

                pageX = e.pageX;
                pageY = e.pageY;

                $body.on("mousemove", mouseMoveHandler);

            });

            function mouseMoveHandler(e) {

                var pageXNext = e.pageX;
                var pageYNext = e.pageY;

                var x = pageXNext - pageX;
                var y = pageYNext - pageY;

                pageX = pageXNext;
                pageY = pageYNext;

                dialogTop = parseInt(wrap.css("top"));
                dialogLeft = parseInt(wrap.css("left"));

                wrap.css({
                    top: dialogTop + y,
                    left: dialogLeft + x
                });

            }

            $document.on("mouseup", function (e) {
                $body.off("mousemove", mouseMoveHandler);
                wrap.removeClass("nova-dialog-moving");
            });
        },

        /**
         * 定时
         * @param time 毫秒(ms)后关闭
         */
        time: function (time) {
            var self = this;
            var timer = this.timer;
            if (timer) {
                clearTimeout(timer);
            }
            if (time) {
                this.timer = setTimeout(function () {
                    self.close();
                }, time);
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
            var $footer = this.wrap.find(".nova-dialog-footer");

            if (size == 0) {
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
            self.wrap.on("click", ".nova-dialog-close", {self: self}, self.closeDialogHandler);
            self.wrap.on("click", ".nova-dialog-footer>*", {self: self}, self.buttonHandler)
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
        closeDialogHandler: function (e) {
            var self = e.data.self;
            self.close();
        },

        /**
         * 关闭弹窗并执行beforeunload方法
         * @param force 不执行beforeunload直接关闭
         */
        close: function (force) {
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
                if(this._elemBack){
                    this._elemBack();
                }
            }
            this.wrap.remove();
            this.mask();
            delete Dialog.list[this.id];
        },

        /**
         * 设置标题
         */
        title: function (title) {
            var $header = this.wrap.find(".nova-dialog-header");
            if (title === null) {
                $header.hide();
                this.wrap.addClass("nova-dialog-no-title");
            } else {
                $header.html(title);
            }

        },

        /**
         * 设置内容
         */
        content: function ($content) {

            var self = this;

            if(this._elemBack){
                this._elemBack();
            }

            var $body = this.wrap.find(".nova-dialog-body");
            var contentClone = this.options.contentClone;

            if (this.options.url) {
                this.wrap.addClass("nova-dialog-custom");
                var $iframe = $('<iframe src="' + $content + '" frameborder="0"></iframe>');
                $body.html($iframe);
                var dialogHeight = this.wrap.height();
                var $header = this.wrap.find(".nova-dialog-header:visible");
                var $footer = this.wrap.find(".nova-dialog-footer:visible");
                var headerHeight = $header.outerHeight(true);
                var footerHeight = $footer.outerHeight(true);
                var bodyHeight = dialogHeight - (headerHeight ? headerHeight : 0) - (footerHeight ? footerHeight : 0);

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
         * 重设位置
         */
        resize: function () {
            var $window = $(window);
            var windowHeight = $window.height();
            var windowWidth = $window.width();
            var dialogWidth = this.wrap.width();
            var dialogHeight = this.wrap.height();
            var left = ~~((windowWidth - dialogWidth) / 2);

            if (this.options.topFixed) {

                var dialogAutoTop = $window.scrollTop() + this.options.topOffset;
                this.wrap.css({
                    position: "absolute",
                    top: dialogAutoTop,
                    left: left
                });

                return;
            }

            if (windowHeight - dialogHeight >= 0) {
                this.offsets();
            } else {
                var dialogTop = $window.scrollTop() + 10;

                this.wrap.css({
                    position: "absolute",
                    top: dialogTop,
                    left: left
                })
            }
        },

        /**
         * 定位
         */
        offsets: function () {
            var windowWidth = $(window).width();
            var windowHeight = $(window).height();
            var dialogWidth = this.wrap.width();
            var dialogHeight = this.wrap.height();
            var left = ~~((windowWidth - dialogWidth) / 2);
            var top = ~~((windowHeight - dialogHeight) / 2);

            this.wrap.css({
                position: "fixed",
                top: top,
                left: left
            })
        },

        /**
         * 遮罩层
         */
        mask: function () {
            var mask = this.options.masked;
            if (mask) {
                this.wrap.attr("data-mask", "mask");
            }

            var $mask;
            $mask = $(".nova-overlay");
            if ($mask.length == 0) {
                $mask = $('<div class="nova-overlay"></div>');
                $body.append($mask);
            }
            $mask.css("zIndex", this.options.zIndex);
            var $dialogs = $(".nova-dialog[data-mask=mask]");

            $mask.attr("class", "nova-overlay");
            if ($dialogs.length == 0) {
                $mask.hide();
            } else {
                $mask.show();
                var $dialog = $dialogs.last();
                var dialogId = $dialog.attr("data-id");
                var dialog = Dialog.list[dialogId];
                $dialog.before($mask);
                var maskClass = dialog.options.maskClass;
                $mask.addClass(maskClass);
                $mask.css("zIndex", dialog.options.zIndex);
            }

        }

    };

    nova.dialog = Factory;
    window.nova = nova;

    //Alert
    nova.alert = function (content, callback) {
        return Factory({
            fixed: true,
            masked: true,
            content: content,
            okCallback: true,
            beforeClosingCallback: callback
        });
    };

    //Confirm
    nova.confirm = function (content, okCallback, cancel) {
        return Factory({
            fixed: true,
            lock: true,
            content: content,
            okCallback: okCallback ? okCallback : true,
            cancelCallback: cancel ? cancel : true
        });
    };

    //Message
    nova.msg = function (content, time) {
        return Factory({
            showClose: false,
            title: null,
            fixed: true,
            masked: false,
            content: content,
            time: time ? time : 2000
        });
    };

    //Loading
    nova.loading = function (content, callback) {
        var html = '<div class="nova-dialog-body-loading"><i></i></div>';
        return Factory({
            showClose: false,
            title: null,
            content: content ? content : html,
            beforeClosingCallback: callback
        })
    };

    //将内部方法导出为外部
    for (var c in Dialog) {
        if (Dialog.hasOwnProperty(c)) {
            if (typeof Dialog[c] === "function") {
                Factory[c] = Dialog[c]
            }
        }
    }

})(window, jQuery || $, window.nova || {});
