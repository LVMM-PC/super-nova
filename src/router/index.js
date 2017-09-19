import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import plugins from '@/components/plugins'
import guide from '@/components/guide'
import button from '@/components/button'

const UserHome = { template: '<div>Home content</div>' }
const UserProfile = { template: '<div>Profile content</div>' }
const UserPosts = { template: '<div>Posts content</div>' }

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
        // UserHome will be rendered inside User's <router-view>
        // when /user/:id is matched
        { path: '', component: UserHome },

        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        { path: 'profile', component: UserProfile },

        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        { path: 'posts', component: UserPosts },
        { path: 'button', component: button }
      ]
    },
    {
      path: '/guide',
      name: 'guide',
      component: guide
    }
  ]
})
