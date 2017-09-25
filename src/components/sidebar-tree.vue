<template>
  <li v-bind:class="{active:model.link && new RegExp('^\/'+parent.path+'\/'+model.link).test($route.fullPath)}">
    <a class="super-sidebar-toggle" v-bind:href="'/'+parent.path+'/'+model.link" v-if="model.link"
    v-html="model.value">
    </a>
    <div class="super-sidebar-toggle" v-else v-html="model.value"></div>
    <ul v-if="model.children" class="super-sidebar-dropdown">
      <sidebar-tree v-for="node in model.children" :key="node.name" :model="node" :parent="model"></sidebar-tree>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'sidebar-tree',
    props: ['model', 'parent']
  }
</script>
