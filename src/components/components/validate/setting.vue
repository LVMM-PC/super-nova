<template>

  <div id="everything">
    <ih1 :model="{value: 'Validate'}"></ih1>
<pre>
<code class="js">var myValidate = nova.validate({
    //验证规则
    rules: {
        ".JS_non_empty": {
            "required": true,
            "required-message": "非空校验，自定义报错内容。"
        },
        ".JS_pass_port_name": {
            "required": true,
            "required-message": "请输入姓名。",
            "pass-port-name": true
        },
        ".JS_chinese_and_english": {
            "chinese-and-english": true,
            "chinese-and-english-message": "请输入姓名。"
        },
        ".JS_chinese": {
            "required": true,
            "required-message": "请输入中文姓名。",
            "chinese": true,
            "chinese-message": "中文姓名只能包含汉字，请重新输入。"
        },
        ".JS_english": {
            "double-english": true
        },
        ".JS_mobile": {
            "required": true,
            "required-message": "请输入手机号码。",
            "minlength": 11,
            "minlength-message": "手机号码必须为11位的数字，请重新输入",
            "mobile": true
        },
        ".JS_email": {
            "required": true,
            "required-message": "请输入邮箱地址。",
            "email": true
        },
        ".JS_birthday": {
            "required": true,
            "required-message": "请选择出生日期。"
        },
        ".JS_address": {
            "required": true,
            "required-message": "请输入正确的详细地址。",
            "address": true
        },
        ".JS_zip_code": {
            "zip": true
        },
        ".JS_id_card": {
            "required": true,
            "required-message": "请输入证件号码。",
            "idcard": true
        }
    },
    //对组件进行扩展
    expandMethods: {
        //地址
        address: function (value, $element) {
            if ($('#js_city1').val() == '选择省' || $('#js_city2').val() == '选择市') {
                return '请选择省份、城市';
            }

            if (value == '' || value.length &lt; 5) {
                return '请输入正确的详细地址';
            }
            return true;
        },
        //英文双输入框
        "double-english": function (value, $element) {
            var $doubleEnglish = $element.parent().children(".JS_english");
            var englishMethod = this.methods.english;
            var isEnglish = true;

            if ($doubleEnglish.eq(0).val().length == 0 && $doubleEnglish.eq(1).val().length == 0) {
                return true;
            }

            for (var i = 0; i &lt; $doubleEnglish.length; i++) {
                var $english = $doubleEnglish.eq(i);
                var ret = englishMethod($english.val());
                if (!ret) {
                    isEnglish = "英文姓名只能包含字母，请重新输入。";
                }
            }
            return isEnglish;
        }
    },
    /**
     * 验证单个输入框回调方法
     * @param ret 输入框是否验证通过
     * @param val 输入框中的值
     * @param $input 输入框jQuery DOM对象
     * @param errorMessage 错误信息
     */
    validateCallback: function (ret, val, $input, errorMessage) {

        var $parent = $input.parent();
        var $tsText = $parent.find(".ts_text");
        var $errorText = $parent.find(".error_text");
        var $successText = $parent.find(".success_text");
        if ($successText.length &lt; 1) {
            $successText = $('&lt;span class="nova-tip-form success_text"&gt;&lt;span class="nova-icon-xs nova-icon-success"&gt;&lt;/span&gt;&lt;/span&gt;')
            $parent.append($successText)
        }

        if (ret) {
            $tsText.hide();
            $errorText.hide();
            $successText.css("display", "inline-block");
        } else {
            $successText.hide();
            $tsText.hide();
            $errorText.html('&lt;span class="nova-icon-xs nova-icon-error"&gt;&lt;/span&gt;' + errorMessage);
            $errorText.css("display", "inline-block");
        }

    }
});

$(".btn_fk").on("click", function () {

    //获取整个表单是否验证通过
    var validated = myValidate.getValidate();
    var $firstError = $(".nova-tip-form.error_text:visible:first");
    var $firstErrorInput = $firstError.siblings(":input");

    //滚动至错误处
    if ($firstErrorInput.length &gt; 0) {

        var top = $firstErrorInput.offset().top;
        $("html,body").stop(false, true).animate({
            "scrollTop": top
        }, 100, function () {
            $firstErrorInput.focus();
        });
    }

    console.log(validated);
});
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
