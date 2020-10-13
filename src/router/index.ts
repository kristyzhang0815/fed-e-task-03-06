import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: {
      title: '用户登录',
      authorize: false
    }
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
    meta: {
      authorize: true
    },
    children: [
      {
        path: '',
        name: 'Welcome',
        component: () => import(/* webpackChunkName: "welcome" */ '@/views/welcome/index.vue'),
        meta: {
          title: 'Welcome'
        }
      },
      {
        path: 'Role',
        name: 'Role',
        component: () => import(/* webpackChunkName: "role" */ '@/views/role/index.vue'),
        meta: {
          title: '角色列表'
        }
      },
      {
        path: 'Menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: "menu" */ '@/views/menu/index.vue'),
        meta: {
          title: '菜单列表'
        }
      },
      {
        path: 'Resource',
        name: 'Resource',
        component: () => import(/* webpackChunkName: "resource" */ '@/views/resource/index.vue'),
        meta: {
          title: '资源列表'
        }
      },
      {
        path: 'Courses',
        name: 'Course',
        component: () => import(/* webpackChunkName: "course" */ '@/views/course/index.vue'),
        meta: {
          title: '课程管理'
        }
      },
      {
        path: 'Users',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/index.vue'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'Advertise',
        name: 'Advertise',
        component: () => import(/* webpackChunkName: "advertise" */ '@/views/advertise/index.vue'),
        meta: {
          title: '广告列表'
        }
      },
      {
        path: 'AdvertiseSpace',
        name: 'AdvertiseSpace',
        component: () => import(/* webpackChunkName: "advertisespace" */ '@/views/advertise-space/index.vue'),
        meta: {
          title: '广告位列表'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const authorize = to.matched.some(o => o.meta.authorize)
  if (authorize && !store.state.user.access_token) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

router.afterEach((to) => {
  const title = to.meta.title
  const split = '-'
  const basetitle = document.title.split('-').pop()?.trim()
  if (title) {
    document.title = `${title} ${split} ${basetitle}`
  }
})

export default router
