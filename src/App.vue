<script setup lang="ts">
// Vue
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue';

const isDev = import.meta.env.DEV;
</script>

<template>
  <!-- Under construction indicator for deployed version -->
  <p
    v-if="!isDev"
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45
  text-center text-danger opacity-90 font-bold text-6xl pointer-events-none"
  >
    {{ $t('warnings.underConstruction') }}
  </p>

  <NavbarComponent />

  <!-- Main page content -->  
  <main class="mx-auto w-10/12 md:w-4/5 mt-6 lg:mt-20">
    <RouterView />
  </main>
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