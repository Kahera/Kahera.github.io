<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useDarkModeStore } from '@/stores/darkMode';
import LanguageSelector from './LanguageSelector.vue';

const { t } = useI18n();
const darkModeStore = useDarkModeStore();
const route = useRoute();
</script>

<template>
  <header class="bg-surface-rose dark:bg-surface-rose-dark">
    <div class="page-width">
      <div class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-4 border-b border-primary-darker py-5 lg:flex lg:gap-8 dark:border-primary-light">
        <component :is="route.name === 'home' ? 'h1' : 'span'" id="site-title" class="min-w-0 font-display text-xl font-medium leading-relaxed text-primary-darker sm:text-2xl dark:text-primary-light">
          <RouterLink to="/" class="block w-fit">{{ t('common.JuneHansen') }}</RouterLink>
        </component>

        <nav :aria-label="t('home.navigation')" class="col-span-2 row-start-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm lg:ml-auto lg:gap-6 lg:text-base">
          <RouterLink :to="{ path: '/', hash: '#work' }" class="py-1 hover:underline">{{ t('home.workNav') }}</RouterLink>
          <RouterLink :to="{ path: '/', hash: '#interests' }" class="py-1 hover:underline">{{ t('home.hobbiesNav') }}</RouterLink>
          <a href="https://github.com/Kahera" target="_blank" rel="noopener noreferrer" class="py-1 hover:underline">GitHub</a>
          <a :href="t('about.links.linkedIn')" target="_blank" rel="noopener noreferrer" class="py-1 hover:underline">LinkedIn</a>
        </nav>

        <div class="col-start-2 row-start-1 flex shrink-0 items-center gap-3 lg:gap-4">
          <LanguageSelector />
          <div class="group relative">
            <button
              type="button"
              role="switch"
              :aria-label="t('ui.darkMode')"
              :aria-checked="darkModeStore.darkMode"
              aria-describedby="theme-tooltip"
              class="grid size-10 cursor-pointer place-items-center text-secondary-darkest hover:bg-secondary-darkest/10 dark:text-secondary dark:hover:bg-secondary/10"
              @click="darkModeStore.toggle()"
            >
              <span aria-hidden="true" class="font-icon text-2xl">{{ darkModeStore.darkMode ? 'light_mode' : 'dark_mode' }}</span>
            </button>
            <span id="theme-tooltip" role="tooltip" class="pointer-events-none absolute top-full right-0 z-10 mt-2 w-max max-w-52 bg-ink px-3 py-2 text-xs text-surface opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 dark:bg-ink-dark dark:text-surface-dark">
              {{ t('ui.swapTo', { mode: darkModeStore.darkMode ? t('ui.lightMode') : t('ui.darkMode') }) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
