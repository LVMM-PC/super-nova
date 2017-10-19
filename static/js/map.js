/*!
 * map.js
 * 2017-10-11
 * 安云
 * 1.0.0.0
 */

//驴妈妈地图组件
(function(window,$,nova){

    "use strict";

    var defalt = {
        mapType : 'baidu',
        mapID : null,
        number : '',
        pointData : null,
        pointLine : false,
        scrollWheelZoom : true,
        showControl : true,
        zIndex : 1,
        zoom : 12

    };

    //创建新的对象
    function Factory(options){
        //合并参数
        options = $.extend({}, defalt, options);
        //构造新的地图对象
        return new webMap(options);
    }

    //地图对象
    function webMap(options){
        this.init(options);
    };

    webMap.prototype = {
        constructor : webMap,
        init : function(options){
            //共享参数
            this.options = options;

            if (options.mapType == 'baidu') {
                this.baidu();
            }else{
                this.google(options.point.lng,options.point.lat);
            };
            
            
        },
        //百度地图
        baidu:function(){
            var options = this.options,
                centerData = options.pointData[0],
                firstPoint = centerData.point;
            this.centerData = centerData;
            // 百度地图API功能
            this.map = new BMap.Map(options.mapID);
            this.point = new BMap.Point(firstPoint.lng,firstPoint.lat);
            this.map.centerAndZoom(this.point, options.zoom);

            if (options.scrollWheelZoom) {
                this.map.enableScrollWheelZoom(true);
            };
            
            //显示缩放控件
            if (options.showControl) {
                this.map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));        
                this.map.addControl(new BMap.NavigationControl());     
                this.map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));
            };

            //添加默认调用的酒店覆盖物
            this.defaltOverlay();


        },
        //google地图
        google:function(){
            console.log('组件暂不支持谷歌地图！');
        },
        //地图周边搜索接口，参数1：搜索关键词数组，参数2：回调函数，参数3：数据查找半径（单位米）
        search:function(data){
            var map = this.map,
                self = this,
                resultArr = [],
                searchNum = 0;

            var options = {
                onSearchComplete: function(results){
                    // 判断状态是否正确
                    if (local.getStatus() == BMAP_STATUS_SUCCESS){
                        //循环检索的数据
                        for (var i = 0; i < results.getCurrentNumPois(); i ++){
                            var thisData = results.getPoi(i),
                                tags = thisData.tags;

                            //检索的数据筛选出真正的机场、火车站、汽车站数据
                            if (/机场/.test(results.keyword) || /车站/.test(results.keyword)) {
                                if ( tags && tags.length && /机场/.test(tags.join(',')) ) {
                                    resultArr.push(thisData);
                                }else if( /火车站/.test(results.keyword) && tags && tags.length && /火车站/.test(tags.join(',')) ){
                                    resultArr.push(thisData);
                                }else if( /汽车站/.test(results.keyword) && tags && tags.length && /汽车站/.test(tags.join(',')) ){
                                    resultArr.push(thisData);
                                };  
                            }else{ //其他检索
                                resultArr.push(thisData);
                            };
                            
                        };

                        searchNum++;
                        //检索结果会添加到搜索对象中
                        if (typeof data.searchCallback == 'function' && searchNum == data.keyArr.length) {
                            //根据经纬度计算距离
                            resultArr.sort(function(a,b){
                                var aDistance = map.getDistance(self.point,a.point),
                                    bDistance = map.getDistance(self.point,b.point);
                                a.distance = aDistance;
                                b.distance = bDistance;
                                return aDistance - bDistance;
                            });
                            //执行回调,传回检索数据
                            data.searchCallback(resultArr);
                        };
                    };
                }
            };

            //调用搜索接口
            var local = new BMap.LocalSearch(map, options);


            //搜索多个关键字
            if (!data.distance) {
                data.distance = 5000;//默认5公里范围内
            };
            for (var i = 0; i < data.keyArr.length; i++) {
                //local.search(keyArr[i]);//普通检索
                if ( /车站|机场/.test(data.keyArr.join(',')) ) {
                    data.distance  =  100000; //机场车站为100公里范围内
                };
                //范围检索
                local.searchNearby(data.keyArr[i],this.point,data.distance);
            };
            
            

        },
        //公交线路
        transit : function(data){
            var map = this.map;
            var routePolicy = [BMAP_TRANSIT_POLICY_LEAST_TIME,BMAP_TRANSIT_POLICY_LEAST_TRANSFER,BMAP_TRANSIT_POLICY_LEAST_WALKING,BMAP_TRANSIT_POLICY_AVOID_SUBWAYS];

            //加载中
            $('#'+data.id).html('<div class="map_loading"><img src="http://pic.lvmama.com/img/new_v/ui_scrollLoading/loading.gif" alt="" /></div>');
            
            var transit = new BMap.TransitRoute(map, {
                renderOptions: {map: map, panel: data.id}
            });

            //清除覆盖物
            map.clearOverlays(); 
            
            //设置公交筛选条件
            if ( !data.num && data.num!=0 ) {
                data.num = 0; //默认为时间最少
            };
            transit.setPolicy(routePolicy[data.num]);

            //搜索线路
            transit.search(data.start, data.end);


        },
        //id：驾车路线详情渲染的位置，start：开始地点，end：结束地点
        driving:function(data){ 
            var map = this.map;
            var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map, panel: data.id , autoViewport: true}});
            //清除覆盖物
            map.clearOverlays(); 
            //搜索线路
            driving.search(data.start, data.end);
        },
        //id：步行路线详情渲染的位置，start：开始地点，end：结束地点
        walking:function(data){ 
            var map = this.map;
            var walking = new BMap.WalkingRoute(map, {renderOptions: {map: map, panel: data.id, autoViewport: true}});
            //清除覆盖物
            map.clearOverlays();
            //搜索线路
            walking.search(data.start, data.end);
        },
        // 创建复杂的自定义覆盖物,point：经纬度对象，num：覆盖物序号,content:覆盖物内容，className：覆盖物class
        overlay:function(data){ 
            var oldData = {
                template : '<span class="map_icon map_icon_position">{{number}}</span><p>{{title}}</p>',
                className : 'map_tip_box',
                number : '',
                zIndex : 1
            };
            var map = this.map,
                self = this,
                data = $.extend({},oldData,data);
            var pointData = data.pointData;


            // 复杂的自定义覆盖物
            function ComplexCustomOverlay(point, text, mouseoverText){
              this._point = point;
              this._text = text;
              this._overText = mouseoverText;
            }
            ComplexCustomOverlay.prototype = new BMap.Overlay();
            ComplexCustomOverlay.prototype.initialize = function(map){
                this._map = map;

                //创建覆盖物div
                var div = this._div = document.createElement("div");
                
                //给坐标覆盖物编号
                pointData.number = data.number===''?'':data.number;
                //创建覆盖物class
                div.className = data.className;
                div.setAttribute("data-zIndex",data.zIndex);
                //替换模板数据
                div.innerHTML = self.replaceAll(data.template,pointData);
                //添加覆盖物对象
                map.getPanes().labelPane.appendChild(div);

              //返回覆盖物对象
              return div;
            }
            ComplexCustomOverlay.prototype.draw = function(){
              var map = this._map;
              var pixel = map.pointToOverlayPixel(this._point);
              this._div.style.left = pixel.x + "px";
              this._div.style.top  = pixel.y + "px";
              this._div.style.zIndex = data.zIndex;
            }
            

            //获取覆盖物对象    
            var myCompOverlay = new ComplexCustomOverlay(pointData.point);
            //添加覆盖物 
            map.addOverlay(myCompOverlay);
        },
        pointArr : [], //存储所有覆盖物的经纬度，用于计算最佳缩放比例和中心点
        overlayList:function(data){



            var self = this,
                options = this.options,
                pointData = data.pointData,
                pointLine = data.pointLine,
                pointLineColor = data.pointLineColor?data.pointLineColor:"#e38",
                className = data.className,
                template = data.template;


            //创建覆盖物
            if (pointData) {

                for (var i = 0; i < pointData.length; i++) {
                    //创建覆盖物
                    this.overlay({
                        pointData : pointData[i] ,
                        className : className , 
                        number : pointData[i].number ,
                        template : template,
                        zIndex : data.zIndex
                    });
                    //连线
                    if (i>0 && pointLine) {

                        var polyline = new BMap.Polyline([
                            new BMap.Point(pointData[i-1].point.lng, pointData[i-1].point.lat),
                            new BMap.Point(pointData[i].point.lng, pointData[i].point.lat)
                        ], {strokeColor:pointLineColor , strokeWeight:2, strokeOpacity:1});   //创建折线    
                        this.map.addOverlay(polyline);   //增加折线
                    };
                    
                    //添加所有覆盖物的经纬度
                    this.pointArr.push(pointData[i].point);
                };


                
                


                /*if (typeof data.callback =='function') {
                    this.map.addEventListener("tilesloaded",function(){
                        data.callback(pointData);
                    });
                    
                };*/
            };
        },
        //添加初始化的覆盖物
        defaltOverlay:function(){
            var options = this.options;
            this.overlayList({
                pointData: options.pointData,
                pointLine: options.pointLine,
                zIndex: options.zIndex
            });
        },
        overlayLine:function(data){
            var map = this.map;

            //清除所有覆盖物
            this.clearOverlays();
            //重绘默认覆盖物
            this.defaltOverlay();
            //绘制新的覆盖物
            this.overlayList(data);

            //获取所有覆盖物的中心和最佳缩放比例
            var centerSize = this.getViewport(this.pointArr);
            map.setZoom(centerSize.zoom);
            map.panTo(centerSize.center);
        },
        replaceAll: function (str, obj) {
            for (var i in obj) {
                str = str.replace("{{" + i + "}}", obj[i]);
            }
            return str;
        },
        getViewport:function(pointArr){
            return this.map.getViewport(this.pointArr);
        },
        //绘制线路
        addOverlay:function(linePath){
            var map = this.map;
            map.addOverlay(new BMap.Polyline(linePath));
        },
        //视角平移到新的经纬度为中心点
        moveTo:function(point){ 
            var map = this.map;
            if (point) {
                map.panTo(new BMap.Point(point.lng,point.lat));
            }else{
                map.panTo(this.options.point);
            };
            
        },
        //设置地图缩放尺寸
        setZoom:function(size){
            this.map.setZoom(size);
        },
        //返回当前地图的缩放级别
        getZoom:function(){
            return this.map.getZoom();
        },
        //返回当前地图的中心点经纬度
        getCenter:function(){
            return this.map.getCenter();
        },
        //返回两个经纬度之间的距离
        getDistance:function(startPoint,endPoint){
            var sPoint = new BMap.Point(startPoint.lng,startPoint.lat),
                ePoint = new BMap.Point(endPoint.lng,endPoint.lat);
            return this.map.getDistance(sPoint,ePoint);
        },
        clearOverlays:function(){
            //清除覆盖物的经纬度
            this.pointArr = [];
            //清除所有覆盖物
            this.map.clearOverlays();
        }

    };

    //加载地图
    nova.map = Factory;
    window.nova = nova;
    
})(window,jQuery,window.nova||{});