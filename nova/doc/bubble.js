/**
 * Created by twili on 16/11/03.
 */

$(function () {

    $(".JS_bubble_title_content").on("click", function () {
        nova.bubble({
            $trigger: $(this),
            title: "自定义标题<small>副标题</small>",
            content: "标准模式，可以自定义提醒标题和内容，默认不显示确定 取消的按钮",
            maskClass:"try"
        });
    });

    $(".JS_bubble_no_title").on("click", function () {
        nova.bubble({
            $trigger: $(this),
            title: null,
            content: "标准模式，可以自定义提醒标题和内容",
            maskClass:"try",
            okCallback:true,
            cancelCallback:true
        });
    });

    $(".JS_bubble_button").on("click", function () {
        nova.bubble({
            $trigger: $(this),
            content: "显示弹窗按钮，若未指定按钮的回调函数，则默认关闭",
            okCallback: true,
            cancelCallback: true
        });
    });

    $(".JS_bubble_height_overflow").on("click", function () {
        nova.bubble({
            $trigger: $(this),
            content: '弹窗内容过高，超过浏览器窗口高度时，弹窗变化为跟随滚动条滚动。N多换行后，再高的内容，我也能看到内容最下面的部分<div style="margin-top: 3800px;">42</div>',
            width: 400,
            height: 4000
        })
    });

    $(".JS_bubble_dom").on("click", function () {
        nova.bubble({
            $trigger: $(this),
            content: $("#elemBack"),
            contentClone: false,
            zIndex: 50
        })
    });

    $("#testbtn").click(function () {
        //nova.alert("您点击激活了原绑定事件");
        nova.bubble({
            $trigger: $(this),
            content: "您点击激活了原绑定事件",
            zIndex: 100
        })
    });

    $(".JS_bubble_btn").on("click", function () {
        nova.bubble({
            $trigger: $(this),
            content: "显示弹窗按钮，实现按钮文字自定义，绑定特定按钮点击事件",
            okCallback: function () {
                console.log("save")
            },
            okClassName: "btn-pink",
            okText: "保存修改",
            cancelCallback: true,
            cancelText: "不保存"
        });
    });

    $(".JS_bubble_rewrite").on("click", function () {
        var count = 0;
        nova.bubble({
            $trigger: $(this),
            content: "点击“重写提示”按钮，将使用链式操作重写弹窗的提醒内容！",
            okText: "重写提示",
            okCallback: function () {
                this.title("警告");
                this.content("重写该弹窗提示内容，在回调函数使用return false 不会关闭当前弹出框<br>" + (count)++ + " Click!<br>" + Math.random());
                return false;
            },
            cancelText: "关闭",
            cancelCallback: true
        });
    });

    $(".JS_bubble_btn_group").on("click", function () {
        var count = 0;
        nova.bubble({
            $trigger: $(this),
            content: '<h4>您对模态窗口满意吗？</h4>' +
            '<p>说明：使用模态窗口，能实现全站的弹窗统一，外观能够控制，方便修改，功能上也可定制，实在是统一网页设计弹窗的必备武器！</p>',
            buttons: [
                {
                    text: "非常满意",
                    className: "btn-pink",
                    callback: function () {
                        console.log("感谢你的选择", 2000);
                    }
                },
                {
                    text: "一般满意",
                    className: "btn-blue",
                    callback: function () {
                        console.log("我也同意你的看法", 2000);
                    }
                },
                {
                    text: "不满意",
                    className: "btn-disabled",
                    callback: function () {
                        return false;
                    }
                }
            ]
        });
    });

    $(".JS_bubble_auto").on("click", function () {
        nova.bubble({
            $trigger: $(this),
            content: $(".bubble-auto"),
            topFixed: true,
            topOffset: 60
        });
    });

    $(document).on("click", ".bubble-auto .tab", function () {
        var $this = $(this);
        var index = $this.index();
        var $auto = $this.parents(".bubble-auto").first();
        var $pane = $auto.find(".pane");
        $this.addClass("active").siblings().removeClass("active");
        $pane.eq(index).addClass("active").siblings().removeClass("active");
    })

    $(".JS_bubble_ajax_load").on("click", function () {
        nova.bubble({
            $trigger: $(this),
            width: 600,
            wrapClass: "nova-bubble-custom",
            initCallback: function () {
                var self = this;
                self.loading();
                $.ajax({
                    url: "bubble/bubble-ajax.html",
                    dataType: "html"
                }).done(function (html) {

                    setTimeout(function () {
                        self.content(html);
                    }, 500);

                }).fail(function (err) {
                    self.content("加载失败");
                });
            }
        });
    });

    $(".JS_bubble_ajax_save").on("click", function () {
        var self = this;
        $.ajax({
            url: "bubble/bubble-ajax.html",
            dataType: "html"
        }).done(function () {
            setTimeout(function () {
                console.log("保存成功");
            }, 200);
        }).fail(function () {
            setTimeout(function () {
                console.log("保存失败");
            }, 200);
        });
    });

    $(".JS_bubble_initialize").on("click", function () {
        nova.bubble({
            $trigger: $(this),
            content: "弹窗未初始化完成",
            initCallback: function () {
                this.content("弹窗初始化完成");
            }
        });
    });

    $(".JS_bubble_beforeunload").on("click", function () {
        var before = nova.bubble({
            $trigger: $(this),
            height: 300,
            title: "关闭对话框前执行方法",
            content: "User Name: <input type='text' value='em2046'><br><br>用户填写了信息但未保存，提醒用户是否保存<br/><br/><br/><br/><br/>",
            okCallback: true,
            okText: "关闭",
            okClassName: "btn",
            cancelCallback: function () {
                this.close(true);
                return false;
            },
            cancelText: "强制关闭",
            cancelClassName: "btn-pink",
            beforeClosingCallback: function () {
                var self = this;

                var $btn = this.wrap.find(".nova-bubble-footer .btn").eq(0);
                nova.bubble({
                    $trigger: $btn,
                    content: "确定关闭吗",
                    okCallback: function () {
                        self.close(true)
                    },
                    cancelCallback: function () {

                    }
                })

                return false;
            }
        });
    });

});
