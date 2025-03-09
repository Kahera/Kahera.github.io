<script setup lang="ts">
// Vue
import { ref, watchEffect } from 'vue';
import Icon from '@/components/IconComponent.vue';

// i18n
import { useI18n } from "vue-i18n";
const $i18n = useI18n();

let aboutStrings: string[] = [];

const isLoaded = ref(false);

updateData();
watchEffect(() => updateData());

function updateData() {
  aboutStrings = $i18n.tm('about.body') as string[];
}
</script>

<template>
  <div class="max-w-readable mx-auto">
    <!-- About me -->
    <div class="w-2/5 max-xxs:hidden -ml-6 sm:-ml-10 md:-ml-20 lg:-ml-28">
      <!-- Popup image -->
      <div
        class="image-container -mt-28 m-6 float-left relative w-full aspect-1/1.15 flex items-end rounded-b-full overflow-clip transform transition-transform duration-150 ease-linear hover:scale-105"
      >
        <img
          v-show="isLoaded"
          alt=""
          src="@/assets/images/background-1.webp"
          class="absolute rounded-full aspect-square w-full object-cover"
        >
        <img
          v-show="isLoaded"
          alt="{{ $t('about.imageAlt') }}"
          src="@/assets/images/june-smily.webp"
          class="primary-image relative z-2 transform transition-transform w-full duration-400 translate-y-1/3 hover:translate-y-3/10"
          @load="isLoaded = true"
        >
        <!-- Skeleton image -->
        <div
          v-show="!isLoaded"
          class="absolute rounded-full aspect-square w-full object-cover animate-pulse bg-neutral-300 dark:bg-neutral-700"
        />
      </div>
    </div>
    <h1 class="text-secondary-darker">
      {{ $t('about.heading') }}
    </h1>
    <div class="space-y-4 mt-4">
      <p
        v-for="(item, index) in aboutStrings"
        :key="index"
        class="text-primary-darker dark:text-primary-lighter"
      >
        {{ item }}
      </p>
    </div>

    <!-- Reach me section-->
    <h3 class="mt-6 text-secondary-darker">
      {{ $t('about.reachMe.heading') }}
    </h3>

    <p class="mt-2 mb-4">
      {{ $t('about.reachMe.body') }}
    </p>

    <div class="flex justify-around">
      <a
        class="icon"
        :href="$t('about.links.linkedIn')"
        target="_blank"
        aria-label="LinkedIn"
      >
        <Icon
          name="linkedin"
          classes="w-10 h-10 inline-block"
        />
      </a>

      <a
        class="icon"
        href="https://github.com/Kahera"
        target="_blank"
        aria-label="GitHub"
      >
        <Icon
          name="github"
          class="w-10 h-10 inline-block text-[#24292e] dark:text-[#fafbfc]"
        />
      </a>

      <a
        class="icon"
        href="https://bsky.app/profile/junehansen.no"
        target="_blank"
        aria-label="Bluesky"
      >
        <Icon
          name="bluesky"
          class="w-10 h-10 inline-block"
        />
      </a>

      <a
        class="icon"
        href="https://www.instagram.com/juneveh/"
        target="_blank"
        aria-label="Instagram"
      >
        <Icon
          name="instagram"
          class="w-10 h-10 inline-block"
        />
      </a>
    </div>

    <!-- About this page -->
    <h2 class="text-secondary-darker mt-10">
      {{ $t('about.thisPage.heading') }}
    </h2>
    <p class="mt-4">
      {{ $t('about.thisPage.intro') }}
      <a
        href="https://github.com/Kahera/Kahera.github.io/issues"
        target="_blank"
      >
        {{ $t('about.thisPage.openAnIssue') }}
      </a>
    </p>
  </div>
</template>

<style scoped>
.image-container {
	shape-outside: polygon(0 0, 65% 0, 70% 15%, 85% 25%, 100% 50%, 95% 75%, 73% 92%, 0 95%);
}
.icon {
   @apply hover:scale-105 transition-transform duration-300;
}
</style>
