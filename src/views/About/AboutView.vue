<script setup lang="ts">
// Vue
import { watchEffect } from 'vue';
import Icon from '@/components/IconComponent.vue';

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
  <div class="max-w-lg mx-auto">
    <!-- About me -->
    <div class="w-2/5 -ml-10 md:-ml-20 lg:-ml-28">
      <!-- Popup image -->
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
    <h2 class="text-secondary-darker">
      {{ $t('about.heading') }}
    </h2>
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
        :href="$t('about.links.linkedIn')"
        target="_blank"
      >
        <Icon
          name="linkedin"
          classes="inline-block text-[#0e76a8]"
        />

      </a>
      <a
        href="https://github.com/Kahera"
        target="_blank"
      >
        <Icon
          aria-label="GitHub"
          name="github"
          class="w-12 h-12 p-1 inline-block text-[#24292e] dark:text-[#fafbfc]"
        />
      </a>
      <a
        href="https://www.instagram.com/juneveh/"
        target="_blank"
      >
        <Icon
          aria-label="Instagram"
          name="instagram"
          class="w-12 h-12 inline-block text-[#8a3ab9]"
        />
      </a>
    </div>

    <!-- About this page -->
    <h2 class="text-secondary-darker mt-8">
      {{ $t('about.thisPage.heading') }}
    </h2>
    <p>
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
</style>
