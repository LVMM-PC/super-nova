/*!
 * ui.js
 * 2016-11-03
 * Sheng Jiang
 * 1.0.0.0
 */

(function (window, $, nova) {

    "use strict";

    if (nova.ui) {
        return false;
    }

    var $document = $(document);  //文档
    var $body = $("body");

    function Factory(options) {
        if (options && options.template) {
            options.template = $.extend(true, {}, template, options.template);
        }
        options = $.extend({}, Factory.defaults, options);
        return new UI(options);
    }

    var template = {
        checkbox: '' +
        '<span class="nova-checkbox"></span>',
        radio: '' +
        '<span class="nova-radio"></span>',
        select: {
            main: '' +
            '<div class="nova-select">' +
            '<div class="nova-select-toggle"><em>{{text}}</em><b><i></i></b></div>' +
            '<div class="nova-select-dropdown">' +
            '{{dropdown}}' +
            '</div>' +
            '</div>',
            optgroup: '<div class="nova-select-optgroup">' +
            '<div class="nova-select-optgroup-label">{{label}}</div>' +
            '{{options}}' +
            '</div>',
            option: '<div class="nova-select-option">{{text}}</div>'
        }
    };

    Factory.defaults = {
        target: "body",
        template: template,
        radioClassName: '',
        selectOpenCallback: null,
        zIndex: null
    };

    function UI(options) {
        this.init(options);
    }

    UI.prototype = {

        //版本号
        version: "1.0.0.0",

        /**
         * 替换匹配的内容
         * @param str
         * @param obj
         * @returns {*}
         */
        replaceWith: function (str, obj) {
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    str = str.replace("{{" + i + "}}", obj[i]);
                }
            }
            return str;
        },

        //构造函数
        construction: UI,

        init: function (options) {
            this.options = options;
            this.selectOpenCallback = options.selectOpenCallback;

            this.defaults = Factory.defaults;
            this.bindEvent();
        },

        render: function () {
            this.checkboxRender();
            this.radioRender();
            this.selectRender();
            this.numberBoxRender();
        },

        selectRender: function () {

            var self = this;

            var $labels = $(this.options.target).find(".nova-select-label");

            $labels.each(function (index, ele) {
                var $label = $(ele);

                var $select = $label.find("select");
                var originIndex = $select.get(0).selectedIndex;

                function getOptHtml($children) {
                    var optHtml = "";

                    var size = $children.length;

                    for (var index = 0; index < size; index++) {
                        var $child = $children.eq(index);

                        if ($child.is("optgroup")) {
                            var label = $child.attr("label");
                            optHtml += getOptGroupHtml($child, label);
                        } else {
                            var text = $child.text();
                            optHtml += self.replaceWith(self.options.template.select.option, {
                                text: text
                            });
                        }
                    }

                    return optHtml;
                }

                function getOptGroupHtml($optgroup, label) {
                    var $children = $optgroup.children("option");
                    return self.replaceWith(self.options.template.select.optgroup, {
                        label: label,
                        options: getOptHtml($children)
                    });
                }

                var $selectChildren = $select.children();
                var optHtml = getOptHtml($selectChildren);

                var html = self.replaceWith(self.options.template.select.main, {
                    dropdown: optHtml
                });

                $select.hide();

                $label.find(".nova-select").remove();
                var $novaSelect = $(html);

                var $activeOption = $novaSelect.find(".nova-select-option").eq(originIndex);
                $activeOption.addClass("active");
                var text = $activeOption.text();
                $novaSelect.find(".nova-select-toggle em").text(text);
                var disabled = $select.prop("disabled");
                if (disabled) {
                    $novaSelect.addClass("disabled");
                }

                $label.append($novaSelect);

                var $dropdown = $label.find(".nova-select-dropdown");
                $dropdown.data("label", $label);
                $label.data("dropdown", $dropdown);

                if (self.options.zIndex) {
                    $dropdown.css("zIndex", self.options.zIndex)
                }
            })

        },

        numberBoxRender: function () {
            var self = this;
            var $numberBox = $(this.options.target).find(".nova-number-box");
            $numberBox.each(function (index, ele) {
                var $box = $(ele);
                var $subtract = $box.find(".nova-number-box-subtract");
                self.addAndSubtract.call($subtract.get(0), self, 0);
            });
        },

        unrender: function () {
            this.checkboxUnrender();
            this.radioUnrender();
            this.selectUnrender();
        },

        selectUnrender: function () {
            var $labels = $(this.options.target).find(".nova-select-label");
            $labels.find("select").show();
            $labels.find(".nova-select").remove();
        },

        checkboxUnrender: function () {
            var $label = $(this.options.target).find(".nova-checkbox-label");
            var $input = $label.find("input[type=checkbox]");
            var $checkbox = $label.find(".nova-checkbox");
            //$input.show();
            $input.removeClass("nova-checkbox-hide");
            $checkbox.remove();
        },

        radioUnrender: function () {
            var $label = $(this.options.target).find(".nova-radio-label");
            var $input = $label.find("input[type=radio]");
            var $radio = $label.find(".nova-radio");
            //$input.show();
            $input.removeClass("nova-radio-hide");
            $radio.remove();
        },

        checkboxRender: function () {
            var $labels = $(this.options.target).find(".nova-checkbox-label");
            var $inputs = $labels.find("input[type=checkbox]");
            var $checkboxs = $labels.find(".nova-checkbox");
            //$inputs.hide();
            $inputs.addClass("nova-checkbox-hide");
            $checkboxs.remove();
            $inputs.after(this.options.template.checkbox);
            $inputs.each(function (index, ele) {
                var $ele = $(ele);
                var checked = $ele.prop("checked");
                var $checkbox = $ele.parents(".nova-checkbox-label").find(".nova-checkbox");
                var $label = $ele.parents(".nova-checkbox-label");
                if (checked) {
                    $checkbox.addClass("nova-checked");
                    $label.addClass("nova-checked");
                } else {
                    $checkbox.removeClass("nova-checked");
                    $label.removeClass("nova-checked");
                }

                var disabled = $ele.prop("disabled");
                if (disabled) {
                    $checkbox.addClass("disabled");
                    $checkbox.parents(".nova-checkbox-label").eq(0).addClass("disabled");
                }
            })
        },

        radioRender: function () {
            var self = this;
            var $labels = $(this.options.target).find(".nova-radio-label");
            var $inputs = $labels.find("input[type=radio]");
            var $radios = $labels.find(".nova-radio");
            //$inputs.hide();
            $inputs.addClass("nova-radio-hide");
            $radios.remove();
            $inputs.after(this.options.template.radio);

            $inputs.each(function (index, ele) {
                var $ele = $(ele);
                var checked = $ele.prop("checked");
                var $label = $ele.parents(".nova-radio-label");
                $label.addClass(self.options.radioClassName);
                var $radio = $label.find(".nova-radio");
                if (checked) {
                    $radio.addClass("nova-checked");
                } else {
                    $radio.removeClass("nova-checked");
                }
                var disabled = $ele.prop("disabled");
                if (disabled) {
                    $radio.addClass("disabled");
                    $radio.parents(".nova-radio-label").eq(0).addClass("disabled");
                }
            })
        },

        bindEvent: function () {
            $(this.options.target).off("change", ".nova-checkbox-label input[type=checkbox]", this.checkboxChangeHandler);
            $(this.options.target).on("change", ".nova-checkbox-label input[type=checkbox]", {self: this}, this.checkboxChangeHandler);
            $(this.options.target).off("change", ".nova-radio-label input[type=radio]", this.radioChangeHandler);
            $(this.options.target).on("change", ".nova-radio-label input[type=radio]", {self: this}, this.radioChangeHandler);

            $(this.options.target).off("click", ".nova-select-toggle", this.selectClickHandler);
            $(this.options.target).on("click", ".nova-select-toggle", {self: this}, this.selectClickHandler);

            $(this.options.target).off("click", ".nova-select-option");
            $(this.options.target).on("click", ".nova-select-option", {self: this}, this.selectOptionClickHandler);

            $(this.options.target).off("change", ".nova-select-label select");
            $(this.options.target).on("change", ".nova-select-label select", this.selectChangeHandler);

            $(this.options.target).off("mousedown", ".nova-number-box .nova-number-box-subtract");
            $(this.options.target).on("mousedown", ".nova-number-box .nova-number-box-subtract", {self: this}, function (e) {
                var self = e.data.self;
                self.addAndSubtract.call(this, self, -1);
            });

            $(this.options.target).off("mousedown", ".nova-number-box .nova-number-box-add");
            $(this.options.target).on("mousedown", ".nova-number-box .nova-number-box-add", {self: this}, function (e) {
                var self = e.data.self;
                self.addAndSubtract.call(this, self, 1);
            });

            $(this.options.target).off("change", ".nova-number-box input", this.addAndSubtractChangeHandler);
            $(this.options.target).on("change", ".nova-number-box input", {self: this}, this.addAndSubtractChangeHandler);

            $($document).off("click", this.selectHideHandler);
            $($document).on("click", this.selectHideHandler);
        },

        selectChangeHandler: function () {
            var $this = $(this);
            var index = $this.get(0).selectedIndex;

            var $label = $this.parents(".nova-select-label");
            var text = $this.find("option").eq(index).text();
            var $novaSelect = $label.find(".nova-select");
            var $toggle = $novaSelect.find(".nova-select-toggle");
            var $dropdown = $novaSelect.find(".nova-select-dropdown");
            var $options = $dropdown.find(".nova-select-option");
            $options.removeClass("active");
            var $thisOption = $options.eq(index);
            $thisOption.addClass("active");
            $toggle.find("em").text(text);

        },

        selectOptionClickHandler: function () {

            var $this = $(this);
            var $dropdown = $this.parents(".nova-select-dropdown");

            var $label = $dropdown.data("label");

            var $select = $label.find("select");
            var $novaSelect = $label.find(".nova-select");

            var text = $this.text();

            var $toggle = $novaSelect.find(".nova-select-toggle");

            $toggle.find("em").text(text);

            var $options = $dropdown.find(".nova-select-option");
            $options.removeClass("active");
            $this.addClass("active");
            if ($select.get(0).selectedIndex !== $options.index($this)) {
                $select.get(0).selectedIndex = $options.index($this);
                $select.change();
            }

            $novaSelect.removeClass("opened");
            $label.removeClass("opened");
        },

        selectHideHandler: function (e) {
            var $target = $(e.target);
            var $select;
            var $label;
            var $allSelect = $(".nova-select");
            if ($target.is(".nova-select") || $target.parents(".nova-select").length > 0) {
                if ($target.is(".nova-select")) {
                    $select = $allSelect.not($target);
                } else if ($target.parents(".nova-select").length > 0) {
                    $select = $allSelect.not($target.parents(".nova-select"));
                }
                $label = $select.parents(".nova-select-label");
                $select.removeClass("opened");
            } else if ($target.is(".nova-select-optgroup-label")) {
                //Do nothing
            } else {
                $allSelect.removeClass("opened");
                $label = $allSelect.parents(".nova-select-label");

                $("body>.nova-select-dropdown").each(function (index, ele) {
                    var $ele = $(ele);
                    var $label = $ele.data("label");
                    var $select = $label.find(".nova-select");
                    $ele.hide();
                    $select.append($ele);
                });
            }
            if ($label) {
                $label.removeClass("opened");
            }

        },

        selectClickHandler: function (e) {
            var self = e.data.self;
            var $this = $(this);
            var $select = $this.parent(".nova-select");
            var $label = $select.parents(".nova-select-label");
            var $dropdown = $label.data("dropdown");
            // 对label重定位
            $dropdown.data("label", $label);
            //
            $(".nova-select-dropdown").hide();

            if ($select.is(".disabled")) {

            } else {
                $select.toggleClass("opened");
                $label.toggleClass("opened");
            }

            if ($select.hasClass("opened")) {
                $body.append($dropdown);

                var top = $this.offset().top;
                var left = $this.offset().left;
                var height = $this.outerHeight();
                var width = $this.outerWidth() - 2;

                $dropdown.css({
                    position: "absolute",
                    top: top + height,
                    left: left,
                    width: width
                }).show();

                if (self.selectOpenCallback) {
                    self.selectOpenCallback.call(self, {
                        $select: $select,
                        $dropdown: $dropdown,
                        $label: $label
                    })
                }
            } else {
                $select.append($dropdown.hide());
            }
        },

        checkboxChangeHandler: function () {
            var $this = $(this);
            var $label = $this.parents(".nova-checkbox-label");
            var $checkbox = $label.find(".nova-checkbox");
            var checked = $this.prop("checked");
            if (checked) {
                $checkbox.addClass("nova-checked");
                $label.addClass("nova-checked");
            } else {
                $checkbox.removeClass("nova-checked");
                $label.removeClass("nova-checked");
            }
        },

        radioChangeHandler: function () {

            var $this = $(this);
            var $label = $this.parents(".nova-radio-label");
            var $radio = $label.find(".nova-radio");
            var name = $this.attr("name");

            var checked = $this.prop("checked");

            var $group = $this.parents(".nova-radio-group");
            var $labels = $group.find(".nova-radio-label");
            var $inputs = $group.find(".nova-radio-label input[type=radio][name=" + name + "]");
            var $radios = $inputs.parents(".nova-radio-label").find(".nova-radio");

            $radios.removeClass("nova-checked");
            $radio.addClass("nova-checked");
            $labels.removeClass("nova-checked");
            $label.addClass("nova-checked");
        },

        addAndSubtractChangeHandler: function (e) {
            var self = e.data.self;
            var $this = $(this);
            var $box = $this.parent();
            self.addAndSubtractLimit($box, 0);
        },

        addAndSubtractLimit: function ($box, offset) {
            var $subtract = $box.find(".nova-number-box-subtract");
            var $add = $box.find(".nova-number-box-add");
            var $input = $box.find("input");
            var num = strToNumber($input.val(), 0);
            var min = strToNumber($input.attr("data-min"), 0);
            var max = strToNumber($input.attr("data-max"), 9);
            var limit = {
                min: min,
                max: max
            };

            num = num + offset;

            if (num >= max) {
                num = max;
                $add.addClass("disabled");
            } else {
                $add.removeClass("disabled");
            }
            if (num <= min) {
                num = min;
                $subtract.addClass("disabled");
            } else {
                $subtract.removeClass("disabled");
            }

            $input.val(num)
        },

        addAndSubtract: function (self, offset) {
            var $this = $(this);
            var $box = $this.parent();
            var isDisabled = $this.is(".disabled");
            self.addAndSubtractLimit($box, offset);
            var $input = $box.find("input");
            if (isDisabled) {

            } else {
                $input.change();
            }
        }
    };

    nova.ui = Factory;
    window.nova = nova;

    for (var c in UI) {
        if (UI.hasOwnProperty(c)) {
            if (typeof UI[c] === "function") {
                Factory[c] = UI[c]
            }
        }
    }

    function strToNumber(str, def) {
        str = $.trim(str);
        var num = parseInt(str, 10);
        if (isNaN(num) || !isFinite(num)) {
            num = def;
        }
        return num;
    }

})(window, jQuery, window.nova || {});
