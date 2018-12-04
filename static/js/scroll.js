/**
 * Created by twili on 16/12/23.
 */

var $scrollWrap = $(".scroll-wrap");


var $scrollable = $(".scrollable");


var $horizontalScrollBar = $(".horizontal-scroll-bar");
var $horizontalScrollThumb = $(".horizontal-scroll-thumb");


var $verticalScrollBar = $(".vertical-scroll-bar");
var $verticalScrollThumb = $(".vertical-scroll-thumb");


var $document = $(document);
(function bindMouseScrollEvent() {
    var Sys = {}, s, ua = navigator.userAgent.toLowerCase();
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    if (Sys.ie) {
        $scrollWrap[0].attachEvent('onmousewheel', mouseWheelHandler);
    } else {
        $scrollWrap[0].addEventListener('mousewheel', mouseWheelHandler);
        $scrollWrap[0].addEventListener("DOMMouseScroll", mouseWheelHandler);
    }
}());

function mouseWheelHandler(e) {
    if (!e.preventDefault)
        e.returnValue = false;
    else
        e.preventDefault();
    e = e || window.event;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    switch (delta) {
        case 1:
            move(1);
            break;
        case -1:
            move(-1);
            break;
    }
}

function move(up,step) {
    step = step || 50;

    var top = parseInt($scrollable.css("top"));

    var height = $scrollable.height();
    var wrapHeight = $scrollWrap.height();
    var proportion = height / wrapHeight;

    if (up !== 1) {

        top -= step;
    } else {
        top += step;
    }

    if (height - wrapHeight < -top) {
        top = -(height - wrapHeight)
    }

    var thumbTop = -top / proportion;

    if (top > 0) {
        top = 0;
    }

    if (thumbTop < 0) {
        thumbTop = 0;
    }

    $verticalScrollThumb.css("top", thumbTop);
    $scrollable.css("top", top);
}
