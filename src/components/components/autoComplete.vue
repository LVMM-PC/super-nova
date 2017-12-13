<template>
  <div id="everything">

    <ih1 :model="{value: 'Map'}"></ih1>

    <ih2 :model="{value: '引用'}"></ih2>
    <div>
      <ul>
        <li>
          <a href="http://pic.lvmama.com/styles/lv/autoComplete.css" target="_blank">http://pic.lvmama.com/min/index.php?f=/styles/lv/autoComplete.css</a>
        </li>
        <li>
          <a href="http://pic.lvmama.com/js/lv/autoComplete.js" target="_blank">http://pic.lvmama.com/min/index.php?f=/js/lv/autoComplete.js</a>
        </li>
      </ul>
    </div>


    <ih2 :model="{value: '配置调用'}"></ih2>

    <ih3 :model="{value: '1、默认配置参数'}"></ih3>
    <div class="section">

      <pre>
<code>


nova.autoComplete({
    dataKey : 'matchList',

    input : '#js_autoComplete1', //补全绑定的输入框
    skinClass : '', // 补全皮肤的className

    dataKey : null, //需要渲染的数组对象的key，如果返回的数据就是数组，不需配置。如果为多级数据可用对象方式查找例如：'matchList.arr'
    listTemplate : '&lt;li value="{<i></i>{searchValue}}">&lt;a>&lt;p>{<i></i>{searchValue}}&lt;/p>&lt;/a>&lt;/li>',  //补全列表的模板，对应数组的对象,选中时默认把li上value的值带到输入框。
    activeName : 'active', //补全的选中状态样式
    
    tipContent : '对不起，找不到：<span>{<i></i>{keyword}}</span>', //无结果的提示模板,keyword等于输入框的内容

    
    ajaxUrl:'http://s.lvmama.com/autocomplete/autoCompleteNew.do?type=ROUTE&keyword={<i></i>{keyword}}', //ajax请求的url
    ajaxType : 'GET', //请求方式
    ajaxDataType : 'jsonp', //请求类型
    ajaxJsonpCallback : 'recive',  //jsonp的回调函数名,默认为空;
    ajaxSuccess : null , //请求成功回调

    emptyCallback : null, //清空input回调函数
    noDataCallback : null, //无结果的回调函数
    enterCallback : null //回车和点击选中回调函数

});


</code></pre>

    </div>


<ih3 :model="{value: '调用Demo'}"></ih3>
    <section>
      <!-- 自动补全渲染 -->
	  <div class="main">
        <dl>
            <dt>全部</dt>
            <dd><input class="input" id="js_autoComplete1" type="text"></dd>
        </dl>

        <dl>
            <dt>景点门票</dt>
            <dd><input class="input" id="js_autoComplete2" type="text"></dd>
        </dl>
        
    </div>


<pre><code>
//全部类型化的数据结构，示例
{
    "keyword":"s",
    "matchList":[{
        "destId":"79",
        "destName":"上海",
        "hotels":{"typeCount":3871,"url":"hotel/U9"},
        "keywordPos":"DEST",
        "pinyin":"shanghai",
        "routes":[
            {"type":"route","typeCount":847,"url":"route/H9?keyword=上海"},
            {"type":"scenictour","typeCount":602,"url":"scenictour/H9?keyword=上海"},
            {"type":"group","typeCount":256,"url":"group/H9?keyword=上海"},
            {"type":"local","typeCount":163,"url":"local/H9?keyword=上海"},
            {"type":"around","typeCount":1055,"url":"around/H9?keyword=上海"},
            {"type":"ziyouxing","typeCount":716,"url":"freetour/H9?keyword=上海"}],
        "searchValue":"上海",
        "tickets":{"type":"ticket","typeCount":427,"url":"ticket/H9?keyword=上海"},
        "type":"route",
        "url":"route/H9?keyword=上海"
        },

        {"destId":"272","destName":"三亚","keywordPos":"DEST","pinyin":"sanya","searchValue":"三亚","type":"route","url":"route/H9?keyword=三亚"},
        {"destId":"87","destName":"苏州","keywordPos":"DEST","pinyin":"suzhou","searchValue":"苏州","type":"route","url":"route/H9?keyword=苏州"},
        {"destId":"159","destName":"山东","keywordPos":"DEST","pinyin":"shandong","searchValue":"山东","type":"route","url":"route/H9?keyword=山东"},
        {"destId":"175649","destName":"上海迪士尼乐园","keywordPos":"DEST","pinyin":"shanghaidishinileyuan","searchValue":"上海迪士尼乐园","type":"route","url":"route/H9?keyword=上海迪士尼乐园"}
    ]
};


//全部类型调用
nova.autoComplete({
    input : '#js_autoComplete1',
    dataKey : 'matchList', //渲染数据下面的matchList数组,如果返回的数据就是数组,则不需配置。

    ajaxUrl:'http://s.lvmama.com/autocomplete/autoCompleteNew.do?type=ROUTE&keyword={<i></i>{keyword}}',
    ajaxJsonpCallback : 'recive',  

    listTemplate : '&lt;li destId="{<i></i>{destId}}" value="{<i></i>{searchValue}}">&lt;a>&lt;span>{<i></i>{pinyin}} 约{<i></i>{routes.type?routes.type:0}}个结果&lt;/span>&lt;p>{<i></i>{searchValue}}&lt;/p>&lt;/a>&lt;/li>', 
});

//门票
nova.autoComplete({
    input : '#js_autoComplete2',
    dataKey : 'matchList', //渲染数据下面的matchList数组,如果返回的数据就是数组,则不需配置

    ajaxUrl:'http://s.lvmama.com/autocomplete/autoCompleteNew.do?type=TICKET&keyword={<i></i>{keyword}}',
    ajaxJsonpCallback : 'recive',  
    
    listTemplate : '&lt;li destId="{<i></i>{destId}}" value="{<i></i>{searchValue}}">&lt;a>&lt;span>约{<i></i>{pinyin}}个结果&lt;/span>&lt;p>{<i></i>{searchValue}}&lt;/p>&lt;/a>&lt;/li>'
});
</code></pre>



    </section>


 


  </div>
</template>

<script>
  import ih1 from '@/components/ih1'
  import ih2 from '@/components/ih2'
  import ih3 from '@/components/ih3'

  export default {
    name: 'autoComplete',
    components: {
      ih1,
      ih2,
      ih3
    }
  }

  require('script-loader!../../../static/js/autoComplete')
  require('script-loader!../../../static/doc/autoComplete')
  
</script>

<style lang="scss">

  @import "/static/assert/css/autoComplete.css";


.main{ width: 1000px; margin: 0 auto; padding-top: 20px; }
	.input{ width: 400px; border:#e38 solid 2px; padding: 0 10px; height: 28px; line-height: 28px; }
	.main dl{ overflow-y: hidden; line-height: 32px; padding: 8px 0 8px 100px; }
	.main dt{ float: left; margin-left: -100px; width: 80px; text-align: right; line-height: 32px; }
    .main dd{ margin-left: 0;}
</style>
