<script setup lang="ts">
import { computed, useSlots, type PropType } from 'vue';

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
    },
    disabled: {
        type: Boolean,
        default: false
    }
});
const slots = useSlots();

console.log(slots.other)

const rounded = computed(() => {
    if (props.round) {
        return 'rounded-full';
    } else {
        return 'rounded-lg';
    }
});

const background = computed(() => {
    if (props.disabled) {
        return 'bg-disabled';
    };

    switch (props.buttonType) {
        case 'outline':
            return 'bg-transparent';
        case 'solid':
            switch (props.color) {
                case 'primary':
                    return 'bg-primary';
                case 'secondary':
                    return 'bg-secondary';
                case 'accent':
                    return 'bg-accent';
                case 'neutral':
                    return 'bg-neutral';
                case 'danger':
                    return 'bg-danger';
                case 'warning':
                    return 'bg-warning';
                case 'success':
                    return 'bg-success';
            }
        case 'soft':
            switch (props.color) {
                case 'primary':
                    return 'bg-primary-lighter';
                case 'secondary':
                    return 'bg-secondary-lighter';
                case 'accent':
                    return 'bg-accent-lighter';
                case 'neutral':
                    return 'bg-neutral-lighter';
                case 'danger':
                    return 'bg-danger-lighter';
                case 'warning':
                    return 'bg-warning-lighter';
                case 'success':
                    return 'bg-success-lighter';
            }
    }
})

const textColor = computed(() => {
    if (props.disabled) {
        return 'text-disabled';
    };

    if (props.buttonType == 'outline') {
        switch (props.color) {
            case 'primary':
                return 'text-primary';
            case 'secondary':
                return 'text-secondary';
            case 'accent':
                return 'text-accent';
            case 'neutral':
                return 'text-neutral';
            case 'danger':
                return 'text-danger';
            case 'warning':
                return 'text-warning';
            case 'success':
                return 'text-success';
        }
    } else {
        return 'text-transparent';
    }


});

const border = computed(() => {
    if (props.buttonType == 'outline') {
        switch (props.color) {
            case 'primary':
                return 'border border-primary';
            case 'secondary':
                return 'border border-secondary';
            case 'accent':
                return 'border border-accent';
            case 'neutral':
                return 'border border-neutral';
            case 'danger':
                return 'border border-danger';
            case 'warning':
                return 'border border-warning';
            case 'success':
                return 'border border-success';
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
        case 'md' || 'lg':
            return 'text-2xl';
    }
});

// console.log(background.value, textColor.value, border.value)
</script>


<template>
    <button class="btn flex space-x-2"
        :class="[{ 'flex-row-reverse space-x-reverse': iconPosition == 'right' }, background, textColor, border, buttonSize, rounded]">
        <span v-if="icon" class="font-icon" :class="[iconSize]">{{ icon }}</span>
        <span v-if="$slots.text" class="my-auto">
            <slot name="text"></slot>
        </span>
        <slot name="other"></slot>
    </button>
</template>