import './assets/base.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { i18n } from './i18n';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

// Handle redirect from 404.html
router.isReady().then(() => {
  const redirect = sessionStorage.redirect;
  if (redirect) {
    delete sessionStorage.redirect;
    const path = redirect.startsWith('/') ? redirect : '/' + redirect;
    router.push(path);
  }
});

app.mount('#app');
