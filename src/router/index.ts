import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HeaderAsideLayout from '@/layout/HeaderAsideLayout'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'HeaderAsideLayout',
    component: HeaderAsideLayout,
    redirect: '/articleManager',
    children: [
      {
        path: '/articleManager',
        name: 'ArticleManager',
        component: () => import(/* webpackChunkName: "ArticleManager" */ '../views/ArticleManager'),
      },
      {
        path: '/articleManager/add',
        name: 'AddArticle',
        component: () =>
          import(/* webpackChunkName: "AddArticle" */ '../views/ArticleManager/AddArticle.vue'),
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
