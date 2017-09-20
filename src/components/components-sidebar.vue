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
      name: 'Components',
      value: '组件',
      children: [
        {
          name: 'General',
          value: '通用',
          path: 'components',
          children: [
            {
              name: 'Icon', value: 'icon', link: 'icon'
            },
            {
              name: 'Button', value: 'button', link: 'button'
            },
            {
              name: 'Tips', value: 'tips', link: 'tips'
            }]
        },
        {
          name: 'Data Entry',
          value: '数据输入',
          path: 'components',
          children: [
            {
              name: 'Calendar', value: 'calendar', link: 'calendar'
            },
            {
              name: 'UI', value: 'ui', link: 'ui'
            }
          ]
        },
        {
          name: 'Feedback',
          value: '反馈',
          path: 'components',
          children: [
            {
              name: 'Dialog', value: 'dialog', link: 'dialog'
            }
          ]
        },
        {
          name: 'Other',
          value: '其他',
          path: 'components',
          children: [
            {
              name: 'Validate', value: 'validate', link: 'validate'
            },
            {
              name: 'Pinyin', value: 'pinyin', link: 'pinyin'
            }
          ]
        }
      ]
    },
    {
      name: 'Solution',
      value: '解决方案',
      path: 'components',
      children: [
        {
          name: 'Font Family', value: 'font family', link: 'font-family'
        },
        {
          name: 'Retina', value: 'retina', link: 'retina'
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
