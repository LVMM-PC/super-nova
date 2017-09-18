import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import button from '@/components/button'
import dialog from '@/components/dialog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/button',
      name: 'button',
      component: button
    },
    {
      path: '/dialog',
      name: 'dialog',
      component: dialog
    }
  ]
})
