<template>
  <div id="everything">

    <ih1 :model="{value: 'Dialog'}"></ih1>

    <ih2 :model="{value: '引用'}"></ih2>
    <div>
      <ul>
        <li>
          <a href="http://pic.lvmama.com/styles/lv/buttons.css" target="_blank">http://pic.lvmama.com/min/index.php?f=/styles/lv/buttons.css</a>
        </li>
        <li>
          <a href="http://pic.lvmama.com/styles/lv/dialog.css" target="_blank">http://pic.lvmama.com/min/index.php?f=/styles/lv/dialog.css</a>
        </li>
        <li>
          <a href="http://pic.lvmama.com/js/lv/dialog.js" target="_blank">http://pic.lvmama.com/min/index.php?f=/js/lv/dialog.js</a>
        </li>
      </ul>
    </div>

    <ih2 :model="{value: '预览'}"></ih2>
    <ih3 :model="{value: '默认提示框'}"></ih3>
    <div class="section" style="overflow:visible;">
      <div class="nova-dialog-static" style="position:relative;">
        <div class="nova-dialog-close"><i></i></div>
        <div class="nova-dialog-header">消息提醒</div>
        <div class="nova-dialog-body">
          提示文本信息-这是弹出框的内容一般提示文本-也可以是较为复杂的布局，此默认提示框宽度400px。布局，此默认提示框宽度420px布局，此默认提示框宽度420px。
        </div>
        <div class="nova-dialog-footer">
          <span class="btn btn-orange">确认</span>
          <span class="btn">取消</span>
        </div>
      </div>
    </div>
    <pre>
<code class="html">
&lt;!--弹窗结构--&gt;
&lt;div class="nova-dialog"&gt;
    &lt;div class="nova-dialog-close"&gt;&lt;i&gt;&lt;/i&gt;&lt;/div&gt;
    &lt;div class="nova-dialog-header"&gt;消息提醒&lt;/div&gt;
    &lt;div class="nova-dialog-body"&gt;
        提示文本信息-这是弹出框的内容一般提示文本-也可以是较为复杂的布局，此默认提示框宽度400px。布局，此默认提示框宽度420px布局，此默认提示框宽度420px。
    &lt;/div&gt;
    &lt;div class="nova-dialog-footer"&gt;
        &lt;span class="btn btn-orange"&gt;确认&lt;/span&gt;
        &lt;span class="btn"&gt;取消&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>

    <ih2 :model="{value: '配置'}"></ih2>
    <div class="section">
      nova.dialog有两种调用模式
    </div>
    <ih3 :model="{value: '1 简单模式'}"></ih3>
    <div class="section">
<pre><code class="js">//1.模拟原生的alert()方法，向用户显示一条消息并等待用户关闭对话框
nova.alert("这个类似原生alert方法");

//2.提示保存成功，若干毫秒后自动关闭（2000ms为默认值）
//TODO

//3.简单的操作确认提醒
nova.confirm("你确定要删除吗？", function() {
    //确认操作的事件
},function() {
    //取消操作的事件
});
</code></pre>
    </div>
    <h4>1.1 模拟alert()的消息提醒</h4>
    <div class="section">
      最简单的调用，静态方法实现alert的模态提醒
      参数说明
      <code class="js">nova.alert(content, callback)</code>
      <ul>
        <li>content为提醒内容</li>
        <li>callback为回调函数</li>
      </ul>
      <h5>
        实例
      </h5>
      <span class="btn" id="alert">alert的模态提醒</span>

    </div>
    <div class="section">
<pre><code class="js">nova.alert("实现一个alert的模态提醒");
nova.dialog({
    content: "实现一个alert的模态提醒",
    okCallback: true
});</code></pre>
    </div>
    <h4>1.2 定时信息</h4>
    <div class="section">
      参数说明
      <code class="js">nova.msg(content, time)</code>
      实例如下：
      <ul>
        <li>content为提醒内容</li>
        <li>time数值定时器，单位为毫秒，默认值：2000</li>
      </ul>
      <h5>实例：</h5>
      <span class="btn" id="msg">点击保存</span>
    </div>

    <h4>1.3 confirm的模态提醒</h4>
    <div class="section">
      参数说明
      <code>nova.confirm(content, okCallback, cancelCallback)</code>
      实例如下：
      <ul>
        <li>content为提醒内容</li>
        <li>okCallback为点击确定按钮的回调事件</li>
        <li>cancel为点击取消按钮的回调事件</li>
      </ul>
      实例
      <div class="section">
        <div class="btn" id="confirm">confirm 的模态提醒</div>
      </div>
      实例
      这是一条信息
      <table id="table" class="table" style="width: 300px;">
        <thead>
        <tr>
          <td>表格</td>
          <td><span class="btn btn-sm JS_tr_add">添加</span></td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>这是一条信息-1</td>
          <td><span class="btn btn-sm JS_tr_del">删除</span></td>
        </tr>
        <tr>
          <td>这是一条信息-2</td>
          <td><span class="btn btn-sm JS_tr_del">删除</span></td>
        </tr>
        <tr>
          <td>这是一条信息-3</td>
          <td><span class="btn btn-sm JS_tr_del">删除</span></td>
        </tr>
        </tbody>
      </table>
      <pre><code class="js">nova.confirm(
    "你再也不相信爱情了么？",
    function () {
        nova.alert("相信");
    },
    function () {
        nova.alert("不相信");
    }
);

nova.confirm(
    "删除操作不可恢复，你确定要删除此信息？",
    function () {
        $tr.remove();
    }, function () {

    }
);</code></pre>
    </div>

    <h4>1.4 中间状态Loading效果</h4>
    <div class="section">
      页面比较大时，交互操作或跳转时间较长，制作此Loading效果，作为中间状态反馈给用户进行中的效果。
      参数说明
      <code>nova.loading(content, callback)</code>
      实例如下
      <ul>
        <li>content为提醒内容</li>
        <li>callback为回调函数</li>
      </ul>
      实例
      <p>
        <span class="btn JS_loading_it">loading状态，遮盖当前页面</span>
      </p>
      <p>
        <span class="btn JS_loading_top">loading状态，遮盖完整浏览器窗口</span>
      </p>
      在iframe中使用
      <iframe class="dialog-iframe" src="/components/dialog/iframe" frameborder="0"></iframe>
      <pre><code class="js">//遮罩当前页面，在iframe中时，不能遮罩iframe的父级页面
nova.loading('&lt;div class="nova-dialog-body-loading"&gt;&lt;i&gt;&lt;/i&gt;&lt;br&gt;正在加载中...&lt;/div&gt;');

//遮罩祖先级页面，在iframe中时，可以遮罩iframe的祖先级页面
top.nova.loading('&lt;div class="nova-dialog-body-loading"&gt;&lt;i&gt;&lt;/i&gt;&lt;br&gt;正在加载中...&lt;/div&gt;');</code></pre>
    </div>

    <ih3 :model="{value: '2 标准模式参数'}"></ih3>
    <div class="section">

      options参数较多，请参考下列文档

      <pre>
<code>nova.dialog({

    showClose: true,  //是否显示关闭按钮
    button: null,  //按钮组
    fixed: true,  //是否position:fixed
    masked: true,  //是否有遮罩层
    drag: false,  //是否可以拖拽

    topFixed: false,  //是否弹窗顶部与窗口顶部保持固定尺寸
    topOffset: 60,  //弹窗顶部与窗口顶部的距离

    initHeight: "300px",  //iframe高度

    initCallback: null,  //初始化完成后执行方法
    beforeClosingCallback: null,  //窗口关闭前执行方法

    okCallback: null,  //确定按钮
    cancelCallback: null,  //取消按钮

    okText: "确定",  //确定按钮文本
    cancelText: "取消",  //取消按钮文本

    okClassName: "btn-orange",  //确定按钮class
    cancelClassName: "",  //取消按钮class

    content: "",  //内容
    contentClone: true,  //是否克隆content内容
    title: "消息提醒",  //标题

    time: null,  //定时关闭 单位毫秒(ms)

    width: "",  //宽度
    height: "",  //高度

    wrapClass: "",  //弹窗class
    maskClass: "nova-overlay",  //遮罩层class

    zIndex: null  //z-index

});</code></pre>

    </div>

    <ih3 :model="{value: '3 标准模式实例'}"></ih3>
    <h4>3.1 基础实例</h4>
    <div class="section">
      <p>
        <span class="btn JS_dialog_title_content">自定义标题 内容</span>
      </p>
      <p>
        <span class="btn JS_dialog_no_title">无标题</span>
      </p>
      <pre><code class="js">nova.dialog({
    title: "自定义标题",
    content: "标准模式，可以自定义提醒标题和内容，默认不显示确定 取消的按钮"
});</code></pre>
      <p>
        <span class="btn JS_dialog_button">显示弹窗按钮</span>
      </p>
      <pre><code class="js">nova.dialog({
    content: "显示弹窗按钮，若未指定按钮的回调函数，则默认关闭",
    okCallback: true,
    cancelCallback: true
});</code></pre>

      <p>
        <span class="btn JS_dialog_height_overflow">弹窗内容高过窗口</span>
      </p>
      <pre><code class="js">nova.dialog({
    content: "弹窗内容过高，超过浏览器窗口高度时，弹窗变化为跟随滚动条滚动。N多换行后，再高的内容，我也能看到内容最下面的部分",
    width: 400,
    height: 4000
})</code></pre>

      <p>
        <span class="btn JS_dialog_dom">指定DOM对象将其代码显示到弹窗</span>
      </p>
      <pre><code class="js">nova.dialog({
    content: $("#elemBack")
})</code></pre>
      <pre>
<code class="html">&lt;!--
测试页面元素及其原绑定事件
事件不能写在将要显示在弹层的内容中
--&gt;
&lt;div id="elemBack"&gt;
    &lt;p&gt;传入指定element对象（这里传入 $("#elemBack") 显示其内容(含其本身盒子)，同时保存其原有事件&lt;/p&gt;
    &lt;p&gt;&lt;strong&gt;注意：&lt;/strong&gt;原事件不能以 &lt;code&gt;&lt;script&gt;&lt;/code&gt; 标签包含在 #elemBack 盒子内，否则事件会重复绑定&lt;/p&gt;
    &lt;button id="testbtn" class="btn"&gt;点此测试事件&lt;/button&gt;
&lt;/div&gt;</code></pre>
    </div>

    <h4>3.2 自定义按钮</h4>
    <div class="section">

      <p>
        <span class="btn JS_dialog_btn">更改默认按钮</span>
      </p>
      <pre><code class="js">nova.dialog({
    content: "显示弹窗按钮，实现按钮文字自定义，绑定特定按钮点击事件",
    okCallback: function () {
        nova.msg("保存成功");
    },
    okClassName: "btn-pink",
    okText: "保存修改",
    cancelCallback: true,
    cancelText: "不保存"
});</code></pre>
      <p>
        <span class="btn JS_dialog_rewrite">重写提示内容</span>
      </p>
      <pre><code class="js">nova.dialog({
    content: "点击“重写提示”按钮，将使用链式操作重写弹窗的提醒内容！",
    okText: "重写提示",
    okCallback: function () {
        this.title("警告");
        this.content("重写该弹窗提示内容，在回调函数使用return false 不会关闭当前弹出框");
        this.resize();
        return false;
    },
    cancelText: "关闭",
    cancelCallback: true
});</code></pre>
      <p>
        <span class="btn JS_dialog_btn_group">实现多个按钮</span>
      </p>
      <pre><code class="js">nova.dialog({
    content: '&lt;h4&gt;您对模态窗口满意吗？&lt;/h4&gt;' +
    '&lt;p&gt;说明：使用模态窗口，能实现全站的弹窗统一，外观能够控制，方便修改，功能上也可定制，实在是统一网页设计弹窗的必备武器！&lt;/p&gt;',
    button: [
        {
            text: "非常满意",
            className: "btn-pink",
            callback: function () {
                nova.msg("感谢你的选择", 2000);
            }
        },
        {
            text: "一般满意",
            className: "btn-blue",
            callback: function () {
                nova.msg("我也同意你的看法", 2000);
            }
        },
        {
            text: "不满意",
            className: "btn-disabled",
            callback: function () {
                return false;  //阻止关闭
            }
        }
    ]
});</code></pre>
    </div>

    <h4>3.3 弹窗高度检测</h4>
    <div class="section">

      <p>
        <span class="btn JS_dialog_auto">弹窗高度检测</span>
      </p>
      <pre><code class="js">nova.dialog({
    content: $(".dialog-auto"),
    topFixed: true,
    topOffset: 60
});</code></pre>
      <pre>
<code class="html">
&lt;div class="dialog-auto"&gt;
    &lt;div class="tabs clearfix"&gt;
        &lt;div class="tab active"&gt;往返推荐&lt;/div&gt;
        &lt;div class="tab"&gt;自由组合&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="panes"&gt;
        &lt;div class="pane active da-recommend"&gt;往返推荐内容&lt;/div&gt;
        &lt;div class="pane da-free"&gt;自由组合内容&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
    </div>

    <h4>3.4 复杂交互</h4>
    <div class="section">
      <!--TODO-->
      暂无实例
    </div>

    <h4>3.5 对话框初始化及其事件</h4>

    <div class="section">
      <ul>
        <li>initialize弹窗初始化完成后执行的方法</li>
      </ul>
      <p>
        <span class="btn JS_dialog_initialize">弹窗初始化后执行方法</span>
      </p>

      <pre><code class="js">nova.dialog({
    content: "弹窗未初始化完成",
    initCallback: function () {
        this.content("弹窗初始化完成");
    }
});</code></pre>
    </div>
    <h4>3.6 关闭对话框前执行函数</h4>

    <div class="section">

      <ul>
        <li>beforeunload弹窗初始化完成后执行的方法</li>
      </ul>
      <p>
        <span class="btn JS_dialog_beforeunload">关闭弹窗前执行方法</span>
      </p>
      <pre><code class="js">nova.dialog({
    height: 300,
    title: "关闭对话框前执行方法",
    content: "用户填写了信息但未保存，提醒用户是否保存",
    okCallback: true,
    okText: "关闭",
    okClassName: "btn",
    cancelCallback: function () {
        this.close(true);
        return false;
    },
    cancelText: "强制关闭",
    cancelClassName: "btn-pink",
    beforeClosingCallback: function () {
        var self = this;
        nova.confirm("关闭后会导致数据丢失，是否确认关闭？", function () {
            self.close(true);  //强制关闭弹窗
        });
        return false;
    }
});</code></pre>
    </div>

    <ih3 :model="{value: '4 Ajax调用'}"></ih3>

    <div class="section">

      <p><span class="btn JS_dialog_ajax_load">Ajax调用</span></p>
      <pre><code class="js">nova.dialog({
    width: 600,
    wrapClass: "nova-dialog-custom",
    initCallback: function () {
        var self = this;
        self.loading();
        $.ajax({
            url: "dialog/dialog-ajax.html",
            dataType: "html"
        }).done(function (html) {

            self.content(html);
            self.resize();

        }).fail(function (err) {
            self.content("加载失败");
        });
    }
});</code></pre>

      <p><span class="btn JS_dialog_ajax_save">Ajax保存</span></p>
      <pre><code class="js">$.ajax({
    url: "dialog/dialog-ajax.html",
    dataType: "html"
}).done(function () {
    nova.msg("保存成功");
}).fail(function () {
    nova.msg("保存失败");
});</code></pre>
    </div>

    <ih3 :model="{value: '5 iframe调用'}"></ih3>

    <div class="section">

      <p><span class="btn JS_dialog_iframe_load">iframe调用</span></p>
      <pre><code class="js">nova.dialog({
    url: true,
    content: "/components/dialog/iframe",
    width: 600,
    initHeight: 300  //设置iframe的高度
    //height: 300,  //同时设置了iframe与dialog的高度后，iframe可能会溢出
})</code></pre>

    </div>

    <!--
        测试页面元素及其原绑定事件
        事件不能写在将要显示在弹层的内容中
     -->
    <div id="elemBack">
      <p>传入指定element对象（这里传入 $("#elemBack") 显示其内容(含其本身盒子)，同时保存其原有事件</p>
      <p><strong>注意：</strong>原事件不能以 <code>&lt;script&gt;</code> 标签包含在 #elemBack 盒子内，否则事件会重复绑定</p>
      <button id="testbtn" class="btn btn-blue">点此测试事件</button>
    </div>

    <div class="dialog-auto">
      <div class="tabs clearfix">
        <div class="tab active">往返推荐</div>
        <div class="tab">自由组合</div>
      </div>
      <div class="panes">
        <div class="pane active da-recommend">往返推荐内容</div>
        <div class="pane da-free">自由组合内容</div>
      </div>
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

  require('script-loader!../../../static/js/dialog')
  require('script-loader!../../../static/doc/dialog')
</script>

<style lang="scss">

  @import "/static/assert/css/buttons.css";
  @import "/static/assert/css/dialog.css";

  input {
    border: 1px solid #CCC;
    line-height: 20px;
  }

  .nova-dialog-static .btn,
  .nova-dialog .btn {
    margin: 0 5px;
  }

  .table, .table td {
    border: 1px solid #CCC;
  }

  .table td {
    text-align: center;
    padding: 5px;
  }

  .dialog-iframe {
    box-sizing: border-box;
    border: 2px solid #7FCCFF;
    width: 100%;
    height: 400px;
    margin-bottom: 10px;
  }

  #elemBack {
    display: none;
  }

  .dialog-auto {
    display: none;
  }

  .dialog-auto .tabs {
  }

  .dialog-auto .tab {
    cursor: pointer;
    float: left;
    padding: 5px;
    margin-right: 5px;
  }

  .dialog-auto .tab.active {
    color: #fff;
    background-color: #ff9900;
  }

  .dialog-auto .panes {
    text-align: center;
  }

  .dialog-auto .pane {
    display: none;
  }

  .dialog-auto .pane.active {
    display: block;
  }

  .da-recommend {
    background-color: #cdf0ff;
    height: 300px;
    line-height: 300px;
  }

  .da-free {
    background-color: #d6fada;
    height: 500px;
    line-height: 300px;
  }

  .dialog-ajax {
    padding: 20px;
    height: 300px;
    overflow: auto;
  }

</style>
