/*!
 * Validate.js
 * 2016-03-15
 * 2016-06-12
 * Sheng Jiang
 * 1.0.0.0
 */

(function (window, $, nova) {

    "use strict";

    if (nova.validate) {
        return false;
    }

    var $document = $(document);  //文档
    var zipRegExp = /^\d{6}$/;
    var englishRegExp = /^[a-zA-Z\s]+$/;
    var chineseRegExp = /^[\u4e00-\u9fa5]+$/;
    var chineseAndEnglishRegExp = /^[a-zA-Z\u4e00-\u9fa5\s]+$/;
    var emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var phoneRegExp = /^1[3-9]\d{9}$/;

    /**
     * 工厂类
     * @constructor
     */
    function Factory(options) {
        options = $.extend({}, Factory.defaults, options);
        return new Validate(options);
    }

    //默认值
    Factory.defaults = {
        target: "body",  //校验区域
        triggerEvent: "change",  //默认改变触发
        rules: {},
        validateCallback: null,
        messages: {
            error: "格式错误",
            required: "必须填写。",
            "chinese-and-english": "请输入中文或英文。",
            chinese: "请输入中文。",
            english: "请输入英文。",
            mobile: '暂不支持您输入的号码段，请联系驴妈妈客服<span class="c_f60">1010-6060</span>进行反馈',
            email: "电子邮箱格式不正确，请重新输入。",
            zip: "邮政编码只能为6位数字，请重新输入。",
            idcard: "请输入正确的身份证号码。"
        }
    };

    /**
     * 日历类
     * @constructor
     */
    function Validate(options) {
        this.init(options);
    }

    //原型属性方法
    Validate.prototype = {

        //版本号
        version: "1.0.0.0",

        //构造函数
        construction: Validate,

        //析构函数
        destruction: function () {

        },

        //初始化
        init: function (options) {
            this.options = options;
            this.defaults = Factory.defaults;
            this.$target = $(options.target);
            var expandMethods = options.expandMethods;
            for (var expandMethod in expandMethods) {
                this.addMethod(expandMethod, expandMethods[expandMethod]);
            }
            this.$firstError = null;
            this.bindEvent();
        },

        //验证单个input
        validateInput: function (ruleDetails, rule, $input) {

            var inputValidate = true;

            var rules = this.options.rules;
            var messages = this.options.messages;
            var message = this.options.messages.error;
            var validateCallback = this.options.validateCallback;

            var val = $.trim($input.val());
            for (var ruleDetail in ruleDetails) {

                var defaultMessage = messages[ruleDetail];
                if (defaultMessage) {
                    message = defaultMessage;
                }
                var ruleMessage = rules[rule][ruleDetail + "-message"];
                if (ruleMessage) {
                    message = ruleMessage;
                }

                var method = this.methods[ruleDetail];
                var complexMethod = this.complexMethods[ruleDetail];
                var result = true;

                if (method && $.isFunction(method)) {

                    //参数
                    var parameter = rules[rule][ruleDetail];


                    if (ruleDetail !== "required" && val.length === 0) {

                    } else {
                        result = method.call(this, val, $input, parameter);
                    }

                    if (validateCallback && $.isFunction(validateCallback)) {
                        validateCallback.call(this, result, val, $input, message);
                    }
                    if (result === false) {
                        inputValidate = false;
                        break;
                    }

                }
                if (complexMethod && $.isFunction(complexMethod)) {
                    var error = true;

                    error = complexMethod.call(this, val, $input, parameter);

                    if (validateCallback && $.isFunction(validateCallback)) {
                        validateCallback.call(this, error == true, val, $input, error);
                    }

                    if (error !== true) {
                        inputValidate = false;
                        break;
                    }

                }

            }

            return inputValidate;
        },

        //绑定事件
        bindEvent: function () {
            var rules = this.options.rules;
            var self = this;
            var triggerEvent = this.options.triggerEvent;

            for (var rule in rules) {
                (function (rule) {

                    self.$target.on(triggerEvent, rule, function () {
                        var $input = $(this);
                        var ruleDetails = rules[rule];

                        self.validateInput(ruleDetails, rule, $input);
                    });

                })(rule)
            }
        },

        //获取是否验证通过
        getValidate: function () {
            var rules = this.options.rules;
            this.$firstError = null;

            var isThatAllRight = true;

            for (var rule in rules) {
                var $inputs = this.$target.find(rule);
                var ruleDetails = rules[rule];

                for (var index = 0; index < $inputs.length; index++) {
                    var $input = $inputs.eq(index);

                    var ret = this.validateInput(ruleDetails, rule, $input);
                    if (!ret) {
                        isThatAllRight = false;
                    }

                }

                if (isThatAllRight === false && !this.$firstError) {
                    this.$firstError = $input;
                }

            }

            return isThatAllRight;
        },

        //验证方法
        methods: {
            //必填
            required: function (value, $element) {
                return value.length > 0;
            },
            //最大不能超过
            maxlength: function (value, $element, parameter) {
                return value.length <= parameter;
            },
            //最小不能低于
            minlength: function (value, $element, parameter) {
                return value.length >= parameter;
            },
            //邮箱
            email: function (value, $element) {
                return emailRegExp.test(value);
            },
            //身份证
            "idcard": function (value, $element) {

                function calcChecksum(rid) {
                    var arr = rid.split('').reverse();

                    function w(i) {
                        return Math.pow(2, i - 1) % 11;
                    }

                    function s() {
                        var sum = 0;
                        for (var j = 0; j < 17; j++) {
                            sum += arr[j] * w(j + 2);
                        }

                        return sum;
                    }

                    return (12 - (s() % 11)) % 11;
                }

                function idCard18Test(idNumber) {

                    //region 身份证是否是17位数字+一位校验位
                    var idCard18Regular = /^\d{17}[0-9Xx]$/;

                    var regularTestResult = idCard18Regular.test(idNumber);
                    if (!regularTestResult) {
                        return false;
                    }
                    //endregion

                    //region 身份证生日是否合法
                    var year;
                    var month;
                    var date;

                    year = parseInt(idNumber.substr(6, 4), 10);
                    month = parseInt(idNumber.substr(10, 2), 10);
                    date = parseInt(idNumber.substr(12, 2), 10);

                    var birthday = new Date(year, month - 1, date);
                    if (birthday.getFullYear() !== year ||
                        birthday.getMonth() !== (month - 1) ||
                        birthday.getDate() !== date) {
                        return false;
                    }
                    //endregion

                    //region 校验位是否正确
                    var rid = idNumber.substr(0, 17);
                    var code = idNumber.substr(17, 1);

                    var calcCode = (calcChecksum(rid));
                    if (parseInt(code, 10) === calcCode ||
                        (code === "X" && calcCode === 10)) {

                    } else {
                        return false;
                    }
                    //endregion

                    return true;

                }

                function idCard15Test(idNumber) {

                    //region 身份证是否是15位数字
                    var idCard15Regular = /^\d{15}$/;

                    var regularTestResult = idCard15Regular.test(idNumber);
                    if (!regularTestResult) {
                        return false;
                    }
                    //endregion

                    //region 身份证生日是否合法
                    var year;
                    var month;
                    var date;

                    year = parseInt("19" + idNumber.substr(6, 2), 10);
                    month = parseInt(idNumber.substr(8, 2), 10);
                    date = parseInt(idNumber.substr(10, 2), 10);

                    var birthday = new Date(year, month - 1, date);
                    if (birthday.getFullYear() !== year ||
                        birthday.getMonth() !== (month - 1) ||
                        birthday.getDate() !== date) {
                        return false;
                    }
                    //endregion

                    //region 产品经理要求15个1验证不通过
                    if (idNumber === "111111111111111") {
                        return false;
                    }
                    //endregion

                    return true;

                }

                var idNumber = value.toUpperCase();
                var size = idNumber.length;
                if (size === 18) {
                    return idCard18Test(idNumber);
                }
                if (size === 15) {
                    return idCard15Test(idNumber);
                }
                return false;

            },
            //中英文
            "chinese-and-english": function (value, $element) {
                return chineseAndEnglishRegExp.test(value);
            },
            //中文
            chinese: function (value, $element) {
                return chineseRegExp.test(value);
            },
            //英文
            english: function (value, $element) {
                return englishRegExp.test(value);
            },
            //中国大陆手机号
            mobile: function (value, $element) {
                return phoneRegExp.test(value);
            },
            //中国大陆邮政编码
            zip: function (value, $element) {
                return zipRegExp.test(value);
            }
        },

        //复杂验证方法
        complexMethods: {
            //护照
            "pass-port-name": function (value, $element) {
                if (/^([a-zA-Z])+\/+([a-zA-Z])+$/.test(value)) {
                    return true;
                }

                if (!chineseAndEnglishRegExp.test(value)) {
                    return '姓名只能包含汉字、字母和空格，请重新输入';
                }

                if (englishRegExp.test(value)) {
                    return '英文姓名请用“/”分割';
                }

                return true;
            }
        },
        //添加验证方法
        addMethod: function (name, method) {
            this.complexMethods[name] = method;
        }

    };

    nova.validate = Factory;
    window.nova = nova;

    for (var c in Validate) {
        if (typeof Validate[c] === "function") {
            Factory[c] = Validate[c]
        }
    }

})(window, jQuery, window.nova || {});
