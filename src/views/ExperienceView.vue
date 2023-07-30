<script setup lang="ts">
// Components
import ListItem from '@/components/ListItem.vue'
import CVItem from '@/components/CVItem.vue';

// Data
import jobData from '@/assets/data/jobs.json';
import educationData from '@/assets/data/education.json';

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
</script>

<template>
  <ul class="space-y-8">
    <ListItem>
      <template #icon>work</template>
      <template #heading>Work</template>

      <ul class="flex flex-col space-y-6">
        <CVItem v-for="job in jobs" :startDate="new Date(job.startDate)"
          :endDate="job.endDate ? new Date(job.endDate) : undefined" :company="job.company" :url="job.url"
          :position="job.position">
          <template #description><span class="whitespace-pre-wrap">{{ job.description }}</span></template>
        </CVItem>
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