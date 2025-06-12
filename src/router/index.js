import { createRouter, createWebHistory } from 'vue-router'
import dashboard from '../views/dashboard.vue'


const routes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', component: dashboard },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
  })

export default router   
