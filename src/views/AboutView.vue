<script setup lang="ts">
import type { IContent } from '@/models/IContent';

</script>

<template>
  <div class="space-y-4">
    <div v-for="(item, index) in ($tm('about') as IContent[])" :key="index">
      <h2><span class="font-icon">{{ item.icon }}</span> {{ item.heading }}</h2>
      <p>{{ item.body }}</p>
    </div>
  </div>
</template>

<style></style>