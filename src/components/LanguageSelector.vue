<script setup lang="ts">
import { useId } from 'vue';
import { useI18n } from 'vue-i18n';

const id = useId();
const { locale, availableLocales, t } = useI18n();
</script>

<template>
   <div>
      <label :for="id" class="sr-only">{{ t('locale.select') }}</label>
      <select :id="id" v-model="locale" name="locale"
         class="h-10 w-22 cursor-pointer border-0 border-b border-secondary-darkest bg-transparent text-sm text-secondary-darkest dark:border-secondary dark:text-secondary">
         <option v-for="language in availableLocales" :key="language" :value="language"
            class="bg-surface text-ink dark:bg-surface-dark dark:text-ink-dark">
            {{ t(`locale.${language}`) }}
         </option>
      </select>
   </div>
</template>
