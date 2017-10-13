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
              name: 'Icon', value: 'Icon<small>图标</small>', link: 'icon'
            },
            {
              name: 'Button', value: 'Button<small>按钮</small>', link: 'button'
            },
            {
              name: 'Tips', value: 'Tips<small>提示</small>', link: 'tips'
            }]
        },
        {
          name: 'Data Entry',
          value: '数据输入',
          path: 'components',
          children: [
            {
              name: 'Calendar', value: 'Calendar<small>日历</small>', link: 'calendar'
            },
            {
              name: 'UI', value: 'UI<small>控件</small>', link: 'ui'
            }
          ]
        },
        {
          name: 'Feedback',
          value: '反馈',
          path: 'components',
          children: [
            {
              name: 'Dialog', value: 'Dialog<small>弹框</small>', link: 'dialog'
            }
          ]
        },
        {
          name: 'Other',
          value: '其他',
          path: 'components',
          children: [
            {
              name: 'Validate', value: 'Validate<small>表单验证</small>', link: 'validate'
            },
            {
              name: 'Pinyin', value: 'Pinyin<small>拼音</small>', link: 'pinyin'
            },
            {
              name: 'NavScroll', value: 'Nav scroll<small>导航跟随</small>', link: 'nav-scroll'
            },
            {
              name: 'map', value: 'Map<small>地图</small>', link: 'map'
            }
          ]
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
