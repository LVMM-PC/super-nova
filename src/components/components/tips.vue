<template>
  <div id="everything">

    <h1>Tips</h1>

    <h2>引用</h2>
    <section>
      <ul>
        <li>
          <a href="http://pic.lvmama.com/styles/lv/icons.css" target="_blank">http://pic.lvmama.com/min/index.php?f=/styles/lv/icons.css</a>
        </li>
        <li>
          <a href="http://pic.lvmama.com/styles/lv/tips.css" target="_blank">http://pic.lvmama.com/min/index.php?f=/styles/lv/tips.css</a>
        </li>
      </ul>
    </section>

    <h2>预览</h2>

    <div>
      <h3>
        <a href="icons.html" target="_blank">警示类图标</a>
      </h3>
    </div>

    <h3>1 提示文本</h3>
    <section>

      <code>.nova-tip</code>

      <div class="nova-tip nova-tip-success">
        <div class="nova-tip-close"><i></i></div>
        <span class="nova-icon-xs nova-icon-success"></span>
        成功提醒，例：用户名可用。
      </div>
      <div class="nova-tip nova-tip-success">
        <div class="nova-tip-close"><i></i></div>
        <span class="nova-icon-xs nova-icon-success"></span>
        成功提醒，例：用户名可用。成功提醒，例：用户名可用。成功提醒，例：用户名可用。成功提醒，例：用户名可用。成功提醒，例：用户名可用。成功提醒，例：用户名可用。成功提醒，例：用户名可用。成功提醒，例：用户名可用。
      </div>
      <div class="nova-tip nova-tip-error">
        <div class="nova-tip-close"><i></i></div>
        <span class="nova-icon-xs nova-icon-error"></span>
        错误提醒，例：请输入您的手机号码。
      </div>
      <div class="nova-tip nova-tip-warning">
        <div class="nova-tip-close"><i></i></div>
        <span class="nova-icon-xs nova-icon-warning"></span>
        警告提醒，例：您的密码设置过于简单。
      </div>
      <div class="nova-tip nova-tip-info">
        <div class="nova-tip-close"><i></i></div>
        <span class="nova-icon-xs nova-icon-info"></span>
        一般提醒，例：免费接受推荐邮件，请务必填写正确。
      </div>
      <div class="nova-tip nova-tip-help">
        <div class="nova-tip-close"><i></i></div>
        <span class="nova-icon-xs nova-icon-help"></span>
        帮助说明，内容自行编辑。
      </div>
      <div class="nova-tip">
        <div class="nova-tip-close"><i></i></div>
        一般提示，内容自行编辑。不加图标只加框
      </div>
      <div class="nova-tip nova-tip-normal">
        <span class="nova-icon-xs nova-icon-info"></span>
        一般提醒，层级较弱。只加图标不加边框。
      </div>
      <div class="nova-tip nova-tip-normal">
        <span class="nova-icon-xs nova-icon-info"></span>
        一般提醒，层级较弱。只加图标不加边框。一般提醒，层级较弱。只加图标不加边框。一般提醒，层级较弱。只加图标不加边框。一般提醒，层级较弱。只加图标不加边框。一般提醒，层级较弱。只加图标不加边框。一般提醒，层级较弱。只加图标不加边框。
      </div>
      <div class="nova-tip nova-tip-weak">
        一般提示，层级最弱。不加图标与边框，一般在表单中常用。
      </div>
      <div class="nova-tip nova-tip-weak">
        一般提示，层级最弱。不加图标与边框，一般在表单中常用。一般提示，层级最弱。不加图标与边框，一般在表单中常用。一般提示，层级最弱。不加图标与边框，一般在表单中常用。一般提示，层级最弱。不加图标与边框，一般在表单中常用。一般提示，层级最弱。不加图标与边框，一般在表单中常用。
      </div>
      <div class="nova-tip">
        <div class="nova-tip-close"><i></i></div>
        一般提示，内容自行编辑，多行信息内容。一般提示，内容自行编辑，多行信息内容。一般提示，内容自行编辑，多行信息内容。一般提示，内容自行编辑，多行信息内容。一般提示，内容自行编辑，多行信息内容。一般提示，内容自行编辑，多行信息内容。一般提示，内容自行编辑，多行信息内容。一般提示，内容自行编辑，多行信息内容。
      </div>
      <div class="nova-tip nova-tip-default">
        <span class="nova-icon-xs nova-icon-info"></span>
        <div class="nova-tip-close"><i></i></div>
        一般提示，内容自行编辑，多行信息内容。一般提示，内容自行编辑，多行信息内容。一般提示，内容自行编辑，多行信息内容。一般提示示，内容自行编辑，多行信息内容。一般提示，内容自行编辑，多行信息内容。一般提示，内容自行编辑，多行信息内容。
        <br>
        <a href="#">查看详情</a>
      </div>

    </section>

    <h3>2 信息提示框</h3>
    <section>
      <code>nova-tip-info</code>
      <div>
        <div class="nova-tip-box">
          <span class="nova-icon-lg nova-icon-success"></span>
          <div class="nova-tip-box-title">成功标题，内容自行编辑。</div>
          <div class="nova-tip-box-content">
            成功的说明内容等待的说明内容。
          </div>
          <div class="nova-tip-box-links">
            <a href="#">查看信息</a><i>|</i><a href="#">我的个人中心</a>
          </div>
        </div>
      </div>
    </section>

    <h3>3 表单提示信息</h3>
    <section>
      <code>nova-tip</code>
      <dl class="clearfix">
        <dt>
          输入框：
        </dt>
        <dd>
          <input type="text" placeholder="行内提醒垂直对齐">
          <span class="nova-tip-form">
                    <span class="nova-icon-xs nova-icon-success"></span>成功提醒，例：用户名可用。
                </span>
        </dd>
      </dl>
      <dl class="clearfix">
        <dt>
          输入框：
        </dt>
        <dd>
          <input type="text" placeholder="行内提醒垂直对齐">
          <span class="nova-tip-form">
                    <span class="nova-icon-xs nova-icon-error"></span>错误提醒，例：请输入您的手机号码。
                </span>
        </dd>
      </dl>
      <dl class="clearfix">
        <dt>
          输入框：
        </dt>
        <dd>
          <input type="text" placeholder="行内提醒垂直对齐">
          <span class="nova-tip-form">
                    <span class="nova-icon-xs nova-icon-warning"></span>警告提醒，例：您的密码设置过于简单。
                </span>
        </dd>
      </dl>
      <dl class="clearfix">
        <dt>
          输入框：
        </dt>
        <dd>
          <input type="text" placeholder="行内提醒垂直对齐">
          <span class="nova-tip-form">
                    <span class="nova-icon-xs nova-icon-info"></span>一般提醒，例：免费接受推荐邮件，请务必填写正确。
                </span>
        </dd>
      </dl>
      <dl class="clearfix">
        <dt>
          输入框：
        </dt>
        <dd>
          <input type="text" placeholder="行内提醒垂直对齐">
          <span class="nova-tip-form nova-tip-weak">
                    用于接收电子版旅游合同、行程确认等服务。
                </span>
        </dd>
      </dl>
      <dl class="clearfix">
        <dt>
          输入框：
        </dt>
        <dd>
          <input type="text" placeholder="行内提醒垂直对齐">
          <span class="nova-tip-form nova-tip-weak">
                    用于接收电子版旅游合同、行程确认等服务。用于接收电子版旅游合同、行程确认等服务。
                </span>
        </dd>
      </dl>
      <dl class="clearfix">
        <dt>
          输入框：
        </dt>
        <dd>
          <input type="text" placeholder="行内提醒垂直对齐">
          <span class="nova-tip-form">
                    <span class="nova-icon-xs nova-icon-warning"></span>多行提醒，例：您的密码设置过于简单，请设置成字母+数字组合。
                </span>
        </dd>
      </dl>
      <dl class="clearfix">
        <dt>
          输入框：
        </dt>
        <dd>
          <input type="text" placeholder="行内提醒垂直对齐">
          <span class="nova-tip-form">
                    <span class="nova-icon-xs nova-icon-info"></span>多行提醒，例：请输入您的常用收货地址。看看第二行提醒内容。
                </span>
        </dd>
      </dl>
      <dl class="clearfix">
        <dt>
          输入框：
        </dt>
        <dd>
          <input type="text" placeholder="行内提醒垂直对齐">
          <span class="nova-tip-form nova-tip-success">
                    <span class="nova-icon-xs nova-icon-success"></span>成功提醒，例：用户名可用。
                </span>
        </dd>
      </dl>
      <dl class="clearfix">
        <dt>
          输入框：
        </dt>
        <dd>
          <input type="text" placeholder="行内提醒垂直对齐">
          <span class="nova-tip-form nova-tip-error">
                    <span class="nova-icon-xs nova-icon-error"></span>成功提醒，例：用户名可用。成功提醒，例：用户名可用。
                </span>
        </dd>
      </dl>
      <dl class="clearfix">
        <dt>
          输入框：
        </dt>
        <dd>
          <input type="text" placeholder="行内提醒垂直对齐">
          <span class="nova-tip-form nova-tip-warning">
                    <span class="nova-icon-xs nova-icon-warning"></span>成功提醒，例：用户名可用。
                </span>
        </dd>
      </dl>
      <dl class="clearfix">
        <dt>
          输入框：
        </dt>
        <dd>
          <input type="text" placeholder="行内提醒垂直对齐">
          <span class="nova-tip-form nova-tip-info">
                    <span class="nova-icon-xs nova-icon-info"></span>成功提醒，例：用户名可用。
                </span>
        </dd>
      </dl>
    </section>

    <h2>评论</h2>
    <!-- 多说评论框 start -->
    <div class="ds-thread" data-thread-key="tips" data-title="NOVA"
         data-url="http://www.em2046.com/nova/docs/tips.html"></div>
    <!-- 多说评论框 end -->

  </div>
</template>

<script>
  export default {
    name: 'tips'
  }
</script>

<style lang="scss">

</style>
