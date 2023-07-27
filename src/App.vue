<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// Get dark mode state and toggle function from the store
import { useDarkModeStore } from '@/stores/darkMode';
import SvgDarkMode from '@/assets/icons/darkMode.vue';
import SvgLightMode from '@/assets/icons/lightMode.vue';

// Get the dark mode state and toggle function from the store
const darkModeStore = useDarkModeStore();
console.log(darkModeStore)

</script>

<template>
  <p class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45
          text-red-600 opacity-90 font-bold text-6xl">
    Under construction</p>
  <header class="flex justify-between items-center h-fit mx-6">
    <RouterLink to="/" class="flex space-x-4 items-center">
      <img alt="June icon" src="@/assets/images/Kahera.png" width="60" height="60" />
      <h1 class="font-display font-bold text-4xl">June Hansen</h1>
    </RouterLink>
    <nav class="flex space-x-4">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <button class="btn outline h-fit scale-50 border-indigo-700" @click="darkModeStore.toggle()">
      <SvgDarkMode v-if="darkModeStore.darkMode" />
      <SvgLightMode v-else />
    </button>
  </header>

  <RouterView class="mx-auto w-4/5" />
</template>

<style scoped></style>