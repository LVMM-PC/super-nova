<template>
  <div class="super-sidebar">
    <ul class="list">
      <li>
        <div class="super-sidebar-toggle"><h4>组件</h4></div>
        <ul class="super-sidebar-dropdown">
          <li>
            <div class="super-sidebar-toggle">通用</div>
            <ul class="super-sidebar-dropdown">
              <li><a href="/components/icon">icon</a></li>
              <li><a href="/components/button">button</a></li>
              <li><a href="/components/tips">tips</a></li>
            </ul>
          </li>
          <li>
            <div class="super-sidebar-toggle">数据输入</div>
            <ul class="super-sidebar-dropdown">
              <li><a href="/components/calendar">calendar</a></li>
              <li><a href="/components/ui">ui</a></li>
            </ul>
          </li>
          <li>
            <div class="super-sidebar-toggle">反馈</div>
            <ul class="super-sidebar-dropdown">
              <li><a href="/components/dialog">dialog</a></li>
            </ul>
          </li>
          <li>
            <div class="super-sidebar-toggle">其他</div>
            <ul class="super-sidebar-dropdown">
              <li><a href="/components/validate">validate</a></li>
              <li><a href="/components/pinyin">pinyin</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <div class="super-sidebar-toggle"><h4>解决方案</h4></div>
        <ul class="super-sidebar-dropdown">
          <li><a href="/components/font-family">font family</a></li>
          <li><a href="/components/retina">retina</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'components-sidebar'
  }
</script>
