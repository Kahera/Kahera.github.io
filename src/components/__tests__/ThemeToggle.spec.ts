import { nextTick } from 'vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import ThemeToggle from '../ThemeToggle.vue';
import { i18n } from '../../i18n';

enableAutoUnmount(afterEach);

beforeEach(() => {
   localStorage.clear();
   document.documentElement.classList.remove('dark');
   vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
   i18n.global.locale.value = 'en';
});

afterEach(() => {
   document.body.replaceChildren();
   vi.restoreAllMocks();
   vi.unstubAllGlobals();
});

function mountToggle() {
   return mount(ThemeToggle, {
      attachTo: document.body,
      global: { plugins: [createPinia(), i18n] }
   });
}

async function pressEscape() {
   document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
   await nextTick();
}

describe('Theme tooltip', () => {
   it('opens on focus and dismisses with Escape without moving focus', async () => {
      const wrapper = mountToggle();
      const button = wrapper.get<HTMLButtonElement>('button');
      expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
      expect(button.attributes('aria-describedby')).toBeUndefined();

      button.element.focus();
      await nextTick();
      expect(button.attributes('aria-describedby')).toBe(wrapper.get('[role="tooltip"]').attributes('id'));
      await pressEscape();
      expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
      expect(button.attributes('aria-describedby')).toBeUndefined();
      expect(document.activeElement).toBe(button.element);

      button.element.blur();
      await nextTick();
      button.element.focus();
      await nextTick();
      expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);
   });

   it('allows Escape dismissal while hovered without keyboard focus', async () => {
      const wrapper = mountToggle();
      await wrapper.trigger('mouseenter');
      expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);
      expect(document.activeElement).not.toBe(wrapper.get('button').element);

      await pressEscape();
      expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
      await wrapper.trigger('mouseleave');
      await wrapper.trigger('mouseenter');
      expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);
      await wrapper.trigger('mouseleave');
      expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
   });

   it('stays dismissed until both hover and focus leave the control', async () => {
      const wrapper = mountToggle();
      const button = wrapper.get<HTMLButtonElement>('button');
      await wrapper.trigger('mouseenter');
      button.element.focus();
      await nextTick();
      await pressEscape();
      await wrapper.trigger('mouseleave');
      await wrapper.trigger('mouseenter');
      expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);

      button.element.blur();
      await wrapper.trigger('mouseleave');
      await wrapper.trigger('mouseenter');
      expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);
   });

   it('keeps the switch name stable and updates its state and localized description', async () => {
      const wrapper = mountToggle();
      const button = wrapper.get('button');
      await wrapper.trigger('mouseenter');
      expect(wrapper.get('[role="tooltip"]').text()).toBe('Swap to Dark mode');
      await button.trigger('click');
      expect(button.attributes('aria-label')).toBe('Dark mode');
      expect(button.attributes('aria-checked')).toBe('true');
      expect(wrapper.get('[role="tooltip"]').text()).toBe('Swap to Light mode');

      i18n.global.locale.value = 'no';
      await nextTick();
      expect(button.attributes('aria-label')).toBe('Mørk modus');
      expect(wrapper.get('[role="tooltip"]').text()).toBe('Bytt til Lys modus');
   });
});