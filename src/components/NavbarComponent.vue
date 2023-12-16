<script setup lang="ts">

// Vue
import { RouterLink } from 'vue-router'
import { useDarkModeStore } from '@/stores/darkMode';

// Components
import Dropdown from '@/components/DropdownComponent.vue';
import Button from '@/components/ButtonComponent.vue';

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

    <!-- In header navigation on larger screens -->
    <nav class="max-md:hidden flex justify-center space-x-6 m-auto grow">
      <RouterLink
        v-for="route in $router.getRoutes().filter(x => x.name != 'home')"
        :key="route.path"
        :to="route.path"
        class="dark:text-primary-light text-primary-darker"
      >
        {{ $t('pages.' + route.name?.toString()) }}
      </RouterLink>
    </nav>

    <!-- Language selector for larger screens -->
    <div class="relative max-md:hidden">
      <label
        for="locale"
        class="absolute text-sm text-primary-darker dark:text-primary-light -top-2 bg-primary-lightest dark:bg-accent-darkest left-3 px-1 transition-transform duration-200"
      >
        {{ $t('locale.select') }}
      </label>
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
          class="bg-primary-lightest dark:bg-accent-darker"
        >
          {{ $t('locale.' + locale) }}
        </option>
      </select>
    </div>

    <!-- Dark/light mode for larger screens -->
    <Button
      :icon-position="'right'"
      :type="'outline'"
      :size="'lg'"
      class="max-md:hidden focus:outline-1 focus:outline-primary-light"
      @click=" darkModeStore.toggle()"
    >
      <template #icon>
        {{ darkModeStore.darkMode ? 'light_mode' : 'dark_mode' }} 
      </template>
    </Button>

    <!-- Dropdown navigation for smaller screens -->
    <nav class="md:hidden">
      <!-- Dropdown on small screens, link list on larger -->
      <Dropdown
        :position="'right'"
        :button-type="'solid'"
      >
        <RouterLink
          v-for="route in $router.getRoutes().filter(x => x.name != 'home')"
          :key="route.path"
          class="flex space-x-2"
          :to="route.path"
        >
          <span class="font-icon align-middle">{{ getNavIcon(route.name?.toString()) }}</span>
          <span class="align-middle">{{ $t('pages.' + route.name?.toString()) }}</span>
        </RouterLink>
        <button
          class="w-full"
          @click="darkModeStore.toggle()"
        >
          <div class="flex space-x-2 whitespace-nowrap">
            <span class="font-icon">{{ darkModeStore.darkMode ? 'light_mode' : 'dark_mode' }}</span>
            <span>{{ $t('ui.swapTo', {mode: darkModeStore.darkMode ? $t('ui.lightMode').toLocaleLowerCase() : $t('ui.darkMode').toLocaleLowerCase()}) }}</span>
          </div>
        </button>

        <div class="relative group">
          <label
            for="locale"
            class="absolute text-sm -top-0.5 left-6 px-1
            text-primary-darker dark:text-primary-light bg-primary-lighter dark:bg-accent-darker 
            group-hover:bg-primary-light group-hover:dark:bg-accent-darkest 
            transition duration-200"
          >
            {{ $t('locale.select') }}
          </label>
          <select
            id="locale"
            v-model="$i18n.locale"
            class="block h-12 w-full py-0 px-6 border border-1 rounded-lg border-primary bg-transparent appearance-none"
            @click="$event.stopPropagation()"
          >
            <option
              v-for="(locale, index) in $i18n.availableLocales"
              :key="`locale-${locale}`"
              :data-index="index"
              :value="locale"
              class="bg-primary-lightest dark:bg-accent-darker"
            >
              {{ $t('locale.' + locale) }}
            </option>
          </select>
        </div>
      </Dropdown>
    </nav>
  </header>
</template>