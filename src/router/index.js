import Vue from 'vue'
import Router from 'vue-router'

import componentsHome from '@/components/components/home'
import components from '@/components/components'
import button from '@/components/components/button'
import calendar from '@/components/components/calendar'
import calendarSetting from '@/components/components/calendar/setting'
import calendarAPI from '@/components/components/calendar/api'
import calendarBirthday from '@/components/components/calendar/birthday'
import calendarBirthdayHome from '@/components/components/calendar/birthday/home'
import calendarBirthdayVST from '@/components/components/calendar/birthday/vst'
import calendarFourMonth from '@/components/components/calendar/four-month'
import calendarSmall from '@/components/components/calendar/small'
import calendarSmallBimonthly from '@/components/components/calendar/small-bimonthly'
import calendarBig from '@/components/components/calendar/big'
import calendarBigBimonthly from '@/components/components/calendar/big-bimonthly'
import calendarFloatSmall from '@/components/components/calendar/float-small'
import calendarFloatSmallBimonthly from '@/components/components/calendar/float-small-bimonthly'
import calendarFloatBigBimonthly from '@/components/components/calendar/float-big-bimonthly'
import calendarFloatBimonthlyCascading from '@/components/components/calendar/float-bimonthly-cascading'
import calendarFloatCascading from '@/components/components/calendar/float-cascading'
import calendarVacation from '@/components/components/calendar/vacation'
import calendarDistribution from '@/components/components/calendar/distribution'
import calendarGroupon from '@/components/components/calendar/groupon'
import navScroll from '@/components/components/nav-scroll'
import dialog from '@/components/components/dialog'
import dialogIframe from '@/components/components/dialog/iframe'
import fontFamily from '@/components/components/font-family'
import icon from '@/components/components/icon'
import pinyin from '@/components/components/pinyin'
import retina from '@/components/components/retina'
import tips from '@/components/components/tips'
import ui from '@/components/components/ui'
import validate from '@/components/components/validate'
import validateSetting from '@/components/components/validate/setting'

import guide from '@/components/guide'
import guideHome from '@/components/guide/home'
import guideCommon from '@/components/guide/common'
import guideRule from '@/components/guide/rule'
import guideLoadingIcon from '@/components/guide/loading-icon'

import reference from '@/components/reference'
import referenceHome from '@/components/reference/home'
import referenceSelectorsLevel3 from '@/components/reference/selectors-level-3'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/components'
    },
    {
      path: '/components/dialog/iframe',
      name: 'dialogIframe',
      component: dialogIframe
    },
    {
      path: '/components',
      component: components,
      children: [
        {path: '', component: componentsHome},
        {path: 'button', component: button},
        {path: 'calendar', component: calendar},
        {path: 'calendar/settings', component: calendarSetting},
        {path: 'calendar/api', component: calendarAPI},
        {path: 'calendar/birthday', component: calendarBirthday},
        {path: 'calendar/birthday/home', component: calendarBirthdayHome},
        {path: 'calendar/birthday/vst', component: calendarBirthdayVST},
        {path: 'calendar/birthday', component: calendarBirthday},
        {path: 'calendar/four-month', component: calendarFourMonth},
        {path: 'calendar/small', component: calendarSmall},
        {path: 'calendar/small-bimonthly', component: calendarSmallBimonthly},
        {path: 'calendar/big', component: calendarBig},
        {path: 'calendar/big-bimonthly', component: calendarBigBimonthly},
        {path: 'calendar/float-small', component: calendarFloatSmall},
        {path: 'calendar/float-small-bimonthly', component: calendarFloatSmallBimonthly},
        {path: 'calendar/float-big-bimonthly', component: calendarFloatBigBimonthly},
        {path: 'calendar/float-bimonthly-cascading', component: calendarFloatBimonthlyCascading},
        {path: 'calendar/float-cascading', component: calendarFloatCascading},
        {path: 'calendar/vacation', component: calendarVacation},
        {path: 'calendar/distribution', component: calendarDistribution},
        {path: 'calendar/groupon', component: calendarGroupon},
        {path: 'nav-scroll', component: navScroll},
        {path: 'dialog', component: dialog},
        {path: 'font-family', component: fontFamily},
        {path: 'icon', component: icon},
        {path: 'pinyin', component: pinyin},
        {path: 'retina', component: retina},
        {path: 'tips', component: tips},
        {path: 'ui', component: ui},
        {path: 'validate', component: validate},
        {path: 'validate/setting', component: validateSetting}
      ]
    },
    {
      path: '/guide',
      component: guide,
      children: [
        {path: '', component: guideHome},
        {path: 'common', component: guideCommon},
        {path: 'rule', component: guideRule},
        {path: 'loading-icon', component: guideLoadingIcon}
      ]
    },
    {
      path: '/reference',
      component: reference,
      children: [
        {path: '', component: referenceHome},
        {path: 'selectors-level-3', component: referenceSelectorsLevel3}
      ]
    }
  ]
})
