<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
   colorScheme: {
      type: String as PropType<'primary' | 'secondary'>,
      default: 'primary'
   }
});

// Strongly typed color options so template indexing is safe
interface ColorVariants { primary: string; secondary: string }
interface ColorOptions { text: ColorVariants; border: ColorVariants }

const colorOptions: ColorOptions = {
  text: {
    primary: 'primary-hover-text',
    secondary: 'secondary-hover-text'
  },
  border: {
    primary: 'primary-hover-border',
    secondary: 'secondary-hover-border'
  }
};
</script>

<template>
  <fieldset
    :class="colorOptions.border[colorScheme]"
    class="group border rounded-md px-2 pb-3 -mt-2 has-[:focus-within]:focus-outline has-[:focus-within]:outline-2"
  >
    <legend
      class="px-1 text-sm"
      :class="colorOptions.text[colorScheme]"
    >
      {{ $t('locale.select') }}
    </legend>
    <select
      v-model="$i18n.locale"
      name="locale"
      class="w-full bg-transparent focus-visible:outline-hidden text-primary-darkest dark:text-primary-lighter"
      @click="$event.stopPropagation()"
    >
      <option
        v-for="(loc, index) in $i18n.availableLocales"
        :key="`locale-${loc}`"
        :data-index="index"
        :value="loc"
        class="bg-primary-lightest dark:bg-accent-darker"
      >
        {{ $t('locale.' + loc) }}
      </option>
    </select>
  </fieldset>
</template>
