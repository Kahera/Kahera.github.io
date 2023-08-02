<script setup lang="ts">
// Components
import Button from '@/components/Button.vue';
import ListItem from '@/components/view-experience/ListItem.vue'
import CVItem from '@/components/view-experience/CVItem.vue';

// Data
import jobData from '@/assets/data/jobs.json';
import educationData from '@/assets/data/education.json';
import { computed, ref } from 'vue';

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

</script>

<template>
  <ul class="space-y-8 mb-8">
    <ListItem>
      <template #icon>work</template>
      <template #heading>Work</template>

      <ul class="flex flex-col space-y-6">
        <TransitionGroup> <!-- TODO: Add animation -->
          <CVItem v-for="(job, index) in displayJobs" :key="index" :startDate="new Date(job.startDate)"
            :endDate="job.endDate ? new Date(job.endDate) : undefined" :company="job.company" :url="job.url"
            :position="job.position">
            <template #description><span class="whitespace-pre-wrap">{{ job.description }}</span></template>
          </CVItem>
        </TransitionGroup>
        <Button @click="displayAllJobs = !displayAllJobs" :icon="displayAllJobs ? 'expand_less' : 'expand_more'">
          <template #text>{{ displayAllJobs ? 'Show fewer' : 'Show all' }}</template>
        </Button>
      </ul>
    </ListItem>

    <ListItem>
      <template #icon>school</template>
      <template #heading>Education</template>
      <ul class="flex flex-col space-y-6">
        <CVItem v-for="education in educations" :startDate="new Date(education.startDate)"
          :endDate="education.endDate ? new Date(education.endDate) : undefined" :company="education.school"
          :url="education.url" :position="education.degree">
          <template #description>{{ education.description }}</template>
        </CVItem>
      </ul>
    </ListItem>
  </ul>
</template>

<style scoped></style>