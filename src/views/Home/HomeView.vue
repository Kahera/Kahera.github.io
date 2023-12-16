<script setup lang="ts">
import AboutView from '../About/AboutView.vue';

</script>

<template>
  <!-- <div class="flex w-full h-full justify-between">
    <RouterLink
      v-for="route in $router.getRoutes()"
      :key="route.path"
      :to="route.path"
    >
      {{ $t('pages.' + route.name?.toString()) }}
    </RouterLink>
  </div> -->
  <AboutView />
</template> 
 