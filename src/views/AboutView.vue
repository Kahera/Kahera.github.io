<script setup lang="ts">
// Vue
import { watchEffect } from 'vue';

// i18n
import { useI18n } from "vue-i18n";
const i18n = useI18n();

let aboutStrings: string[] = [];
// TODO: Figure out ESLint Identifier Expected error
updateData();
watchEffect(() => updateData());

function updateData() {
  aboutStrings = i18n.tm('about.body') as string[];
}


</script>

<template>
  <div class="space-y-4">
    <h2>{{ $t('about.heading') }}</h2>
    <div v-for="(item, index) in aboutStrings" :key="index">
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<style></style>