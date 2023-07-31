<script setup lang="ts">
import { computed, reactive, type PropType } from 'vue';

const props = defineProps({
    buttonType: {
        type: String as PropType<'outline' | 'solid' | 'soft'>,
        default: 'outline'
    },
    color: {
        type: String as PropType<'primary' | 'secondary' | 'accent' | 'neutral' | 'danger' | 'warning' | 'success'>,
        default: 'primary'
    },
    icon: {
        type: String,
        required: false
    },
    iconPosition: {
        type: String as PropType<'left' | 'right'>,
        default: 'left'
    },
    size: {
        type: String as PropType<'sm' | 'md' | 'lg'>,
        default: 'md'
    },
    round: {
        type: Boolean,
        default: false
    }
});

// getTextColor()

</script>


<template>
    <button class="btn flex space-x-2" :class="{ 'flex-row-reverse space-x-reverse': iconPosition == 'right' }">
        <span v-if="icon" class="font-icon text-2xl">{{ icon }}</span>
        <span class="my-auto">
            <slot name="text"></slot>
        </span>
    </button>
</template>