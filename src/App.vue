<script setup lang="ts">
// Vue
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue';

</script>

<template>
  <NavbarComponent />

  <!-- Main page content -->
  <main class="mx-auto max-sm:mx-4 sm:w-10/12 mb-8 md:w-4/5 mt-6 lg:mt-20">
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
