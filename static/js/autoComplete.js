/*!
 * map.js
 * 2017-10-11
 * 安云
 * 1.0.0.0
 */

//驴妈妈地图组件
(function(window,$,nova){

    "use strict";

    //创建默认结构
    $('body').append('<div class="lvComplete"><ul class="lvComplete_list"></ul></div><div class="lvComplete_tip"></div>');

    var $completeBox = $('.lvComplete'),
        $completeList = $('.lvComplete_list'),
        $completeTip = $('.lvComplete_tip'),
        lvCompleteFocus = null,
        loadNum = 0;

    //默认参数
    var Default = {
        input : null, //输入框
        skinClass : '', // 皮肤
        completeBox : $completeBox, //补全盒子
        completeTip : $completeTip, //提示对象
        listTemplate : '<li value="{{searchValue}}"><a><p>{{searchValue}}</p></a></li>',  //补全列表的模板
        tipContent : '对不起，找不到：<span>{{keyword}}</span>', //无结果的提示模板
        dataKey : null, //需要渲染的数据对象的key
        activeName : 'active', //补全的选中状态样式
        zIndex: 9,
        
        ajaxUrl : null, //ajax请求的url
        ajaxType : 'GET', //请求方式
        ajaxDataType : 'jsonp', //请求类型
        ajaxJsonpCallback : 'recive',  //jsonp的回调函数名
        ajaxSuccess : null , //请求成功回调,如果写回调函数，默认不渲染下拉列表。function(data,listHtml)可接收2个参数，第一个是数据，第二个是已有列表结构。补全div对象可在this.options里获得。

        upDownCallback : null, //上下选择回调,function可接收一个参数，为当前选中的li。
        emptyCallback : null, //清空input回调函数
        noDataCallback : null, //无结果的回调函数
        enterCallback : null //回车和点击选中回调函数,function可接收一个参数，为当前选中的li。
    };



    //创建新的对象
    function Factory(options){
        //合并参数
        options = $.extend({}, Default, options);
        //构造新的地图对象
        return new complete(options);
    }

    //地图对象
    function complete(options){
        this.init(options);
    };

    complete.prototype = {
        constructor : complete,
        index : -1,
        init : function(options){
            //共享参数
            this.options = options;

            this.$input = $(options.input);
            
            //事件
            this.event();

            
            
        },
        event : function(){
            var options =  this.options,
                self = this,
                $document = $(document);



            //input输入监听
            $document.on('keyup',options.input,function(event){
                //设置当前焦点的输入框
                lvCompleteFocus = $(this);
                self.$input = lvCompleteFocus;
                //上下选择
                if(event.keyCode == "13"){
                    $completeBox.hide();
                    //回车回调
                    if (typeof options.enterCallback == 'function') {
                        var $li = $completeList.find('li').eq(self.index);
                        options.enterCallback.call(self,$li);
                    };
                }else if(event.keyCode == "27"){ //ESC关闭补全
                    $completeBox.hide();
                    $(this).blur();
                }else if(event.keyCode != "40" && event.keyCode != "38"){
                    //输入内容
                    var thisVal = $.trim( $(this).val() );
                    self.inputKeyword(thisVal);
                    
                }
            }).on('keydown',options.input,function(event){
                var listLength = $completeList.find('li').length;
                if (event.keyCode == "40") {
                    self.index+=1;
                    //检测是否超过列表总数量
                    if (self.index >= listLength) {self.index=0;};
                    self.listActive();
                    //上下回调
                    if (typeof options.upDownCallback == 'function') {
                        var $li = $completeList.find('li').eq(self.index);
                        options.upDownCallback.call(self,$li);
                    }

                }else if (event.keyCode == "38") {
                    self.index-=1;
                    //检测是否到第一个之前
                    if (self.index<0) {self.index = listLength-1;};
                    self.listActive();

                    //上下回调
                    if (typeof options.upDownCallback == 'function') {
                        var $li = $completeList.find('li').eq(self.index);
                        options.upDownCallback.call(self,$li);
                    }
                }
            });

            //获取焦点
            $document.on('click',options.input,function(e){
                var $this = $(this);
                var thisVal = $.trim( $this.val() );
                //设置当前焦点的输入框
                lvCompleteFocus = $this;
                self.$input = lvCompleteFocus;
                //补全当前内容
                self.inputKeyword(thisVal);
            });

            //点击选中补全内容
            $completeList.on('click','li',function(e){
                var $this = $(this);
                self.index = $this.index();
                self.listActive();
                //回车回调
                if (typeof options.enterCallback == 'function') {

                    if ($(options.input).is(lvCompleteFocus)) {
                        options.enterCallback.call(self,$this);
                    };
                    
                };
            });


            //只绑定一次事件
            if ( loadNum==0 ) {
                loadNum++;
                //隐藏自动补全和提示
                $document.on('click',function(e){
                    $completeBox.hide();
                    $completeTip.hide();
                });
                

            };
            
        },
        inputKeyword : function(val){
            var options =  this.options;
            var defaultValue = lvCompleteFocus.attr('data-default-value');
            if (val=='' && typeof  defaultValue != 'undefined') {
                //请求补全数据
                this.ajaxData(defaultValue);
            }else if (val=='') {
                //隐藏补全列表
                $completeBox.hide();
                $completeTip.hide();

                //清空input后的回调
                if (typeof options.emptyCallback == 'function') {
                    options.emptyCallback.call(this);
                };

            }else{
                //请求补全数据
                this.ajaxData(val);
            };
        },
        keyUp : function(){

        },
        listActive : function(){
            var options =  this.options,
                self = this,
                thisList = $completeList.find('li').eq(this.index);

            thisList.addClass( options.activeName ).siblings().removeClass( options.activeName );

            //读取当前选中的补全内容,并填充到输入框
            if (thisList.attr('data-value')) {
                lvCompleteFocus.val(thisList.attr('data-value'));
            }else{
                lvCompleteFocus.val(thisList.text());
            };
            
            
        },
        ajaxData : function(keyword){
            var self = this,
                options = this.options;
            //url参数替换
            var url = this.replaceAll(options.ajaxUrl,{
                    keyword : keyword
                });


            

            //异步请求GET方式
            $.ajax({
                url: url,
                type: options.ajaxType,
                dataType: options.ajaxDataType, 
                jsonpCallback: options.ajaxJsonpCallback,//如果有指定的callback函数名
                success:function(data){

                    //var data = dataAll;

                    var listHtml = self.getListDom(data,keyword);

                    //如果有内容则计算补全位置
                    if (listHtml) {
                        //补全位置
                        var offset = lvCompleteFocus.offset();


                        $completeBox.show().css({
                            "width" : lvCompleteFocus.outerWidth()-2,
                            "z-index" : options.zIndex,
                            "left" : offset.left,
                            "top" : offset.top + lvCompleteFocus.outerHeight()
                        });
                        //添加皮肤
                        if (options.skinClass) {
                            $completeBox.attr('class','lvComplete '+options.skinClass);
                        };    
                        
                    }else{
                        //隐藏补全列表
                        $completeBox.hide();
                    };

                    if (typeof options.ajaxSuccess == 'function') {
                        options.ajaxSuccess.call(self,data,listHtml);
                    }else{
                        //数据填充
                        $completeList.html( listHtml );    
                    };
                    
                    
                    //重置索引
                    self.index = -1;

                }
            }); 
        },
        getListDom:function(listData,keyword){
            var options =  this.options;
            //var listData = options.listData;
            //指定数据的key值
            if (options.dataKey) {
                var dataKeyArr = options.dataKey.split('.');
                for (var i = 0; i < dataKeyArr.length; i++) {
                    listData = listData[dataKeyArr[i]];
                };
                
            };

            var defaultValue = lvCompleteFocus.attr('data-default-value');
            //没有数据回调
            if (!listData.length  && typeof  defaultValue == 'undefined' ) {
                //提示位置
                var offset = lvCompleteFocus.offset();

                //提示内容
                $completeTip.html( this.replaceAll(options.tipContent,{ "keyword" : keyword}) ).show().css({
                    width : lvCompleteFocus.outerWidth()-22,
                    left : offset.left,
                    top : offset.top + lvCompleteFocus.outerHeight()
                });

                //回调
                if (typeof options.noDataCallback == 'function') {
                    options.noDataCallback.call(this);
                };
                
                return '';
            }else{
                $completeTip.hide();
            };

            //列表渲染
            var listDom = '';
            for (var i = 0; i < listData.length; i++) {
                if (!listData[i].index) {
                    listData[i].index = i+1;
                };
                
                listDom += this.replaceAll(options.listTemplate,listData[i]);
            };

            return listDom;
        },
        replaceAll : function(str,data){


            var objArr = str.match(/\{\{(.[^{}]*).(.[^{}\s]*)\}\}/g);


            for(var key in data){

                var keyReg = new RegExp('{{'+key+'}}', 'g');

                

                if (objArr) {

                    var findArrStr = '';
                    //循环模板里的对象
                    for (var i = 0; i < objArr.length; i++) {
                        var thisArr = objArr[i],
                            thisStrAll = thisArr.substring(2,thisArr.length-2),
                            judgeArr = thisStrAll.split('?'),
                            falseStr =  '',
                            minObjArr = thisStrAll.split('.');



                        if (judgeArr.length==2) {
                            minObjArr =  judgeArr[1].split(':')[0].split('.');
                        };

                        //对象的正则{{xxx}}
                        var reg = new RegExp(thisArr.replace(/\?/g,'\\?'), 'g');

                        //默认给第一个对象
                        var findObj = data;

                        //清空数组对象的字符串
                        findArrStr = '';
                        //循环子对象数组
                        for (var j = 0; j < minObjArr.length; j++) {

                            //判断对象下面是不是对象
                            if (typeof findObj == "object") {
                                findObj = findObj[minObjArr[j]];
                            };

                            //判断是不是数组
                            if (Array.isArray(findObj)) {

                                //循环对象下面的数组对象
                                for (var k = 0; k < findObj.length; k++) {
                                    findArrStr += str.replace(reg,findObj[k][minObjArr[j+1]]);
                                };

                            };
                            
                        };


                        if (judgeArr.length==2 && typeof findObj == 'undefined') {
                            falseStr =  judgeArr[1].split(':')[1];
                        };

                        //检测是否有；数组对象
                        if (findArrStr) {
                            str = findArrStr;
                        }else{
                            //如果没有对象则为空
                            str = str.replace(reg,(typeof findObj == 'undefined') ? falseStr : findObj);    
                        };
                        
                        
                    };

                };

                return str;
            };

            
        }
    };

    //加载地图
    nova.autoComplete = Factory;
    window.nova = nova;
    
})(window,jQuery,window.nova||{});