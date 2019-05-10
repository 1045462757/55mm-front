import Vue from 'vue'
import Router from 'vue-router'
import ActionDetails from '@/components/action/ActionDetails'
import Main from '@/components/action/Main'
import WriteAction from '@/components/action/WriteAction'
import About from '@/components/general/About'
import UserDetails from '@/components/user/UserDetails'
import UserMain from '@/components/user/UserMain'
import test from '@/components/test/test'
import test2 from '@/components/test/test2'

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
      name: 'WriteAction',
      component: WriteAction,
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
    {
      path: '/userMain',
      name: 'UserMain',
      component: UserMain
    },
    {
      path: '/test',
      name: 'test',
      component: test,
    },
    {
      path: '/test2',
      name: 'test2',
      component: test2,
    },
  ]
})
