import { createRouter, createWebHistory } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router'; // тип для хуков
import BooksList from '@/pages/home/booksList.vue';
import FormAdd from '@/features/add-book/formAdd.vue';
import FormEdit from '@/features/edit-book/formEdit.vue'; // если есть

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: BooksList },
    { path: '/add', component: FormAdd },
    { path: '/edit/:id', component: FormEdit }
  ]
});

// Хук после каждого перехода
router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const ymFunction = (window as any).ym;

  if (ymFunction && typeof ymFunction === 'function' && to.path !== from.path) {
    console.log('Яндекс Метрика: отправка hit для', to.fullPath); // для отладки
    ymFunction(108437493, 'hit', to.fullPath);
  }
});

export default router;
