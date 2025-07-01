import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/dashboard.vue'
import Auth from '../views/Auth.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth"

const routes = [
  { path: '/', redirect: '/auth' },
  { path: '/auth', component: Auth },
  { path: '/dashboard', component: Dashboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 🔐 Middleware auth: tunggu status user benar-benar dimuat
router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const protectedRoutes = ['/dashboard'];

  let unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe(); // berhenti setelah satu kali cek

    if (protectedRoutes.includes(to.path) && !user) {
      next('/auth');
    } else {
      next();
    }
  });
});

export default router;
