import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import App from '../App.vue';
import router from '../router';
import { i18n } from '../i18n';

enableAutoUnmount(afterEach);

beforeEach(async () => {
   localStorage.clear();
   document.documentElement.classList.remove('dark');
   vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
   vi.stubGlobal('scrollTo', vi.fn());
   i18n.global.locale.value = 'en';
   await router.push('/');
   await router.isReady();
   await flushPromises();
});

afterEach(() => {
   document.body.replaceChildren();
   vi.restoreAllMocks();
   vi.unstubAllGlobals();
});

function mountPage() {
   return mount(App, {
      attachTo: document.body,
      global: { plugins: [createPinia(), router, i18n] }
   });
}

describe('Accessible navigation', () => {
   it.each(['work', 'interests'])('focuses the %s heading, including repeated navigation', async (id) => {
      const wrapper = mountPage();
      const link = wrapper.get<HTMLAnchorElement>(`nav a[href="/#${id}"]`);

      for (let visit = 0; visit < 2; visit++) {
         link.element.focus();
         await link.trigger('click');
         await flushPromises();

         const heading = wrapper.get(`#${id}-title`);
         expect(document.activeElement).toBe(heading.element);
         expect(heading.attributes('tabindex')).toBe('-1');
      }
   });

   it('focuses the new page when entering and leaving a missing-page route', async () => {
      const wrapper = mountPage();
      await router.push('/missing-page');
      await flushPromises();
      expect(document.activeElement).toBe(wrapper.get('main h1').element);

      const homeLink = wrapper.get<HTMLAnchorElement>('main a[href="/"]');
      homeLink.element.focus();
      await homeLink.trigger('click');
      await flushPromises();
      expect(document.activeElement).toBe(wrapper.get('main').element);
   });

   it('focuses the section after navigating from the missing-page view', async () => {
      const wrapper = mountPage();
      await router.push('/missing-page');
      await flushPromises();
      await wrapper.get('nav a[href="/#work"]').trigger('click');
      await flushPromises();
      expect(document.activeElement).toBe(wrapper.get('#work-title').element);
   });

   it('falls back to main content for an unknown fragment', async () => {
      const wrapper = mountPage();
      await router.push('/#unknown-section');
      await flushPromises();
      expect(document.activeElement).toBe(wrapper.get('main').element);
   });

   it('honors the main-content fragment without skipping the introduction', async () => {
      const wrapper = mountPage();
      await router.push('/#main-content');
      await flushPromises();
      expect(document.activeElement).toBe(wrapper.get('main').element);
   });

   it('preserves saved history positions while focusing without scrolling', async () => {
      const wrapper = mountPage();
      const from = router.currentRoute.value;
      await router.push('/#work');
      await flushPromises();
      const focus = vi.spyOn(wrapper.get<HTMLElement>('#work-title').element, 'focus');
      const savedPosition = { left: 0, top: 400 };
      const position = await router.options.scrollBehavior?.(
         router.currentRoute.value, from, savedPosition
      );
      expect(position).toEqual(savedPosition);
      expect(focus).toHaveBeenCalledWith({ preventScroll: true });
   });

   it('marks only the matching fragment as the current location', async () => {
      const wrapper = mountPage();
      expect(wrapper.find('nav [aria-current]').exists()).toBe(false);

      for (const id of ['work', 'interests']) {
         await router.push(`/#${id}`);
         await flushPromises();
         const currentLinks = wrapper.findAll('nav [aria-current]');
         expect(currentLinks).toHaveLength(1);
         expect(currentLinks[0]!.attributes('href')).toBe(`/#${id}`);
         expect(currentLinks[0]!.attributes('aria-current')).toBe('location');
      }

      await router.push('/missing-page#work');
      await flushPromises();
      expect(wrapper.find('nav [aria-current]').exists()).toBe(false);
   });
});

describe('Accessible missing-page content', () => {
   it('updates the document title when either the route or language changes', async () => {
      const wrapper = mountPage();
      expect(document.title).toBe('June Hansen');
      await router.push('/missing-page');
      await flushPromises();
      expect(document.title).toBe('Page Not Found – June Hansen');

      await wrapper.get('select[name="locale"]').setValue('no');
      expect(document.title).toBe('Siden ble ikke funnet – June Hansen');
      await wrapper.get('select[name="locale"]').setValue('en');
      expect(document.title).toBe('Page Not Found – June Hansen');

      await router.push('/');
      await flushPromises();
      expect(document.title).toBe('June Hansen');
   });

   it('uses the opaque, high-contrast return-link surfaces in both themes', async () => {
      const wrapper = mountPage();
      await router.push('/missing-page');
      await flushPromises();
      const link = wrapper.get('main a[href="/"]');
      expect(link.classes()).toEqual(expect.arrayContaining([
         'bg-surface-rose', 'text-primary-darker',
         'dark:bg-surface-rose-dark', 'dark:text-primary-lighter'
      ]));
      expect(link.classes()).not.toContain('bg-primary/40');
   });
});