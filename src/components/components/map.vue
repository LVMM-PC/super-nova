<template>
  <div id="everything">

    <ih1 :model="{value: 'Map'}"></ih1>

    <ih2 :model="{value: '引用'}"></ih2>
    <div>
      <ul>
        <li>
          <a href="http://api.map.baidu.com/api?v=2.0&ak=i2ccGvMLyR86WI0YcodIe7Lu" target="_blank">http://api.map.baidu.com/api?v=2.0&ak=i2ccGvMLyR86WI0YcodIe7Lu</a>
        </li>
        <li>
          <a href="http://pic.lvmama.com/js/lv/map.js" target="_blank">http://pic.lvmama.com/min/index.php?f=/js/lv/map.js</a>
        </li>
      </ul>
    </div>

    <ih2 :model="{value: '预览'}"></ih2>
    <ih3 :model="{value: '默认渲染地图'}"></ih3>
    <section>
      <!-- 地图渲染 -->
	  <div class="detail_map" id="detail_map1"></div>
    </section>
    <pre class="mt10"><code class="html">
&lt;div class="detail_map" id="detail_map"&gt;&lt;/div&gt;
    </code></pre>

    <pre class="mt10"><code class="js">
nova.map({
    mapID : 'detail_map' //地图渲染位置
});
    </code></pre>

    <ih2 :model="{value: '配置调用'}"></ih2>

    <ih3 :model="{value: '1、默认配置参数'}"></ih3>
    <div class="section">

      <pre>
<code>
nova.map({
    mapType : 'baidu', //baidu、google，目前只支持baidu
    mapID : null, //地图渲染ID

    pointData : [
        {
            title:'北京天安门', //地点名称
            point:{"lng":116.404,"lat":39.905}, //经纬度信息
            number:'' //地标箭头的html内容
        }
    ], //经纬度数组,可默认渲染多个地点覆盖物
    fullViewport : false, //所有覆盖物是否在一屏显示

    pointLine : false, //是否连线
    pointLineColor : '#e38', //连线的颜色

    scrollWheelZoom : true, //是否开启滚轮滑动
    showControl : true, //是否显示地图缩放、比例尺控件

    zIndex : 1, //地点覆盖物覆盖物层级
    zoom : 12 //地图的缩放等级,4-20

});</code></pre>

    </div>



    <ih3 :model="{value: '2、覆盖物渲染示例'}"></ih3>
    <div class="section">
    <!-- 地图渲染 -->
	  <div class="detail_map" id="detail_map2"></div>

      <pre>
<code>
nova.map({
    mapType : 'baidu', //baidu、google，目前只支持baidu
    mapID : 'detail_map2', //地图渲染ID

    pointData : [
        {title:'北京天安门', point:{"lng":116.404,"lat":39.915}, number:''},
        {title:'北京动物园', point:{"lng":116.344,"lat":39.947}, number:''}
    ], //经纬度数组,可默认渲染多个地点覆盖物
    fullViewport : true, //所有覆盖物是否在一屏显示

    pointLine : true, //是否连线
    pointLineColor : '#F00', //连线的颜色
    zoom : 14 //地图的缩放等级,4-20

});</code></pre>

    </div>


    <ih3 :model="{value: '3、周边信息检索'}"></ih3>
    <div class="section">
    <!-- 地图渲染 -->
	  <div class="detail_map" id="detail_map3"></div>

      <pre>
<code>
var mapDetail = nova.map({
    mapID : 'detail_map3', //地图渲染ID
    pointData : [
        {title:'北京天安门', point:{"lng":116.404,"lat":39.915}, number:''}
    ] //经纬度数组,可默认渲染多个地点覆盖物
});</code></pre>

    </div>




  </div>
</template>

<script>
  import ih1 from '@/components/ih1'
  import ih2 from '@/components/ih2'
  import ih3 from '@/components/ih3'

  export default {
    name: 'dialog',
    components: {
      ih1,
      ih2,
      ih3
    }
  }

  require('script-loader!../../../static/js/map')
  require('script-loader!../../../static/doc/map')
</script>

<style lang="scss">

  @import "/static/assert/css/buttons.css";
  @import "/static/assert/css/dialog.css";

  input {
    border: 1px solid #CCC;
    line-height: 20px;
  }

  .mt10{ margin-top:10px;}

.map_icon{ display: inline-block; background:url(http://pic.lvmama.com/img/detail/hotel/main/hotel_map.png) no-repeat 9999px 9999px;}
  .detail_map{ width:100%; height:400px; background-color:#ddd;}

  /* 地图自定义覆盖物 */
.map_tip_box,.map_tip_box2{ position: absolute; z-index: 8;height: 1px; }
.map_tip_box .map_icon_position,.map_tip_box2 .map_icon_position{ position: absolute; font-size: 14px; text-align: center; line-height: 22px; color: #fff; left:-15px; bottom: -2px; width:30px; height:41px; background-position:-27px -51px; cursor: pointer; z-index: 2;}
.map_tip_box p{ margin:0 !important; position: absolute; left: 0; bottom: 7px;  text-overflow:ellipsis; white-space:nowrap; display: block; padding:0 10px 0 20px; height: 30px; line-height: 30px; border-radius:0 15px 15px 0; border:#999 solid 1px; color: #333; background-color: #fff; font-size: 14px; font-weight: bold;  box-shadow: 1px 1px 5px #aaa;}
.map_tip_box2 .map_icon_position{ width: 22px; height: 30px; left: -11px; background-position:0px -51px;}

.map_tip_box2 p{ margin:0 !important; position: absolute; left:-60px; bottom: 35px; min-width: 100px; background-color: #fff; border:#999 solid 1px; font-size: 14px; color: #333; height: 30px; line-height: 30px; padding: 0 10px; border-radius: 4px; white-space:nowrap; box-shadow: 0 2px 10px #bbb; text-align: center; display: none; z-index: 3;}
.map_tip_box2:hover p{ display: block; }

.map_icon_arrow_b{ background-position: -186px -21px; position: absolute; left: 55px; bottom: -8px; width: 11px; height: 8px; }
  

</style>
