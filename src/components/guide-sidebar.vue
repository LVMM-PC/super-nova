<template>
  <div class="super-sidebar">
    <ul class="list">
      <sidebar-tree v-for="node in models" :key="node.name" :model="node"></sidebar-tree>
    </ul>
  </div>
</template>

<script>
  import sidebarTree from '@/components/sidebar-tree'

  var data = [
    {
      name: 'Guide',
      value: '指南',
      path: 'guide',
      children: [
        {
          name: 'Common',
          value: '公共模块',
          path: 'common',
          link: 'common'
        },
        {
          name: 'Rule',
          value: '规范',
          path: 'rule',
          link: 'rule'
        },
        {
          name: 'loading-icon',
          value: 'loading图标',
          path: 'loading-icon',
          link: 'loading-icon'
        }
      ]
    }
  ]
  export default {
    value: 'guide-sidebar',
    components: {sidebarTree},
    data () {
      return {
        models: data
      }
    }
  }
</script>
