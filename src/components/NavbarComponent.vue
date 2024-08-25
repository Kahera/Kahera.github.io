<script setup lang="ts">

// Vue
import { RouterLink } from 'vue-router'
import { useDarkModeStore } from '@/stores/darkMode';

// Components
import Dropdown from '@/components/DropdownComponent.vue';
import Button from '@/components/ButtonComponent.vue';
import LanguageSelector from './LanguageSelector.vue';

// Variables
const darkModeStore = useDarkModeStore();
function getNavIcon(name: string | undefined) {
  switch (name) {
    case 'about':
      return 'face_4';
    case 'resume':
      return 'description';
    case 'projects':
      return 'code';
    case 'contact':
      return 'email';
  }
}
</script>

<template>
  <header class="flex items-center gap-4 md:gap-8 mx-4 md:mx-6 my-3 md:my-4">
    <!-- Logo home-link -->
    <RouterLink
      to="/"
      class="flex gap-4 md:gap-6 max-md:grow"
    >
      <img
        alt="{{ $t('common.JuneIcon') }}"
        src="@/assets/images/Kahera.webp"
        class="max-h-12 max-xs:hidden"
      >
      <h1 class="text-center my-auto brand-header primary-hover-text">
        {{ $t('common.JuneHansen') }}
      </h1>
    </RouterLink>

    <!-- In header navigation on larger screens -->
    <nav class="max-md:hidden flex justify-center gap-6 m-auto grow">
      <RouterLink
        v-for="route in $router.getRoutes().filter(x => x.name != 'home')"
        :key="route.path"
        :to="route.path"
      >
        {{ $t('pages.' + route.name?.toString()) }}
      </RouterLink>
    </nav>

    <!-- Using if here to ensure new component is generated on resize,
         in case of language change between size changes -->
    <LanguageSelector
      class="w-28 max-md:hidden"
    />

    <!-- Dark/light mode for larger screens -->
    <Button
      :icon-position="'right'"
      :type="'outline'"
      :size="'lg'"
      :icon="darkModeStore.darkMode ? 'light_mode' : 'dark_mode'"
      class="max-md:hidden"
      @click="darkModeStore.toggle()"
    />

    <!-- Dropdown navigation for smaller screens, see v-if explanation above LanguageSelector -->
    <nav class="md:hidden">
      <Dropdown
        :position="'right'"
        :button-type="'outline'"
        :button-size="'lg'"
      >
        <RouterLink
          v-for="route in $router.getRoutes().filter(x => x.name != 'home')"
          :key="route.path"
          class="flex gap-2"
          :to="route.path"
        >
          <span class="font-icon align-bottom">{{ getNavIcon(route.name?.toString()) }}</span>
          <span>{{ $t('pages.' + route.name?.toString()) }}</span>
        </RouterLink>
        <button
          class="w-full"
          @click="darkModeStore.toggle()"
        >
          <div class="flex gap-2 whitespace-nowrap w-">
            <span class="font-icon">{{ darkModeStore.darkMode ? 'light_mode' : 'dark_mode' }}</span>
            <span>{{ $t('ui.swapTo', {mode: darkModeStore.darkMode ? $t('ui.lightMode').toLocaleLowerCase() : $t('ui.darkMode').toLocaleLowerCase()}) }}</span>
          </div>
        </button>

        <LanguageSelector
          class="-mt-1"
          :color-scheme="'secondary'"
        />
      </Dropdown>
    </nav>
  </header>
</template>

<style scoped>
.brand-header {
   /* Magic numbers from the website fluid.style */
   --preferred: 1.15rem + 2vw;
   font-size: clamp(1.5rem, 1.16rem + 2vw, 2.5rem);
}
</style>
