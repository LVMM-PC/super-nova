<template>
  <div id="everything">

    <h1>Pinyin</h1>

    <h2>引用</h2>
    <div>
      <ul>
        <li>
          <a href="http://pic.lvmama.com/js/lv/pinyin.js" target="_blank">http://pic.lvmama.com/min/index.php?f=/js/lv/pinyin.js</a>
        </li>
      </ul>
    </div>

    <h2>调用方式</h2>
    <pre>
            <code class="js">
            var py = novaPinyin();

            //1.获取汉字拼音：默认不支持多音字、以空格分隔
            py.getPinyin("我知道那些夏天就像青春一样回不来");
            // wo zhi dao na xie xia tian jiu xiang qing chun yi yang hui bu lai

            //2.获取汉字拼音：默认不支持多音字，不分隔
            py.getPinyin("代替梦想的也只能是勉为其难", { separator : "" });
            //daitimengxiangdeyezhinengshimianweiqinan

            //3.获取汉字拼音：默认不支持多音字，以"-"分隔
            py.getPinyin("我知道这个世界每天都有太多遗憾", { separator : "-" });
            // wo-zhi-dao-zhe-ge-shi-jie-mei-tian-dou-you-tai-duo-yi-han

            //4.获取汉字拼音：支持多音字、返回每个字的所有拼音
            py.getPinyin("所以你好再见", { isPolyphone : true });
            // [{"所":"suo"},{"以":"yi"},{"你":"ni"},{"好":"hao"},{"再":"zai"},{"见":"xian,jian"}]

            //5.测试复姓：若为复姓返回复姓拼音，若为单姓返回空字符串
            py.getFuxingPinyin("令狐冲");
            // linghu

            </code>
        </pre>

    <h2>实例</h2>
    <h3>汉字转拼音：不支持多音字</h3>
    <div class="section">
      <input type="text" class="pinyin-input" value="我知道那些夏天就像青春一样回不来">
      <p class="pinyin-result">wo zhi dao na xie xia tian jiu xiang qing chun yi yang hui bu lai</p>
    </div>

    <h3>汉字转拼音：支持多音字</h3>
    <div class="section">
      <input type="text" class="pinyin-polyphone-input" value="所以你好再见">
      <p class="pinyin-polyphone-result">
        [{"所":"suo"},{"以":"yi"},{"你":"ni"},{"好":"hao"},{"再":"zai"},{"见":"xian,jian"}]</p>
    </div>

    <h3>复姓测试</h3>
    <div class="section">
      <input type="text" class="fuxing-input" value="令狐冲">
      <p class="fuxing-result">复姓：linghu</p>
    </div>

    <h3>姓名处理（支持多音字选择）</h3>
    <div class="section">
      <input type="text" class="name-input" value="令狐冲">
      <p>
        <input type="text" class="xing-result" value="linghu">
        <input type="text" class="ming-result" value="chong">
      </p>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'pinyin'
  }
  require('script-loader!../../../static/doc/navigation')
  require('script-loader!../../../static/js/pinyin')
  require('script-loader!../../../static/doc/pinyin')
</script>

<style lang="scss">
  @import "../../assets/scss/doc.scss";

</style>
