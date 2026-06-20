<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ inheritAttrs: false });

defineProps<{
  src: string;
  alt: string;
}>();

const loaded = ref(false);
function onLoad() { setTimeout(() => loaded.value = true, 2000); }
</script>

<template>
  <div class="relative inline-flex" :style="($attrs as any).style">
    <!-- Skeleton shown until image loads; min-size so it's visible before the
         browser has resolved the image dimensions -->
    <div
      v-show="!loaded"
      aria-hidden="true"
      class="absolute inset-0 rounded-md min-h-6 min-w-6 bg-accent-light/70 dark:bg-accent/60 animate-pulse motion-reduce:animate-none"
    />
    <!-- `invisible` keeps the element in layout so the wrapper—and therefore the
         skeleton—matches the image dimensions; replaced by `opacity-100` once loaded -->
    <img
      v-bind="$attrs"
      :src="src"
      :alt="alt"
      :class="loaded ? 'opacity-100' : 'invisible'"
      class="transition-opacity duration-300"
      @load="onLoad()"
    >
  </div>
</template>

