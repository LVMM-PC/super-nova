<template>
  <div id="everything">

    <h1>UI</h1>

    <h2>引用</h2>
    <div>
      <ul>
        <li>
          <a href="http://pic.lvmama.com/styles/lv/ui.css" target="_blank">http://pic.lvmama.com/min/index.php?f=/styles/lv/ui.css</a>
        </li>
        <li>
          <a href="http://pic.lvmama.com/js/lv/ui.js"
             target="_blank">http://pic.lvmama.com/min/index.php?f=/js/lv/ui.js</a>
        </li>
      </ul>
    </div>

    <h2>预览</h2>
    <div class="section">
        <pre>
<code>

    var ui = nova.ui();
    ui.render();

</code>
        </pre>

    </div>
    <div class="section">

      <form>

        <dl class="clearfix">
          <dt>镜头：</dt>
          <dd>
            <label class="nova-checkbox-label">
              <input type="checkbox" name="lens" checked value="superWideAngle">超广角
            </label>
            <label class="nova-checkbox-label">
              <input type="checkbox" name="lens" disabled value="wideAngle">广角
            </label>
            <label class="nova-checkbox-label">
              <input type="checkbox" name="lens" disabled checked value="standard">标准
            </label>
            <label class="nova-checkbox-label">
              <input type="checkbox" name="lens" value="telephoto">长焦
            </label>
          </dd>
        </dl>
      </form>

      <pre>
<code>
&lt;label class="nova-checkbox-label"&gt;
    &lt;input type="checkbox" name="lens" checked value="superWideAngle"&gt;超广角
&lt;/label&gt;
&lt;label class="nova-checkbox-label"&gt;
    &lt;input type="checkbox" name="lens" disabled value="wideAngle"&gt;广角
&lt;/label&gt;
&lt;label class="nova-checkbox-label"&gt;
    &lt;input type="checkbox" name="lens" disabled checked value="standard"&gt;标准
&lt;/label&gt;
&lt;label class="nova-checkbox-label"&gt;
    &lt;input type="checkbox" name="lens" value="telephoto"&gt;长焦
&lt;/label&gt;
</code>
        </pre>
    </div>


    <div class="section">

      <form>

        <dl class="clearfix">
          <dt>镜头：</dt>
          <dd>
            <label class="nova-checkbox-label nova-checkbox-label-orange">
              <input type="checkbox" name="lens" checked value="superWideAngle">超广角
            </label>
            <label class="nova-checkbox-label nova-checkbox-label-orange">
              <input type="checkbox" name="lens" disabled value="wideAngle">广角
            </label>
            <label class="nova-checkbox-label nova-checkbox-label-orange">
              <input type="checkbox" name="lens" disabled checked value="standard">标准
            </label>
            <label class="nova-checkbox-label nova-checkbox-label-orange">
              <input type="checkbox" name="lens" value="telephoto">长焦
            </label>
          </dd>
        </dl>
      </form>

      <pre>
<code>
&lt;label class="nova-checkbox-label nova-checkbox-label-orange"&gt;
    &lt;input type="checkbox" name="lens" checked value="superWideAngle"&gt;超广角
&lt;/label&gt;

</code>
        </pre>

    </div>

    <div class="section">
      <form>


        <dl class="clearfix">
          <dt>性别：</dt>
          <dd class="nova-radio-group">
            <label class="nova-radio-label">
              <input type="radio" name="sex" disabled checked value="male">男
            </label>
            <label class="nova-radio-label">
              <input type="radio" name="sex" value="female">女
            </label>
            <label class="nova-radio-label">
              <input type="radio" name="sex" value="secret">保密
            </label>
            <label class="nova-radio-label">
              <input type="radio" name="sex" disabled value="other">其他
            </label>
          </dd>
        </dl>
      </form>

      <pre>
<code>
&lt;label class="nova-radio-label"&gt;
    &lt;input type="radio" name="sex" disabled checked value="male"&gt;男
&lt;/label&gt;
&lt;label class="nova-radio-label"&gt;
    &lt;input type="radio" name="sex" value="female"&gt;女
&lt;/label&gt;
&lt;label class="nova-radio-label"&gt;
    &lt;input type="radio" name="sex" value="secret"&gt;保密
&lt;/label&gt;
&lt;label class="nova-radio-label"&gt;
    &lt;input type="radio" name="sex" disabled value="other"&gt;其他
&lt;/label&gt;
</code>
        </pre>

    </div>


    <div class="section">
      <form>

        <dl class="clearfix">
          <dt>性别：</dt>
          <dd class="nova-radio-group">
            <label class="nova-radio-label nova-radio-label-orange">
              <input type="radio" name="sex" disabled checked value="male">男
            </label>
            <label class="nova-radio-label nova-radio-label-orange">
              <input type="radio" name="sex" value="female">女
            </label>
            <label class="nova-radio-label nova-radio-label-orange">
              <input type="radio" name="sex" value="secret">保密
            </label>
            <label class="nova-radio-label nova-radio-label-orange">
              <input type="radio" name="sex" disabled value="other">其他
            </label>
          </dd>
        </dl>
      </form>
      <pre>
<code>
&lt;label class="nova-radio-label nova-radio-label-orange"&gt;
    &lt;input type="radio" name="sex" disabled checked value="male"&gt;男
&lt;/label&gt;
</code>
        </pre>
    </div>

    <div class="section">


      <form>

        <dl class="clearfix">
          <dt>所在地：</dt>
          <dd>
            <div class="nova-select-label">
              <label>
                <select name="type1">
                  <optgroup label="直辖市">
                    <option value="110000">北京市</option>
                    <option value="120000">天津市</option>
                    <option value="310000">上海市</option>
                    <option value="500000">重庆市</option>
                  </optgroup>
                  <option>河北省</option>
                  <option>山西省</option>
                  <option>辽宁省</option>
                  <option>吉林省</option>
                  <option>黑龙江省</option>
                  <option>江苏省</option>
                  <option>浙江省</option>
                  <option>安徽省</option>
                  <option>福建省</option>
                  <option>江西省</option>
                  <option>山东省</option>
                  <option>河南省</option>
                  <option>湖北省</option>
                  <option>湖南省</option>
                  <option>广东省</option>
                  <option>海南省</option>
                  <option>四川省</option>
                  <option>贵州省</option>
                  <option>云南省</option>
                  <option>陕西省</option>
                  <option>甘肃省</option>
                  <option>青海省</option>
                  <option>台湾省</option>
                  <optgroup label="自治区">
                    <option>内蒙古自治区</option>
                    <option>广西壮族自治区</option>
                    <option>西藏自治区</option>
                    <option>宁夏回族自治区</option>
                    <option>新疆维吾尔自治区</option>
                  </optgroup>
                  <optgroup label="特别行政区">
                    <option>香港特别行政区</option>
                    <option>澳门特别行政区</option>
                  </optgroup>
                </select>
              </label>
            </div>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>所在地：</dt>
          <dd>
            <div class="nova-select-label nova-select-label-orange">
              <label>
                <select name="type1">
                  <optgroup label="直辖市">
                    <option value="110000">北京市</option>
                    <option value="120000">天津市</option>
                    <option value="310000">上海市</option>
                    <option value="500000">重庆市</option>
                  </optgroup>
                  <option>河北省</option>
                  <option>山西省</option>
                  <option>辽宁省</option>
                  <option>吉林省</option>
                  <option>黑龙江省</option>
                  <option>江苏省</option>
                  <option>浙江省</option>
                  <option>安徽省</option>
                  <option>福建省</option>
                  <option>江西省</option>
                  <option>山东省</option>
                  <option>河南省</option>
                  <option>湖北省</option>
                  <option>湖南省</option>
                  <option>广东省</option>
                  <option>海南省</option>
                  <option>四川省</option>
                  <option>贵州省</option>
                  <option>云南省</option>
                  <option>陕西省</option>
                  <option>甘肃省</option>
                  <option>青海省</option>
                  <option>台湾省</option>
                  <optgroup label="自治区">
                    <option>内蒙古自治区</option>
                    <option>广西壮族自治区</option>
                    <option>西藏自治区</option>
                    <option>宁夏回族自治区</option>
                    <option>新疆维吾尔自治区</option>
                  </optgroup>
                  <optgroup label="特别行政区">
                    <option>香港特别行政区</option>
                    <option>澳门特别行政区</option>
                  </optgroup>
                </select>
              </label>
            </div>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>禁用的：</dt>
          <dd>
            <div class="nova-select-label">
              <label>
                <select name="type2" disabled="disabled">
                  <optgroup label="直辖市">
                    <option value="110000">北京市</option>
                    <option value="120000">天津市</option>
                    <option value="310000">上海市</option>
                    <option value="500000">重庆市</option>
                  </optgroup>
                  <option>河北省</option>
                  <option>山西省</option>
                  <option>辽宁省</option>
                  <option>吉林省</option>
                  <option>黑龙江省</option>
                  <option>江苏省</option>
                  <option>浙江省</option>
                  <option>安徽省</option>
                  <option>福建省</option>
                  <option>江西省</option>
                  <option>山东省</option>
                  <option>河南省</option>
                  <option>湖北省</option>
                  <option>湖南省</option>
                  <option>广东省</option>
                  <option>海南省</option>
                  <option>四川省</option>
                  <option>贵州省</option>
                  <option>云南省</option>
                  <option>陕西省</option>
                  <option>甘肃省</option>
                  <option>青海省</option>
                  <option>台湾省</option>
                  <optgroup label="自治区">
                    <option>内蒙古自治区</option>
                    <option>广西壮族自治区</option>
                    <option>西藏自治区</option>
                    <option>宁夏回族自治区</option>
                    <option>新疆维吾尔自治区</option>
                  </optgroup>
                  <optgroup label="特别行政区">
                    <option>香港特别行政区</option>
                    <option>澳门特别行政区</option>
                  </optgroup>
                </select>
              </label>
            </div>
          </dd>
        </dl>
        <!--<dl class="clearfix">
            <dt>请选择需要发送的签注材料类型：</dt>
            <dd>
                <label class="nova-checkbox-label nova-checkbox-label-bordered">
                    <input type="checkbox" name="type" value="0">
                    <span class="nova-checkbox-text">
                    在职人员
                </span>
                </label>
                <label class="nova-checkbox-label nova-checkbox-label-bordered">
                    <input type="checkbox" name="type" value="1">
                    <span class="nova-checkbox-text">
                    退休人员
                </span>
                </label>
                <label class="nova-checkbox-label nova-checkbox-label-bordered">
                    <input type="checkbox" name="type" value="2">
                    <span class="nova-checkbox-text">
                    在校学生
                </span>
                </label>
                <label class="nova-checkbox-label nova-checkbox-label-bordered">
                    <input type="checkbox" name="type" value="3">
                    <span class="nova-checkbox-text">
                    自由职业者
                </span>
                </label>
                <label class="nova-checkbox-label nova-checkbox-label-bordered">
                    <input type="checkbox" name="type" value="4">
                    <span class="nova-checkbox-text">
                    学龄前儿童
                </span>
                </label>
            </dd>
        </dl>-->
        <dl class="clearfix">
          <dt>单选：</dt>
          <dd>
            <div class="nova-radio-group">
              <label class="nova-radio-label nova-radio-label-bordered">
                <input type="radio" name="type" value="0">
                <span class="nova-radio-text">
                        在职人员
                    </span>
              </label>
              <label class="nova-radio-label nova-radio-label-bordered">
                <input type="radio" name="type" value="1">
                <span class="nova-radio-text">
                        退休人员
                    </span>
              </label>
              <label class="nova-radio-label nova-radio-label-bordered">
                <input type="radio" name="type" value="2">
                <span class="nova-radio-text">
                        在校学生
                    </span>
              </label>
              <label class="nova-radio-label nova-radio-label-bordered">
                <input type="radio" name="type" value="3">
                <span class="nova-radio-text">
                        自由职业者
                    </span>
              </label>
              <label class="nova-radio-label nova-radio-label-bordered">
                <input type="radio" name="type" value="4">
                <span class="nova-radio-text">
                        学龄前儿童
                    </span>
              </label>
            </div>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt></dt>
          <dd>
            <span class="btn btn-orange" id="render">渲染</span>
            <span class="btn" id="unrender">还原</span>
            <span class="btn btn-blue" id="submit">提交</span>
          </dd>
        </dl>
      </form>
    </div>
    <div class="section">
<pre>
<code>
&lt;div class="nova-number-box"&gt;
    &lt;div class="nova-number-box-subtract"&gt;&lt;i&gt;&lt;/i&gt;&lt;/div&gt;
    &lt;input value="9" type="text" data-max="9" data-min="0"&gt;
    &lt;div class="nova-number-box-add"&gt;&lt;i&gt;&lt;/i&gt;&lt;/div&gt;
&lt;/div&gt;
</code>
</pre>
    </div>
    <div class="section">

      <div class="number-box-group clearfix">
        <div class="nova-number-box">
          <div class="nova-number-box-subtract"><i></i></div>
          <input value="0" type="text" data-max="9" data-min="0">
          <div class="nova-number-box-add"><i></i></div>
        </div>
        <em>$110</em>
      </div>
      <div class="nova-number-boxes clearfix">
        <div class="nova-number-box">
          <div class="nova-number-box-subtract"><i></i></div>
          <input value="9" type="text" data-max="9" data-min="0">
          <div class="nova-number-box-add"><i></i></div>
        </div>
      </div>
      <div class="btn JS_number_box_add">添加</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'ui'
  }

  require('script-loader!../../../static/js/ui')
  require('script-loader!../../../static/doc/ui')
</script>

<style lang="scss">

  @import "/static/assert/css/buttons.css";
  @import "/static/assert/css/ui.css";

</style>
