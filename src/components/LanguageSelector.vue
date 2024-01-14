<script setup lang="ts">
import { onMounted } from 'vue';
import { nextTick, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const labelRef = ref<HTMLElement | null>(null);
const cssVariables = ref<Record<string, string>>({ '--width': '0px' });

onMounted(() => updateWidth());
watch(locale, async() => updateWidth());

const updateWidth = async () => {
   await nextTick();
   cssVariables.value['--width'] = `${labelRef.value ? labelRef.value.offsetWidth + 18 : 0}px`;
}
</script>

<template>
  <div>
    <!-- Wrapper to avoid the padding from the outside of this element to affect the insets -->
    <div class="relative group">
      <label
        ref="labelRef"
        for="locale"
        :style="cssVariables"
        class="absolute text-sm -mt-2.5 left-3 floating-label-position primary-hover-text group-text-color"
      >
        {{ $t('locale.select') }}
      </label>
      <div class="hide-border-top relative overflow-clip rounded-md text-primary-darkest dark:text-primary-lighter">
        <div
          class="absolute top-0 left-0 w-2 border-t border-x-0 primary-hover-border group-border-color rounded-tl-md"
        />
        <div
          :style="cssVariables"
          class="absolute top-0 right-0 border-t border-x-0 primary-hover-border group-border-color top-border-right"
        />
        <select
          id="locale"
          v-model="$i18n.locale"
          class="block h-12 py-0 px-6 w-full bg-transparent rounded-md border primary-hover-border group-border-color hide-border-top focus-visible:border-2 focus-visible:outline-0 focus-visible:outline-transparent appearance-none"
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
      </div>
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
