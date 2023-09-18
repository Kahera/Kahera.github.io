<script setup lang="ts">

// Vue
import { computed, ref, watch } from 'vue';

// Components
import Button from '@/components/ButtonComponent.vue';
import ListItem from '@/components/view-experience/ListItem.vue'
import CVItem from '@/components/view-experience/CVItem.vue';

// Animations
import gsap from 'gsap';
import { usePrefersReducedMotion } from '@/utilities/prefers-reduced-motion';

// Data
import jobsNo from "@/assets/data/jobs-no.json";
import jobsEn from "@/assets/data/jobs-en.json";
import educationNo from '@/assets/data/education-no.json';
import educationEn from '@/assets/data/education-en.json';

import { useI18n } from "vue-i18n";
const i18nLocale = useI18n();

let jobs = ref(<typeof jobsEn>[]);
let education = ref(<typeof educationEn>[]);
updateData(i18nLocale.locale.value);

watch(() => i18nLocale.locale.value, (newLocale, _) => {
  updateData(newLocale);
});

function updateData(locale: string) {
  if (locale == "en") {
    jobs.value = jobsEn;
    education.value = educationEn;
  } else {
    jobs.value = jobsNo;
    education.value = educationNo;
  }
}

// Sort data by end date - most recent first, with current jobs at the top
function sortDataByEndDate(array: any[]): any[] {
  return array.sort((a, b) => {
    if (a.endDate === undefined) return -1;
    else if (b.endDate === undefined) return 1;
    else return new Date(b.endDate).getUTCMilliseconds() - new Date(a.endDate).getUTCMilliseconds();
  });
}

const displayAllJobs = ref(false);

const educations = computed(() => sortDataByEndDate(education.value) as typeof educationEn);
const jobsSorted = computed(() => sortDataByEndDate(jobs.value) as typeof jobsEn);
const jobsToDisplay = computed(() => {
  if (displayAllJobs.value) return jobsSorted.value;
  else return jobsSorted.value.slice(0, 2);
});


// Animations
const reducedMotion = usePrefersReducedMotion();
function onEnter(el: any, done: any) {
  gsap.fromTo(el, {
    opacity: 0,
    height: 0
  }, {
    opacity: 1,
    height: 'auto',
    duration: reducedMotion.value ? 0 : 0.5,
    delay: reducedMotion.value ? 0 : el.dataset.index * 0.15,
    onComplete: done
  })
}

function onLeave(el: any, done: any) {
  const delayModifier = el.dataset.type === 'job' ? jobsSorted.value.length : educations.value.length;
  gsap.to(el, {
    opacity: 0,
    height: 0,
    duration: reducedMotion.value ? 0 : 0.4,
    delay: reducedMotion.value ? 0 : (delayModifier - el.dataset.index) * 0.1,
    onComplete: done
  })
}
</script>

<template>
  <ul class="space-y-8 mb-8">
    <ListItem>
      <template #icon>work</template>
      <template #heading>{{ $t('resume.work') }}</template>

      <ol class="flex flex-col space-y-6">
        <TransitionGroup name="list" @enter="onEnter" @leave="onLeave">
          <CVItem v-for="(job, index) in jobsToDisplay" :key="index" :data-index="index" :data-type="'job'"
            :startDate="new Date(job.startDate)" :endDate="job.endDate ? new Date(job.endDate) : undefined"
            :company="job.company" :url="job.url" :position="job.position">
            <template #description><span class="whitespace-pre-wrap">{{ job.description }}</span></template>
          </CVItem>
        </TransitionGroup>
        <Button @click="displayAllJobs = !displayAllJobs" :color="'secondary'">
          <template #icon><span class="inline-block transition-transform"
              :class="{ '-rotate-180': displayAllJobs }">expand_more</span></template>
          <template #text>{{ displayAllJobs ? 'Show fewer' : 'Show all' }}</template>
        </Button>
      </ol>
    </ListItem>

    <ListItem>
      <template #icon>school</template>
      <template #heading>{{ $t('resume.education') }}</template>
      <ul class="flex flex-col space-y-6">
        <CVItem v-for="education in educations" :key="education.degree" :startDate="new Date(education.startDate)"
          :endDate="education.endDate ? new Date(education.endDate) : undefined" :company="education.school"
          :url="education.url" :position="education.degree">
          <template #description>{{ education.description }}</template>
        </CVItem>
      </ul>
    </ListItem>
  </ul>
</template>

<style scoped></style>