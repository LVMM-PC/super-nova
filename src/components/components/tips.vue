<template>
  <div id="everything">

    <ih1 :model="{value: 'Tips'}"></ih1>

    <ih2 :model="{value: '引用'}"></ih2>
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

    <ih2 :model="{value: '预览'}"></ih2>

    <div>
      <h3>
        <a href="/components/icon" target="_blank">警示类图标</a>
      </h3>
    </div>

    <ih3 :model="{value: '1 提示文本'}"></ih3>
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

    <ih3 :model="{value: '2 信息提示框'}"></ih3>
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

    <ih3 :model="{value: '3 表单提示信息'}"></ih3>
    <section class="tip-doc">
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

  </div>
</template>

<script>
  import ih1 from '@/components/ih1'
  import ih2 from '@/components/ih2'
  import ih3 from '@/components/ih3'

  export default {
    name: 'tips',
    components: {
      ih1,
      ih2,
      ih3
    }
  }
</script>

<style lang="scss">

  @import "/static/assert/css/icons.css";
  @import "/static/assert/css/tips.css";

  .nova-tip {
    margin-bottom: 10px;
  }

  .tip-doc {
    input[type=text] {
      height: 34px;
      border: 1px solid #CCC;
      padding: 0 5px;
    }

    dl {
      margin-bottom: 10px;
    }

    dt {
      float: left;
      width: 90px;
      padding-right: 10px;
      text-align: right;
      line-height: 36px;
    }

    dd {
      float: left;
      width: 800px;
      font-size: 0;
    }


    dd input {
      margin-right: 10px;
    }

    .nova-tip-form {
      max-width: 300px;
    }
  }


</style>
