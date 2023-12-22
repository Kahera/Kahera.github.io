<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

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

const icon = defineAsyncComponent(() =>
  import(`../assets/icons/${props.name}.svg`)
);
</script>

<template>
  <component
    :is="icon"
    :class="props.classes"
  />
</template>
