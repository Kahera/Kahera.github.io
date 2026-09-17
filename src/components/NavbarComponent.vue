<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import LanguageSelector from './LanguageSelector.vue';
import ThemeToggle from './ThemeToggle.vue';

const { t } = useI18n();
const route = useRoute();
</script>

<template>
   <header class="bg-surface-rose dark:bg-surface-rose-dark">
      <div class="page-width">
         <div
            class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-4 border-b border-primary-darker py-5 lg:flex lg:gap-8 dark:border-primary-light">
            <component :is="route.name === 'home' ? 'h1' : 'span'" id="site-title"
               class="min-w-0 font-display text-xl font-medium leading-relaxed text-primary-darker sm:text-2xl dark:text-primary-light">
               <RouterLink to="/" class="block w-fit">{{ t('common.JuneHansen') }}</RouterLink>
            </component>

            <nav :aria-label="t('home.navigation')"
               class="col-span-2 row-start-2 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm sm:gap-x-6 lg:ml-auto lg:text-base">
               <ul class="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-5">
                  <li>
                     <RouterLink :to="{ path: '/', hash: '#work' }"
                        :aria-current="route.name === 'home' && route.hash === '#work' ? 'location' : undefined"
                        class="block py-1 hover:underline">{{
                        t('home.workNav') }}</RouterLink>
                  </li>
                  <li>
                     <RouterLink :to="{ path: '/', hash: '#interests' }"
                        :aria-current="route.name === 'home' && route.hash === '#interests' ? 'location' : undefined"
                        class="block py-1 hover:underline">{{
                        t('home.hobbiesNav') }}</RouterLink>
                  </li>
               </ul>
               <ul
                  class="flex flex-wrap items-center gap-x-4 gap-y-2 border-l border-primary-darker/30 pl-4 sm:gap-x-5 sm:pl-6 dark:border-primary-light/40">
                  <li>
                     <a href="https://github.com/Kahera" target="_blank" rel="noopener noreferrer"
                        class="block py-1 hover:underline">
                        GitHub
                     </a>
                  </li>
                  <li>
                     <a :href="t('links.linkedIn')" target="_blank" rel="noopener noreferrer"
                        class="block py-1 hover:underline">
                        LinkedIn
                     </a>
                  </li>
               </ul>
            </nav>

            <div class="col-start-2 row-start-1 flex shrink-0 items-center gap-3 lg:gap-4">
               <LanguageSelector />
               <ThemeToggle />
            </div>
         </div>
      </div>
   </header>
</template>
