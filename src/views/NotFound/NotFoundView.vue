<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from '@/components/ButtonComponent.vue';

const router = useRouter();
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60dvh] ">
    <div class="text-center">
      <h1 class="text-2xl md:text-3xl font-semibold mb-2 text-primary-darker dark:text-primary-lighter">
        {{ $t('notFound.title') }}
      </h1>
      <p class="text-lg text-gray-500 dark:text-gray-400 mb-8">
        {{ $t('notFound.description') }}
      </p>
      <Button
        :type="'soft'"
        :size="'lg'"
        @click="router.push('/')"
        class="mx-auto"
      >
         <template #text>
            {{ $t('notFound.backHome') }}
         </template>
      </Button>
    </div>
  </div>
</template>
