<template>
  <div id="app">
    <header class="super-header">
      <h1><a href="/">NOVA</a></h1>
    </header>
    <div class="super-sidebar">
      <div class="list">
        <ul>
          <li><a href="/#/button">button</a></li>
          <li><a href="/#/dialog">dialog</a></li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
    <footer class="super-footer">copy right @copy;</footer>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  .super-header {
    background-color: #ccc;
  }

  .super-footer {
    background-color: #ccc;
  }
</style>
