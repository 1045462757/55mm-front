import Vue from 'vue'
import Router from 'vue-router'
import ActionDetails from '@/components/action/ActionDetails'
import Main from '@/components/action/Main'
import WriteAction from '@/components/action/WriteAction'
import About from '@/components/general/About'
import UserDetails from '@/components/user/UserDetails'
import UserMain from '@/components/user/UserMain'

import User from '@/components/user/User'
import ModifyPassword from '@/components/user/ModifyPassword'
import MyActions from '@/components/user/MyActions'

import Message from '@/components/message/Message'
import MessageForWatcher from '@/components/message/MessageForWatcher'
import MessageForAuthor from '@/components/message/MessageForAuthor'

import MyCollection from "@/components/user/MyCollection"
import MyFocus from "@/components/user/MyFocus"
import MyFans from "@/components/user/MyFans"

import Admin from "@/components/admin/Admin"

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
      meta: {
        requireAuth: true
      },
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
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        requireAuth: true
      },
      children: [{
        path: 'information',
        component: UserMain,
        meta: {
          requireAuth: true
        },
      }, {
        path: 'modifyPassword',
        component: ModifyPassword,
        meta: {
          requireAuth: true
        },
      }, {
        path: 'myActions',
        component: MyActions,
        meta: {
          requireAuth: true
        },
      }, {
        path: 'collections',
        component: MyCollection,
        meta: {
          requireAuth: true
        },
      }, {
        path: 'focus',
        component: MyFocus,
        meta: {
          requireAuth: true
        },
      }, {
        path: 'fans',
        component: MyFans,
        meta: {
          requireAuth: true
        },
      }]
    },
    {
      path: '/message',
      component: Message,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'forWatcher',
          component: MessageForWatcher,
          meta: {
            requireAuth: true
          },
        },
        {
          path: 'forAuthor',
          component: MessageForAuthor,
          meta: {
            requireAuth: true
          },
        }
      ]
    },
    {
      path: "/admin",
      component: Admin,
      meta: {
        requireAuth: true
      }
    }
  ]
})
