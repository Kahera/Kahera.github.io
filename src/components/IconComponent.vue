<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  classes: {
    type: String,
    default: '',
  },
});

// Import SVG as raw string
const svgContent = ref('');

// Dynamically load and parse SVG
async function loadSvg() {
   const module = await import(`../assets/icons/${props.name}.svg?raw`);
   svgContent.value = module.default;
}

// Watch for name changes
watch(() => props.name, loadSvg, { immediate: true });
</script>

<template>
  <div
    v-html="svgContent"
    :class="props.classes"
  />
</template>
