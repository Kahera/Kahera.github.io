<script setup lang="ts">
import ListItem from './ListItem.vue'
import SvgSchool from '@/assets/icons/school.vue';
import SvgWork from '@/assets/icons/work.vue';
import CVItem from './CVItem.vue';

const date = new Date();
</script>

<template>
  <ul class="space-y-6">
    <ListItem>
      <template #icon>
        <SvgWork />
      </template>
      <template #heading>Work</template>

      <ul class="flex flex-col space-y-6">
        <CVItem :startDate="new Date(2021, 7, 1)" :company="'Evidi'" :url="'https://www.evidi.com/'"
          :position="'Fullstack Developer'">
          <template #description>Fullstack developer with main emphasis on .NET/C# as backend, Angular and Vue as
            frontend,
            and Azure as cloud provider.</template>
        </CVItem>
        <CVItem :startDate="new Date(2020, 7, 1)" :endDate="new Date(2021, 5, 1)" :company="'NTNU'"
          :url="'https://www.ntnu.no/'" :position="'Teching assistant'">
          <template #description>Student assisstant in the subjects: WWW-technologies: with main emphasis on helping
            students finding good solutions, troubleshoot problems in assignments and projects, as well as some teaching.
            Software development: with main emphasis on guiding groups with a larger semester task, as well as lab
            assistance.</template>
        </CVItem>

      </ul>
    </ListItem>

    <ListItem>
      <template #icon>
        <SvgSchool />
      </template>
      <template #heading>Education</template>

      <ul>
        <CVItem :startDate="new Date(2018, 7, 1)" :endDate="new Date(2021, 5, 1)" :company="'NTNU'"
          :url="'https://www.ntnu.no/'" :position="'Bachelor in Programming'">
          <template #description>
            During the degree I developed skills writing good and efficient program code in different programming
            languages.
            I followed the process from idea to working program with specialisation in application development. The
            program
            provides a foundation in informatics, but with greater emphasis on programming than is usual in such studies.
            To
            a large extent, the tools used are the same ones that are used professionally.
          </template>
        </CVItem>
      </ul>
    </ListItem>
  </ul>
</template>

<style scoped></style>