import Vue from 'vue'
import Router from 'vue-router'
import ActionDetails from '@/components/ActionDetails'
import Main from '@/components/Main'
import Write from '@/components/WriteBlog'
import About from '@/components/About'
import UserDetails from '@/components/UserDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/actionDetails',
      name: 'ActionDetails',
      component: ActionDetails,
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
    },
    {
      path: '/write',
      name: 'Write',
      component: Write,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/userDetails',
      name: 'UserDetails',
      component: UserDetails,
    },
  ]
})
