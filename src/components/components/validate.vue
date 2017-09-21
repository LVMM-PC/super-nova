<template>
  <div id="everything">

    <h1>Validate</h1>

    <h2>引用</h2>
    <section>
      <ul>
        <li>
          <a href="http://pic.lvmama.com/js/lv/validate.js" target="_blank">http://pic.lvmama.com/min/index.php?f=/js/lv/validate.js</a>
        </li>
      </ul>
    </section>

    <h2>配置</h2>
    <div>
      <h3><a href="validate/settings.html" target="_blank">配置文档</a></h3>
    </div>

    <h2>预览</h2>

    <h3>

    </h3>
    <section>

      <!--联系人信息填写--开始-->
      <div class="order_box">
        <!--付款按钮-->
        <div class="fk_box_fixed mt_20">
          <div class="fk_box">
            <a class="btn_fk" href="javascript:;">提交表单</a>

          </div>
        </div>
        <!--购买人免登陆--开始-->
        <div class="user_info no_bd js_copy_info"> <!--js_copy_info是购买人专用的，下面得复制购买人信息按钮点击,需要读取这个名字下面输入得内容-->

          <h3 class="order_tit">用户信息</h3>

          <!--中英文姓名-->
          <dl class="user_dl">
            <dt><span class="red">*</span> 非空校验：</dt>
            <dd>
              <!--optional="true"设置为非必填项，可以不填-->
              <input class="input JS_non_empty" type="text"
                     placeholder="非空校验，自定义报错内容">
              <span class="nova-tip-form error_text"></span>
            </dd>
          </dl>

          <!--护照姓名-->
          <dl class="user_dl">
            <dt><span class="red">*</span> 护照姓名：</dt>
            <dd>
              <!--optional="true"设置为非必填项，可以不填-->
              <input class="input JS_pass_port_name" type="text"
                     placeholder="非空校验，自定义报错内容">
              <span class="nova-tip-form error_text"></span>
            </dd>
          </dl>

          <!--中英文姓名-->
          <dl class="user_dl">
            <dt>姓名：</dt>
            <dd>
              <!--optional="true"设置为非必填项，可以不填-->
              <input class="input JS_chinese_and_english" type="text" placeholder="姓名">
              <span class="nova-tip-form error_text"></span>
            </dd>
          </dl>

          <!--中文姓名-->
          <dl class="user_dl">
            <dt><span class="red">*</span> 中文姓名：</dt>
            <dd>
              <input class="input JS_chinese" type="text" placeholder="请输入中文姓名">
              <span class="fanli_btn">范例填写</span>
              <span class="nova-tip-form error_text"></span>
            </dd>
          </dl>

          <!--英文姓名-->
          <dl class="user_dl">
            <dt>拼音姓名：</dt>
            <dd>
              <input class="input JS_english" type="text"
                     placeholder="英文姓（拼音或英文）">
              <input class="input JS_english" type="text"
                     placeholder="英文名（拼音或英文）">
              <span class="nova-tip-form error_text"></span>
            </dd>
          </dl>

          <!--手机号-->
          <dl class="user_dl">
            <dt><span class="red">*</span> 手机号码：</dt>
            <dd>
              <input class="input JS_mobile" maxlength="11" type="text"
                     placeholder="请输入手机号码">
              <span class="ts_text">您的手机号码已注册，<a class="c_09c"
                                                 href="javascript:;">登录</a>以享受优惠积分好礼或者您可以继续购买。</span>
              <span class="nova-tip-form error_text"></span>
            </dd>
          </dl>

          <!--图形验证码-->
          <dl class="user_dl">
            <dt><span class="red">*</span> 图片验证码：</dt>
            <dd>
              <input class="input" type="text" placeholder="验证码">
              <img class="vertical_t"
                   src="https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=60&h=30#cccccc"
                   width="60" height="30">
              <a class="c_09c" href="javascript:;">看不清,换一张</a>
              <span class="error_text"><i class="tip-icon tip-icon-error"></i>为了验证您的身份，请输入正确的图片验证码</span>
            </dd>
          </dl>

          <!--手机验证码-->
          <dl class="user_dl">
            <dt><span class="red">*</span> 验证码：</dt>
            <dd>
              <input class="input" type="text" placeholder="验证码">
              <span class="btn cbtn-default js_order_yzm">发送验证码</span>
              <span class="nova-tip-form error_text"></span>
            </dd>
          </dl>

          <!--邮箱-->
          <dl class="user_dl">
            <dt><span class="red">*</span> 邮箱地址：</dt>
            <dd>
              <input class="input JS_email" type="text" placeholder="邮箱">
              <span class="ts_text">此邮箱地址为接收邮件所用，作为订购与取票凭证，请准确填写。</span>
              <span class="nova-tip-form error_text"></span>
            </dd>
          </dl>


          <!--出生日期-->
          <dl class="user_dl">
            <dt><span class="red">*</span> 出生日期：</dt>
            <dd>
              <input class="input JS_birthday" type="text"
                     readonly="readonly"
                     placeholder="请选择出生日期">
              <span class="nova-tip-form error_text"></span>
            </dd>
          </dl>

          <!--证件-->
          <dl class="user_dl">
            <dt><span class="red">*</span> 证件类型：</dt>
            <dd>
              <select class="select js_zhengjian">
                <option value="ID_CARD">身份证</option>
                <option>护照</option>
              </select>
              <input class="input JS_id_card" type="text"
                     placeholder="请输入证件号码">
              <span class="ts_text"><i class="tip-icon tip-icon-info"></i>为了您能顺利出游，请务必确认所填姓名、证件类型和证件号码与所持证件保持一致；</span>
              <span class="nova-tip-form error_text"></span>
            </dd>
          </dl>

          <!--快递地址-->
          <dl class="user_dl">
            <dt><span class="red">*</span> 邮寄地址：</dt>
            <dd>
              <select class="select" id="js_city1">
                <option>选择省</option>
                <option>上海</option>
              </select>
              <select class="select" id="js_city2">
                <option>选择市</option>
                <option>上海</option>
              </select>
              <br>
              <input class="input w_290 JS_address" type="text" placeholder="详细地址">
              <span class="nova-tip-form error_text"></span>
            </dd>
          </dl>

          <!--邮政编码-->
          <dl class="user_dl">
            <dt>邮政编码：</dt>
            <dd>
              <input class="input JS_zip_code" type="text" placeholder="邮政编码">
              <span class="nova-tip-form error_text"></span>
            </dd>
          </dl>

          <!--有效期-->
          <dl class="user_dl">
            <dt><span class="red">*</span> 有效期：</dt>
            <dd>
              <input class="input JS_birthday" readonly="readonly"
                     type="text"
                     placeholder="请选择有效期">
              <span class="nova-tip-form error_text"></span>
            </dd>
          </dl>

          <!--签发地-->
          <dl class="user_dl">
            <dt><span class="red">*</span> 签发地：</dt>
            <dd>
              <input class="input JS_chinese_and_english" type="text"
                     placeholder="请输入签发地">
              <span class="nova-tip-form error_text"></span>
            </dd>
          </dl>

          <!--特殊要求-->
          <dl class="user_dl">
            <dt>特殊要求：</dt>
            <dd>
              <textarea class="input order_textarea" placeholder="大人，如您有其他的需求可在这里填写哈~"></textarea>
            </dd>
          </dl>

        </div>
        <!--购买人--结束-->

        <!--游玩人1--开始-->
        <div class="user_info border_t1_dotted">
          <dl class="user_dl">
            <dt><span class="red">*</span>姓名：</dt>
            <dd>
              <input class="input JS_chinese_and_english" type="text"
                     placeholder="姓名">
              <span class="btn cbtn-default js_btn_copy">复制购买人信息</span>
              <span class="error_text"><i class="tip-icon tip-icon-error"></i>请输入姓名</span>
            </dd>
          </dl>

          <!--手机号-->
          <dl class="user_dl">
            <dt><span class="red">*</span>手机号码：</dt>
            <dd>
              <input class="input JS_mobile" maxlength="11" type="text"
                     placeholder="手机号码">
              <span class="ts_text">您的手机号码已注册，<a class="c_09c"
                                                 href="javascript:;">登录</a>以享受优惠积分好礼或者您可以继续购买。</span>
              <span class="nova-tip-form error_text"></span>
            </dd>
          </dl>

          <!--邮箱-->
          <dl class="user_dl">
            <dt><span class="red">*</span> 邮箱地址：</dt>
            <dd>
              <input class="input JS_email" type="text" placeholder="邮箱">
              <span class="ts_text">此邮箱地址为接收邮件所用，作为订购与取票凭证，请准确填写。</span>
              <span class="nova-tip-form error_text"></span>
            </dd>
          </dl>


          <!--出生日期-->
          <dl class="user_dl">
            <dt><span class="red">*</span> 出生日期：</dt>
            <dd>
              <input class="input JS_birthday " type="text"
                     readonly="readonly"
                     placeholder="请选择出生日期">
              <span class="nova-tip-form error_text"></span>
            </dd>
          </dl>


          <h5 class="youwan_tit">游玩人1<br><span class="tags106">成人</span></h5>
        </div>
        <!--游玩人1--结束-->

        <!--邮轮用户信息板块---开始-->
        <div class="user_info_yl">
          <div class="user_info_room">第2间舱房<b>高级内舱双人房</b></div>
          <!--游玩人1--开始-->
          <div class="user_info">
            <h5 class="youwan_tit">游玩人1</h5>
            <div class="Preser_box">
              <a class="btn_qk js_btn_qk" href="javascript:;" hidefocus="false">清空</a>
            </div>
            <dl class="user_dl">
              <dt><span class="red">*</span> 中文姓名：</dt>
              <dd>
                <input class="input JS_chinese" type="text" placeholder="姓名">
                <span class="nova-tip-form error_text"></span>
              </dd>
            </dl>
            <dl class="user_dl">
              <dt><span class="red">*</span> 拼音姓名：</dt>
              <dd>
                <input class="input JS_english" type="text"
                       placeholder="英文姓（拼音或英文）">
                <input class="input JS_english" type="text"
                       placeholder="英文名（拼音或英文）">
                <span class="nova-tip-form error_text"></span>
              </dd>
            </dl>
            <dl class="user_dl xb_check">
              <dt><span class="red">*</span> 性别：</dt>
              <dd>
                <label class="check"><input class="radio" name="xingbie3" checked="" type="radio">男</label>
                <label class="check"><input class="radio" name="xingbie3" type="radio">女</label>
              </dd>
            </dl>
            <dl class="user_dl xb_check">
              <dt><span class="red">*</span> 人群：</dt>
              <dd>
                <label class="check"><input class="radio" name="renqun3" checked="" type="radio">成人</label>
                <label class="check"><input class="radio" name="renqun3" type="radio">儿童</label>
              </dd>
            </dl>
            <dl class="user_dl">
              <dt><span class="red">*</span> 出生日期：</dt>
              <dd>
                <input class="input JS_birthday js_birthday" maxlength="11"
                       type="text"
                       readonly="" placeholder="请选择出生日期">
                <span class="nova-tip-form error_text"></span>
              </dd>
            </dl>
            <dl class="user_dl xb_check">
              <dt><span class="red">*</span> 证件类型：</dt>
              <dd>
                <label class="check"><input class="radio js_zj_show" name="zj_tigong3" checked=""
                                            type="radio">现在输入证件信息</label>
                <label class="check"><input class="radio js_zj_hide" name="zj_tigong3" type="radio">客服来电后提供</label>
                <ul class="zj_list">
                  <li>
                    <b><span class="red">*</span> 证件类型：</b>
                    <select class="select js_zhengjian">
                      <option value="ID_CARD">身份证</option>
                      <option>护照</option>
                    </select>
                    <input class="input JS_id_card" type="text"
                           placeholder="请输入证件号码">
                    <span class="ts_text">取票时需出示身份证确认。</span>
                    <span class="nova-tip-form error_text"></span>
                  </li>
                  <li>
                    <b><span class="red">*</span> 有效期：</b>
                    <input class="input JS_birthday js_birthday" maxlength="11"
                           type="text"
                           readonly="" placeholder="请选择出生日期">
                    <span class="nova-tip-form error_text"></span>
                  </li>
                  <li>
                    <b><span class="red">*</span> 出生地：</b>
                    <input class="input JS_chinese_and_english" type="text"
                           placeholder="请输入出生地">
                    <span class="nova-tip-form error_text"></span>
                  </li>
                  <li>
                    <b><span class="red">*</span> 签发地：</b>
                    <input class="input JS_chinese_and_english" type="text"
                           placeholder="请输入签发地">
                    <span class="nova-tip-form error_text"></span>
                  </li>
                </ul>

              </dd>
            </dl>
          </div><!--游玩人1--结束-->
        </div>
        <!--邮轮用户信息板块---结束-->

      </div>
      <!--联系人信息填写--结束-->

    </section>


  </div>
</template>

<script>
  export default {
    name: 'validate'
  }

  require('script-loader!../../../static/js/validate')
  require('script-loader!../../../static/doc/validate')
</script>

<style lang="scss">

  @import "../../assets/scss/validate.css";
  @import "/static/assert/css/tips.css";
  @import "/static/assert/css/icons.css";

</style>
