<script setup lang="ts">
// Vue
import { RouterLink, RouterView } from 'vue-router'
import { useDarkModeStore } from '@/stores/darkMode';

// Components
import Dropdown from '@/components/Dropdown.vue';
import Button from '@/components/Button.vue';

// Variables
const darkModeStore = useDarkModeStore();
const isDev = import.meta.env.DEV;
</script>

<template>
  <p v-if="!isDev" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45
  text-center text-red-600 opacity-90 font-bold text-6xl">
    Under construction</p>
  <header class="flex space-x-4 md:space-x-8 items-center h-fit mx-2 my-2 md:mx-6 md:my-4">
    <RouterLink to="/" class="flex space-x-4 md:space-x-6 max-md:grow items-center">
      <img alt="June icon" src="@/assets/images/Kahera.png" class="w-8 h-8 md:h-16 md:w-16" />
      <h1 class="font-display font-bold text-center text-2xl md:text-4xl text-primary">June Hansen</h1>
    </RouterLink>
    <nav class="max-md:order-last md:grow flex justify-center">
      <Dropdown class="md:hidden" :position="'right'" :button-type="'solid'" :links="$router.getRoutes()" />
      <div class="max-md:hidden mx-auto space-x-6">
        <RouterLink v-for="route in $router.getRoutes().filter(x => x.name != 'Home')" :to="route.path"
          class="!text-primary">
          {{ route.name }}
        </RouterLink>
      </div>
    </nav>
    <button class="btn icon text-primary border-primary" @click="darkModeStore.toggle()">
      <span v-if="darkModeStore.darkMode">dark_mode</span>
      <span v-else>light_mode</span>
    </button>
    <!-- <Button @click="darkModeStore.toggle()" :icon="darkModeStore.darkMode ? 'light_mode' : 'dark_mode'"
      :icon-position="'right'">
      <template #text>test</template>
    </Button> -->
  </header>

  <main class="mx-auto w-4/5 mt-20">
    <RouterView />
  </main>
</template>

<style scoped></style>