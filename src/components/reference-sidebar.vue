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
      name: 'Reference',
      value: '参考文档',
      path: 'reference',
      children: [
        {
          name: 'Selectors Level 3',
          value: 'Selectors Level 3',
          link: 'selectors-level-3'
        }
      ]
    }
  ]
  export default {
    value: 'components-sidebar',
    components: {sidebarTree},
    data () {
      return {
        models: data
      }
    }
  }
</script>
