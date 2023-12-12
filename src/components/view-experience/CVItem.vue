<script setup lang="ts">
defineProps({
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date
    },
    company: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: false
    },
    position: {
        type: String,
        required: true,
    }
});
</script>


<template>
    <li class="bg-primary-lighter/90 dark:bg-accent-darker/30 
            rounded-lg overflow-hidden">
        <div class="flex justify-between mb-2 m-6">
            <!-- Position/company -->
            <div class="justify-between">
                <p class="font-bold">{{ position }}</p>
                <a :href="url" target="_blank" rel="noopener" tabindex="-1">
                    <p class="italic opacity-80">{{ company }}</p>
                </a>
            </div>

            <!-- Date(s) -->
            <p class="text-right">
                {{ $d(startDate, 'month') }} — {{ endDate ? $d(endDate, 'month') : $t('resume.present') }}
            </p>
        </div>

        <!-- Description -->
        <p class="m-6 mt-0">
            <slot name="description"></slot>
        </p>
    </li>
</template>

<style scoped></style>