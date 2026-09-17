<script setup lang="ts">
import { watchEffect } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import NavbarComponent from './components/NavbarComponent.vue';

const route = useRoute();
const { t } = useI18n();

watchEffect(() => {
  const siteTitle = t('common.JuneHansen');
  document.title = route.name === 'notFound'
    ? `${t('notFound.title')} – ${siteTitle}`
    : siteTitle;
});
</script>

<template>
  <a href="#main-content" class="sr-only z-50 bg-surface px-5 py-3 text-primary-darker focus:not-sr-only focus:fixed focus:top-3 focus:left-3 dark:bg-surface-dark dark:text-primary-light">
    {{ $t('home.skipToContent') }}
  </a>
  <NavbarComponent />

  <main id="main-content" tabindex="-1">
    <RouterView />
  </main>

  <footer class="bg-primary-darker text-surface">
    <div class="page-width flex flex-col gap-4 py-7 sm:flex-row sm:items-baseline sm:justify-between">
      <p>{{ $t('home.elsewhere') }}</p>
      <div class="flex flex-wrap gap-x-6 gap-y-3">
        <a href="https://www.instagram.com/juneveh/" target="_blank" rel="noopener noreferrer" class="underline hover:text-secondary-lightest dark:hover:text-secondary-lightest focus-visible:outline-surface">Instagram</a>
        <a href="https://bsky.app/profile/junehansen.no" target="_blank" rel="noopener noreferrer" class="underline hover:text-secondary-lightest dark:hover:text-secondary-lightest focus-visible:outline-surface">Bluesky</a>
        <a :href="$t('links.linkedIn')" target="_blank" rel="noopener noreferrer" class="underline hover:text-secondary-lightest dark:hover:text-secondary-lightest focus-visible:outline-surface">LinkedIn</a>
      </div>
    </div>
  </footer>
</template>

<style>
/* Disable css animations when user prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
</style>
