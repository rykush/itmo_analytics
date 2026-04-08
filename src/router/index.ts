import { createRouter, createWebHistory } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';
import FormAdd from '@/features/add-book/formAdd.vue';
import FormEdit from '@/features/edit-book/formEdit.vue';
import Welcome from '@/pages/welcome/Welcome.vue';
import Home from '@/pages/home/Home.vue';

const router = createRouter({
  history: createWebHistory('/itmo_analytics/'),
  routes: [
    { path: '/', component: Home },
    { path: '/welcome', component: Welcome },
    { path: '/add', component: FormAdd },
    { path: '/edit/:id', component: FormEdit }
  ]
});
router.beforeEach((to, _from, next) => {
  console.log('GUARD WORKS →', to.path);

  const isFirstVisit = !localStorage.getItem('visited');

  if (isFirstVisit && to.path !== '/welcome') {
    return next('/welcome');
  }

  next();
});

router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const ymFunction = (window as any).ym;

  if (ymFunction && typeof ymFunction === 'function' && to.path !== from.path) {
    console.log('Яндекс Метрика: отправка hit для', to.fullPath);
    ymFunction(108437493, 'hit', to.fullPath);
  }
});

export default router;
