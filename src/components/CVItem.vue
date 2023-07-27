<script setup lang="ts">
const props = defineProps({
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
    <div>

        <div class="flex space-x-4">
            <p>{{ startDate.toLocaleDateString() }} — {{ endDate?.toLocaleDateString() ?? 'Current' }}</p>
            <a :href="url" target="_blank" rel="noopener"><span>{{ company }}</span></a>
        </div>
        <p>
            <slot name="description"></slot>
        </p>
    </div>
</template>

<style scoped></style>