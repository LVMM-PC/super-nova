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
          name: 'Rule',
          value: 'Rule<small>规范</small>',
          path: 'rule',
          link: 'rule'
        },
        {
          name: 'Common',
          value: 'Common<small>公共模块</small>',
          path: 'common',
          link: 'common'
        },
        {
          name: 'loading-icon',
          value: 'Loading Icon<small>加载图标</small>',
          path: 'loading-icon',
          link: 'loading-icon'
        },
        {
          name: 'Font Family', value: 'Font family<small>字体</small>', link: 'font-family'
        },
        {
          name: 'Retina', value: 'Retina<small>高分屏</small>', link: 'retina'
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
