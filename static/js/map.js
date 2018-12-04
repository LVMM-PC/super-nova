/*!
 * map.js
 * 2017-10-11
 * 安云
 * 1.0.0.0
 */

//驴妈妈地图组件
(function(window,$,nova){

    "use strict";

    var defaults = {
        mapType : 'baidu',
        mapID : null,
        pointData : [
            {title:'北京天安门',point:{"lng":116.404,"lat":39.915},number:''}
        ],
        template : '<span class="map_icon map_icon_position">{{number}}</span><p>{{title}}</p>',
        className : 'map_tip_box',
        fullViewport : false,
        pointLine : false,
        pointLineColor : '#e38',
        scrollWheelZoom : true,
        showControl : true,
        zIndex : 1,
        zoom : 12,
        dragstart : null

    };

    //地图状态
    var loadState = {
        baidu : false,
        google : false
    };

    // 复杂的自定义覆盖物
    function ComplexCustomOverlay(point, text, mouseoverText){
      this._point = point;
      this._text = text;
      this._overText = mouseoverText;
    }

    function USGSOverlay(bounds,  map){
        // Initialize all properties.
        this.bounds_ = bounds;
        this.map_ = map;
        this.div_ = null;
        this.setMap(map);
    };

    //创建新的对象
    function Factory(options){
        //合并参数
        options = $.extend({}, defaults, options);
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

            var self = this;
            var script = document.createElement('script');

            //检测是否加载地图api
            /*var hasScript = {'baidu':false,'google':false};
            var scriptTag = document.getElementsByTagName('script');
            for (var i = 0; i < scriptTag.length; i++) {
                var src = scriptTag[i].getAttribute('src');
                if ( /api.map.baidu.com/.test(src) ) {
                    hasScript.baidu = true;
                }else if($('#googleApi').length){
                    hasScript.google = true;
                };
            };*/
            //百度地图
            if (options.mapType == 'baidu') {
                //页面存在百度地图api
                if ($('#baiduApi').length) {
                    if (loadState.baidu) {
                        self.baidu();
                    }else{
                        var loadStateTime = setInterval(function(){
                            if (loadState.baidu) {
                                clearInterval(loadStateTime);
                                self.baidu();
                            };
                        },500);
                    };
                }else{//不存在，则加载百度api
                    var script = document.createElement("script");    
                    script.src = 'http://api.map.baidu.com/getscript?v=2.0&ak=i2ccGvMLyR86WI0YcodIe7Lu';
                    document.body.appendChild(script);
                    script.id="baiduApi";
                    script.onload = function(){
                        self.baidu();
                        loadState.baidu = true;
                        //百度地图自动补全层级bug
                        $('body').append('<style>.tangram-suggestion-main{z-index:199 !important;}</style>');
                    }  
                };
                
            }else{ //google地图
                if ($('#googleApi').length) {
                    if (loadState.google) {
                        self.google();
                    }else{
                        var loadStateTime = setInterval(function(){
                            if (loadState.google) {
                                clearInterval(loadStateTime);
                                self.google();
                            };
                        },500);
                    };
                }else{
                    //获取当前url
                    var hostname = location.hostname,
                        key = '';
                    //这3中类型的url用第一个key
                    if (hostname=='ticket.lvmama.com' || hostname=='dujia.lvmama.com' || hostname=='super.lvmama.com' ) {
                        key = 'AIzaSyAxD3V20_zKzgdCDZopmvj-NF4gX78TJ88';
                    }else if(hostname=='www.lvmama.com' || hostname=='cms.lvmama.com'){ //这两种类型用第二个key
                        key = 'AIzaSyDOLUU355I1oDAme7wqF_lz7wN1gp-mLmM';
                    };

                    //创建api
                    var script = document.createElement("script");    
                    script.src = 'http://ditu.google.cn/maps/api/js?hl=zh-CN&libraries=places&key='+key;
                    //script.src = 'http://ditu.google.cn/maps/api/js?libraries=geometry&channel=HOTEL_H&language=zh-CN&client=gme-ctriphk';
                    //script.src = 'http://ditu.google.cn/maps/api/js?libraries=geometry&channel=HOTEL_H&language=zh-CN&client=lvmamamap';
                    document.body.appendChild(script);
                    script.id="googleApi";
                    script.onload = function(){
                        self.google();
                        loadState.google = true;
                    }
                };

            };
            
            
        },
        //百度地图
        baidu:function(){
            var options = this.options,
                centerData = options.pointData[0];

            // 百度地图API功能
            this.map = new BMap.Map(options.mapID);

            if (options.scrollWheelZoom) {
                this.map.enableScrollWheelZoom(true);
            };

            //拖动事件
            if (typeof options.dragstart =='function') {
                this.map.addEventListener("dragstart",options.dragstart);
            };

            //显示缩放控件
            if (options.showControl) {
                this.map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));        
                this.map.addControl(new BMap.NavigationControl());     
                this.map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));
            };

            //没有数据
            if(!centerData){
                return false;
            }

            //设置中心点
            var firstPoint = centerData.point;
            this.point = new BMap.Point(firstPoint.lng,firstPoint.lat);
            this.map.centerAndZoom(this.point, options.zoom);
            
            //添加默认调用的酒店覆盖物
            this.defaultOverlay();


            
            

        },
        //google地图
        google:function(){
            //console.log('组件暂不支持谷歌地图！');
            var options = this.options,
                centerData = options.pointData[0],
                firstPoint = centerData.point;
            
            var myLatlng = new google.maps.LatLng(firstPoint.lat,firstPoint.lng);
            var mapOptions = {
              zoom : options.zoom,
              center : myLatlng,
              zoomControl : options.showControl,
              scrollwheel : options.scrollWheelZoom
            };

            //this.myLatlng = myLatlng;
            this.point = myLatlng.toJSON();
            this.map = new google.maps.Map(document.getElementById(options.mapID),mapOptions);

            //是否显示在一个可视区
            if (options.fullViewport) {
                //获取所有覆盖物的中心和最佳缩放比例
                this.moveCenter();    
            };

            //添加默认调用的酒店覆盖物
            this.defaultOverlay();


            //拖动事件
            if (typeof options.dragstart =='function') {
                
            };

            
            //获取经纬度
            /*google.maps.event.addListener(this.map,'click',function(e){
                console.log(e.latLng.toJSON());
            });*/


        },
        //地图周边搜索接口，参数1：搜索关键词数组，参数2：回调函数，参数3：数据查找半径（单位米）
        search:function(data){
            var map = this.map,
                self = this,
                options = this.options,
                resultArr = [],
                searchNum = 0;


            if (options.mapType == 'baidu') {
                var options = {
                    onSearchComplete: function(results){
                        // 判断状态是否正确
                        if (local.getStatus() == BMAP_STATUS_SUCCESS){
                            var content = local.Fa.content;
                            //循环检索的数据
                            for (var i = 0; i < results.getCurrentNumPois(); i ++){
                                var thisData = results.getPoi(i),
                                    tags = thisData.tags;

                                //检索的数据筛选出真正的机场、火车站、汽车站数据
                                if (/机场/.test(results.keyword) || /车站/.test(results.keyword) || /公交/.test(results.keyword)) {
                                    if ( tags && tags.length && /机场/.test(tags.join(',')) ||  /机场/.test(content[i].std_tag) ) {
                                        resultArr.push(thisData);
                                    }else if( /火车站/.test(results.keyword) && tags && tags.length && /火车站/.test(tags.join(',')) ){
                                        resultArr.push(thisData);
                                    }else if( /汽车站/.test(results.keyword) && tags && tags.length && /汽车站/.test(tags.join(',')) ){
                                        resultArr.push(thisData);
                                    }else if( /公交/.test(results.keyword) && tags && tags.length && /公交车站/.test(tags.join(',')) ){
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
                                //只有一条数据，不走sort单独计算
                                if (resultArr.length==1) {
                                    resultArr[0].distance = map.getDistance(self.point,resultArr[0].point);
                                };
                                
                                //执行回调,传回检索数据
                                data.searchCallback(resultArr);
                            };
                        }else{
                            //执行回调,传回检索数据
                            data.searchCallback([]);
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

            }else{  //google搜索

                //执行回调,传回检索数据
                data.searchCallback([]);
                return;

                var places = new google.maps.places.PlacesService(map);


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
                    //local.searchNearby(data.keyArr[i],this.point,data.distance);
                    (function(thisKeyword){

                        google.maps.places.RankBy.DISTANCE;
                        places.nearbySearch({
                            keyword : data.keyArr[i],
                            location : self.point,
                            radius : data.distance
                        },function(results,status){
                            if (status == google.maps.places.PlacesServiceStatus.OK) {

                                //循环检索的数据
                                for (var j = 0; j < results.length; j ++){


                                    var thisData = results[j],
                                        tags = thisData.types,
                                        thisPoint = thisData.geometry.location.toJSON();
                                    
                                    //计算两点的距离
                                    var selfLatLng = new google.maps.LatLng({lat: self.point.lat, lng: self.point.lng}),
                                        thisLatLng = new google.maps.LatLng({lat: thisPoint.lat, lng: thisPoint.lng}),
                                        distance = google.maps.geometry.spherical.computeDistanceBetween(selfLatLng,thisLatLng);

                                    thisData.point = thisPoint;
                                    thisData.title = thisData.name;
                                    thisData.distance = distance;
                                    

                                    //检索的数据筛选出真正的机场、火车站、汽车站数据
                                    if (/机场/.test(thisKeyword) || /车站/.test(thisKeyword) || /公交/.test(thisKeyword)) {
                                        if ( tags && tags.length && /机场/.test(tags.join(',')) ) {
                                            resultArr.push(thisData);
                                        }else if( /火车站/.test(thisKeyword) && tags && tags.length && /火车站/.test(tags.join(',')) ){
                                            resultArr.push(thisData);
                                        }else if( /汽车站/.test(thisKeyword) && tags && tags.length && /汽车站/.test(tags.join(',')) ){
                                            resultArr.push(thisData);
                                        }else if( /公交/.test(thisKeyword) && tags && tags.length && /公交车站/.test(tags.join(',')) ){
                                            resultArr.push(thisData);
                                        };  
                                    }else{ //其他检索
                                        resultArr.push(thisData);
                                    };
                                    
                                };

                                searchNum++;
                                //检索结果会添加到搜索对象中
                                if (typeof data.searchCallback == 'function' && searchNum == data.keyArr.length) {

                                    resultArr.sort(function(a,b){
                                        return a.distance - b.distance;
                                    });

                                    //执行回调,传回检索数据
                                    data.searchCallback(resultArr);
                                };    
                            }else{
                                //执行回调,传回检索数据
                                data.searchCallback([]);
                            };
                            
                        });  

                    })(data.keyArr[i]);
                };


                  
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
            this.clearOverlays(); 
            
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
            this.clearOverlays(); 
            //搜索线路
            driving.search(data.start, data.end);
        },
        //id：步行路线详情渲染的位置，start：开始地点，end：结束地点
        walking:function(data){ 
            var map = this.map;
            var walking = new BMap.WalkingRoute(map, {renderOptions: {map: map, panel: data.id, autoViewport: true}});
            //清除覆盖物
            this.clearOverlays();
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


            if (this.options.mapType == 'baidu') {
                
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
                  this._div.style.width  = "1px";
                  this._div.style.height  = "1px";
                  this._div.style.zIndex = data.zIndex;
                }
                

                //获取覆盖物对象    
                var myCompOverlay = new ComplexCustomOverlay(pointData.point);   

                //添加覆盖物 
                map.addOverlay(myCompOverlay);

            }else{ //google

                
                USGSOverlay.prototype = new google.maps.OverlayView();
                USGSOverlay.prototype.onAdd = function() {
                    var div = document.createElement('div');
                    //给坐标覆盖物编号
                    pointData.number = data.number===''?'':data.number;
                    //创建覆盖物class
                    div.className = data.className;
                    div.setAttribute("data-zIndex",data.zIndex);
                    //替换模板数据
                    div.innerHTML = self.replaceAll(data.template,pointData);
                    this.div_ = div;

                    // Add the element to the "overlayLayer" pane.
                    var panes = this.getPanes();
                    panes.overlayMouseTarget.appendChild(div);
                    self.overlayLayer = panes.overlayMouseTarget;
                };
                USGSOverlay.prototype.draw = function() {
                    var overlayProjection = this.getProjection();
                    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
                    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
                    var div = this.div_;
                    div.style.left = sw.x+1 + 'px';
                    div.style.top = ne.y + 'px';
                    div.style.width = (ne.x - sw.x)+1 + 'px';
                    div.style.height = (sw.y - ne.y)+1 + 'px';
                    div.style.zIndex = data.zIndex+30; //google地图画线的图层默认是30，设置的层级要+30
                };
                USGSOverlay.prototype.onRemove = function() {
                    this.div_.parentNode.removeChild(this.div_);
                    this.div_ = null;
                };
                // Set the visibility to 'hidden' or 'visible'.
                USGSOverlay.prototype.hide = function() {
                    if (this.div_) {
                      // The visibility property must be a string enclosed in quotes.
                      this.div_.style.visibility = 'hidden';
                    }
                };

                USGSOverlay.prototype.show = function() {
                    if (this.div_) {
                      this.div_.style.visibility = 'visible';
                    }
                };

                USGSOverlay.prototype.toggle = function() {
                    if (this.div_) {
                      if (this.div_.style.visibility === 'hidden') {
                        this.show();
                      } else {
                        this.hide();
                      }
                    }
                };
                USGSOverlay.prototype.toggleDOM = function() {
                    if (this.getMap()) {
                        // Note: setMap(null) calls OverlayView.onRemove()
                        this.setMap(null);
                    } else {
                        this.setMap(this.map_);
                    }
                };

                var bounds = new google.maps.LatLngBounds(pointData.point);
                this.allOverlay = new USGSOverlay(bounds,this.map);
            };
            
            
        },
        pointArr : [], //存储所有覆盖物的经纬度，用于计算最佳缩放比例和中心点
        overlayList:function(data){



            var self = this,
                map = self.map,
                options = this.options,
                pointData = data.pointData,
                pointLine = data.pointLine,
                pointLineColor = data.pointLineColor?data.pointLineColor:"#e38",
                className = data.className,
                template = data.template;
            //检测是否有初始化经纬度
            this.pointArr = this.point?[this.point]:[];

            //创建覆盖物
            if (pointData) {

                var linePointArr = [];
                for (var i = 0; i < pointData.length; i++) {

                    //创建覆盖物
                    this.overlay({
                        pointData : pointData[i] ,
                        className : className , 
                        number : pointData[i].number ,
                        template : template,
                        zIndex : data.zIndex
                    });

                    var thisPoint = pointData[i].point;
                    if (options.mapType =='baidu') {
                        linePointArr.push(new BMap.Point(thisPoint.lng, thisPoint.lat));
                    }else{
                        linePointArr.push(thisPoint);
                    }
                    
                    //添加所有覆盖物的经纬度
                    this.pointArr.push(thisPoint);
                };

                if (pointLine) {

                    if (options.mapType =='baidu') {
                        //var oldDom map.getPanes().floatPane;
                        //连线
                        var polyline = new BMap.Polyline(linePointArr, {strokeColor:pointLineColor , strokeWeight:2, strokeOpacity:1});   //创建折线  
                        map.addOverlay(polyline);   //增加折线
                    }else{
                        new google.maps.Polyline({
                                map: map,
                                path: linePointArr,
                                strokeColor: pointLineColor,
                                strokeOpacity : 1,
                                strokeWeight : 2
                            });
                    };

                };


                if (options.fullViewport) {
                    //获取所有覆盖物的中心和最佳缩放比例
                    this.moveCenter();    
                };
                


                /*if (typeof data.callback =='function') {
                    this.map.addEventListener("tilesloaded",function(){
                        data.callback(pointData);
                    });
                    
                };*/
            };
        },
        //添加初始化的覆盖物
        defaultOverlay:function(){
            var options = this.options;
            this.overlayList({
                pointData: options.pointData,
                pointLine: options.pointLine,
                template: options.template,
                pointLineColor : options.pointLineColor,
                className: options.className,
                zIndex: options.zIndex
            });
        },
        overlayLine:function(data){
            var self = this;
            var options = this.options;
            var maptest = setInterval(function(){
                var map = self.map;

                if (map) {
                    clearInterval(maptest);
                    //清除所有覆盖物
                    self.clearOverlays();
                    //如果默认没有经纬度，则把渲染的第一个经纬度设为默认
                    if(!self.point){
                        var firstPoint = data.pointData[0].point;
                        self.point = new BMap.Point(firstPoint.lng,firstPoint.lat);
                        self.map.centerAndZoom(self.point, options.zoom);
                    }
                    

                    //重绘默认覆盖物
                    self.defaultOverlay();
                    
                    if (data.pointData.length) {
                        //绘制新的覆盖物
                        self.overlayList(data);
                        //设置所有覆盖物的中心点
                        self.setViewportCenter(self.pointArr);
                        if(data.pointData.length==1 && data.zoom){
                            self.setZoom(data.zoom);
                        }
                    }else{
                        self.moveTo();
                    };    
                };
            },100);
        },
        replaceAll: function (str, obj) {
            for (var i in obj) {
                
                if (typeof obj[i] == 'object') {
                    for(var j in obj[i]){
                        str = str.replace("{{" + i + '.' + j + "}}", obj[i][j]);
                    }
                }else{
                    str = str.replace("{{" + i + "}}", obj[i]);
                };
                
            }
            return str;
        },
        getViewport:function(pointArr){
            return this.map.getViewport(this.pointArr);
        },
        //绘制线路
        /*addOverlay:function(linePath){
            var map = this.map;
            map.addOverlay(new BMap.Polyline(linePath));
        },*/
        //绘制线段，传入经纬度数组，自动链接
        addLine:function(pointArr,opt){
            var map = this.map;
            var linePointArr = [];
            for (var i = 0; i < pointArr.length; i++) {
                var thisPoint = pointArr[i];
                linePointArr.push(new BMap.Point(thisPoint.lng, thisPoint.lat));
            };

            //默认画线参数
            var def = {
                strokeColor : '#e38',
                strokeWeight : 2,
                strokeOpacity : 1
            };
            var opt = $.extend({},def,opt);
            //画线  
            var polyline = new BMap.Polyline(linePointArr,opt);
            map.addOverlay(polyline);
            return polyline; //返回线条对象用于删除
        },
        //视角平移到新的经纬度为中心点
        moveTo:function(point){ 
            var map = this.map;

            if (this.options.mapType == 'baidu') {
                if (point) {
                    map.panTo(new BMap.Point(point.lng,point.lat));
                }else{
                    var firstPoint = this.options.pointData[0].point;
                    map.panTo(new BMap.Point(firstPoint.lng,firstPoint.lat));
                };
            }else{

                if (point) {
                    map.setCenter(new google.maps.LatLng({lat: parseInt(point.lat), lng: parseInt(point.lng)}));
                }else{
                    map.setCenter(new google.maps.LatLng({lat: this.point.lat, lng: this.point.lng}));
                }
            }
            
        },
        moveCenter:function(){
            
            if (this.options.mapType == 'baidu') {
                //获取所有覆盖物的中心和最佳缩放比例
                this.setViewportCenter(this.pointArr);
            }else{
                var pointData = this.options.pointData,
                    pointArr = [];
                for (var i = 0; i < pointData.length; i++) {
                  pointArr.push(pointData[i].point);
                };
                this.setViewportCenter(pointArr);
            };
            
        },
        setViewportCenter:function(pointArr){
            var map = this.map;
            if (this.options.mapType == 'baidu') {
                if (pointArr.length>1) {
                    map.setViewport(pointArr);
                }else{
                    this.moveTo(pointArr[0]);
                };
                
            }else{
                if (pointArr.length>1) {
                    var bounds = new google.maps.LatLngBounds();
                    for (var i = 0; i < pointArr.length; i++) {
                      bounds.extend(pointArr[i]);
                    };
                    var centerpoint = bounds.getCenter();
                    map.setCenter(centerpoint.toJSON());
                    map.fitBounds(bounds);       
                }else{
                    this.moveTo(pointArr[0]);
                }
                 
            }
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
            if (this.options.mapType == 'baidu') {
                var sPoint = new BMap.Point(startPoint.lng,startPoint.lat),
                    ePoint = new BMap.Point(endPoint.lng,endPoint.lat);
                return this.map.getDistance(sPoint,ePoint);
            }else{
                //计算两点的距离
                var startLatLng = new google.maps.LatLng({lat: startPoint.lat, lng: startPoint.lng}),
                    endLatLng = new google.maps.LatLng({lat: endPoint.lat, lng: endPoint.lng}),
                    distance = google.maps.geometry.spherical.computeDistanceBetween(startLatLng,endLatLng);
                return distance;
            };
            
        },
        clearOverlays:function(){
            //清除覆盖物的经纬度
            this.pointArr = [];

            if (this.options.mapType == 'baidu') {
                //清除所有覆盖物
                this.map.clearOverlays();
            }else{
                //this.map.setOptions({noClear:false});
                //this.allOverlay.onRemove();
                //console.log(this.allOverlay.getPanes().overlayLayer());
                if (this.overlayLayer) {
                    this.overlayLayer.innerHTML = '';
                };
                
                //console.log(this.allOverlay);
            };
            
        },
        enableScrollWheelZoom:function(bool){
            
            if (this.options.mapType == 'baidu') {
                //清除所有覆盖物
                this.map.enableScrollWheelZoom(bool);
            }else{
                this.map.setOptions({scrollwheel:bool});
            };
            
        }

    };

    //加载地图
    nova.map = Factory;
    window.nova = nova;
    
})(window,jQuery,window.nova||{});