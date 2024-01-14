<script setup lang="ts">

// Vue
import { computed, ref, watchEffect } from 'vue';

// Components
import Button from '@/components/ButtonComponent.vue';
import ListItem from './components/ListItem.vue';
import CVItem from './components/CVItem.vue';

// Animations
import gsap from 'gsap';
import { usePrefersReducedMotion } from '@/utilities/prefers-reduced-motion';

// Models
// Models
import type { IEmployment } from '@/models/IEmployment';
import type { IEducation } from '@/models/IEducation';
import type { IResumeItem } from '@/models/IResumeItem';

// i18n
import { useI18n } from "vue-i18n";
const i18n = useI18n();

let educationRef = ref(<IEducation[]>[]);
let jobsRef = ref(<IEmployment[]>[]);

watchEffect(() => updateData());

function updateData() {
  educationRef.value = i18n.tm('resume.educations') as IEducation[];
  jobsRef.value = i18n.tm('resume.jobs') as IEmployment[];
}

// Sort data by end date - most recent first, with current jobs at the top
function sortDataByEndDate<T extends IResumeItem>(array: T[]): T[] {
  return array.sort((a, b) => {
    if (a.endDate === undefined) return -1;
    else if (b.endDate === undefined) return 1;
    else return new Date(b.endDate).getUTCMilliseconds() - new Date(a.endDate).getUTCMilliseconds();
  });
}

const displayAllJobs = ref(false);

const education = computed(() => sortDataByEndDate(educationRef.value));
const jobsSorted = computed(() => sortDataByEndDate(jobsRef.value));
const jobsToDisplay = computed(() => {
  if (displayAllJobs.value) return jobsSorted.value;
  else return jobsSorted.value.slice(0, 3);
});

// Animations
const reducedMotion = usePrefersReducedMotion();
function onEnter(el: any, done: any) {
  gsap.fromTo(el, {
    opacity: 0,
    height: 0.2
  }, {
    opacity: 1,
    height: 'auto',
    duration: reducedMotion.value ? 0 : 0.5,
    delay: reducedMotion.value ? 0 : el.dataset.index * 0.15,
    onComplete: done
  })
}

function onLeave(el: any, done: any) {
  const delayModifier = el.dataset.type === 'job' ? jobsSorted.value.length : education.value.length;
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
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 2xl:gap-14 mb-8">
    <ListItem class="justify-self-center lg:justify-self-end">
      <template #icon>work</template>
      <template #heading>{{ $t('resume.work') }}</template>

      <ol class="flex flex-col space-y-6 mb-6">
        <TransitionGroup name="list" @enter="onEnter" @leave="onLeave">
          <CVItem v-for="(job, index) in jobsToDisplay" :key="index" :data-index="index" :data-type="'job'"
            :startDate="new Date(job.startDate)" :endDate="job.endDate ? new Date(job.endDate) : undefined"
            :company="job.company" :url="job.url" :position="job.position">
            <template #description><span class="whitespace-pre-wrap">{{ job.description }}</span></template>
          </CVItem>
        </TransitionGroup>
      </ol>

      <Button @click="displayAllJobs = !displayAllJobs" :color="'secondary'" class="w-full">
        <template #icon><span class="inline-block transition-transform"
            :class="{ '-rotate-180': displayAllJobs }">expand_more</span></template>
        <template #text>{{ displayAllJobs ? 'Show fewer' : 'Show all' }}</template>
      </Button>
    </ListItem>

    <ListItem class="justify-self-center lg:justify-self-start">
      <template #icon>school</template>
      <template #heading>{{ $t('resume.education') }}</template>
      <ol class="flex flex-col space-y-6">
        <CVItem v-for="ed in education" :startDate="new Date(ed.startDate)"
          :endDate="ed.endDate ? new Date(ed.endDate) : undefined" :company="ed.school" :url="ed.url"
          :position="ed.degree">
          <template #description>{{ ed.description }}</template>
        </CVItem>
      </ol>
    </ListItem>
  </div>
</template>

<style scoped></style>
