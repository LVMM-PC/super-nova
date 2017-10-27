/**
 * Created by twili on 16/11/03.
 */

$(function () {

    nova.map({
        mapID : 'detail_map1'
    });



    nova.map({
        mapType : 'baidu', //baidu、google，目前只支持baidu
        mapID : 'detail_map2', //地图渲染ID

        pointData : [
            {title:'北京天安门', point:{"lng":116.404,"lat":39.915}, number:''},
            {title:'北京动物园', point:{"lng":116.344,"lat":39.947}, number:''}
        ], //经纬度数组,可默认渲染多个地点覆盖物
        fullViewport : true, //所有覆盖物是否在一屏显示

        pointLine : true, //是否连线
        pointLineColor : '#f00', //连线的颜色


        scrollWheelZoom : true, //是否开启滚轮滑动
        showControl : true, //是否显示地图缩放、比例尺控件

        zIndex : 1, //地点覆盖物覆盖物层级
        zoom : 14 //地图的缩放等级,4-20

    });


});
