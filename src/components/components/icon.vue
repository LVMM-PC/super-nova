<template>
  <div id="everything">

    <ih1 :model="{value: 'Icons'}"></ih1>

    <ih2 :model="{value: '引用'}"></ih2>
    <section>
      <ul>
        <li>
          <a href="http://pic.lvmama.com/styles/lv/icons.css" target="_blank">http://pic.lvmama.com/min/index.php?f=/styles/lv/icons.css</a>
        </li>
      </ul>
    </section>

    <ih2 :model="{value: '预览'}"></ih2>

    <ih3 :model="{value: '警示类图标'}"></ih3>
    <section>

      <h4>48*48</h4>
      <div>
        <span class="nova-icon-xl nova-icon-success"></span>
        <span class="nova-icon-xl nova-icon-error"></span>
        <span class="nova-icon-xl nova-icon-warning"></span>
        <span class="nova-icon-xl nova-icon-info"></span>
        <span class="nova-icon-xl nova-icon-help"></span>
      </div>
      <div>
        <span class="nova-icon-outline-xl nova-icon-success"></span>
        <span class="nova-icon-outline-xl nova-icon-error"></span>
        <span class="nova-icon-outline-xl nova-icon-warning"></span>
        <span class="nova-icon-outline-xl nova-icon-info"></span>
        <span class="nova-icon-outline-xl nova-icon-help"></span>
      </div>

      <h4>32*32</h4>
      <div>
        <span class="nova-icon-lg nova-icon-success"></span>
        <span class="nova-icon-lg nova-icon-error"></span>
        <span class="nova-icon-lg nova-icon-warning"></span>
        <span class="nova-icon-lg nova-icon-info"></span>
        <span class="nova-icon-lg nova-icon-help"></span>
      </div>
      <div>
        <span class="nova-icon-outline-lg nova-icon-success"></span>
        <span class="nova-icon-outline-lg nova-icon-error"></span>
        <span class="nova-icon-outline-lg nova-icon-warning"></span>
        <span class="nova-icon-outline-lg nova-icon-info"></span>
        <span class="nova-icon-outline-lg nova-icon-help"></span>
      </div>

      <h4>24*24</h4>
      <div>
        <span class="nova-icon nova-icon-success"></span>
        <span class="nova-icon nova-icon-error"></span>
        <span class="nova-icon nova-icon-warning"></span>
        <span class="nova-icon nova-icon-info"></span>
        <span class="nova-icon nova-icon-help"></span>
      </div>
      <div>
        <span class="nova-icon-outline nova-icon-success"></span>
        <span class="nova-icon-outline nova-icon-error"></span>
        <span class="nova-icon-outline nova-icon-warning"></span>
        <span class="nova-icon-outline nova-icon-info"></span>
        <span class="nova-icon-outline nova-icon-help"></span>
      </div>

      <h4>18*18</h4>
      <div>
        <span class="nova-icon-sm nova-icon-success"></span>
        <span class="nova-icon-sm nova-icon-error"></span>
        <span class="nova-icon-sm nova-icon-warning"></span>
        <span class="nova-icon-sm nova-icon-info"></span>
        <span class="nova-icon-sm nova-icon-help"></span>
      </div>
      <div>
        <span class="nova-icon-outline-sm nova-icon-success"></span>
        <span class="nova-icon-outline-sm nova-icon-error"></span>
        <span class="nova-icon-outline-sm nova-icon-warning"></span>
        <span class="nova-icon-outline-sm nova-icon-info"></span>
        <span class="nova-icon-outline-sm nova-icon-help"></span>
      </div>

      <h4>14*14</h4>
      <div>
        <span class="nova-icon-xs nova-icon-success"></span>
        <span class="nova-icon-xs nova-icon-error"></span>
        <span class="nova-icon-xs nova-icon-warning"></span>
        <span class="nova-icon-xs nova-icon-info"></span>
        <span class="nova-icon-xs nova-icon-help"></span>
      </div>
      <div>
        <span class="nova-icon-outline-xs nova-icon-success"></span>
        <span class="nova-icon-outline-xs nova-icon-error"></span>
        <span class="nova-icon-outline-xs nova-icon-warning"></span>
        <span class="nova-icon-outline-xs nova-icon-info"></span>
        <span class="nova-icon-outline-xs nova-icon-help"></span>
      </div>

    </section>
    <h4>图文混排</h4>
    <section style="font-family: SimSun, sans-serif">

      <p style="line-height: 20px; font-size: 10px;">中文<span class="nova-icon-xs nova-icon-success"></span>English</p>
      <p style="line-height: 40px; font-size: 20px;">中文<span class="nova-icon-xs nova-icon-success"></span>English</p>
      <p style="line-height: 60px; font-size: 30px;">中文<span class="nova-icon-xs nova-icon-success"></span>English</p>
      <p style="line-height: 80px; font-size: 40px;">中文<span class="nova-icon-xs nova-icon-success"></span>English</p>
    </section>
    <section>
      <table class="table-border">
        <colgroup>
          <col width="20%">
          <col width="16%">
          <col width="16%">
          <col width="16%">
          <col width="16%">
          <col width="16%">
        </colgroup>
        <tr>
          <td></td>
          <td><code>.nova-icon-success</code></td>
          <td><code>.nova-icon-error</code></td>
          <td><code>.nova-icon-warning</code></td>
          <td><code>.nova-icon-info</code></td>
          <td><code>.nova-icon-help</code></td>
        </tr>
        <tr>
          <td><code>.nova-icon-xl</code></td>
          <td><span class="nova-icon-xl nova-icon-success"></span></td>
          <td><span class="nova-icon-xl nova-icon-error"></span></td>
          <td><span class="nova-icon-xl nova-icon-warning"></span></td>
          <td><span class="nova-icon-xl nova-icon-info"></span></td>
          <td><span class="nova-icon-xl nova-icon-help"></span></td>
        </tr>
        <tr>
          <td><code>.nova-icon-lg</code></td>
          <td><span class="nova-icon-lg nova-icon-success"></span></td>
          <td><span class="nova-icon-lg nova-icon-error"></span></td>
          <td><span class="nova-icon-lg nova-icon-warning"></span></td>
          <td><span class="nova-icon-lg nova-icon-info"></span></td>
          <td><span class="nova-icon-lg nova-icon-help"></span></td>
        </tr>
        <tr>
          <td><code>.nova-icon</code></td>
          <td><span class="nova-icon nova-icon-success"></span></td>
          <td><span class="nova-icon nova-icon-error"></span></td>
          <td><span class="nova-icon nova-icon-warning"></span></td>
          <td><span class="nova-icon nova-icon-info"></span></td>
          <td><span class="nova-icon nova-icon-help"></span></td>
        </tr>
        <tr>
          <td><code>.nova-icon-sm</code></td>
          <td><span class="nova-icon-sm nova-icon-success"></span></td>
          <td><span class="nova-icon-sm nova-icon-error"></span></td>
          <td><span class="nova-icon-sm nova-icon-warning"></span></td>
          <td><span class="nova-icon-sm nova-icon-info"></span></td>
          <td><span class="nova-icon-sm nova-icon-help"></span></td>
        </tr>
        <tr>
          <td><code>.nova-icon-xs</code></td>
          <td><span class="nova-icon-xs nova-icon-success"></span></td>
          <td><span class="nova-icon-xs nova-icon-error"></span></td>
          <td><span class="nova-icon-xs nova-icon-warning"></span></td>
          <td><span class="nova-icon-xs nova-icon-info"></span></td>
          <td><span class="nova-icon-xs nova-icon-help"></span></td>
        </tr>
      </table>
    </section>
    <section>
      <table class="table-border">
        <colgroup>
          <col width="20%">
          <col width="16%">
          <col width="16%">
          <col width="16%">
          <col width="16%">
          <col width="16%">
        </colgroup>
        <tr>
          <td></td>
          <td><code>.nova-icon-success</code></td>
          <td><code>.nova-icon-error</code></td>
          <td><code>.nova-icon-warning</code></td>
          <td><code>.nova-icon-info</code></td>
          <td><code>.nova-icon-help</code></td>
        </tr>
        <tr>
          <td><code>.nova-icon-outline-xl</code></td>
          <td><span class="nova-icon-outline-xl nova-icon-success"></span></td>
          <td><span class="nova-icon-outline-xl nova-icon-error"></span></td>
          <td><span class="nova-icon-outline-xl nova-icon-warning"></span></td>
          <td><span class="nova-icon-outline-xl nova-icon-info"></span></td>
          <td><span class="nova-icon-outline-xl nova-icon-help"></span></td>
        </tr>
        <tr>
          <td><code>.nova-icon-outline-lg</code></td>
          <td><span class="nova-icon-outline-lg nova-icon-success"></span></td>
          <td><span class="nova-icon-outline-lg nova-icon-error"></span></td>
          <td><span class="nova-icon-outline-lg nova-icon-warning"></span></td>
          <td><span class="nova-icon-outline-lg nova-icon-info"></span></td>
          <td><span class="nova-icon-outline-lg nova-icon-help"></span></td>
        </tr>
        <tr>
          <td><code>.nova-icon-outline</code></td>
          <td><span class="nova-icon-outline nova-icon-success"></span></td>
          <td><span class="nova-icon-outline nova-icon-error"></span></td>
          <td><span class="nova-icon-outline nova-icon-warning"></span></td>
          <td><span class="nova-icon-outline nova-icon-info"></span></td>
          <td><span class="nova-icon-outline nova-icon-help"></span></td>
        </tr>
        <tr>
          <td><code>.nova-icon-outline-sm</code></td>
          <td><span class="nova-icon-outline-sm nova-icon-success"></span></td>
          <td><span class="nova-icon-outline-sm nova-icon-error"></span></td>
          <td><span class="nova-icon-outline-sm nova-icon-warning"></span></td>
          <td><span class="nova-icon-outline-sm nova-icon-info"></span></td>
          <td><span class="nova-icon-outline-sm nova-icon-help"></span></td>
        </tr>
        <tr>
          <td><code>.nova-icon-outline-xs</code></td>
          <td><span class="nova-icon-outline-xs nova-icon-success"></span></td>
          <td><span class="nova-icon-outline-xs nova-icon-error"></span></td>
          <td><span class="nova-icon-outline-xs nova-icon-warning"></span></td>
          <td><span class="nova-icon-outline-xs nova-icon-info"></span></td>
          <td><span class="nova-icon-outline-xs nova-icon-help"></span></td>
        </tr>
      </table>
    </section>
  </div>
</template>

<script>
  import ih1 from '@/components/ih1'
  import ih2 from '@/components/ih2'
  import ih3 from '@/components/ih3'

  export default {
    name: 'icon',
    components: {
      ih1,
      ih2,
      ih3
    }
  }
</script>

<style lang="scss">

  @import "/static/assert/css/icons.css";


</style>
