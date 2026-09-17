<script setup lang="ts">
import { RouterLink } from 'vue-router';
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
         <RouterLink to="/"
            class="mx-auto flex w-fit justify-center rounded-lg bg-primary/40 px-3 py-2 text-lg text-primary-darker dark:text-primary-lighter">
            {{ $t('notFound.backHome') }}
         </RouterLink>
      </div>
   </div>
</template>
