<script setup lang="ts">

import { computed } from 'vue';
import { ref } from 'vue';

const labelRef = ref<HTMLElement | null>(null);
const cssVariables = computed(() => ({
   '--width': (labelRef.value ? (labelRef.value.offsetWidth + 16) : 0) + 'px'
}));

</script>

<template>
  <div class="relative">
    <label
      ref="labelRef"
      for="locale"
      class="absolute text-sm -mt-2.5 left-3 text-primary-darker dark:text-primary-light "
    >
      {{ $t('locale.select') }}
    </label>
    <div class="hide-border-top relative border border-primary overflow-clip rounded-md">
      <div
        class="absolute top-0 left-0 w-2 border-t border-x-0 border-primary rounded-tl-md"
      />
      <div
        :style="cssVariables"
        class="absolute top-0 right-0 border-t border-x-0 border-primary top-border-right"
      />
      <select
        id="locale"
        v-model="$i18n.locale"
        class="block h-12 py-0 px-6 w-full rounded-lg bg-transparent appearance-none"
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
  </div>
</template>

<style scoped>
   .hide-border-top {
      border-top: none;
   }
   .top-border-right {
      width: calc(100% - var(--width));
   }
</style>
