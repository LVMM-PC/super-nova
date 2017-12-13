/**
 * Created by twili on 16/11/03.
 */

$(function () {




/*var data = {
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

    ],"totalResultSize":5};
*/

    nova.autoComplete({
        input : '#js_autoComplete1',
        dataKey : 'matchList',

        ajaxUrl:'http://s.lvmama.com/autocomplete/autoCompleteNew.do?type=ROUTE&keyword={{keyword}}',
        ajaxJsonpCallback : 'recive',  

        listTemplate : '<li destId="{{destId}}" data-value="{{searchValue}}"><a><span>{{pinyin}}　约{{routes.type?routes.type:0}}个结果</span><p>{{searchValue}}</p></a></li>'
    });


    nova.autoComplete({
        input : '#js_autoComplete2',
        dataKey : 'matchList',

        ajaxUrl:'http://s.lvmama.com/autocomplete/autoCompleteNew.do?type=TICKET&keyword={{keyword}}',
        ajaxJsonpCallback : 'recive',  
        
        listTemplate : '<li destId="{{destId}}" data-value="{{searchValue}}"><a><span>约{{pinyin}}个结果</span><p>{{searchValue}}</p></a></li>'
    });









});
