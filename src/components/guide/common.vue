<template>
  <div id="everything">

    <ih1 :model="{value: '公共模块'}"></ih1>
    <h2 id="header1">引入公共头部</h2>
    <p><strong>CSS：</strong> <a href="http://pic.lvmama.com/min/index.php?f=/styles/v6/header_new.css" target="_blank">http://pic.lvmama.com/min/index.php?f=/styles/v6/header_new.css</a>
    </p>
    <p><strong>JS：</strong> <a
      href="http://pic.lvmama.com/min/index.php?f=/js/v6/header_new.js,/js/v6/public/searchComplete.js" target="_blank">http://pic.lvmama.com/min/index.php?f=/js/v6/header_new.js,/js/v6/public/searchComplete.js</a>
    </p>
    <p><b class="orange">注意：</b>如果引入无搜索版头部，不需要引入searchComplete.js</p>
    <p><b>头部默认搜索分类设置：</b><span class="orange">$.searchType.showType('TICKET');</span>
      TICKET：门票，FREETOUR：自由行，ROUTE：旅游线路，HOTEL:酒店，SHIP:邮轮</p>
    <pre class="prettyprint linenums">
<strong>公共头部CSS,已包含重置样式和公共底部样式。</strong>
 常用快捷样式：
  1、清除浮动：clearfix
  2、色值：c_f60,c_e38,c_333,c_666,c_999
  3、去掉边框：border_no
  4、去掉间距：pd0,mg0
  5、外间距：mt10,mt20,mt40,ml10,ml20

<strong>公共头部JS,已包含部分js组件:</strong>
 1、延迟加载（用法：引入header_new.js后，只需将页面图片src改为to即可）。
 2、cookie读写。
  写入：$.xcookie.setCookie('名称','值', { path: '/',expires:天数,domain:'lvmama.com'});
  读取：$.xcookie.getCookie('名称');
  删除：$.xcookie.deleteCookie('名称');
  </pre>

    <h2 id="header2">修改公共头部</h2>
    <pre class="prettyprint linenums">
一、改导航的SVN文件(仅需修改这一个)：
  1、focus/branches/chanpinbu/pet/lvmama_common/src/main/config/template/header_nav.htm    //java,PHP的页面都调用这一个导航模板

二、修改导航上面部分的SVN文件（不含导航）：
  1、focus/branches/chanpinbu/pet/lvmama_common/src/main/config/template/header_new.htm     //不带搜索的头部，目前用于我的驴妈妈
  2、focus/branches/chanpinbu/pet/lvmama_common/src/main/config/template/header_new_lvwww2.htm   //所有带搜索的头部

<b class="orange">注意：</b>如果发现有的头部和其他不一样，请让开发引入最新头部，引入方法见上一条API。
</pre>
    <h2 id="footer">引入公共底部</h2>
    <p><strong>CSS：</strong> <a href="http://pic.lvmama.com/min/index.php?f=/styles/v6/header_new.css" target="_blank">http://pic.lvmama.com/min/index.php?f=/styles/v6/header_new.css</a>
    </p>
    <p><strong>JS：</strong> <a href="http://pic.lvmama.com/js/v6/public/footer.js" target="_blank">&lt;script src="http://pic.lvmama.com/js/v6/public/footer.js"&gt;&lt;/script&gt;</a>
    </p>
    <pre class="prettyprint linenums">
公共底部footer.js，直接放在页面底部位置，就可以在对应的位置创建出底部html结构。
</pre>
    <h2 id="login">引入登录弹出框</h2>
    <p><strong>CSS：</strong> <a
      href="http://pic.lvmama.com/min/index.php?f=/styles/v5/modules/dialog.css,/styles/common/poplogin.css"
      target="_blank">http://pic.lvmama.com/min/index.php?f=/styles/v5/modules/dialog.css,/styles/common/poplogin.css</a>
    </p>
    <p><strong>JS：</strong> <a
      href="http://pic.lvmama.com/min/index.php?f=/js/v5/modules/pandora-dialog.js,/js/common/poplogin.js"
      target="_blank">http://pic.lvmama.com/min/index.php?f=/js/v5/modules/pandora-dialog.js,/js/common/poplogin.js</a>
    </p>
    <pre class="prettyprint linenums">
<b>调用方法一：</b>
    传回调函数：
    var aaa = function(){ alert(1) }
    showLogin(aaa);  //登录成功后执行回调函数

    不传回调函数：
    showLogin();  //登录成功后直接刷新页面

<b>调用方法二：</b>
    loginURL('http://www.lvmama.com');   //登陆后跳转url
</pre>
  </div>
</template>

<script>
  import ih1 from '@/components/ih1'
  import ih2 from '@/components/ih2'
  import ih3 from '@/components/ih3'

  export default {
    name: 'common',
    components: {
      ih1,
      ih2,
      ih3
    }
  }
</script>

<style lang="scss">

</style>
