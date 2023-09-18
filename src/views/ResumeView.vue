<script setup lang="ts">
// Components
import Button from '@/components/ButtonComponent.vue';
import ListItem from '@/components/view-experience/ListItem.vue'
import CVItem from '@/components/view-experience/CVItem.vue';

// Data
import jobData from '@/assets/data/jobs.json';
import educationData from '@/assets/data/education.json';
import { computed, ref } from 'vue';

// Animations
import gsap from 'gsap';
import { usePrefersReducedMotion } from '@/utilities/prefers-reduced-motion';


// sort data by end date - most recent first, with current jobs at the top
const jobs = jobData.sort((a, b) => {
  if (a.endDate === undefined) return -1;
  else if (b.endDate === undefined) return 1;
  else return new Date(b.endDate).getUTCMilliseconds() - new Date(a.endDate).getUTCMilliseconds();
});

const educations = educationData.sort((a, b) => {
  if (a.endDate === undefined) return -1;
  else if (b.endDate === undefined) return 1;
  else return new Date(b.endDate).getUTCMilliseconds() - new Date(a.endDate).getUTCMilliseconds();
});

const displayAllJobs = ref(false);

const displayJobs = computed(() => {
  if (displayAllJobs.value) return jobs;
  else return jobs.slice(0, 2);
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
  const delayModifier = el.dataset.type === 'job' ? jobs.length : educations.length;
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
          <CVItem v-for="(job, index) in displayJobs" :key="index" :data-index="index" :data-type="'job'"
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