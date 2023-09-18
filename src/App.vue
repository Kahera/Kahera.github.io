<script setup lang="ts">
// Vue
import { RouterLink, RouterView } from 'vue-router'
import { useDarkModeStore } from '@/stores/darkMode';

// Components
import Dropdown from '@/components/DropdownComponent.vue';
import Button from '@/components/ButtonComponent.vue';

// Variables
const darkModeStore = useDarkModeStore();
const isDev = import.meta.env.DEV;
</script>

<template>
  <!-- Under construction indicator for deployed version -->
  <p v-if="!isDev" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45
  text-center text-red-600 opacity-90 font-bold text-6xl pointer-events-none">
    {{ $t('warnings.underConstruction') }}
  </p>

  <header class="flex items-center space-x-4 md:space-x-8 mx-4 md:mx-6 my-2 md:my-4">
    <!-- Logo home-link -->
    <RouterLink to="/" class="flex sm:space-x-4 md:space-x-6 max-md:grow">
      <img alt="icon" src="@/assets/images/Kahera.png" class="max-h-12 max-sm:hidden" />
      <h1 class="font-display font-bold text-center my-auto text-2xl sm:text-4xl text-primary dark:text-primary/80">
        {{ $t('June', 2) }}
      </h1>
    </RouterLink>

    <nav class="flex justify-center max-md:order-last md:grow">
      <!-- Dropdown on small screens, link list on larger -->
      <Dropdown class="md:hidden" :position="'right'" :button-type="'solid'" :links="$router.getRoutes()" />
      <div class="max-md:hidden mx-auto space-x-6">
        <RouterLink v-for="route in $router.getRoutes().filter(x => x.name != 'home')" :key="route.path" :to="route.path"
          class="!text-primary/80">
          {{ $t('pages.' + route.name?.toString()) }}
        </RouterLink>
      </div>
    </nav>
    <select v-model="$i18n.locale">
      <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
        {{ $t('locale.' + locale) }}
      </option>
    </select>
    <Button @click="darkModeStore.toggle()" :icon-position="'right'" :type="'outline'" :size="'lg'">
      <template #icon> {{ darkModeStore.darkMode ? 'light_mode' : 'dark_mode' }}</template>
    </Button>
  </header>

  <!-- Main page content -->
  <main class="mx-auto w-4/5 mt-20">
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