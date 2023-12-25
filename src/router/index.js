import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../views/admin/admin-layout.vue'
import HomeView from '../views/home-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      children: [
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/admin/products-view.vue')
        },
        {
          path: 'products/:id',
          name: 'edit-product',
          component: () => import('../views/admin/edit-product-view.vue')
        },
        {
          path: 'new-product',
          name: 'new-product',
          component: () => import('../views/admin/new-product-view.vue')
        },
        {
          path: 'sales',
          name: 'sales',
          component: () => import('../views/admin/sales-view.vue')
        },
        {
          path: 'seeder',
          name: 'seeder',
          component: () => import('../views/admin/seeder-view.vue')
        }
      ]
    }
  ]
})

export default router