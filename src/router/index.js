import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import button from '@/components/button'

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
      path: '/button',
      name: 'button',
      component: button
    }
  ]
})
