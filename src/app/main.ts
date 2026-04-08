import './style.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '../router';

const isFirstVisit = !localStorage.getItem('visited');

if (isFirstVisit) {
  router.push('/welcome');
}

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
