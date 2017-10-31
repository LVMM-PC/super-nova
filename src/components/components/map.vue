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
    <pre class="mt10"><code class="css">
/* 默认地标覆盖物CSS */
.map_icon{ display: inline-block; background:url(http://pic.lvmama.com/img/detail/hotel/main/hotel_map.png) no-repeat 9999px 9999px;}
.map_tip_box{ position: absolute; z-index: 8;height: 1px; }
.map_tip_box .map_icon_position{ position: absolute; font-size: 14px; text-align: center; line-height: 22px; color: #000; left:-15px; bottom: -2px; width:30px; height:41px; background-position:-27px -51px; cursor: pointer; z-index: 2; font-size:16px;}
.map_tip_box p{ position: absolute; left: 0; bottom: 7px;  text-overflow:ellipsis; white-space:nowrap; display: block; padding:0 10px 0 20px; height: 30px; line-height: 30px; border-radius:0 15px 15px 0; border:#999 solid 1px; color: #333; background-color: #fff; font-size: 14px; font-weight: bold;  box-shadow: 1px 1px 5px #aaa;}
    </code></pre>

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
var detailMap = nova.map({
    mapType : 'baidu', //baidu、google，目前只支持baidu
    mapID : null, //地图渲染ID

    pointData : [
        {
            title:'北京天安门', //地点名称
            point:{"lng":116.404,"lat":39.915}, //经纬度信息
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

});

detailMap.overlayLine(data); //添加自定义覆盖物，data为覆盖物信息，具体用法参见3.2

detailMap.moveTo(point); //平移视角，point对象示例：{"lng":122.43,"lat":32.04}
detailMap.moveCenter(); //平移视角到所有覆盖物的中央，并把地图比例调整到最佳大小。
detailMap.clearOverlays(); //清除地图覆盖物

detailMap.setZoom(size); //设置地图比例,4-20

detailMap.getZoom(); //获取地图当前缩放比例
detailMap.getCenter(); //获取当前地图中心点的经纬度
detailMap.getDistance(startPoint,endPoint); //获取两个经纬度之间的距离


detailMap.options.scrollWheelZoom = false; //开启或关闭滚轮缩放


</code></pre>

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
        {title:'北京天安门', point:{"lng":116.404,"lat":39.915}, number:'1'},
        {title:'北京动物园', point:{"lng":116.344,"lat":39.947}, number:'2'},
        {title:'北京大学', point:{"lng":116.317,"lat":39.998}, number:'3'}
    ], //经纬度数组,可默认渲染多个地点覆盖物
    fullViewport : true, //所有覆盖物是否在一屏显示，默认以第一个坐标点为中心显示

    pointLine : true, //是否连线
    pointLineColor : '#F00', //连线的颜色
    zoom : 14 //地图的缩放等级,4-20

});</code></pre>

    </div>


    <ih3 :model="{value: '3、周边信息检索'}"></ih3>
    <h4>3.1 获取检索结果</h4>
    <div class="section">
    <!-- 地图渲染 -->
      <pre><code>
// 初始化地图
var detailMap = nova.map({
    mapID : 'detail_map3', //地图渲染ID
    pointData : [
        {title:'北京天安门', point:{"lng":116.404,"lat":39.915}, number:''}
    ]
});

//地图周边检索
detailMap.search({
    keyArr : ['公交站'], //检索的关键词，可同时检索多个关键词
    'distance' : '3000', //设置检索范围（单位：米），检索范围默认为5公里，机场长途汽车站默认为100公里
    searchCallback : function(data){ 
        
        console.log(data); //检索的结果数据

    }
});


</code></pre>

    </div>

    <h4>3.2 根据检索结果渲染覆盖物</h4>
    <div class="map_detail_all">
        <div class="detail_map" id="detail_map3" style="margin-right:300px;"></div>
        <div class="map_list" style="position:absolute; right:0; top:0; width:300px;"></div>
    </div>
    <div class="section">
<pre><code>

var trafficHtml = '',
	pointData = [];

//循环搜索的数据
for (var i = 0; i < data.length; i++) {
    //搜索结果列表渲染
    trafficHtml += '&lt;li point="'+data[i].point.lng+','+data[i].point.lat+'">&lt;span>'+(data[i].distance/1000).toFixed(1)+' 公里&lt;/span>&lt;dfn>'+(i+1)+'&lt;/dfn>&lt;p>'+data[i].title+'&lt;/p>&lt;/li>';
    //经纬度信息存储
    pointData.push({'title':data[i].title,point:data[i].point,number:(i+1)}); //经纬度数据，包含地点名、经纬度、序号
};

//添加列表
 $('.map_list').html(trafficHtml);

//添加覆盖物
detailMap.overlayLine({
    pointData: pointData, //经纬度数据，
    className : "map_tip_box2", //自定义覆盖物的className
    template : '&lt;span class="map_icon map_icon_position">{ {number}}&lt;/span>'
            + '&lt;p>{ {title}}&lt;span class="map_icon map_icon_arrow_b">&lt;/span>&lt;/p>' //自定义覆盖物的内容模板
});

//hover覆盖物地标，出现标题内容。可以针对className下的p标签做hover样式为 display: block;
.map_tip_box2:hover p{ display: block; }

</code></pre>
</div>

<h4>3.3 搜索结果和地图关联</h4>

<div class="section">
<pre><code>
 $(document).on('mouseover','.map_list li',function(e){
    e.preventDefault();
    e.stopPropagation();
    var num = $(this).index(),
        point = $(this).attr('point').split(','),
        $thisTip = $('.map_tip_box2').eq(num);
    //显示对应的地图覆盖物的内容
    $thisTip.css('z-index',999).find('p').show();
    //移动窗口到对应的位置
    detailMap.moveTo({'lng':point[0],'lat':point[1]});
    
    setTimeout(function(){
        $thisTip.css('z-index',999);
    },500);
});

$(document).on('mouseout','.map_list li',function(e){
    var num = $(this).index(),
        $thisTip = $('.map_tip_box2').eq(num),
        thisIndex = $thisTip.attr('data-zIndex');
    $thisTip.css('z-index',thisIndex).find('p').hide();
});
</code></pre>

</div>

    <ih3 :model="{value: '4、交通线路查询渲染'}"></ih3>

    <h4>4.1 公交线路查询</h4>
    <div class="map_detail_all">
        <div class="detail_map" id="detail_map4" style="margin-right:300px;"></div>
        <div class="map_list2" id="map_list2" style="position:absolute; right:0; top:0; width:300px; height:400px; overflow-y: auto;"></div>
    </div>
    <div class="section">
<pre><code>
//查询公交路线
detailMap2.transit({
    id : 'map_list2', //交通详情Html渲染的位置
    start : '天安门广场', //开始地点
    end : '北京大学', //目的地
    num : 0 //查询类型,0:时间最少，1：换乘最少，2：步行最少，3：不乘地铁。
});

</code></pre>

    </div>


    <h4>4.2 驾车线路查询</h4>
    <div class="map_detail_all">
        <div class="detail_map" id="detail_map5" style="margin-right:300px;"></div>
        <div class="map_list2" id="car_info_detail" style="position:absolute; right:0; top:0; width:300px; height:400px; overflow-y: auto;"></div>
    </div>
    <div class="section">
<pre><code>

//驾车路线
detailMap2.driving({
    id : 'car_info_detail', //交通详情Html渲染的位置
    start : '天安门广场', //开始地点
    end : '北京大学' //目的地
});

</code></pre>

    </div>


    <h4>4.3 步行线路查询</h4>
    <div class="map_detail_all">
        <div class="detail_map" id="detail_map6" style="margin-right:300px;"></div>
        <div class="map_list2" id="walk_info_detail" style="position:absolute; right:0; top:0; width:300px; height:400px; overflow-y: auto;"></div>
    </div>
    <div class="section">
<pre><code>

//步行路线
detailMap2.walking({
    id : 'walk_info_detail', //交通详情Html渲染的位置
    start : '天安门广场', //开始地点
    end : '北京大学' //目的地
});

</code></pre>

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
.detail_map{ width:70%; height:500px; background-color:#ddd;}

.map_detail_all{ position:relative;}
.map_detail_all .detail_map{ width:auto;}

  /* 地图自定义覆盖物 */
.map_tip_box,.map_tip_box2{ position: absolute; z-index: 8;height: 1px; }
.map_tip_box .map_icon_position,.map_tip_box2 .map_icon_position{ position: absolute; font-size: 14px; text-align: center; line-height: 22px; color: #000; left:-15px; bottom: -2px; width:30px; height:41px; background-position:-27px -51px; cursor: pointer; z-index: 2; font-size:16px;}
.map_tip_box p{ margin:0 !important; position: absolute; left: 0; bottom: 7px;  text-overflow:ellipsis; white-space:nowrap; display: block; padding:0 10px 0 20px; height: 30px; line-height: 30px; border-radius:0 15px 15px 0; border:#999 solid 1px; color: #333; background-color: #fff; font-size: 14px; font-weight: bold;  box-shadow: 1px 1px 5px #aaa;}
.map_tip_box2 .map_icon_position{ width: 22px; height: 30px; left: -11px; background-position:0px -51px; color:#fff; font-size:14px;}

.map_tip_box2 p{ margin:0 !important; position: absolute; left:-60px; bottom: 35px; min-width: 100px; background-color: #fff; border:#999 solid 1px; font-size: 14px; color: #333; height: 30px; line-height: 30px; padding: 0 10px; border-radius: 4px; white-space:nowrap; box-shadow: 0 2px 10px #bbb; text-align: center; display: none; z-index: 3;}
.map_tip_box2:hover p{ display: block; }

.map_icon_arrow_b{ background-position: -186px -21px; position: absolute; left: 55px; bottom: -8px; width: 11px; height: 8px; }

.map_list li{  position:relative; overflow:hidden; padding:5px 10px;}
.map_list li span{ position: absolute; right:0; top:5px; }
.map_list li *{ float:left; margin-right:10px;}
#everything .map_list li p,#everything .map_list2 li p{ margin:0;}

</style>
