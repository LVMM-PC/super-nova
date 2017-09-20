import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import componentsHome from '@/components/components/home'
import components from '@/components/components'
import button from '@/components/components/button'
import calendar from '@/components/components/calendar'
import dialog from '@/components/components/dialog'
import fontFamily from '@/components/components/font-family'
import icon from '@/components/components/icon'
import pinyin from '@/components/components/pinyin'
import retina from '@/components/components/retina'
import tips from '@/components/components/tips'
import ui from '@/components/components/ui'
import validate from '@/components/components/validate'
import guide from '@/components/guide'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/components',
      component: components,
      children: [
        {path: '', component: componentsHome},
        {path: 'button', component: button},
        {path: 'calendar', component: calendar},
        {path: 'dialog', component: dialog},
        {path: 'font-family', component: fontFamily},
        {path: 'icon', component: icon},
        {path: 'pinyin', component: pinyin},
        {path: 'retina', component: retina},
        {path: 'tips', component: tips},
        {path: 'ui', component: ui},
        {path: 'validate', component: validate}
      ]
    },
    {
      path: '/guide',
      name: 'guide',
      component: guide
    }
  ]
})
