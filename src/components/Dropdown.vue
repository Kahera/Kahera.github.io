<script setup lang="ts">
import type { PropType } from 'vue';
import type { RouteRecordNormalized } from 'vue-router';

defineProps({
    links: {
        type: Array<RouteRecordNormalized>,
        required: true
    },
    position: {
        type: String as PropType<'left' | 'right'>,
        default: 'left'
    },
    buttonType: {
        type: String as PropType<'outline' | 'solid'>,
        default: 'outline'
    }
}); 
</script>

<template>
    <button class="btn icon group"
        :class="{ 'bg-primary !border-0': buttonType == 'solid', 'bg-transparent text-primary border-primary': buttonType == 'outline' }">
        <span :class="{ 'text-accent-lightest dark:text-accent-deep': buttonType == 'solid' }">menu</span>
        <div :class="{ 'right-0': position == 'right', 'left-0': position == 'left' }" class="hidden group-hover:block absolute z-10 pt-2
                    min-w-[12rem] leading-8
                    overflow-hidden rounded-xl">
            <a v-for="link in links" :href=link.path class="block 
                    bg-primary-lighter dark:bg-accent-darkest
                    hover:bg-primary-light hover:dark:bg-accent-darker 
                    hover:opacity-100 hover:dark:opacity-100">
                <span class="font-icon">
                    <slot name="icon"></slot>
                </span>
                <span class="text-primary-darker dark:text-primary-light">
                    {{ link.name }}
                </span>
            </a>
        </div>
    </button>
</template>
