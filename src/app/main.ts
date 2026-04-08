import './style.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '../router';

const app = createApp(App);
app.use(createPinia());
app.use(router);

router.isReady().then(() => {
  if (!sessionStorage.getItem('session_started')) {
    sessionStorage.setItem('session_started', 'true');

    if ((window as any).ym) {
      (window as any).ym(108437493, 'reachGoal', 'session_start');
    }
  }

  app.mount('#app');
});