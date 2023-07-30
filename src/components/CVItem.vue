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

<script lang="ts">
// function to display date as "Month Year" (e.g. "January 2021")
function formatDate(date: Date) {
    return date.toLocaleDateString('default', {
        month: 'long',
        year: 'numeric'
    });
}
</script>

<template>
    <div>
        <div class="flex justify-between mb-2">
            <a :href="url" target="_blank" rel="noopener">
                <p class="font-bold">{{ position }}</p>
                <p class="italic opacity-80">{{ company }}</p>
            </a>
            <p class="my-auto text-right">
                {{ formatDate(startDate) }} — {{ endDate ? formatDate(endDate) : 'Current' }}
            </p>
        </div>
        <p>
            <slot name="description"></slot>
        </p>
    </div>
</template>

<style scoped></style>