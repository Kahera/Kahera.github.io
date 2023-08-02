<script setup lang="ts">
import { computed, type PropType } from 'vue';

const props = defineProps({
    type: {
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
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

const rounded = computed(() => {
    if (props.round) {
        return 'rounded-full';
    } else {
        return 'rounded-lg';
    }
});

const background = computed(() => {
    if (props.type == 'outline') return 'bg-transparent';
    if (props.disabled) {
        if (props.type == 'soft') return 'bg-gray-200/40';
        return 'bg-gray-200 dark:bg-gray-700';
    }

    switch (props.color) {
        case 'primary':
            if (props.type == 'soft') return 'bg-primary/40';
            return 'bg-primary';
        case 'secondary':
            if (props.type == 'soft') return 'bg-secondary/40';
            return 'bg-secondary';
        case 'accent':
            if (props.type == 'soft') return 'bg-accent/40';
            return 'bg-accent';
        case 'neutral':
            if (props.type == 'soft') return 'bg-gray-500/40';
            return 'bg-gray-500';
        case 'success':
            if (props.type == 'soft') return 'bg-green-500/40';
            return 'bg-green-500';
        case 'warning':
            if (props.type == 'soft') return 'bg-yellow-500/40';
            return 'bg-yellow-500';
        case 'danger':
            if (props.type == 'soft') return 'bg-red-500/40';
            return 'bg-red-500';
    }
})

const textColor = computed(() => {
    if (props.disabled) return 'text-gray-400';

    if (props.type == 'outline') {
        switch (props.color) {
            case 'primary':
                return 'text-primary';
            case 'secondary':
                return 'text-secondary-darkest dark:text-secondary';
            case 'accent':
                return 'text-accent dark:text-accent-lighter';
            case 'neutral':
                return 'text-gray-500 dark:text-gray-400';
            case 'danger':
                return 'text-red-500';
            case 'warning':
                return 'text-yellow-500';
            case 'success':
                return 'text-green-500';
        }
    } else {
        switch (props.color) {
            case 'primary':
                if (props.type == 'soft') return 'text-primary-dark';
                return 'text-white';
            case 'secondary':
                if (props.type == 'soft') return 'text-black/80 dark:text-white/90';
                return 'text-black/80';
            case 'accent':
                if (props.type == 'soft') return 'text-accent-darkest dark:text-accent-lightest';
                return 'text-white';
            case 'neutral':
                if (props.type == 'soft') return 'text-gray-600 dark:text-gray-200';
                return 'text-white';
            case 'success':
                if (props.type == 'soft') return 'text-black/70 dark:text-white/90';
                return 'text-black/90';
            case 'warning':
                if (props.type == 'soft') return 'text-black/70 dark:text-white/90';
                return 'text-black/90';
            case 'danger':
                if (props.type == 'soft') return 'text-black/80 dark:text-white/90';
                return 'text-white';
        }
    }


});

const border = computed(() => {
    if (props.type == 'outline') {
        if (props.disabled) return 'border border-gray-300 dark:border-gray-600';

        switch (props.color) {
            case 'primary':
                return 'border border-primary';
            case 'secondary':
                return 'border border-secondary-darkest dark:border-secondary';
            case 'accent':
                return 'border border-accent dark:border-accent-lighter';
            case 'neutral':
                return 'border border-gray-500';
            case 'danger':
                return 'border border-red-500';
            case 'warning':
                return 'border border-yellow-500';
            case 'success':
                return 'border border-green-500';
        }
    } else {
        return 'border-0';
    }
});

const buttonSize = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'px-2 text-sm';
        case 'md':
            return 'px-3 py-1 text-base';
        case 'lg':
            return 'px-3 py-2 text-lg';
    }
});

const iconSize = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'text-xl';
        case 'md':
        case 'lg':
            return 'text-2xl';
    }
});
</script>


<template>
    <button class="btn flex justify-center space-x-2"
        :class="[{ 'flex-row-reverse space-x-reverse': iconPosition == 'right' }, background, textColor, border, buttonSize, rounded]">
        <span v-if="icon" class="font-icon my-auto" :class="[iconSize]">{{ icon }}</span>
        <span v-if="$slots.text" class="my-auto">
            <slot name="text"></slot>
        </span>
        <slot name="other"></slot>
    </button>
</template>