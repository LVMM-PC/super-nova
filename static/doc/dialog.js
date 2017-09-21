/**
 * Created by twili on 16/11/03.
 */

$(function () {

    $("#alert").on("click", function () {
        nova.alert("实现一个alert的模态提醒", function () {
            console.log("OK");
        })
    });

    $("#msg").on("click", function () {
        nova.msg("保存成功", 2000);
    });

    $("#confirm").on("click", function () {
        nova.confirm(
            "你再也不相信爱情了么？",
            function () {
                nova.alert("相信");
            },
            function () {
                nova.alert("不相信");
            }
        );
    });

    $(document).on("click", ".JS_tr_del", function () {
        var $this = $(this);
        var $tr = $this.parents("tr").first();

        nova.confirm(
            "删除操作不可恢复，你确定要删除此信息？",
            function () {
                $tr.remove();
            }, function () {

            }
        );

    });

    $(document).on("click", ".JS_tr_add", function () {
        var $tr = $('<tr>' +
            '<td>这是一条信息</td>' +
            '<td><span class="btn btn-sm JS_tr_del">删除</span></td>' +
            '</tr>');
        $("#table").find("tbody").append($tr);
    });

    $(".JS_loading_it").on("click", function () {
        var loading = nova.loading('<div class="nova-dialog-body-loading"><i></i><br>正在加载中...</div>');
        loading.showClose(true);
    });

    $(".JS_loading_top").on("click", function () {
        var loading = top.nova.loading('<div class="nova-dialog-body-loading"><i></i><br>正在加载中...</div>');
        loading.showClose(true);
    });

    $(".JS_dialog_title_content").on("click", function () {
        nova.dialog({
            title: "自定义标题<small>副标题</small>",
            content: "标准模式，可以自定义提醒标题和内容，默认不显示确定 取消的按钮",
            maskClass:"try"
        });
    });

    $(".JS_dialog_no_title").on("click", function () {
        nova.dialog({
            title: null,
            content: "标准模式，可以自定义提醒标题和内容",
            maskClass:"try",
            okCallback:true,
            cancelCallback:true
        });
    });

    $(".JS_dialog_button").on("click", function () {
        nova.dialog({
            content: "显示弹窗按钮，若未指定按钮的回调函数，则默认关闭",
            okCallback: true,
            cancelCallback: true
        });
    });

    $(".JS_dialog_height_overflow").on("click", function () {
        nova.dialog({
            content: '弹窗内容过高，超过浏览器窗口高度时，弹窗变化为跟随滚动条滚动。N多换行后，再高的内容，我也能看到内容最下面的部分<div style="margin-top: 3800px;">42</div>',
            width: 400,
            height: 4000
        })
    });

    $(".JS_dialog_dom").on("click", function () {
        nova.dialog({
            content: $("#elemBack"),
            contentClone: false,
            zIndex: 50
        })
    });

    $("#testbtn").click(function () {
        //nova.alert("您点击激活了原绑定事件");
        nova.dialog({
            content: "您点击激活了原绑定事件",
            zIndex: 100
        })
    });

    $(".JS_dialog_btn").on("click", function () {
        nova.dialog({
            content: "显示弹窗按钮，实现按钮文字自定义，绑定特定按钮点击事件",
            okCallback: function () {
                console.log("save")
                nova.msg("保存成功");
            },
            okClassName: "btn-pink",
            okText: "保存修改",
            cancelCallback: true,
            cancelText: "不保存"
        });
    });

    $(".JS_dialog_rewrite").on("click", function () {
        var count = 0;
        nova.dialog({
            content: "点击“重写提示”按钮，将使用链式操作重写弹窗的提醒内容！",
            okText: "重写提示",
            okCallback: function () {
                this.title("警告");
                this.content("重写该弹窗提示内容，在回调函数使用return false 不会关闭当前弹出框<br>" + (count)++ + " Click!<br>" + Math.random());
                this.resize();
                return false;
            },
            cancelText: "关闭",
            cancelCallback: true
        });
    });

    $(".JS_dialog_btn_group").on("click", function () {
        var count = 0;
        nova.dialog({
            content: '<h4>您对模态窗口满意吗？</h4>' +
            '<p>说明：使用模态窗口，能实现全站的弹窗统一，外观能够控制，方便修改，功能上也可定制，实在是统一网页设计弹窗的必备武器！</p>',
            buttons: [
                {
                    text: "非常满意",
                    className: "btn-pink",
                    callback: function () {
                        nova.msg("感谢你的选择", 2000);
                    }
                },
                {
                    text: "一般满意",
                    className: "btn-blue",
                    callback: function () {
                        nova.msg("我也同意你的看法", 2000);
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

    $(".JS_dialog_auto").on("click", function () {
        nova.dialog({
            content: $(".dialog-auto"),
            topFixed: true,
            topOffset: 60
        });
    });

    $(document).on("click", ".dialog-auto .tab", function () {
        var $this = $(this);
        var index = $this.index();
        var $auto = $this.parents(".dialog-auto").first();
        var $pane = $auto.find(".pane");
        $this.addClass("active").siblings().removeClass("active");
        $pane.eq(index).addClass("active").siblings().removeClass("active");
    })

    $(".JS_dialog_ajax_load").on("click", function () {
        nova.dialog({
            width: 600,
            wrapClass: "nova-dialog-custom",
            initCallback: function () {
                var self = this;
                self.loading();
                $.ajax({
                    url: "dialog/dialog-ajax.html",
                    dataType: "html"
                }).done(function (html) {

                    setTimeout(function () {
                        self.content(html);
                        self.resize();
                    }, 500);

                }).fail(function (err) {
                    self.content("加载失败");
                });
            }
        });
    });

    $(".JS_dialog_ajax_save").on("click", function () {
        var self = this;
        $.ajax({
            url: "dialog/dialog-ajax.html",
            dataType: "html"
        }).done(function () {
            setTimeout(function () {
                nova.msg("保存成功");
            }, 200);
        }).fail(function () {
            setTimeout(function () {
                nova.msg("保存失败");
            }, 200);
        });
    });

    $(".JS_dialog_iframe_load").on("click", function () {
        nova.dialog({
            url: true,
            content: "components/dialog/iframe",
            width: 600,
            //height: 300,
            initHeight: 400
        });
    });

    $(".JS_dialog_initialize").on("click", function () {
        nova.dialog({
            content: "弹窗未初始化完成",
            initCallback: function () {
                this.content("弹窗初始化完成");
            }
        });
    });

    $(".JS_dialog_beforeunload").on("click", function () {
        nova.dialog({
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
                nova.confirm("关闭后会导致数据丢失，是否确认关闭？", function () {
                    self.close(true);  //强制关闭弹窗
                });
                return false;
            }
        });
    });

        // var winHeight = $(window).height();
        // //console.log(winHeight);
        // nova.dialog({
        //     //url: true,
        //     content:"./change_hotel.html",
        //     //wrapClass:"hotel-dialog",
        //     title:"更换酒店",
        //     width:960,
        //     //initHeight: winHeight-38,  //iframe高度
        //     height: winHeight,
        //     //fixed: true,
        //
        //     zIndex:17
        // })



});
