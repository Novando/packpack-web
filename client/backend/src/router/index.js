import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ManageUsers from '@/views/ManageUsers.vue'
import Products from '@/views/Products.vue'
import ProductAttributes from '@/views/ProductAttributes.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'ManageUsers',
    component: ManageUsers
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/products-atrb',
    name: 'ProductAttributes',
    component: ProductAttributes
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
