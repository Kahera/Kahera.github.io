<script setup lang="ts">
import { ref, type PropType } from 'vue';
import type { RouteRecordNormalized } from 'vue-router';
import Button from './ButtonComponent.vue';

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

let dropdownOpen = ref(false);

// Close dropdown when clicking outside of it
window.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement).closest('.dropdown-btn')) {
        dropdownOpen.value = false;
    }
});
</script>

<template>
    <Button class="dropdown-btn" @click="dropdownOpen = !dropdownOpen" :type="'solid'" :size="'lg'">
        <template #icon>menu</template>
        <template #other>
            <div class="dropdown absolute z-10 top-16 mb-2
                        min-w-[12rem] leading-8
                        overflow-hidden rounded-xl"
                :class="{ 'hidden': !dropdownOpen, 'right-0': position == 'right', 'left-0': position == 'left' }">
                <a v-for="link in links" :key="link.path" :href=link.path class="block 
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
        </template>
    </Button>
</template>


