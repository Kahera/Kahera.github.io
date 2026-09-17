import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      redirect: '/'
    },
    {
      path: '/resume',
      name: 'resume',
      redirect: { path: '/', hash: '#work' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFound/NotFoundView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Vue Router calls this after the destination view has rendered.
    const target = to.hash ? document.getElementById(to.hash.slice(1)) : null;
    if (to.hash || (from.matched.length > 0 && to.path !== from.path)) {
      const sectionHeading = target?.matches('section')
        ? target.querySelector<HTMLElement>('h1, h2, h3, h4, h5, h6')
        : null;
      const focusTarget = sectionHeading
        ?? target
        ?? document.querySelector<HTMLElement>('main h1')
        ?? document.getElementById('main-content');

      // Keep headings out of the tab order; let the router control scrolling.
      focusTarget?.setAttribute('tabindex', '-1');
      focusTarget?.focus({ preventScroll: true });
    }

    if (savedPosition) return savedPosition;
    if (target) return { el: target, top: 16 };
    return { top: 0 };
  }
});

export default router;
