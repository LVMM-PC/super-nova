/**
 * Created by twili on 16/11/03.
 */

$(function () {

  var isMapPage = $("#everything").is(".everything-map")
  if(!isMapPage){
    return false
  }

    nova.map({
        mapID : 'detail_map1'
    });



    nova.map({
        mapType : 'baidu', //baidu、google，目前只支持baidu
        mapID : 'detail_map2', //地图渲染ID

        pointData : [
            {title:'北京天安门', point:{"lng":116.404,"lat":39.915}, number:'1'},
            {title:'北京动物园', point:{"lng":116.344,"lat":39.947}, number:'2'},
            {title:'北京大学', point:{"lng":116.317,"lat":39.998}, number:'3'}
        ], //经纬度数组,可默认渲染多个地点覆盖物
        fullViewport : true, //所有覆盖物是否在一屏显示

        pointLine : true, //是否连线
        pointLineColor : '#f00', //连线的颜色


        scrollWheelZoom : true, //是否开启滚轮滑动
        showControl : true, //是否显示地图缩放、比例尺控件

        zIndex : 1, //地点覆盖物覆盖物层级
        zoom : 14 //地图的缩放等级,4-20

    });



    var detailMap = nova.map({
        mapID : 'detail_map3', //地图渲染ID
        pointData : [
            {title:'北京天安门', point:{"lng":116.404,"lat":39.915}, number:''}
        ]
    });

    detailMap.search({
        keyArr : ['公交站'],
        distance : 3000,
        searchCallback : function(data){

            var trafficHtml = '',
                pointData = [];
            //循环搜索的数据
            for (var i = 0; i < data.length; i++) {
                trafficHtml += '<li point="'+data[i].point.lng+','+data[i].point.lat+'"><span>'+(data[i].distance/1000).toFixed(1)+' 公里</span><dfn>'+(i+1)+'</dfn><p>'+data[i].title+'</p></li>';
                pointData.push({'title':data[i].title,point:data[i].point,number:(i+1)});
            };

            //添加列表
            $('.map_list').html(trafficHtml);

            //添加覆盖物
            detailMap.overlayLine({
                pointData: pointData, //经纬度数据，
                className : "map_tip_box2", //自定义覆盖物的className
                template : '<span class="map_icon map_icon_position">{{number}}</span><p>{{title}}<span class="map_icon map_icon_arrow_b"></span></p>' //自定义覆盖物的内容模板
            });

        }
    });




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




    var detailMap2 = nova.map({
        mapID : 'detail_map4', //地图渲染ID
        pointData : [
            {title:'北京天安门', point:{"lng":116.404,"lat":39.915}, number:''}
        ]
    });

    setTimeout(function(){
        //查询公交
        detailMap2.transit({
            id : 'map_list2',
            start : '天安门广场',
            end : '北京大学',
            num : 0 //查询类型,0:时间最少，1：换乘最少，2：步行最少，3：不乘地铁。
        });
    },1000);





    var detailMap3 = nova.map({
        mapID : 'detail_map5', //地图渲染ID
        pointData : [
            {title:'北京天安门', point:{"lng":116.404,"lat":39.915}, number:''}
        ]
    });

    

    setTimeout(function(){
        //查询驾车
        detailMap3.driving({
            id : 'car_info_detail',
            start : '天安门广场',
            end : '北京大学'
        });
    },1000);





    var detailMap4 = nova.map({
        mapID : 'detail_map6', //地图渲染ID
        pointData : [
            {title:'北京天安门', point:{"lng":116.404,"lat":39.915}, number:''}
        ]
    });


    setTimeout(function(){
        //查询步行
        detailMap4.walking({
            id : 'walk_info_detail',
            start : '天安门广场',
            end : '北京大学'
        });    
    },1000);
    

});
