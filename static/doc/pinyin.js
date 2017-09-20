/**
 * author: Yin Han
 * date: 2017-07-17
 */
$(function () {
    var $document = $(document);
    var $body = $("body");
    var py = novaPinyin();
    var ui = nova.ui();
    var $result = $(".pinyin-result");
    var $polyphoneResult = $(".pinyin-polyphone-result");
    var $fuxingResult = $(".fuxing-result");
    var $xingResult = $(".xing-result");
    var $mingResult = $(".ming-result");

    /**
     * 替换匹配的内容
     * @param str
     * @param obj
     * @returns {*}
     */
    function replaceWith(str, obj) {
        for (var i in obj) {
            str = str.replace(new RegExp("{{" + i + "}}", 'g'), obj[i]);
        }
        return str;
    }

    // 汉字转拼音：不支持多音字
    $(".pinyin-input").on("input", function () {
        var result = py.getPinyin($(this).val()) || "请输入正确的汉字";
        $result.html(result);
    })

    // 汉字转拼音：支持多音字
    $(".pinyin-polyphone-input").on("input", function () {
        var result = py.getPinyin($(this).val(), {
            isPolyphone: true
        });
        result = result.length ? JSON.stringify(result) : "请输入正确的汉字";
        $polyphoneResult.html(result);
    })

    // 复姓测试
    $(".fuxing-input").on("input", function () {
        var inputValue = $.trim($(this).val());
        var result = "请输入正确的汉字姓名";
        if (inputValue) {
            result = py.getFuxingPinyin(inputValue);
            result = result ? "复姓：" + result : "单姓"
        }
        $fuxingResult.html(result);
    })

    // 姓名转拼音
    $(".name-input").on("input", function () {
        $(".pinyin-select-part").remove();
        var inputValue = $.trim($(this).val());
        var lastName = inputValue.slice(0, 2);
        var firstName = inputValue.slice(2, length);
        var length = inputValue.length;
        var fuxingResult = py.getFuxingPinyin(inputValue);
        // 测试是否为复姓
        if (fuxingResult) {
            $xingResult.val(fuxingResult);
        } else {
            lastName = inputValue.slice(0, 1);
            firstName = inputValue.slice(1, length);
            handlePolyphone(lastName, $xingResult);
        }
        handlePolyphone(firstName, $mingResult);
    })

    // 显示拼音选择框
    $(".xing-result, .ming-result").on("focus", function (e) {
        $(".pinyin-select-part").hide();
        var $this = $(this);
        var $selectPart = $this.data("py");
        if ($selectPart) {
            var thisL = $this.offset().left,
                thisT = $this.offset().top,
                thisH = $this.outerHeight(true);

            $selectPart.show().css({
                'left': thisL,
                'top': thisT + thisH
            });
        }
    }).on("click", function (e) {
        e.stopPropagation();
    })

    $document.on("click", function () {
        $(".pinyin-select-part").hide();
    })

    $document.on("click", ".pinyin-select-part", function (e) {
        e.stopPropagation();
    })

    $document.on("change", ".pinyin-select-part input[type='radio']", function () {
        var $this = $(this);
        var $thisSelectPart = $this.parents(".pinyin-select-part");
        var $pinyinList = $thisSelectPart.find("dl");
        var isAllSelectedFlag = true;
        var result = "";
        // 判断是否每个都已选
        $pinyinList.each(function (index, ele) {
            var $selectCheckedRadio = $(ele).find("input[type='radio']:checked");
            if ($selectCheckedRadio.length === 0) {
                isAllSelectedFlag = false;
            } else {
                result += $selectCheckedRadio.val();
            }
        })
        if (isAllSelectedFlag) {
            $thisSelectPart.data("py").val(result);
            $thisSelectPart.remove();
        }
    })

    function handlePolyphone(chinese, $element) {
        var isPolyphone = false;
        var pinyinArr = py.getPinyin(chinese, {
            isPolyphone: true
        });
        outPoint:
            for (var i = 0, len = pinyinArr.length; i < len; i++) {
                var obj = pinyinArr[i];
                for (var j in obj) {
                    if (obj[j].indexOf(",") != -1) {
                        isPolyphone = true;
                        break outPoint;
                    }
                }
            }
        if (isPolyphone) {
            $element.val("");
            var $selectPart = $(generateHtml(pinyinArr))
            var $oldSelectPart = $element.data("py");
            $oldSelectPart && $oldSelectPart.remove();
            $body.append($selectPart);
            ui.render();
            $element.data("py", $selectPart);
            $selectPart.data("py", $element);
        } else {
            $element.val(py.getPinyin(chinese, {
                separator: ""
            }));
        }
    }

    // 生成选择框dom结构
    function generateHtml(pinyinArr) {
        var html = "<div class='pinyin-select-part'>";
        var template = "<label class='nova-radio-label'><input type='radio' name='{{chinese}}' value='{{pinyin}}' {{checked}}>{{pinyin}}</label>";
        for (var i = 0, len = pinyinArr.length; i < len; i++) {
            var obj = pinyinArr[i];
            for (var j in obj) {
                var checked = "";
                var pArr = obj[j].split(",");
                html += "<dl><dt>" + j + "</dt><dd class='nova-radio-group'>";
                if (pArr.length === 1) {
                    checked = "checked";
                }
                for (var k = 0; k < pArr.length; k++) {
                    html += replaceWith(template, {
                        pinyin: pArr[k],
                        chinese: j,
                        checked: checked
                    });
                }
                html += "</dd></dl>";
            }
        }
        return (html + "</div>");
    }
})
