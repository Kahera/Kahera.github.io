<script setup lang="ts">
// Vue
import { watchEffect } from 'vue';

// i18n
import { useI18n } from "vue-i18n";
const i18n = useI18n();

let aboutStrings: string[] = [];

updateData();
watchEffect(() => updateData());

function updateData() {
  aboutStrings = i18n.tm('about.body') as string[];
}
</script>

<template>
  <div class="w-1/5">
    <div class="image-container m-6 float-left relative w-full aspect-[1/1.15] flex items-end rounded-b-full overflow-hidden transform transition-transform duration-250 ease-linear hover:scale-105">
      <img
        alt="" 
        src="@/assets/images/background-1.webp"
        class="absolute rounded-full aspect-square w-full object-cover"
      >  
      <img
        alt="{{ $t('about.imageAlt') }}"
        src="@/assets/images/june-smily.webp"
        class="primary-image relative z-[2] transform transition-transform duration-200 w-full translate-y-[33%] hover:translate-y-[30%]"
      >
    </div>
  </div>
  <h2>{{ $t('about.heading') }}</h2>
  <div class="space-y-4 mt-4">
    <div
      v-for="(item, index) in aboutStrings"
      :key="index"
    >
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<style scoped>
.image-container {
	shape-outside: polygon(0 0, 65% 0, 70% 15%, 85% 25%, 100% 50%, 95% 75%, 75% 95%, 50% 100%, 0 100%);
}
</style> 