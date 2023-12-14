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
  <p
    v-if="!isDev"
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45
  text-center text-danger opacity-90 font-bold text-6xl pointer-events-none"
  >
    {{ $t('warnings.underConstruction') }}
  </p>

  <header class="flex items-center space-x-4 md:space-x-8 mx-4 md:mx-6 my-2 md:my-4">
    <!-- Logo home-link -->
    <RouterLink
      to="/"
      class="flex sm:space-x-4 md:space-x-6 max-md:grow"
    >
      <img
        alt="{{ $t('common.JuneIcon') }}"
        src="@/assets/images/Kahera.webp"
        class="max-h-12 max-sm:hidden"
      >
      <h1 class="font-display font-bold text-center my-auto text-2xl sm:text-4xl text-primary dark:text-primary">
        {{ $t('common.JuneHansen') }}
      </h1>
    </RouterLink>

    <nav class="flex justify-center max-md:order-last md:grow">
      <!-- Dropdown on small screens, link list on larger -->
      <Dropdown
        class="md:hidden focus:outline-1 focus:outline-primary-light"
        :position="'right'"
        :button-type="'solid'"
        :links="$router.getRoutes()"
      />
      <div class="max-md:hidden mx-auto space-x-6">
        <RouterLink
          v-for="route in $router.getRoutes().filter(x => x.name != 'home')"
          :key="route.path"
          :to="route.path"
          class="dark:text-primary-light text-primary-darker"
        >
          {{ $t('pages.' + route.name?.toString()) }}
        </RouterLink>
      </div>
    </nav>

    <div class="relative">
      <label
        for="locale"
        class="absolute text-sm -top-2 bg-primary-lightest dark:bg-accent-darkest left-3 px-1 transition-transform duration-200"
      >
        {{ $t('locale.select') }}
      </label>
      <!-- class="h-12 px-2 rounded-lg bg-transparent border border-primary dark:border-primary text-primary dark:text-primary"> -->
      <select
        id="locale"
        v-model="$i18n.locale"
        class="block h-12 py-0 px-6 border border-1 rounded-lg border-primary bg-transparent appearance-none"
      >
        <option
          v-for="(locale, index) in $i18n.availableLocales"
          :key="`locale-${locale}`"
          :data-index="index"
          :value="locale"
          class="bg-primary-lightest dark:bg-accent-dark"
        >
          {{ $t('locale.' + locale) }}
        </option>
      </select>
    </div>
    <Button
      :icon-position="'right'"
      :type="'outline'"
      :size="'lg'"
      class="focus:outline-1 focus:outline-primary-light"
      @click=" darkModeStore.toggle()"
    >
      <template #icon>
        {{ darkModeStore.darkMode ? 'light_mode' : 'dark_mode' }} 
      </template>
    </Button>
  </header>

  <!-- Main page content -->  
  <main class="mx-auto w-4/5 mt-6 lg:mt-20">
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