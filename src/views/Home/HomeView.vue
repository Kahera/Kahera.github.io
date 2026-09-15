<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import FocusSection from '@/components/FocusSection.vue';
import portrait from '@/assets/images/june-smily.webp';
import portraitBackground from '@/assets/images/background-1.webp';

const { t } = useI18n();

const workSections = ref([
  { id: 'work-focus', contentKey: 'home.work', tinted: false, symbol: 'groups' },
  { id: 'work-development', contentKey: 'home.work.development', tinted: true, symbol: 'code' }
]);

const interests = ref([
  { id: 'making', tone: 'green', tinted: true, symbol: 'handyman' },
  { id: 'beekeeping', tone: 'green', tinted: false, symbol: 'hive' },
  { id: 'games', tone: 'rose', tinted: true, symbol: 'casino' }
] as const);
</script>

<template>
  <div>
    <section
      aria-labelledby="site-title"
      class="border-b-3 border-primary-darker bg-surface-rose dark:border-primary-light dark:bg-surface-rose-dark"
    >
      <div class="page-width grid items-center gap-6 py-7 sm:grid-cols-[minmax(0,1fr)_11rem] sm:gap-10 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-16 md:py-9">
        <p class="max-w-[49ch] text-xl leading-relaxed md:text-2xl">
          {{ t('home.intro') }}
        </p>
        <div class="portrait-composition relative isolate order-first aspect-210/245 w-40 justify-self-center overflow-hidden rounded-b-full sm:order-0 sm:w-full sm:justify-self-end">
          <div
            aria-hidden="true"
            class="absolute inset-x-0 bottom-0 aspect-square rounded-full bg-cover bg-center saturate-75"
            :style="{ backgroundImage: `url(${portraitBackground})` }"
          />
          <img
            :src="portrait"
            :alt="t('home.portraitAlt')"
            width="190"
            height="245"
            fetchpriority="high"
            class="absolute bottom-0 left-1/2 z-10 h-full w-[90%] -translate-x-1/2 object-cover object-[center_5%]"
          >
        </div>
      </div>
    </section>

    <section id="work" aria-labelledby="work-title" class="focus-group bg-surface dark:bg-surface-dark">
      <div class="focus-group-label text-accent dark:text-accent-lighter">
        <h2 id="work-title" class="focus-group-heading">{{ t('home.workGroup') }}</h2>
      </div>
      <FocusSection
        v-for="(section, index) in workSections"
        :id="section.id"
        :key="section.id"
        :eyebrow="t(`${section.contentKey}.eyebrow`)"
        :heading="t(`${section.contentKey}.heading`)"
        tone="blue"
        :symbol="section.symbol"
        :tinted="section.tinted"
        :reverse="index % 2 === 0"
      >
        <i18n-t :keypath="`${section.contentKey}.body`" tag="p" scope="global">
          <template #employer>
            <a href="https://evidi.com" target="_blank" rel="noopener noreferrer" class="underline">Evidi</a>
          </template>
        </i18n-t>
        <template v-if="section.id === 'work-development'" #links>
          <a :href="t('about.links.linkedIn')" target="_blank" rel="noopener noreferrer" class="underline">
            {{ t('home.work.link') }}
          </a>
        </template>
      </FocusSection>
    </section>

    <section id="interests" aria-labelledby="interests-title" class="focus-group bg-secondary-lightest dark:bg-surface-green-dark">
      <div class="focus-group-label text-secondary-darkest dark:text-secondary">
        <h2 id="interests-title" class="focus-group-heading">{{ t('home.hobbiesGroup') }}</h2>
      </div>
      <FocusSection
        v-for="(interest, index) in interests"
        :id="interest.id"
        :key="interest.id"
        :eyebrow="t(`home.${interest.id}.eyebrow`)"
        :heading="t(`home.${interest.id}.heading`)"
        :description="t(`home.${interest.id}.body`)"
        :tone="interest.tone"
        :tinted="interest.tinted"
        :reverse="(workSections.length + index) % 2 === 0"
        :symbol="interest.symbol"
      />
    </section>

    <section aria-labelledby="more-title" class="page-width flex flex-col gap-3 py-7 md:flex-row md:items-baseline md:gap-8">
      <h2 id="more-title" class="shrink-0 font-display text-base font-medium text-secondary-darkest dark:text-secondary">
        {{ t('home.moreHeading') }}
      </h2>
      <p>{{ t('home.moreBody') }}</p>
    </section>
  </div>
</template>

<style scoped>
@reference '../../assets/base.css';

.focus-group {
  @apply relative isolate;
}

.focus-group-label {
  @apply page-width pointer-events-none relative z-10 pt-7 lg:absolute lg:inset-0 lg:py-12;
}

.focus-group-heading {
  @apply border-l-2 border-current pl-3 font-sans text-sm font-semibold uppercase leading-6 lg:sticky lg:top-8 lg:w-fit lg:py-2 lg:[writing-mode:vertical-rl];
}

.focus-group-label::before {
  @apply absolute inset-y-12 hidden w-px bg-current opacity-25 content-[''] lg:block;
}
</style>
