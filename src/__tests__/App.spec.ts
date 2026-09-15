import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { nextTick } from 'vue';
import App from '../App.vue';
import FocusSection from '../components/FocusSection.vue';
import router from '../router';
import { i18n } from '../i18n';
import { useDarkModeStore } from '../stores/darkMode';

enableAutoUnmount(afterEach);

beforeEach(async () => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
  vi.stubGlobal('scrollTo', vi.fn());
  i18n.global.locale.value = 'en';
  await router.push('/');
  await router.isReady();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function mountPage() {
  return mount(App, { global: { plugins: [createPinia(), router, i18n] } });
}

describe('Workshop page', () => {
  it('presents work before hobbies with one main heading and no CV navigation', async () => {
    const wrapper = mountPage();
    await flushPromises();
    expect(wrapper.findAll('h1')).toHaveLength(1);
    expect(wrapper.get('h1').text()).toBe('June Hansen');
    expect(wrapper.get('header h1').text()).toBe('June Hansen');
    expect(wrapper.find('#intro-title').exists()).toBe(false);
    expect(wrapper.text()).not.toContain('On the web & in the workshop');
    expect(wrapper.get('#work-title').text()).toBe('Work');
    expect(wrapper.get('#interests-title').text()).toBe('Hobbies');
    expect(wrapper.get('#work-focus-title').element.tagName).toBe('H3');
    expect(wrapper.findAll('#work > section').map(section => section.attributes('id'))).toEqual([
      'work-focus', 'work-development'
    ]);
    expect(wrapper.get('#work-focus').text()).toContain('user experience (UX)');
    expect(wrapper.get('#work-focus').text()).toContain('developer experience (DevEx)');
    expect(wrapper.get('#work-development-title').element.tagName).toBe('H3');
    expect(wrapper.get('#work-development-title').text()).toBe('From interface to API.');
    expect(wrapper.get('#work-development').text()).toContain('frontends with Angular and Vue');
    expect(wrapper.get('#work-development').text()).toContain('backends and APIs with .NET/C#');
    expect(wrapper.get('#work-development a[href="https://evidi.com"]').text()).toBe('Evidi');
    expect(wrapper.get('#work-development a[href*="linkedin"]').attributes('href')).toBe(i18n.global.t('about.links.linkedIn'));
    expect(wrapper.find('.border-dashed').exists()).toBe(false);
    expect(wrapper.get('#work').element.nextElementSibling?.id).toBe('interests');
    expect(wrapper.findAll('#interests section')).toHaveLength(3);
    for (const [index, section] of wrapper.findAllComponents(FocusSection).entries()) {
      expect(section.props('reverse')).toBe(index % 2 === 0);
    }
    expect(wrapper.find('#work a[href*="linkedin"]').exists()).toBe(true);
    expect(wrapper.find('a[href="/resume"]').exists()).toBe(false);
    expect(wrapper.text()).not.toContain('photo to come');
    expect(wrapper.get('a[href="#main-content"]').text()).toBe('Skip to content');
  });

  it('restores the decorative portrait background with only one accessible image', () => {
    const wrapper = mountPage();
    const portrait = wrapper.get('.portrait-composition');
    expect(portrait.findAll('img')).toHaveLength(1);
    expect(portrait.get('img').attributes('alt')).toBe('June smiling');
    expect(portrait.get('img').attributes('fetchpriority')).toBe('high');
    expect(portrait.get('[aria-hidden="true"]').attributes('style')).toContain('background-1.webp');
    expect(portrait.get('img').classes()).not.toContain('border-b-3');
  });

  it('switches all page content, image alternatives, and document language to Norwegian', async () => {
    const wrapper = mountPage();
    await wrapper.get('select[name="locale"]').setValue('no');
    expect(wrapper.get('#interests-title').text()).toBe('Fritid');
    expect(wrapper.get('#work-title').text()).toBe('Arbeid');
    expect(wrapper.get('#work').text()).toContain('Jeg er fullstack-utvikler i');
    expect(wrapper.get('#work-focus').text()).toContain('brukeropplevelse');
    expect(wrapper.get('#work-focus').text()).toContain('utvikleropplevelse');
    expect(wrapper.get('#work-development-title').text()).toBe('Fra grensesnitt til API.');
    expect(wrapper.get('#work-development').text()).toContain('frontend med Angular og Vue');
    expect(wrapper.get('#work-development').text()).toContain('backend og API-er med .NET/C#');
    expect(wrapper.get('#work-development a[href*="linkedin"]').attributes('href')).toBe(i18n.global.t('about.links.linkedIn'));
    expect(wrapper.get('img').attributes('alt')).toBe('June som smiler');
    expect(wrapper.get('[role="switch"]').attributes('aria-label')).toBe('Mørk modus');
    expect(document.documentElement.lang).toBe('nb');
    expect(localStorage.getItem('locale')).toBe('no');
  });

  it('updates the theme toggle, page class, and stored choice', async () => {
    const wrapper = mountPage();
    const toggle = wrapper.get('[role="switch"]');
    await toggle.trigger('click');
    expect(toggle.attributes('aria-checked')).toBe('true');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
    await toggle.trigger('click');
    expect(toggle.attributes('aria-checked')).toBe('false');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('keeps old About and CV URLs useful and supports a missing-page return', async () => {
    const wrapper = mountPage();
    await router.push('/resume');
    expect(router.currentRoute.value.fullPath).toBe('/#work');
    await router.push('/about');
    expect(router.currentRoute.value.fullPath).toBe('/');
    await router.push('/missing-page');
    await flushPromises();
    expect(wrapper.text()).toContain('Page Not Found');
    expect(wrapper.findAll('h1')).toHaveLength(1);
    expect(wrapper.get('h1').text()).toBe('Page Not Found');
    await router.push('/');
    await nextTick();
    expect(wrapper.find('#work').exists()).toBe(true);
  });
});

describe('Theme preference', () => {
  it('uses the system preference when there is no saved theme', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    setActivePinia(createPinia());
    const store = useDarkModeStore();
    expect(store.darkMode).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    store.$dispose();
  });

  it('honors an explicit light preference over a dark system preference', () => {
    localStorage.setItem('theme', 'light');
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    setActivePinia(createPinia());
    const store = useDarkModeStore();
    expect(store.darkMode).toBe(false);
    store.$dispose();
  });

  it('keeps the theme control usable when browser storage is unavailable', () => {
    document.documentElement.classList.add('dark');
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Blocked'); });
    setActivePinia(createPinia());
    const store = useDarkModeStore();
    expect(store.darkMode).toBe(true);
    expect(() => store.toggle()).not.toThrow();
    expect(store.darkMode).toBe(false);
    store.$dispose();
  });
});