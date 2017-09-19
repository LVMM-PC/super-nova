import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import plugins from '@/components/plugins'
import button from '@/components/plugins/button'
import dialog from '@/components/plugins/dialog'
import guide from '@/components/guide'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/plugins',
      name: 'plugins',
      component: plugins,
      children: [
        {
          path: 'button',
          component: button
        },
        {
          path: 'dialog',
          component: dialog
        }
      ]
    },
    {
      path: '/guide',
      name: 'guide',
      component: guide
    }
  ]
})
