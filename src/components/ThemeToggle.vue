<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useId, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDarkModeStore } from '@/stores/darkMode';

const { t } = useI18n();
const darkModeStore = useDarkModeStore();
const tooltipId = useId();
const hovered = ref(false);
const focused = ref(false);
const dismissed = ref(false);
const tooltipVisible = computed(() => (hovered.value || focused.value) && !dismissed.value);

watch([hovered, focused], ([isHovered, isFocused]) => {
   if (!isHovered && !isFocused) dismissed.value = false;
});

function dismissTooltip(event: KeyboardEvent) {
   if (event.key === 'Escape' && tooltipVisible.value) dismissed.value = true;
}

// Escape must also work for a hovered tooltip when the button is not focused.
onMounted(() => document.addEventListener('keydown', dismissTooltip));
onUnmounted(() => document.removeEventListener('keydown', dismissTooltip));
</script>

<template>
   <div class="relative" @mouseenter="hovered = true" @mouseleave="hovered = false">
      <button type="button" role="switch" :aria-label="t('ui.darkMode')"
         :aria-checked="darkModeStore.darkMode" :aria-describedby="tooltipVisible ? tooltipId : undefined"
         class="grid size-10 cursor-pointer place-items-center text-secondary-darkest hover:bg-secondary-darkest/10 dark:text-secondary dark:hover:bg-secondary/10"
         @focus="focused = true" @blur="focused = false" @click="darkModeStore.toggle()">
         <span aria-hidden="true" class="font-icon text-2xl">{{ darkModeStore.darkMode ? 'light_mode' :
            'dark_mode' }}</span>
      </button>
      <!-- Padding bridges the pointer path between the button and tooltip. -->
      <div v-if="tooltipVisible" class="absolute top-full right-0 z-10 w-max max-w-52 pt-2">
         <span :id="tooltipId" role="tooltip"
            class="block bg-ink px-3 py-2 text-xs text-surface dark:bg-ink-dark dark:text-surface-dark">
            {{ t('ui.swapTo', { mode: darkModeStore.darkMode ? t('ui.lightMode') : t('ui.darkMode') }) }}
         </span>
      </div>
   </div>
</template>