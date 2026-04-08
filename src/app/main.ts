import './style.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '../router';

const app = createApp(App);
app.use(createPinia());
app.use(router);

const isFirstSession = !sessionStorage.getItem('first_session_done');

if (isFirstSession) {
  sessionStorage.setItem('first_session_done', 'true');

  if ((window as any).ym) {
    (window as any).ym(108437493, 'reachGoal', 'first_session_start');
  }
}

router.isReady().then(() => {
  if (!sessionStorage.getItem('session_started')) {
    sessionStorage.setItem('session_started', 'true');

    if ((window as any).ym) {
      (window as any).ym(108437493, 'reachGoal', 'session_start');
    }
  }

  app.mount('#app');
});