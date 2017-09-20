"use strict";

$(function () {

    var $document = $(document);

    var $headers = $("#everything>:header,#everything>section>:header");
    var $navigation = $('<div class="navigation"><span class="close">x</span><div class="links"></div></div>');
    var $links = $navigation.find(".links");

    $("body").append($navigation);
    var size = $headers.length;
    var $tempA;
    for (var i = 0; i < size; i++) {
        var $header = $headers.eq(i);
        $header.data("header-index", i);
        var tagName = $header.get(0).tagName.toLocaleLowerCase();
        $tempA = $('<a class="' + tagName + '">' + $header.html() + '</a>');
        $links.append($tempA)
    }

    $document.on("click", ".navigation>.close", function () {
        $(".navigation").remove();
    });

    $document.on("click", ".links>a", function () {
        var $this = $(this);
        var index = $this.index();
        var $header = $headers.eq(index);
        var top = $header.offset().top;
        $("html,body").stop().animate({
            "scrollTop": top
        }, 200);
    });

    $document.on("mouseenter", ".links>a", function () {
        var $this = $(this);
        var index = $this.index();
        $headers.removeClass("hover");
        var $header = $headers.eq(index);
        $header.addClass("hover");
    });

    $document.on("mouseleave", ".links>a", function () {
        $headers.removeClass("hover");
    });

    // try {
    //     $('pre code').each(function (i, block) {
    //         hljs.highlightBlock(block);
    //     });
    // } catch (e) {
    //     console.log(e);
    // }

});

// var duoshuoQuery = {short_name: "em2046"};
// (function () {
//     var ds = document.createElement('script');
//     ds.type = 'text/javascript';
//     ds.async = true;
//     ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
//     ds.charset = 'UTF-8';
//     (document.getElementsByTagName('head')[0]
//     || document.getElementsByTagName('body')[0]).appendChild(ds);
// })();
