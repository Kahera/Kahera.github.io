<script setup lang="ts">
withDefaults(defineProps<{
  id: string;
  eyebrow: string;
  heading: string;
  description?: string;
  tone?: 'rose' | 'green' | 'blue';
  tinted?: boolean;
  reverse?: boolean;
  headingLevel?: 2 | 3;
  image?: { src: string; alt: string; caption?: string };
  symbol?: string;
}>(), {
  description: '',
  tone: 'rose',
  tinted: false,
  reverse: false,
  headingLevel: 3,
  image: undefined,
  symbol: 'handyman'
});

const tones = {
  rose: 'text-primary-darker dark:text-primary-light',
  green: 'text-secondary-darkest dark:text-secondary',
  blue: 'text-accent dark:text-accent-lighter'
};

const surfaces = {
  rose: 'bg-surface-rose dark:bg-surface-rose-dark',
  green: 'bg-secondary-lightest dark:bg-surface-green-dark',
  blue: 'bg-accent-lightest dark:bg-surface-blue-dark'
};
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="`${id}-title`"
    :class="tinted ? surfaces[tone] : 'bg-surface dark:bg-surface-dark'"
  >
    <div class="page-width grid items-center gap-6 py-9 md:grid-cols-2 md:gap-12 md:py-12 lg:gap-16 lg:pl-24">
      <div :class="reverse ? 'md:col-start-2 md:row-start-1' : 'md:col-start-1 md:row-start-1'">
        <p
          class="mb-4 flex items-center gap-4 text-xs font-semibold uppercase before:h-0.5 before:w-8 before:shrink-0 before:bg-current"
          :class="tones[tone]"
        >
          {{ eyebrow }}
        </p>
        <component
          :is="`h${headingLevel}`"
          :id="`${id}-title`"
          class="mb-4 max-w-[20ch] font-editorial text-3xl font-medium leading-tight lg:text-4xl"
          :class="tones[tone]"
        >
          {{ heading }}
        </component>
        <div class="max-w-[42ch] space-y-5 text-lg leading-relaxed">
          <slot>
            <p>{{ description }}</p>
          </slot>
        </div>
        <div
          v-if="$slots.links"
          class="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-base"
          :class="tones[tone]"
        >
          <slot name="links" />
        </div>
      </div>
      <div :class="reverse ? 'md:col-start-1 md:row-start-1' : 'md:col-start-2 md:row-start-1'">
        <slot name="media">
          <figure v-if="image">
            <img
              :src="image.src"
              :alt="image.alt"
              loading="lazy"
              decoding="async"
              class="aspect-8/5 w-full object-cover"
            >
            <figcaption
              v-if="image.caption"
              class="border-t-4 pt-3 font-display text-sm"
              :class="[tones[tone], reverse ? 'text-left' : 'text-right']"
            >
              {{ image.caption }}
            </figcaption>
          </figure>
          <div
            v-else
            aria-hidden="true"
            class="flex min-h-36 items-center justify-center md:aspect-8/5"
            :class="tones[tone]"
          >
            <span class="font-icon text-[6rem] leading-none opacity-70 md:text-[8rem]">{{ symbol }}</span>
          </div>
        </slot>
      </div>
    </div>
  </section>
</template>